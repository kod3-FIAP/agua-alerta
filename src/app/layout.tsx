import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Alaga Menos - Sistema de Monitoramento de Emergências",
  description:
    "Plataforma inteligente para monitoramento e gerenciamento de emergências hídricas. Visualize em tempo real emissores de alerta, receptores de dados e abrigos de emergência em um mapa interativo para prevenção e resposta rápida a enchentes e alagamentos.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
