import Link from 'next/link';
import Carousel from '@/components/Carousel';
import { getLatestPosts } from '@/lib/postsService';
import { User, Target, BookOpen, ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const latestPosts = await getLatestPosts(10);

  return (
    <div className="space-y-16 py-4">
      {/* Sección Sobre Mí */}
      <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full">
          <User className="w-12 h-12" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900">Sobre Mí</h1>
          <p className="text-slate-600 leading-relaxed max-w-2xl">
            ¡Hola! Bienvenido a mi blog personal. Soy desarrollador y apasionado de la tecnología.
            En este espacio comparto guías, proyectos personales, aprendizajes y recursos útiles para la comunidad.
          </p>
        </div>
      </section>

      {/* Sección Objetivos */}
      <section className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-2xl p-8 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-indigo-400" />
          <h2 className="text-2xl font-bold">Mis Objetivos</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-5 rounded-xl border border-white/10">
            <h3 className="font-semibold text-indigo-300 mb-2">1. Compartir Conocimiento</h3>
            <p className="text-sm text-slate-300">Publicar artículos claros sobre desarrollo web, arquitectura y hosting estático.</p>
          </div>
          <div className="bg-white/10 p-5 rounded-xl border border-white/10">
            <h3 className="font-semibold text-indigo-300 mb-2">2. Documentar Proyectos</h3>
            <p className="text-sm text-slate-300">Servir como bitácora pública de mis avances y aprendizajes constantes.</p>
          </div>
          <div className="bg-white/10 p-5 rounded-xl border border-white/10">
            <h3 className="font-semibold text-indigo-300 mb-2">3. Conectar e Impactar</h3>
            <p className="text-sm text-slate-300">Crear una comunidad activa mediante contenido útil y feedback abierto.</p>
          </div>
        </div>
      </section>

      {/* Sección Blog (Carrusel de Últimas 10 Entradas) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-900">Últimas Entradas</h2>
            </div>
            <p className="text-sm text-slate-500">Explora las publicaciones más recientes</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            Ver todas las entradas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Carousel posts={latestPosts} />
      </section>
    </div>
  );
}
