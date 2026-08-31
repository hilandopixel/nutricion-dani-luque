import admin from 'firebase-admin';

// Inicializar Firebase Admin en Vercel
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_NUTRIDANILUQUE_FIREBASE_PROJECT_ID, // Reutiliza el ID del cliente
      clientEmail: process.env.NUTRIDANILUQUE_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NUTRIDANILUQUE_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { slug, lang = 'es' } = req.query;

  if (!slug) {
    return res.status(400).send('Slug no proporcionado.');
  }

  try {
    const docSnap = await db.collection('posts').doc(slug).get();

    if (!docSnap.exists) {
      return res.status(404).send('<h1>404 - Artículo no encontrado</h1>');
    }

    const data = docSnap.data();
    const selectedLang = (lang === 'en' && data.en) ? 'en' : 'es';
    const content = data[selectedLang] || data.es || data;

    const metaDescription = content.metaDesc || content.extracto || 'Artículo de nutrición real.';
    const imageUrl = data.imagen || `https://${req.headers.host}/assets/logo2.png`;
    const canonicalUrl = `https://${req.headers.host}/posts/${slug}`;
    const tagsList = Array.isArray(data.tags) ? data.tags.join(', ') : '';

    const html = `<!DOCTYPE html>
<html lang="${selectedLang}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.titulo} | Nutrición Real</title>
    
    <!-- Meta Tags SEO & GEO -->
    <meta name="description" content="${metaDescription}">
    <meta name="keywords" content="${tagsList}">
    <meta name="author" content="Dani Luque">
    <link rel="canonical" href="${canonicalUrl}">

    <!-- Open Graph / Redes Sociales -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${content.titulo}">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:url" content="${canonicalUrl}">

    <!-- Multiidioma Hreflang -->
    <link rel="alternate" hreflang="es" href="${canonicalUrl}?lang=es" />
    <link rel="alternate" hreflang="en" href="${canonicalUrl}?lang=en" />

    <!-- Tailwind CSS CDN & Estilos -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body class="min-h-screen text-slate-800 bg-slate-50 antialiased flex flex-col justify-between">

    <main class="max-w-4xl mx-auto px-6 py-28 w-full flex-grow">
        <article class="space-y-8">
            <div class="space-y-4 text-center">
                <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">${content.titulo}</h1>
            </div>

            ${data.imagen ? `
                <div class="relative overflow-hidden rounded-3xl shadow-xl border border-slate-100">
                    <img src="${data.imagen}" alt="${content.titulo}" class="w-full max-h-[500px] object-cover">
                </div>
            ` : ''}

            <div class="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
                <div class="prose max-w-none">
                    ${content.contenido || content.extracto || ''}
                </div>
            </div>
        </article>

        <div class="mt-16 pt-8 border-t border-slate-200 text-center">
            <a href="/#blog" class="text-sm font-semibold text-teal-600 hover:underline">
                &larr; Volver al sitio principal
            </a>
        </div>
    </main>

    <footer class="py-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
        <p>&copy; 2026 Nutricionista Dani Luque. Todos los derechos reservados.</p>
    </footer>
</body>
</html>`;

    // Cache Control optimizado para Vercel Edge Network
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(html);

  } catch (error) {
    console.error('Error en Serverless Function SSR:', error);
    return res.status(500).send('Error interno del servidor.');
  }
}
