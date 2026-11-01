import { Link } from 'react-router';

const ENLACES = [
  { texto: 'Inicio', ruta: '/' },
  { texto: 'Quiénes somos', ruta: '/quienes-somos' },
  { texto: 'Jugadores', ruta: '/jugadores' },
  { texto: 'Torneo', ruta: '/tournaments' },
  { texto: 'Clubes', ruta: '/clubs' },
  { texto: 'Contacto', ruta: '/contacto' },
  { texto: 'Mi perfil', ruta: '/perfil' },
];

export default function Footer() {
  return (
    <footer className="bg-rnfc-blue text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 p-1 ring-1 ring-white/15">
              <img
                src="/assets/escudo_rnfc.png"
                alt="Escudo RNFC"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-3xl tracking-[0.18em] text-white">RNFC</span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-slate-400">
                Registro Nacional del Fútbol Chileno
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
            Plataforma académica dedicada a registrar, consultar y difundir la información de
            jugadores, clubes y competiciones del fútbol chileno.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              Usuario común
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              Gestor deportivo
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              Administrador
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Navegación</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {ENLACES.map((enlace) => (
              <li key={enlace.texto}>
                <Link
                  to={enlace.ruta}
                  className="text-slate-400 transition hover:text-white hover:underline hover:underline-offset-4"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Contacto</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-rnfc-red-light" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <a href="mailto:contacto@rnfc.cl" className="transition hover:text-white">
                contacto@rnfc.cl
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-rnfc-red-light" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.5 3.5h2.2l1.2 4.1-1.8 1.4a15 15 0 0 0 6.9 6.9l1.4-1.8 4.1 1.2v2.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              <span>+56 2 2345 6789</span>
            </li>
            <li className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-rnfc-red-light" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <span>Santiago, Región Metropolitana, Chile</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; 2026 Registro Nacional del Fútbol Chileno. Todos los derechos reservados.</p>
          <p>Proyecto académico Fullstack 2</p>
        </div>
      </div>
    </footer>
  );
}
