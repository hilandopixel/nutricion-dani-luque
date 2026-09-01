'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push('/admin');
  } catch (err) {
    console.error('Error completo de Firebase Auth:', err.code);
    
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      setError('El correo electrónico o la contraseña son incorrectos.');
    } else if (err.code === 'auth/too-many-requests') {
      setError('Demasiados intentos fallidos. Inténtalo de nuevo más tarde.');
    } else {
      setError('Error al iniciar sesión. Revisa la consola para más detalles.');
    }
  }
};

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mx-auto mb-4">
        <Lock className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold text-center text-slate-900 mb-6">Acceso Administración</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}