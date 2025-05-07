import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A295C] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Prestige Properties</h3>
          <p className="text-sm text-gray-300">
            Conectamos personas con su hogar ideal. Experiencia, confianza y compromiso.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#inicio" className="hover:underline">Inicio</a></li>
            <li><a href="#propiedades" className="hover:underline">Propiedades</a></li>
            <li><a href="#nosotros" className="hover:underline">Nosotros</a></li>
            <li><a href="#contacto" className="hover:underline">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto y redes */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Contacto</h4>
          <p className="flex items-center justify-center md:justify-start text-sm text-gray-300 mb-2">
            <Mail className="w-4 h-4 mr-2" /> contacto@prestigeprop.com
          </p>
          <p className="flex items-center justify-center md:justify-start text-sm text-gray-300 mb-4">
            <Phone className="w-4 h-4 mr-2" /> +57 310 321 6174
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Créditos */}
      <div className="text-center mt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} Prestige Properties. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
