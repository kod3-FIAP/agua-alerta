import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { QueryProvider } from "~/providers/query-provider";
import { Header } from "~/components/header";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Água Alerta - Sistema de Monitoramento de Emergências",
  description:
    "Plataforma inteligente para monitoramento e gerenciamento de emergências hídricas. Visualize em tempo real emissores de alerta, receptores de dados e abrigos de emergência em um mapa interativo para prevenção e resposta rápida a enchentes e alagamentos.",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable}`}>
      <body>
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
