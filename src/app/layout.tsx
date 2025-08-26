import "@/styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Dashboard de Procesos - Scotiabank",
  description: "Sistema de monitoreo de procesos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
