import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

// Verificación de seguridad para depurar en local
if (!projectId || !clientEmail || !privateKey) {
  console.error("❌ Faltan variables de entorno para Firebase Admin.");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: projectId,
      clientEmail: clientEmail,
      privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') : undefined,
    })
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  // Vercel extrae automáticamente el parámetro de la ruta [slug]
  const { slug } = req.query;

  if (!slug) {
    return res.status(404).send("Artículo no encontrado");
  }

  try {
    const docRef = db.collection("posts").doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).send("<h1>404 - Artículo no encontrado</h1>");
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
    const postUrl = `https://${req.headers.host}/posts/${slug}`;
    const imageUrl = data.imagen || `https://${req.headers.host}/default-og.jpg`;

    const htmlContent = `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.titulo} | Nutrición Dani Luque</title>
    
    <meta name="description" content="${metaDescription}">
    <meta name="keywords" content="${tagsList}">
    <meta name="author" content="Dani Luque">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${postUrl}">

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Nutrición Real">
    <meta property="og:title" content="${data.titulo}">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:url" content="${postUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="article:published_time" content="${fecha}">
    <meta property="article:section" content="Salud">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.titulo}">
    <meta name="twitter:description" content="${metaDescription}">
    <meta name="twitter:image" content="${imageUrl}">

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

    res.setHeader("Cache-Control", "public, max-age=600, s-maxage=600");
    return res.status(200).send(htmlContent);
  } catch (error) {
    console.error("Error al servir el post:", error);
    return res.status(500).send("Error interno del servidor");
  }
}