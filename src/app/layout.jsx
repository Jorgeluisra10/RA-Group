import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";
import FindHome from "@/components/FindHome";
import Comments from "@/components/Comments";
import CarCard from "@/components/CarCard";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <FindHome />
        <CarCard/>
        <main className="flex-1">{children}</main>
        <Comments/>
        <Footer />
      </body>
    </html>
  );
}
