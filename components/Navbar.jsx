'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 text-slate-800 backdrop-blur-md shadow-xs w-full border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center font-extrabold text-xl text-secondary-custom">
          Nutrición <span className="text-primary-custom ml-1">Dani Luque</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#sobre-mi" className="hover:text-primary-custom transition">Sobre Mí</Link>
          <Link href="/#nutricion" className="hover:text-primary-custom transition">Nutrición</Link>
          <Link href="/#dietas" className="hover:text-primary-custom transition">Dietas</Link>
          <Link href="/blog" className="hover:text-primary-custom transition">Blog</Link>
          
          <div className="flex items-center pl-4 border-l border-slate-200">
            <Link
              href="/admin"
              className="text-xs font-bold bg-teal-50 text-primary-custom px-3 py-1.5 rounded-xl border border-teal-200 hover:bg-teal-100 transition"
            >
              Panel Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}