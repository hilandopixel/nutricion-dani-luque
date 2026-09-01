import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition">
          MiBlog<span className="text-indigo-600">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Inicio
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Blog
          </Link>
          <Link 
            href="/admin" 
            className="text-sm font-medium bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
