// app/layout.jsx (sin "use client")

import AppShell from "./AppShell";
import "./globals.css";

export const metadata = {
  title:
    "Imnoba | Encuentra propiedades y vehículos en Colombia con agentes locales",
  description:
    "Imnoba es una plataforma creada en Chiquinquirá, Boyacá, que conecta a usuarios con agentes inmobiliarios independientes. Encuentra propiedades y vehículos fácil, rápido y con confianza.",
  metadataBase: new URL("https://imnoba.com"),
  keywords: [
    "propiedades en Colombia",
    "casas en venta",
    "Chiquinquirá",
    "Tunja",
    "carros usados",
    "finca raíz",
    "Boyacá",
    "agentes inmobiliarios independientes",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Imnoba | Propiedades y vehículos en Colombia",
    description:
      "Conectamos personas con agentes inmobiliarios locales en Colombia.",
    url: "https://imnoba.com",
    siteName: "Imnoba",
    images: [
      {
        url: "https://imnoba.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Vista previa de Imnoba",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imnoba Colombia",
    description:
      "Encuentra propiedades y vehículos en Colombia con agentes de confianza.",
    images: ["https://imnoba.com/og-default.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="images/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
