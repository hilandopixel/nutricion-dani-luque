import { getPostBySlug } from '@/lib/postsService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Entrada no encontrada' };
  
  const content = post.es || post;
  return { title: `${content.title || content.titulo || 'Artículo'} | Nutrición Dani Luque` };
}

export default async function PostDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = post.es || post;
  const title = content.title || content.titulo || '';
  const bodyText = content.content || content.contenido || '';
  const dateStr = post.createdAt || '';

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-custom transition font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a todas las entradas
      </Link>

      <header className="space-y-4 border-b border-slate-200 pb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-secondary-custom leading-tight">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary-custom" />
            {dateStr}
          </span>
          <span className="bg-teal-50 text-primary-custom px-2.5 py-1 rounded-md font-mono text-[10px] font-bold">
            /blog/{slug}
          </span>
        </div>
      </header>

      {post.imagen && (
        <img
          src={post.imagen}
          alt={title}
          className="w-full h-80 object-cover rounded-2xl shadow-sm border border-slate-100"
        />
      )}

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 font-light text-base">
        {bodyText.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}