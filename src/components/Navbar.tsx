import { Link, NavLink } from 'react-router';

const ENLACES = [
  { ruta: '/jugadores', texto: 'Jugadores' },
  { ruta: '/tournaments', texto: 'Torneo' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-linear-to-r from-rnfc-rojo via-rnfc-rojo-oscuro to-rnfc-granate shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-white">
          <img src="/logo-rnfc.png" alt="Logo RNFC" className="h-10 w-10 object-contain" />
          <span className="text-xl font-extrabold tracking-wide">RNFC</span>
        </Link>

        {/* Menú: NavLink resalta la sección activa */}
        <ul className="flex gap-1">
          {ENLACES.map((enlace) => (
            <li key={enlace.ruta}>
              <NavLink
                to={enlace.ruta}
                className={({ isActive }) =>
                  `rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-white text-rnfc-rojo-oscuro' : 'text-white hover:bg-white/15'
                  }`
                }
              >
                {enlace.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
