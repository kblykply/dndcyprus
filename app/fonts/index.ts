import localFont from "next/font/local";

// Both language roots share one font instance and its generated stylesheet.
export const inter = localFont({ src: "./inter-latin.woff2", weight: "100 900", variable: "--font-sans-core", display: "optional" });
export const montserrat = localFont({ src: "./montserrat-latin.woff2", weight: "300 500", variable: "--font-display-core", display: "optional" });
