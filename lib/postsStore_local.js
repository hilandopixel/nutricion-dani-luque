// Base de datos local en memoria (sustituible por Supabase, Firebase, Postgres, etc.)
let posts = [
  {
    id: '1',
    title: 'Mi primer artículo en el blog',
    slug: 'mi-primer-articulo',
    excerpt: 'Descubre cómo he iniciado este proyecto y las metas que quiero alcanzar.',
    content: 'Este es el contenido completo del primer artículo. Aquí puedes compartir reflexiones, experiencias y aprendizajes técnicos de manera detallada.',
    date: '2026-08-15',
    author: 'Admin'
  },
  {
    id: '2',
    title: 'Guía de inicio con Next.js y Tailwind CSS',
    slug: 'guia-nextjs-tailwindcss',
    excerpt: 'Una combinación poderosa para construir aplicaciones web ultra rápidas.',
    content: 'Next.js con el App Router y Tailwind CSS permiten desarrollar interfaces accesibles, responsivas y optimizadas para SEO en tiempo récord.',
    date: '2026-08-20',
    author: 'Admin'
  },
  {
    id: '3',
    title: 'Cómo optimizar tu sitio web para Vercel',
    slug: 'optimizar-sitio-web-vercel',
    excerpt: 'Estrategias de caching, revalidación estática y buenas prácticas de despliegue.',
    content: 'Aprovechar la red de borde (Edge CDN) de Vercel y la regeneración estática incremental (ISR) garantiza tiempos de respuesta mínimos a nivel global.',
    date: '2026-08-28',
    author: 'Admin'
  }
];

export async function getAllPosts() {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getLatestPosts(limit = 10) {
  const all = await getAllPosts();
  return all.slice(0, limit);
}

export async function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export async function createPost(postData) {
  const newPost = {
    id: Date.now().toString(),
    title: postData.title,
    slug: postData.slug,
    excerpt: postData.excerpt,
    content: postData.content,
    date: new Date().toISOString().split('T')[0],
    author: 'Admin'
  };
  posts.unshift(newPost);
  return newPost;
}

export async function updatePost(id, updatedData) {
  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedData };
    return posts[index];
  }
  return null;
}

export async function deletePost(id) {
  posts = posts.filter((p) => p.id !== id);
  return true;
}
