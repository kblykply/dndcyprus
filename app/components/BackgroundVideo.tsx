"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const LIGHT_SELECTORS = '[data-bg="light"], .light-section, .bg-white';

export default function BackgroundVideo() {
  const [scale, setScale] = useState(1.06);
  const [isMuted, setIsMuted] = useState(true);
  const [isOnLight, setIsOnLight] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Adjust scale for aspect ratio
  useEffect(() => {
    const fit = () => {
      const ar = window.innerWidth / window.innerHeight;
      if (ar >= 2.0) setScale(1.18);
      else if (ar >= 1.78) setScale(1.12);
      else if (ar >= 1.5) setScale(1.08);
      else setScale(1.04);
    };
    fit();
    window.addEventListener("resize", fit, { passive: true });
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Detect background lightness (same logic as SocialIcons)
  const recalc = useCallback(() => {
    const icon = document.getElementById("mute-btn");
    if (!icon) return;

    const rect = icon.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    const candidates = Array.from(
      document.querySelectorAll(LIGHT_SELECTORS)
    ) as HTMLElement[];

    let onLight = false;
    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      if (centerY >= r.top && centerY <= r.bottom && r.height > 0 && r.width > 0) {
        onLight = true;
        break;
      }
    }

    setIsOnLight(onLight);
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    const guard = window.setInterval(recalc, 400);
    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
      clearInterval(guard);
    };
  }, [recalc]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newState = !prev;
      if (videoRef.current) {
        videoRef.current.muted = newState;
        if (!newState) {
          videoRef.current.play().catch(() => {});
        }
      }
      return newState;
    });
  };

  return (
    <>
      {/* Video Layer */}
      <div className="fixed inset-0 w-[110vw] h-[101dvh] -z-10 overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full object-cover pointer-events-none will-change-transform"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        >
          <source src="/awardvideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating Mute Button */}
  
    </>
  );
}
