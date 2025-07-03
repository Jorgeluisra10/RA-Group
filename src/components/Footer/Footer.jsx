"use client";
import { useEffect, useState, useRef } from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  const frase1 = '"Hecho en Colombia para Colombianos';
  const frase2 = 'que sueñan en grande"';
  const totalLength = frase1.length + frase2.length + 1;

  const [visibleLetters, setVisibleLetters] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const fraseRef = useRef(null);
  const isInView = useInView(fraseRef, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const interval = setInterval(() => {
        setVisibleLetters((prev) => {
          if (prev < totalLength) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 45);
    }
  }, [isInView, hasAnimated]);

  return (
    <footer
      className="relative py-14 px-6 overflow-hidden"
      style={{
        backgroundColor: "var(--footerbackground)",
        color: "var(--text-default)",
      }}
    >
      {/* Degradado superior */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-white to-[var(--footerbackground)] pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left items-start">
        {/* BRANDING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start space-y-4"
        >
          <Logo />

          {/* Frase animada */}
          <div
            ref={fraseRef}
            className="flex flex-col items-center mt-2 space-y-1"
          >
            <p
              className="text-sm italic text-center leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "white",
                whiteSpace: "pre-wrap",
                letterSpacing: "0.5px",
              }}
            >
              {frase1.split("").map((char, i) => (
                <motion.span
                  key={`f1-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: i < visibleLetters ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: i * 0.03,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </p>
            <p
              className="text-sm italic text-center leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "white",
                whiteSpace: "pre-wrap",
                letterSpacing: "0.5px",
              }}
            >
              {frase2.split("").map((char, i) => {
                const index = i + frase1.length + 1;
                return (
                  <motion.span
                    key={`f2-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: index < visibleLetters ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.03,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </p>
          </div>
        </motion.div>

        {/* NAVEGACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h4
            className="font-semibold text-lg mb-3"
            style={{ color: "var(--text-active)" }}
          >
            Navegación
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "white" }}>
            {[
              { href: "/", label: "Inicio" },
              { href: "/propiedades", label: "Propiedades" },
              { href: "/vehiculos", label: "Vehículos" },
              { href: "/vender", label: "Quiero Vender" },
              { href: "/agentes", label: "Soy Agente" },
              { href: "/sobre-nosotros", label: "Sobre nosotros" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:underline hover:text-white transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACTO & REDES SOCIALES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4
            className="font-semibold text-lg mb-3"
            style={{ color: "var(--text-active)" }}
          >
            Contacto
          </h4>
          <p
            className="flex items-center justify-center md:justify-start text-sm mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <Mail className="w-4 h-4 mr-2" />
            contacto@ragroup.com
          </p>
          <p
            className="flex items-center justify-center md:justify-start text-sm mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            <Phone className="w-4 h-4 mr-2" />
            +57 310 321 6174
          </p>
          <div className="flex text-white justify-center md:justify-start space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-400 transition duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-400 transition duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-300 transition duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* CRÉDITOS FINALES */}
      <div className="text-center mt-10 text-xs space-y-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-wrap justify-center space-x-4">
              <Link
                href="/T&C"
                className="hover:underline"
                style={{ color: "var(--text-secondary)" }}
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/privacidad"
                className="hover:underline"
                style={{ color: "var(--text-secondary)" }}
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
        <div
          className="text-[11px] italic space-y-1"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            © {new Date().getFullYear()} Inmova. Todos los derechos reservados.
          </p>
          <p>
            Sitio desarrollado por Jorge Luis Rodríguez Ávila • Desarrollador
            Web
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
