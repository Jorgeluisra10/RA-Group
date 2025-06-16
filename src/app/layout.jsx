// app/layout.jsx
"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Footer";
import GlobalLoader from "../components/GlobalLoader";
import { UserProvider } from "../context/UserProvider";
import Navbar from "../components/Navbar/Navbar";
import WhatsAppButton from "../components/Whatsapp";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

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
  const isAuthPage = pathname === "/login" || pathname.startsWith("/admin");

  return (
    <html lang="es">
      <body className="min-h-screen">
        <UserProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {/* Navbar y footer solo en páginas públicas */}
          {!isAuthPage && <Navbar />}
          <main className="flex-1">{children}</main>
          {!isAuthPage && <Footer />}
          {!isAuthPage && <WhatsAppButton />}
          <GlobalLoader />
        </UserProvider>
      </body>
    </html>
  );
}
