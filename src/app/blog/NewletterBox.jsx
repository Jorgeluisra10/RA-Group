'use client';

import { motion } from 'framer-motion';

const NewsletterBox = () => {
  return (
    <motion.section
      className="w-full max-w-5xl mx-auto px-4 py-12 animate-fade-in-up"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[var(--blue-main)] dark:bg-[var(--blue-hover)] rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg transition-all">
        <div>
          <h2 className="text-white text-lg md:text-xl font-extrabold mb-1">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="text-gray-300 text-sm">
            Recibe los mejores artículos y consejos directamente en tu bandeja de entrada. <br className="hidden md:block" />
            Prometemos no enviarte spam.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="px-4 py-2 rounded-md w-full sm:w-64 text-sm text-[var(--text-default)] bg-white dark:bg-[var(--white)] border border-[var(--gray-border)] outline-none focus:ring-2 focus:ring-[var(--btn-primary)] transition-all"
          />
          <button
            type="submit"
            className="relative px-5 py-2 rounded-md text-sm font-semibold text-black bg-[var(--btn-primary)] hover:brightness-110 transition-all overflow-hidden btn-shine"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default NewsletterBox;
