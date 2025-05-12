'use client'; // Agrega esta línea para que Next.js lo considere un Client Component.

const WhatsAppButton = () => {
    const phoneNumber = '573103216174'; // Reemplaza con tu número de WhatsApp
    const message = '¡Hola! Estoy interesado en más información'; // Mensaje que aparecerá al hacer clic en el botón
  
    const handleClick = () => {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank'); // Abre WhatsApp en una nueva ventana
    };
  
    return (
      <button 
        onClick={handleClick} 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50%',
          padding: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <i className="fab fa-whatsapp"></i> {/* Puedes usar un ícono de WhatsApp */}
      </button>
    );
  };

export default WhatsAppButton;
// Este componente crea un botón que, al hacer clic, abre una conversación de WhatsApp con un número específico. Puedes cambiar el número de teléfono en la URL "https://wa.me/5491123456789" por el número que desees utilizar.