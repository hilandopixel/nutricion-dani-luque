// app/blog/page.jsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/postsService';
import { Calendar, ArrowRight } from 'lucide-react';

// Forzar a Next.js y Vercel a obtener datos frescos de Firebase en cada visita
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Todas las Entradas | Blog',
};

export default async function BlogPage() {
  let posts = [];
  let errorMsg = null;

  try {
	  console.log('s')
    posts = await getAllPosts();
  } catch (err) {
    console.error('Error al obtener posts desde Firebase:', err);
    errorMsg = err.message || 'Error al conectar con la base de datos.';
  }

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Todas las Entradas</h1>
        <p className="text-slate-600 mt-2">
          Explora la colección completa de artículos de Firebase.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          <p className="font-bold">No se pudieron cargar las entradas:</p>
          <p className="text-sm font-mono mt-1">{errorMsg}</p>
        </div>
      )}

      {!errorMsg && posts.length === 0 && (
        <div className="p-6 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
          <p className="font-semibold">La llamada se realizó correctamente, pero no hay datos.</p>
          <p className="text-sm mt-1">Verifica que tu colección en Firestore se llame exactamente <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">posts</code> y contenga documentos.</p>
        </div>
      )}

      {posts.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition"
            >
              <div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.createdAt || 'Sin fecha'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-indigo-600 transition">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 gap-1 mt-auto"
              >
                Leer más
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}