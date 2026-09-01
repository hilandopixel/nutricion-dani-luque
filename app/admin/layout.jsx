'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { ShieldCheck, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Si no hay sesión y no estamos en /admin/login, redirigir
      if (!currentUser && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  // Permitir renderizar la vista de login libremente
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Verificando sesión con Firebase...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 py-4">
      <div className="bg-indigo-900 text-white p-4 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-300" />
          <div>
            <h2 className="font-bold text-sm">Panel de Administración</h2>
            <p className="text-xs text-indigo-200">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-1 text-xs bg-indigo-800 hover:bg-indigo-700 text-indigo-200 border border-indigo-700 px-3 py-1.5 rounded-lg transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar Sesión
        </button>
      </div>
      {children}
    </div>
  );
}