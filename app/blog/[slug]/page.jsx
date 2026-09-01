import { getPostBySlug } from '@/lib/postsStore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Entrada no encontrada' };
  return { title: `${post.title} | Blog` };
}

export default async function PostDetailPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-6 space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a todas las entradas
      </Link>

      <header className="space-y-4 border-b border-slate-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-mono">
            Slug: {post.slug}
          </span>
        </div>
      </header>

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        {post.content.split('

').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
