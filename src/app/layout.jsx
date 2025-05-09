// app/layout.jsx
"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FindHome from "../components/FindHome";
import Comments from "../components/Comments";
import CarCard from "../components/CarCard";
import { PropertyProvider } from "../context/PropertyContext";

// 🔹 SEO metadata global
// export const metadata = {
//   title: "Inmuebles Premium | Encuentra tu hogar ideal",
//   description: "Compra, vende o alquila propiedades exclusivas con nosotros. Encuentra casas, departamentos y más en las mejores zonas.",
//   keywords: ["inmobiliaria", "propiedades", "comprar casa", "vender inmueble", "alquiler", "departamento", "lujo", "real estate"],
//   authors: [{ name: "Jorge L. Rodríguez", url: "https://tu-sitio.com" }],
//   viewport: "width=device-width, initial-scale=1",
//   robots: "index, follow",
//   openGraph: {
//     title: "Inmuebles Premium | Encuentra tu hogar ideal",
//     description: "Explora nuestra selección de propiedades exclusivas.",
//     url: "https://tu-sitio.com",
//     siteName: "Inmuebles Premium",
//     images: [
//       {
//         url: "https://tu-sitio.com/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Inmuebles Premium - Encuentra tu bien ideal",
//       },
//     ],
//     locale: "es_ES",
//     type: "website",
//   },
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isPropertyDetail = pathname.startsWith("/propiedad/");
  const isCarDetail = pathname.startsWith("/carro/");
  const isAdmin = pathname.startsWith("/admin");

  const shouldHideExtras = isPropertyDetail || isCarDetail || isAdmin;

  return (
    <html lang="es">
      <body className="min-h-screen">
        <PropertyProvider>
          {!isAdmin && <Navbar />}
          {!shouldHideExtras && <FindHome />}
          {!shouldHideExtras && <CarCard />}
          <main className="flex-1">{children}</main>
          {!shouldHideExtras && <Comments />}
          {!isAdmin && <Footer />}
        </PropertyProvider>
      </body>
    </html>
  );
}
