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
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingPost) setSlug(generateSlug(val));
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
      setMessage('Artículo actualizado correctamente.');
    } else {
      await handleCreatePost(formData);
      setMessage('Artículo publicado con éxito en Firebase.');
    }

    resetForm();
    setTimeout(() => setMessage(''), 4000);
  };

  const onDelete = async (id) => {
    if (confirm('¿Eliminar este artículo?')) {
      await handleDeletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      setMessage('Artículo eliminado.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Formulario */}
      <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {editingPost ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
          </h2>
          {editingPost && (
            <button
              onClick={resetForm}
              className="text-xs text-red-600 font-semibold bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
            >
              Cancelar Edición
            </button>
          )}
        </div>

        {message && (
          <div className="p-3 bg-teal-50 text-teal-700 border border-teal-200 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {editingPost && <input type="hidden" name="id" value={editingPost.id} />}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Título</label>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Guía de nutrición real"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Slug (URL amigable)</label>
            <input
              type="text"
              name="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="guia-nutricion-real"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-mono focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Extracto / Resumen</label>
            <textarea
              name="excerpt"
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Resumen corto..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Contenido</label>
            <textarea
              name="content"
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe aquí el contenido completo..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-primary-custom hover:bg-teal-700 text-white font-bold rounded-xl transition shadow-md text-sm"
          >
            {editingPost ? 'Guardar Cambios' : 'Guardar y Publicar Artículo'}
          </button>
        </form>
      </div>

      {/* Lista de artículos */}
      <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 h-fit">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Artículos Guardados</h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center gap-2"
            >
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-800 truncate">{post.title}</h4>
                <span className="text-[10px] text-primary-custom font-mono">/blog/{post.slug}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => startEdit(post)}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-primary-custom hover:bg-teal-100 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}