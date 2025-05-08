'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FindHome from '../components/FindHome';
import Comments from '../components/Comments';
import CarCard from '../components/CarCard';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isPropertyDetail = pathname.startsWith('/propiedad/');
  const isCarDetail = pathname.startsWith('/carro/');
  const isAdmin = pathname.startsWith('/admin');

  const shouldHideExtras = isPropertyDetail || isCarDetail || isAdmin;

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        {!isAdmin && <Navbar />}
        {!shouldHideExtras && <FindHome />}
        {!shouldHideExtras && <CarCard />}
        <main className="flex-1">{children}</main>
        {!shouldHideExtras && <Comments />}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
