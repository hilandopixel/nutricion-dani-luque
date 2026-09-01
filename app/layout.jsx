import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Mi Blog Personal',
  description: 'Blog estático personal creado con Next.js y Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </div>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Mi Blog Personal. Desplegado en Vercel.
        </footer>
      </body>
    </html>
  );
}
