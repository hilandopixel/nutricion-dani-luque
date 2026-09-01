'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function Carousel({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!posts || posts.length === 0) {
    return <p className="text-slate-500 italic">No hay entradas aún.</p>;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
          Entrada {currentIndex + 1} de {posts.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition text-slate-700"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition text-slate-700"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="min-h-[180px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{posts[currentIndex].date}</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 hover:text-indigo-600 transition">
            <Link href={`/blog/${posts[currentIndex].slug}`}>
              {posts[currentIndex].title}
            </Link>
          </h3>
          <p className="text-slate-600 line-clamp-2">
            {posts[currentIndex].excerpt}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={`/blog/${posts[currentIndex].slug}`}
            className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-700 text-sm gap-1"
          >
            Leer entrada completa →
          </Link>
        </div>
      </div>
    </div>
  );
}
