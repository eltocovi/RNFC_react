import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import type { SesionUsuario } from '../services/usuario';
import BuscadorNavbar from './BuscadorNavbar';

interface NavbarProps {
  sesion: SesionUsuario | null;
  onCerrarSesion: () => void;
}

const ENLACES = [
  { texto: 'Inicio', ruta: '/' },
  { texto: 'Quiénes somos', ruta: '/quienes-somos' },
  { texto: 'Jugadores', ruta: '/jugadores' },
  { texto: 'Clubes', ruta: '/clubs' },
  { texto: 'Estadísticas', ruta: '/#estadisticas' },
  { texto: 'Contacto', ruta: '/contacto' },
];

const COMPETICIONES = [
  { texto: 'Liga de Primera', ruta: '/tournaments' },
  { texto: 'Liga de Ascenso', ruta: '/#competiciones' },
  { texto: 'Liga Femenina', ruta: '/#competiciones' },
  { texto: 'Liga de Segunda', ruta: '/#competiciones' },
  { texto: 'Copa Chile', ruta: '/#competiciones' },
  { texto: 'Supercopa de Chile', ruta: '/#competiciones' },
  { texto: 'Copa de la Liga', ruta: '/#competiciones' },
];

function iniciales(nombre: string): string {
  const partes = nombre.split(' ').filter(Boolean);
  if (partes.length === 0) {
    return 'RN';
  }
  return partes
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('');
}

export default function Navbar({ sesion, onCerrarSesion }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function cerrarMenu(): void {
    setMenuAbierto(false);
  }

  function manejarCierreSesion(): void {
    onCerrarSesion();
    setMenuAbierto(false);
    navigate('/');
  }

  function claseEnlace({ isActive }: { isActive: boolean }): string {
    return `relative whitespace-nowrap rounded-full px-2 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
    }`;
  }

  const enlaceSeccionActivo = (ruta: string): boolean => {
    if (!ruta.startsWith('/#')) {
      return false;
    }
    return location.pathname === '/' && location.hash === ruta.slice(1);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-linear-to-r from-rnfc-red-dark via-rnfc-red to-[#a30f22] shadow-lg shadow-rnfc-red-dark/20">
      <div className="mx-auto flex min-h-16 max-w-screen-2xl items-center gap-3 px-3 sm:px-5 lg:px-6">
        <Link to="/" onClick={cerrarMenu} className="flex shrink-0 items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 p-1 ring-1 ring-white/25">
            <img
              src="/assets/escudo_rnfc.png"
              alt="Escudo del Registro Nacional del Fútbol Chileno"
              className="h-full w-full object-contain drop-shadow"
            />
          </span>
          <span className="hidden leading-tight text-white xl:block">
            <span className="block font-display text-xl tracking-[0.16em]">RNFC</span>
            <span className="block max-w-40 text-[0.52rem] font-semibold uppercase leading-tight tracking-[0.12em] text-white/65">
              Registro Nacional del Fútbol Chileno
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0 xl:flex" aria-label="Navegación principal">
          {ENLACES.map((enlace) => {
            const esSeccion = enlace.ruta.startsWith('/#');
            const activo = esSeccion
              ? enlaceSeccionActivo(enlace.ruta)
              : location.pathname === enlace.ruta;

            return esSeccion ? (
              <Link
                key={enlace.ruta}
                to={enlace.ruta}
                className={`relative rounded-full px-2 py-2 text-sm font-semibold transition ${
                  activo
                    ? 'bg-white/15 text-white'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {enlace.texto}
              </Link>
            ) : (
              <NavLink
                key={enlace.ruta}
                to={enlace.ruta}
                end={enlace.ruta === '/'}
                className={claseEnlace}
              >
                {enlace.texto}
              </NavLink>
            );
          })}
          <div className="group relative flex h-full shrink-0 items-center">
            <Link
              to="/#competiciones"
              className={`flex items-center whitespace-nowrap rounded-full px-2 py-2 text-sm font-semibold leading-5 transition ${
                enlaceSeccionActivo('/#competiciones')
                  ? 'bg-white/15 text-white'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
              aria-haspopup="true"
            >
              Competiciones
            </Link>
            <div className="invisible absolute left-0 top-full z-50 min-w-56 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                {COMPETICIONES.map((competicion) => (
                  <Link
                    key={competicion.texto}
                    to={competicion.ruta}
                    className="block whitespace-nowrap px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-rnfc-red"
                  >
                    {competicion.texto}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-2 xl:flex">
          <BuscadorNavbar className="w-44 xl:w-52" />
          {sesion ? (
            <div className="flex items-center gap-2">
              <Link
                to="/perfil"
                className="flex max-w-40 items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-1 pr-2 text-white transition hover:bg-white/20"
                title="Ir a mi perfil"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[0.65rem] font-extrabold text-rnfc-red">
                  {iniciales(sesion.nombre)}
                </span>
                <span className="truncate text-xs font-bold">{sesion.nombre}</span>
              </Link>
              <button
                type="button"
                onClick={manejarCierreSesion}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/75 transition hover:border-red-300/40 hover:bg-red-950/30 hover:text-white"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              to="/perfil"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-rnfc-red shadow-sm transition hover:bg-white/90"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M4.5 20a7.5 7.5 0 0 1 15 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Ingresar
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <Link
            to="/perfil"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
            aria-label="Mi perfil"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M4.5 20a7.5 7.5 0 0 1 15 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuAbierto ? (
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div id="menu-movil" className="border-t border-white/10 bg-rnfc-red-dark/95 px-4 pb-5 pt-4 xl:hidden">
          <BuscadorNavbar onNavegar={cerrarMenu} className="mb-4" />
          <nav className="grid gap-1" aria-label="Navegación móvil">
            {ENLACES.map((enlace) => (
              <Link
                key={enlace.ruta}
                to={enlace.ruta}
                onClick={cerrarMenu}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {enlace.texto}
              </Link>
            ))}
            <details className="group rounded-xl">
              <summary className="cursor-pointer list-none rounded-xl px-3 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white">
                Competiciones
                <span className="float-right transition group-open:rotate-180" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <div className="ml-3 grid border-l border-white/20 py-1 pl-3">
                {COMPETICIONES.map((competicion) => (
                  <Link
                    key={competicion.texto}
                    to={competicion.ruta}
                    onClick={cerrarMenu}
                    className="rounded-lg px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    {competicion.texto}
                  </Link>
                ))}
              </div>
            </details>
          </nav>
          <div className="mt-4 border-t border-white/10 pt-4">
            {sesion ? (
              <div className="flex items-center justify-between gap-3">
                <Link
                  to="/perfil"
                  onClick={cerrarMenu}
                  className="flex min-w-0 items-center gap-3 text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-rnfc-red">
                    {iniciales(sesion.nombre)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{sesion.nombre}</span>
                    <span className="block truncate text-xs text-white/60">{sesion.correo}</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={manejarCierreSesion}
                  className="shrink-0 rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/perfil"
                onClick={cerrarMenu}
                className="flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-rnfc-red"
              >
                Ingresar o crear cuenta
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
