'use client';

import { useState } from 'react';
import { handleCreatePost, handleUpdatePost, handleDeletePost } from '@/app/actions';
import { Plus, Edit2, Trash2, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function AdminPostManager({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingPost) {
      setSlug(generateSlug(val));
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (editingPost) {
      await handleUpdatePost(formData);
      setMessage('Entrada actualizada con éxito.');
    } else {
      await handleCreatePost(formData);
      setMessage('Entrada creada con éxito y archivo estático listo para Vercel.');
    }

    resetForm();
    setTimeout(() => setMessage(''), 4000);
  };

  const onDelete = async (id) => {
    if (confirm('¿Seguro que deseas eliminar esta entrada?')) {
      await handleDeletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      setMessage('Entrada eliminada.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Formulario Crear / Editar */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          {editingPost ? <Edit2 className="w-5 h-5 text-indigo-600" /> : <Plus className="w-5 h-5 text-indigo-600" />}
          {editingPost ? 'Editar Entrada' : 'Crear Nueva Entrada'}
        </h3>

        {message && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {editingPost && <input type="hidden" name="id" value={editingPost.id} />}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Ej. Novedades de Next.js 14"
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              Slug (Identificador de URL)
            </label>
            <input
              type="text"
              name="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="novedades-de-nextjs-14"
              className="w-full border border-slate-300 bg-slate-50 font-mono text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">Generará la ruta estática `/blog/{slug || 'mi-slug'}`</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Resumen (Excerpt)</label>
            <textarea
              name="excerpt"
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Pequeño extracto para el carrusel e inicio"
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Contenido</label>
            <textarea
              name="content"
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe aquí el texto completo del artículo..."
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition"
            >
              {editingPost ? 'Guardar Cambios' : 'Publicar Entrada'}
            </button>
            {editingPost && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-100 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-200 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de entradas para administrar */}
      <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Entradas Publicadas ({posts.length})</h3>
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border border-slate-200 rounded-xl flex items-center justify-between gap-4 hover:border-slate-300 transition"
            >
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-sm truncate">{post.title}</h4>
                <p className="text-xs font-mono text-slate-400 truncate">/blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(post)}
                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
