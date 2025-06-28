"use client";

import { usePathname } from "next/navigation";
import Footer from "../components/Footer/Footer";
import GlobalLoader from "../components/GlobalLoader";
import { UserProvider } from "../context/UserProvider";
import Navbar from "../components/Navbar/Navbar";
import WhatsAppButton from "../components/Whatsapp";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import DevNotice from "../components/DevNotice";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname.startsWith("/admin") || pathname.startsWith("/agente");

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <UserProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {!isAuthPage && <DevNotice />}
        {!isAuthPage && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isAuthPage && <Footer />}
        {!isAuthPage && <WhatsAppButton />}
        <GlobalLoader />
      </UserProvider>
    </ThemeProvider>
  );
}
