import path from "node:path";

const config = {
  // viewport-zoom: büyük ekran ölçeğinde vw/vh birimlerini dengeler (postcss-viewport-zoom.cjs).
  // Turbopack eklenti adını kendi derleme klasöründen çözdüğü için proje kökünden tam yol verilir.
  plugins: ["@tailwindcss/postcss", path.join(process.cwd(), "postcss-viewport-zoom.cjs")],
};

export default config;
