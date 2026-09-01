import './globals.css'; // <-- OBLIGATORIO
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-secondary-custom antialiased relative">
        <Navbar />
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
        <footer className="py-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
          <p>© 2026 Nutrición Dani Luque. Todos los derechos reservados.</p>
        </footer>
        <SocialBar />
      </body>
    </html>
  );
}