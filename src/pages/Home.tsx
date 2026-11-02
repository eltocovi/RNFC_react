import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import TarjetaRanking from '../components/TarjetaRanking';
import { ID_LIGA_PRIMERA, obtenerEstadisticasPorCompeticion } from '../services/estadisticas';
import { CATEGORIAS_RANKING } from '../types/Estadistica';
import type { EstadisticaJugador } from '../types/Estadistica';
import { calcularRanking } from '../utils/estadisticas';

const COMPETICIONES = [
  { nombre: 'Liga de Primera', imagen: '/assets/liga_primera.png' },
  { nombre: 'Liga de Ascenso', imagen: '/assets/liga_ascenso.png' },
  { nombre: 'Liga Femenina', imagen: '/assets/liga_femenina.png' },
  { nombre: 'Liga de Segunda', imagen: '/assets/liga_segunda.png' },
  { nombre: 'Copa Chile', imagen: '/assets/copa_chile.png' },
  { nombre: 'Supercopa de Chile', imagen: '/assets/supercopa_chile.png' },
  { nombre: 'Copa de la Liga', imagen: '/assets/copaliga_chile.png' },
];

const JUGADORES_DESTACADOS = [
  {
    categoria: 'Máximo goleador',
    nombre: 'Fernando Zampedri',
    club: 'Universidad Católica',
    valor: '25',
    unidad: 'Goles',
    imagen: '/assets/FernandoZampedri.jpg',
    escudo: '/assets/UCatolica.webp',
  },
  {
    categoria: 'Máximo asistidor',
    nombre: 'Jean Meneses',
    club: 'Deportes Limache',
    valor: '9',
    unidad: 'Asistencias',
    imagen: '/assets/JeanMeneses.webp',
    escudo: '/assets/deporteslimache.webp',
  },
  {
    categoria: 'Jugador más valorado',
    nombre: 'Arturo Vidal',
    club: 'Colo-Colo',
    valor: '9.12',
    unidad: 'Valoración',
    imagen: '/assets/ArturoVidal.jpg',
    escudo: '/assets/ColoColo.webp',
  },
];

