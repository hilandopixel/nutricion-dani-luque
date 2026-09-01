const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

exports.servirPost = onRequest(
{
   maxInstances: 1,       // Evita picos bruscos de consumo si hay un ataque de tráfico
   memory: "256MiB",      // Asigna el consumo mínimo de RAM para mantenerse dentro del crédito gratuito}
  }
  async (req, res) => {
    // Obtener el slug desde la URL (/posts/mi-slug -> mi-slug)
    const pathParts = req.path.split("/").filter(Boolean);
    const slug = pathParts[pathParts.length - 1];

    if (!slug) {
      res.status(404).send("Artículo no encontrado");
      return;
    }

    try {
      // Buscar el documento por su ID/slug
      const docRef = db.collection("posts").doc(slug);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        res.status(404).send("<h1>404 - Artículo no encontrado</h1>");
        return;
      }

      const data = docSnap.data();
      const fecha = data.fecha
        ? new Date(data.fecha.seconds * 1000).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";

      const imageTag = data.imagen
        ? `<img src="${data.imagen}" alt="${data.titulo}" class="w-full max-h-[500px] object-cover rounded-3xl shadow-xl">`
        : "";
	
const metaDescription = data.metaDesc || data.extracto || "Artículo de nutrición real.";
const tagsList = Array.isArray(data.tags) ? data.tags.join(", ") : "";
const postUrl = `https://nutricion-dani-luque.web.app/posts/${slug}`;
const imageUrl = data.imagen || "https://nutricion-dani-luque.web.app/default-og.jpg";

const htmlContent = `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
    <!-- Configuración Básica -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.titulo} | Nutrición Dani Luque</title>
    
    <!-- Meta Tags Estándar (SEO & GEO) -->
    <meta name="description" content="${metaDescription}">
    <meta name="keywords" content="${tagsList}">
    <meta name="author" content="Dani Luque">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${postUrl}">

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Nutrición Real">
    <meta property="og:title" content="${data.titulo}">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:url" content="${postUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="article:published_time" content="${fecha}">
    <meta property="article:section" content="Salud">

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.titulo}">
    <meta name="twitter:description" content="${metaDescription}">
    <meta name="twitter:image" content="${imageUrl}">

    <!-- CSS & Tailwind -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body class="min-h-screen text-slate-800 flex flex-col justify-between">
    <main class="max-w-4xl mx-auto px-6 py-28 w-full flex-grow">
        <article class="space-y-8">
            <div class="space-y-4 text-center">
                <span class="text-xs font-bold uppercase text-teal-600">${fecha}</span>
                <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">${data.titulo}</h1>
            </div>
            ${imageTag}
            <div class="p-8 space-y-6 text-slate-700 leading-relaxed text-lg whitespace-pre-line">${data.contenido || data.extracto || ""}</div>
        </article>
    </main>
	    <script type="module">
        import { initHeader } from "/firebase-config.js";
		initHeader();
		</script>
</body>
</html>`;

      // Añadir cabeceras de caché para alto rendimiento
      res.set("Cache-Control", "public, max-age=600, s-maxage=600");
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error("Error al servir el post:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
);