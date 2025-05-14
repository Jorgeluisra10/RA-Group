import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7KZLJLiBF2xhJlvQ-qnhGBQHDsnXHvrI",
  authDomain: "via-raiz.firebaseapp.com",
  projectId: "via-raiz",
  storageBucket: "via-raiz.appspot.com", // 🔧 corregido: firebasestorage.app → firebase**storage**.googleapis.com
  messagingSenderId: "459518615332",
  appId: "1:459518615332:web:1d7d54b8ebdaf4315f9db1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar autenticación
export const auth = getAuth(app);