export default function Home() {
  const [estadisticas, setEstadisticas] = useState<EstadisticaJugador[]>([]);
  const [errorEstadisticas, setErrorEstadisticas] = useState<string | null>(null);

  // Rankings de la Liga de Primera: mismos datos que la página /estadisticas
  useEffect(() => {
    let activo = true;
    obtenerEstadisticasPorCompeticion(ID_LIGA_PRIMERA)
      .then((datos) => {
        if (activo) setEstadisticas(datos);
      })
      .catch((e: unknown) => {
        if (activo) setErrorEstadisticas(e instanceof Error ? e.message : 'Ocurrió un error inesperado.');
      });
    return () => {
      activo = false;
    };
  }, []);

  function moverCarrusel(direccion: number): void {
    const pista = document.getElementById('pista-competiciones');
    if (!pista) {
      return;
    }

    const primerElemento = pista.firstElementChild as HTMLElement | null;
    const separacion = Number.parseFloat(getComputedStyle(pista).columnGap) || 24;
    const distancia = (primerElemento?.offsetWidth ?? 200) + separacion;

    pista.scrollBy({ left: direccion * distancia * 2, behavior: 'smooth' });
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-rnfc-blue">
        <img
          src="/assets/hero-image.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rnfc-blue via-rnfc-blue/90 to-rnfc-red-dark/70" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-rnfc-red/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-rnfc-navy/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-rnfc-gold" />
              Temporada 2026
            </span>

            <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.92] tracking-wide text-white sm:text-6xl lg:text-7xl">
              Bienvenido al{' '}
              <span className="text-rnfc-gold">Registro Nacional</span> del Fútbol Chileno
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Tu fuente confiable para consultar estadísticas, jugadores, clubes y competiciones del
              fútbol chileno. Una plataforma construida para aficionados, gestores y administradores.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/perfil"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-rnfc-red shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-rnfc-gold hover:text-rnfc-blue"
              >
                Regístrate ahora
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                to="/#competiciones"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
              >
                Explorar competiciones
              </Link>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                { dato: '16', texto: 'Clubes' },
                { dato: '7', texto: 'Competiciones' },
                { dato: '3', texto: 'Perfiles' },
              ].map((item) => (
                <div
                  key={item.texto}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur"
                >
                  <dt className="font-display text-4xl leading-none text-white">{item.dato}</dt>
                  <dd className="mt-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/55">
                    {item.texto}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute h-80 w-80 rounded-full border border-white/10 sm:h-96 sm:w-96" />
            <div className="absolute h-64 w-64 rounded-full border border-dashed border-white/15 sm:h-80 sm:w-80" />
            <div className="absolute h-72 w-72 rounded-full bg-rnfc-red/25 blur-2xl sm:h-80 sm:w-80" />
            <img
              src="/assets/escudo_rnfc.png"
              alt="Escudo del Registro Nacional del Fútbol Chileno"
              className="relative z-10 w-64 drop-shadow-2xl sm:w-80"
            />

            <div className="absolute -right-2 top-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left backdrop-blur-md">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/60">
                Fútbol chileno
              </p>
              <p className="mt-1 text-sm font-bold text-white">Pasión de todo un país</p>
            </div>

            <div className="absolute -left-2 bottom-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left backdrop-blur-md">
              <div className="flex items-center gap-2 text-rnfc-gold">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 17V9m5 8V5m5 12v-6m5 6V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.16em]">
                  Estadísticas
                </span>
              </div>
              <p className="mt-1 text-sm font-bold text-white">Datos actualizados</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 pb-4">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              titulo: 'Jugadores',
              texto: 'Fichas, trayectoria y estadísticas de los protagonistas del campeonato.',
              ruta: '/#jugadores',
              icono: (
                <path
                  d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 4.3a3.5 3.5 0 0 1 0 6.8M21 20v-1.5a4 4 0 0 0-3-3.9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            },
            {
              titulo: 'Competiciones',
              texto: 'Ligas, copas y torneos con resultados, posiciones y calendario.',
              ruta: '/#competiciones',
              icono: (
                <path
                  d="M8 4h8v4.5a4 4 0 0 1-8 0V4ZM8 5.5H5.5A2.5 2.5 0 0 0 8 9.5M16 5.5h2.5A2.5 2.5 0 0 1 16 9.5M12 12.5V17M9 20h6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            },
            {
              titulo: 'Estadísticas',
              texto: 'Rankings de goles, asistencias y disciplinarias en tiempo real.',
              ruta: '/estadisticas',
              icono: (
                <path
                  d="M4 19V5M4 19h16M8 16V9m4 7V6m4 10v-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            },
          ].map((feature) => (
            <Link
              key={feature.titulo}
              to={feature.ruta}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:border-rnfc-red/20 hover:shadow-2xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rnfc-red/10 text-rnfc-red transition group-hover:bg-rnfc-red group-hover:text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {feature.icono}
                </svg>
              </span>
              <h2 className="mt-5 font-display text-2xl tracking-wide text-slate-900">
                {feature.titulo}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.texto}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-rnfc-red">
                Ver más
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="competiciones" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
                Todo el año
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-slate-900 sm:text-5xl">
                Competiciones
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-500">
                Las principales competencias del fútbol chileno reunidas en un solo lugar.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moverCarrusel(-1)}
                aria-label="Competencias anteriores"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-rnfc-red hover:bg-rnfc-red hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 6 9 12l6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => moverCarrusel(1)}
                aria-label="Siguientes competiciones"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-rnfc-red hover:bg-rnfc-red hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="m9 6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="pista-competiciones"
            className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
          >
            {COMPETICIONES.map((competicion) => (
              <article
                key={competicion.nombre}
                className="group flex w-40 shrink-0 snap-start flex-col items-center justify-between rounded-3xl border border-slate-100 bg-slate-50/70 p-5 text-center transition hover:-translate-y-1 hover:border-rnfc-red/20 hover:bg-white hover:shadow-xl sm:w-48"
              >
                <div className="flex h-32 w-full items-center justify-center sm:h-36">
                  <img
                    src={competicion.imagen}
                    alt={competicion.nombre}
                    className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-700">{competicion.nombre}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="jugadores" className="scroll-mt-28 bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
              Figuras del campeonato
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-slate-900 sm:text-5xl">
              Jugadores destacados
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              Los nombres que marcan la diferencia en la temporada, con sus registros más relevantes.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {JUGADORES_DESTACADOS.map((jugador) => (
              <article
                key={jugador.nombre}
                className="group w-full max-w-xs overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-1.5 hover:shadow-2xl sm:w-80"
              >
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-rnfc-red-dark via-rnfc-red to-[#a30f22] py-3 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="m12 3 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {jugador.categoria}
                </div>

                <div className="relative h-64 bg-rnfc-blue">
                  <img
                    src={jugador.imagen}
                    alt={jugador.nombre}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                  <img
                    src={jugador.escudo}
                    alt={`Escudo de ${jugador.club}`}
                    className="absolute -bottom-7 right-5 h-16 w-16 rounded-full border-4 border-white bg-white object-contain p-1.5 shadow-lg"
                    loading="lazy"
                  />
                </div>

                <div className="px-5 pb-6 pt-10 text-center">
                  <h3 className="font-display text-3xl tracking-wide text-slate-900">
                    {jugador.nombre}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">{jugador.club}</p>
                  <p className="mt-4 font-display text-5xl leading-none text-rnfc-navy">
                    {jugador.valor}
                  </p>
                  <p className="mt-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {jugador.unidad}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="estadisticas" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
              Rankings de la temporada
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-slate-900 sm:text-5xl">
              Estadísticas
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              Top 5 de jugadores en las categorías más relevantes del torneo.
            </p>
          </div>

          {errorEstadisticas ? (
            <p role="alert" className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center font-semibold text-red-700">
              {errorEstadisticas}
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {CATEGORIAS_RANKING.map((categoria) => (
                <TarjetaRanking
                  key={categoria.tipo}
                  titulo={categoria.titulo}
                  unidad={categoria.unidad}
                  tipo={categoria.tipo}
                  filas={calcularRanking(estadisticas, categoria.tipo)}
                />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/estadisticas"
              className="inline-flex items-center gap-2 rounded-full bg-rnfc-red px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-rnfc-red/20 transition hover:-translate-y-0.5 hover:bg-rnfc-red-dark"
            >
              Ver todas las estadísticas
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-rnfc-red-dark via-rnfc-red to-rnfc-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border-[40px] border-white" />
          <div className="absolute right-10 top-0 h-44 w-44 rounded-full border-[30px] border-white" />
          <div className="absolute bottom-0 left-1/2 h-40 w-40 translate-y-1/2 rounded-full border-[25px] border-white" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="max-w-3xl font-display text-4xl uppercase leading-none tracking-wide text-white sm:text-5xl">
            ¿Listo para ser parte del fútbol chileno?
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/70">
            Crea tu cuenta, administra tus credenciales y accede a una plataforma pensada para la
            comunidad futbolística nacional.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/perfil"
              className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-rnfc-red transition hover:bg-rnfc-gold hover:text-rnfc-blue"
            >
              Crear cuenta
            </Link>
            <Link
              to="/contacto"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Hablar con nosotros
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
