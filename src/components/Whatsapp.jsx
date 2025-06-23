'use client';

import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactButton = () => {
  const phoneNumber = '573103216174';
  const message = '¡Hola! Estoy interesado en más información sobre la propiedad';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px #1A295C' }}
      className="fixed bottom-6 right-6 z-[9999] bg-[var(--footerbackground)] text-white px-5 py-3 rounded-full flex items-center gap-2 font-semibold shadow-xl transition-all"
    >
      <MessageSquare className="w-5 h-5" />
      <span className="hidden sm:inline">Contáctanos</span>
    </motion.button>
  );
};

export default ContactButton;
