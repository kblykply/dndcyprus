// app/components/QuarterLogoBadge.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

type QuarterLogoBadgeProps = {
  /** Logo image path or URL */
  logoSrc: string;
  /** Alt text for the logo */
  alt?: string;
  /** Optional link when the badge is clicked */
  href?: string;
  /** Quarter radius in px (visible “arc” size). Defaults to 160 */
  size?: number;
  /** Extra classes for fine-tuning z-index or responsiveness */
  className?: string;
  /** Hide on small screens */
  hideOnMobile?: boolean;
};

export default function QuarterLogoBadge({
  logoSrc,
  alt = "Project logo",
  href,
  size = 160,
  className = "",
  hideOnMobile = false,
}: QuarterLogoBadgeProps) {
  // Derived sizes
  const circleSize = size * 2; // full circle diameter to reveal a quarter
  const logoBox = Math.round(size * 0.58); // area we give to the logo inside the quarter
  const logoPadding = Math.max(10, Math.round(size * 0.08)); // breathing room

  // Shared style/class for the clickable area (div or Link)
  const clickableClass = "absolute bottom-0 left-0";
  const clickableStyle: React.CSSProperties = {
    paddingLeft: logoPadding,
    paddingBottom: logoPadding,
    width: logoBox + logoPadding * 2,
    height: logoBox + logoPadding * 2,
    pointerEvents: "auto",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  };

  return (
    <div
      className={[
        "fixed bottom-0 left-0 z-50",
        hideOnMobile ? "hidden md:block" : "",
        className,
      ].join(" ")}
      style={{
        width: size,
        height: size,
        // Respect safe-area on iOS
        bottom: "max(0px, env(safe-area-inset-bottom))",
        left: "max(0px, env(safe-area-inset-left))",
        pointerEvents: "none", // allow clicks only on the inner element
      }}
      aria-hidden={!href}
    >
      {/* Quarter shape (white) */}
      <div
        className="absolute bottom-0 left-0 rounded-full bg-white shadow-xl border border-black/5"
        style={{
          width: circleSize,
          height: circleSize,
          transform: "translate(-50%, 50%)",
        }}
      />

      {/* Clickable logo area */}
      {href ? (
        <Link
          href={href}
          aria-label={alt}
          className={clickableClass}
          style={clickableStyle}
        >
          <div
            className="relative"
            style={{
              width: logoBox,
              height: logoBox,
              transition: "transform 180ms ease",
            }}
          >
            <span className="sr-only">{alt || "Open project"}</span>
            <Image
              src={logoSrc}
              alt={alt}
              fill
              priority={false}
              sizes={`${logoBox}px`}
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      ) : (
        <div
          aria-label={alt}
          className={clickableClass}
          style={clickableStyle}
        >
          <div
            className="relative"
            style={{ width: logoBox, height: logoBox }}
          >
            <Image
              src={logoSrc}
              alt={alt}
              fill
              priority={false}
              sizes={`${logoBox}px`}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
