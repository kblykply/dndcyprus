"use client";

import { m, type HTMLMotionProps } from "framer-motion";

// Server-render text/images; keep only the existing motion behavior in the client.
export function MotionDiv(props: HTMLMotionProps<"div">) { return <m.div {...props} />; }
export function MotionSpan(props: HTMLMotionProps<"span">) { return <m.span {...props} />; }
export function MotionH2(props: HTMLMotionProps<"h2">) { return <m.h2 {...props} />; }
export function MotionP(props: HTMLMotionProps<"p">) { return <m.p {...props} />; }
export function MotionUl(props: HTMLMotionProps<"ul">) { return <m.ul {...props} />; }
export function MotionLi(props: HTMLMotionProps<"li">) { return <m.li {...props} />; }
