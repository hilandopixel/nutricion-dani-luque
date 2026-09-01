import Link from 'next/link';
import { getLatestPosts } from '@/lib/postsService';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let posts = [];
  try {
    posts = await getLatestPosts(10);
  } catch (error) {
    console.error('Error al cargar artículos en la portada:', error);
  }

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden -mt-8 -mx-4 sm:-mx-6 lg:-mx-8"
      >
        <div className="absolute inset-0 bg-white/100"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-secondary-custom py-20 space-y-8">
          <img
            src="/assets/logo2.png"
            alt="Nutrición Dani Luque Logo"
            className="mx-auto object-contain"
          />
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-custom text-white border border-white/20 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#317b77] animate-pulse"></span>
            <span></span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Revoluciona tu salud con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
              Nutrición Real en Córdoba.
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            ¿No puedes más con dietas poco eficientes? Soy tu especialista en dietas personalizadas y reeducación alimentaria en el corazón de la Subbética. Recupera tu energía de forma sostenible.
          </p>

<div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
  {/* Botón Consúltame */}
  <a
    href="#contacto"
    className="w-full sm:w-auto px-8 py-4 bg-primary-custom hover:bg-[#266360] text-white font-bold rounded-xl shadow-lg shadow-teal-950/30 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer inline-block"
  >
    Consúltame
  </a>

  {/* Botón Ver Metodología */}
  <a
    href="#sobre-mi"
    className="w-full sm:w-auto px-8 py-4 bg-secondary-custom hover:bg-white/10 text-white font-semibold rounded-xl backdrop-blur-md border border-white/15 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer inline-block"
  >
    Ver Metodología
  </a>
