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
  const logoPadding = Math.max(10, Math.round(size * 0.08)); // keep some breathing room

  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

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
        pointerEvents: "none", // allow clicks only on the clickable content we enable below
      }}
      aria-hidden={!href} // decorative if no link
    >
      {/* The quarter shape: a full white circle whose center is at the page corner.
          Only the top-right quadrant is visible inside this bottom-left square. */}
      <div
        className="absolute bottom-0 left-0 rounded-full bg-white shadow-xl border border-black/5"
        style={{
          width: circleSize,
          height: circleSize,
          transform: "translate(-50%, 50%)",
        }}
      />

      {/* Clickable logo sits inside the visible quarter area */}
      <Wrapper
        {...wrapperProps}
        className="absolute bottom-0 left-0"
        style={{
          // place the logo near the corner, with padding
          paddingLeft: logoPadding,
          paddingBottom: logoPadding,
          width: logoBox + logoPadding * 2,
          height: logoBox + logoPadding * 2,
          pointerEvents: "auto",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
        aria-label={alt}
      >
        <div
          className="relative"
          style={{
            width: logoBox,
            height: logoBox,
            // subtle hover scale if it's a link
            transition: href ? "transform 180ms ease" : undefined,
          }}
        >
          {href && (
            <span className="sr-only">
              {alt || "Open project"}
            </span>
          )}
          <Image
            src={logoSrc}
            alt={alt}
            fill
            priority={false}
            sizes={`${logoBox}px`}
            style={{ objectFit: "contain" }}
          />
        </div>
      </Wrapper>
    </div>
  );
}
