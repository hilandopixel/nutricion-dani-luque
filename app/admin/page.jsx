import { getAllPosts } from '@/lib/postsService';
import AdminPostManager from '@/components/AdminPostManager';

export const metadata = {
  title: 'Panel Admin | Gestor de Entradas',
};

export default async function AdminPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Gestión de Entradas del Blog</h1>
        <p className="text-sm text-slate-600 mt-1">
          Crea, edita o elimina artículos. Al guardar, el slug se utilizará para la ruta HTML estática.
        </p>
      </div>

      <AdminPostManager initialPosts={posts} />
    </div>
  );
}
