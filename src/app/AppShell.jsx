"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "../components/Footer/Footer";
import GlobalLoader from "../components/GlobalLoader";
import Navbar from "../components/Navbar/Navbar";
import WhatsAppButton from "../components/Whatsapp";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";
// import AuthGate from "../components/AuthGate";
import DevNotice from "../components/DevNotice";

export default function AppShell({ children }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 🔒 Evita render hasta montaje completo del cliente

  const isAuthPage =
    pathname === "/login" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/agente");

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        {/* <AuthGate> */}
        <Toaster position="top-center" reverseOrder={false} />
        <div
          className="flex flex-col min-h-screen"
          style={{ backgroundColor: "var(--background)" }}
        >
          {!isAuthPage && <DevNotice />}
          {!isAuthPage && <Navbar />}
          <main className="flex-grow">{children}</main>
          {!isAuthPage && <Footer />}
          {!isAuthPage && <WhatsAppButton />}
        </div>
        <GlobalLoader />
        {/* </AuthGate> */}
      </AuthProvider>
    </ThemeProvider>
  );
}
