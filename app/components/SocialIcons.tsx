"use client";

import { useLightBackground } from "./performance/useLightBackground";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";


export default function SocialIcons() {
  const isOnLight = useLightBackground("social-icons");

  return (
    <div
      id="social-icons"
      // md altı ekranlarda gizli: başlıkların üstüne binmesin
      className="hidden md:block fixed left-3 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
    >
      <div
        className={[
          "pointer-events-auto flex flex-col items-center gap-5 text-lg px-3 py-6 rounded-full shadow-lg border transition-colors duration-300",
          // Dark glass when on light background, white glass elsewhere
          isOnLight
            ? "text-white bg-black/55 border-black/30"
            : "text-white bg-white/15 border-white/25 backdrop-blur-md",
          // make it thin & elegant
          "w-12"
        ].join(" ")}
      >
        <a
          href="https://www.facebook.com/dndcyprus/?locale=tr_TR"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.instagram.com/dndcyprus/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://cy.linkedin.com/company/dndcyprus"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
}
