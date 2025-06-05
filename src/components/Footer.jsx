import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

// Asegúrate de cargar esta fuente en tu CSS global o index.html:
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');

const Footer = () => {
  return (
    <footer className="bg-[#1A295C] text-white py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left items-start">

        {/* Branding con logo ajustado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start space-y-4"
        >
          {/* Logo con nuevo color */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-7 h-7 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2L2 7v11h6v-5h4v5h6V7l-8-5z" />
            </svg>
            <div className="text-2xl font-bold">
              <span className="text-white">INMOVA</span>
              <span className=" text-yellow-400"> •</span>
            </div>
          </div>

          {/* Frase institucional con fuente especial */}
          <p className="text-sm text-gray-300 italic max-w-xs text-center md:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Hecho en Colombia para colombianos que sueñan en grande"
          </p>

        </motion.div>

        {/* Navegación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h4 className="font-semibold text-lg mb-3 text-yellow-400">Navegación</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#inicio" className="hover:underline hover:text-white transition">Inicio</a></li>
            <li><a href="#propiedades" className="hover:underline hover:text-white transition">Propiedades</a></li>
            <li><a href="#nosotros" className="hover:underline hover:text-white transition">Nosotros</a></li>
            <li><a href="#contacto" className="hover:underline hover:text-white transition">Contacto</a></li>
          </ul>
        </motion.div>

        {/* Contacto y redes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className="font-semibold text-lg mb-3 text-yellow-400">Contacto</h4>
          <p className="flex items-center justify-center md:justify-start text-sm text-gray-300 mb-2">
            <Mail className="w-4 h-4 mr-2" /> contacto@ragroup.com
          </p>
          <p className="flex items-center justify-center md:justify-start text-sm text-gray-300 mb-4">
            <Phone className="w-4 h-4 mr-2" /> +57 310 321 6174
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Créditos y desarrollador */}
      <div className="text-center mt-10 text-xs text-gray-400 space-y-1">
        <p>© {new Date().getFullYear()} Inmova. Todos los derechos reservados.</p>
        <p className="text-[11px] text-gray-500 italic">
          Sitio desarrollado por Jorge Luis Rodríguez Ávila • Desarrollador Web
        </p>
      </div>
    </footer>
  );
};

export default Footer;
