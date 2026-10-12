"use client";

import { useEffect, useState, useRef } from "react";
import { useLightBackground } from "./performance/useLightBackground";
import { useReducedMotion } from "framer-motion";



export default function BackgroundVideo() {
  const [scale, setScale] = useState(1.06);
  const [isMuted, setIsMuted] = useState(true);
  const isOnLight = useLightBackground("mute-btn");
  const reducedMotion = useReducedMotion();
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
          autoPlay={!reducedMotion}
          preload="none"
          poster="/homesthumb.webp"
          loop
          muted={isMuted}
          playsInline
        >
          <source src="/optimized/awardvideo.486051c079.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating Mute Button */}

    </>
  );
}
