// Importa los módulos necesarios de Firebase v10 desde los CDNs oficiales
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
apiKey: "AIzaSyCmC59Jh22n3H26QU2TMU36cly62Uqcfm4",
  authDomain: "nutricion-dani-luque.firebaseapp.com",
  projectId: "nutricion-dani-luque",
  storageBucket: "nutricion-dani-luque.firebasestorage.app",
  messagingSenderId: "492331999530",
  appId: "1:492331999530:web:f7c8b9faa566583ac33e53",
  measurementId: "G-MVNDH34M6Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function initHeader() {
    try {
        // Intentamos cargar el header.html (usa ruta relativa desde la raíz)
        const response = await fetch('/header.html');
        if (!response.ok) throw new Error('Header no encontrado');
        
        const html = await response.text();
        
        // Insertamos el header al principio del body
        document.body.insertAdjacentHTML('afterbegin', html);

        // Activamos la funcionalidad del botón hamburguesa (el JS debe estar aquí para que encuentre los elementos)
        const btn = document.getElementById('menu-btn');
        const menu = document.getElementById('mobile-menu');
        
        if(btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }
        
    } catch (error) {
        console.error("Error al cargar el header:", error);
        // Intentamos cargarlo desde el mismo nivel por si acaso, aunque la ruta absoluta es mejor
        try {
             const responseLocal = await fetch('header.html');
             if(responseLocal.ok){
                 document.body.insertAdjacentHTML('afterbegin', await responseLocal.text());
                 // (Repetir lógica del botón aquí simplificada para brevedad)
             }
        } catch(e2){{} }
    }
}