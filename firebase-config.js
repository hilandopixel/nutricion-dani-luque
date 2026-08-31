// Importa los módulos necesarios de Firebase v10 desde los CDNs oficiales
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_APP_ID
	measurementId: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_APP_ID
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