</div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-28 space-y-36 text-secondary-custom">
        {/* SOBRE MÍ */}
        <section
          id="sobre-mi"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-secondary-custom"
        >
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#317b77]/20 to-[#054358]/20 rounded-3xl filter blur-xl"></div>
            <img
              src="/assets/nutricion-real-dani-luque.png"
              alt="Nutricionista titulado atendiendo a paciente en consulta"
              className="relative w-full h-[480px] object-cover rounded-3xl shadow-2xl border border-white/40"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-custom bg-teal-50 px-3 py-1.5 rounded-lg">
              Tu Nutricionista de Confianza
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Creemos hábitos alimenticios reales, adaptados a tu vida diaria.
            </h2>

            <p className="text-slate-600 sm:text-lg leading-relaxed font-light">
              Como nutricionista de referencia en la Subbética Cordobesa, ofrezco un seguimiento cercano y adaptado a tus gustos y horarios. Trabajamos juntos sin restricciones.
            </p>

            <p className="font-semibold text-sm">
              Especialidades: Control de peso, nutrición clínica (digestiva/hormonal) y nutrición deportiva.
            </p>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          className="bg-secondary-custom text-white p-10 sm:p-20 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              ¿Hablamos de tus objetivos?
            </h2>
            <p className="text-slate-300 text-lg font-light leading-relaxed">
              Hablemos. Da el paso hacia tu bienestar.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/34609083012"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-primary-custom hover:bg-[#266360] text-white font-bold rounded-xl shadow-xl transition transform hover:-scale-102"
              >
                Contactar
              </a>
            </div>
          </div>
        </section>

        {/* SERVICIOS: DIETAS Y NUTRICIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section
            id="dietas"
            className="bento-card p-10 flex flex-col justify-between bg-white rounded-3xl border border-slate-100 shadow-sm"
          >
            <div>
              <div className="w-14 h-14 bg-sky-50 text-secondary-custom rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                📋
              </div>
              <h3 className="text-2xl font-bold mb-4">Dietas Personalizadas</h3>
              <p className="text-slate-600 leading-relaxed font-light mb-6">
                Planes orientados a la pérdida de grasa corporal o rendimiento físico utilizando productos locales y menús flexibles que encajan con tu día a día.
              </p>
            </div>
            <ul className="space-y-3 text-sm font-medium text-slate-700 border-t border-slate-100 pt-6">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#054358] mr-3"></span>
                <span>Menús semanales adaptados a tu entorno</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#054358] mr-3"></span>
                <span>Listas de la compra inteligentes</span>
              </li>
            </ul>
          </section>

          <section
            id="nutricion"
            className="bento-card p-10 flex flex-col justify-between bg-white rounded-3xl border border-slate-100 shadow-sm"
          >
            <div>
              <div className="w-14 h-14 bg-teal-50 text-primary-custom rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                🥗
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Nutrición Pre-Competición Personalizada
              </h3>
              <p className="text-slate-600 leading-relaxed font-light mb-6">
                Te planifico y asesoro en la semana pre competición para que saques el máximo rendimiento.
              </p>
            </div>
            <ul className="space-y-3 text-sm font-medium text-slate-700 border-t border-slate-100 pt-6">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-custom mr-3"></span>
                <span>Educación nutricional sin mitos</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-custom mr-3"></span>
                <span>Abordaje de energía</span>
              </li>
            </ul>
          </section>
        </div>

        {/* ZONA DE INFLUENCIA (DÓNDE) */}
        <section
          id="donde"
          className="bento-card p-10 sm:p-14 flex flex-col lg:flex-row items-center gap-10 bg-gradient-to-r from-teal-50/50 to-white rounded-3xl border border-slate-100"
        >
          <div className="flex-shrink-0 text-center lg:text-left space-y-2">
            <div className="inline-block p-4 bg-teal-100 text-primary-custom rounded-2xl mb-2">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold">Subbética y en cualquier lugar</h3>
            <p className="text-slate-500 text-sm">Presencial y Online</p>
          </div>
          <div className="flex-grow space-y-4 text-slate-600 font-light text-base leading-relaxed text-center lg:text-left">
            <p>
              Ubicada en el núcleo de{" "}
              <strong className="font-semibold">Priego de Córdoba</strong>, presencialmente con pacientes del área de{" "}
              <strong className="font-semibold">
                Lucena, Cabra, Priego de Córdoba, Rute, Baena, Montilla
              </strong>{" "}
              y el resto de municipios que conforman{" "}
              <strong className="font-semibold">La Subbética Cordobesa</strong>.
            </p>
            <p className="text-sm text-slate-500">
              ¿Vives fuera de la comarca? Tienes la opción de realizar el seguimiento completo a través de nuestra plataforma online con idénticos resultados de éxito.
            </p>
          </div>
        </section>

        {/* SPONSORS */}
        <section id="sponsors" className="py-6 border-y border-slate-200/60 text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-8">
            Colaboradores y proyectos aliados
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 transition duration-500">
            <span className="text-lg font-bold">CROWN SPORT NUTRITION</span>
            <a
              href="https://crownsportnutrition.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src="https://crownsportnutrition.com/cdn/shop/t/17/assets/crown-logo-gold.png?v=147244400794072444081786445163&width=270"
                alt="Crown Logo"
                className="h-8 w-auto object-contain"
              />
            </a>
          </div>
        </section>

        {/* SECCIÓN BLOG DINÁMICA (DIVULGACIÓN) */}
        <section id="blog" className="py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-custom bg-teal-50 px-3 py-1.5 rounded-lg">
                Divulgación
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
                Últimas Entradas del Blog
              </h2>
            </div>
          </div>

          <div id="contenedor-posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <p className="col-span-full text-center text-slate-400 text-sm">
                No hay publicaciones disponibles.
              </p>
            ) : (
              posts.map((post) => {
                const slug = post.slug || post.id;
                const content = post.es || post;
                const dateDisplay = post.createdAt || '';
                const tags = Array.isArray(post.tags) ? post.tags : [];

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="overflow-hidden">
                        {post.imagen ? (
                          <img
                            src={post.imagen}
                            alt={content.title || content.titulo || ''}
                            className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-300 text-xs">
                            Sin imagen
                          </div>
                        )}
                      </div>
                      <div className="p-6 space-y-3">
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-secondary-custom text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-teal-100/60 lowercase"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">
                          {dateDisplay}
                        </span>
                        <h3 className="text-lg font-bold text-primary-custom group-hover:text-teal-600 transition line-clamp-2">
                          {content.title || content.titulo || ''}
                        </h3>
                        <p className="text-sm text-secondary-custom line-clamp-3 leading-relaxed">
                          {content.excerpt || content.extracto || ''}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <Link
                        href={`/blog/${slug}`}
                        className="inline-flex items-center text-xs font-bold text-teal-600 hover:text-teal-700 transition"
                      >
                        Leer artículo completo &rarr;
                      </Link>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </main>
    </>
  );
}