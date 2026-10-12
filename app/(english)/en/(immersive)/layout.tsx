// app/en/(immersive)/layout.tsx
import type { ReactNode } from "react";

export default function ImmersiveLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {children}
    </main>
  );
}