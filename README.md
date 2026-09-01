# Mi Blog Estático con Admin (Next.js + Tailwind CSS)

Este proyecto está preparado para desplegarse fácilmente en **Vercel**.

## Características
- **Vista Pública**:
  - `page.jsx` (Inicio): Secciones "Sobre mí", "Objetivos", Carrusel con las últimas 10 entradas y botón hacia todas las entradas.
  - `blog/page.jsx` (`/blog.html` o `/blog`): Catálogo completo de entradas del blog.
  - `blog/[slug]/page.jsx`: Detalle estático de cada entrada usando el campo `slug`.
- **Panel Admin Protegido**:
  - `admin/page.jsx`: Gestión CRUD (Crear, Editar, Eliminar entradas) con campo de Slug automático.
  - Acceso restringido únicamente para usuarios con rol `ADMIN`.

## Instalación Local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en tu navegador.
