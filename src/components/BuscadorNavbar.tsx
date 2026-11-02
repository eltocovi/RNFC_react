import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface BuscadorNavbarProps {
  onNavegar?: () => void;
  className?: string;
}

interface DestinoBusqueda {
  titulo: string;
  descripcion: string;
  ruta: string;
  tipo: string;
  claves: string;
}

const DESTINOS: DestinoBusqueda[] = [
  {
    titulo: 'Inicio',
    descripcion: 'Portada principal del Registro Nacional del Fútbol Chileno.',
    ruta: '/',
    tipo: 'Página',
    claves: 'inicio home portada bienvenida rnfc',
  },
  {
    titulo: 'Quiénes somos',
    descripcion: 'Historia, misión y equipo detrás de la plataforma.',
    ruta: '/quienes-somos',
    tipo: 'Página',
    claves: 'nosotros historia mision vision equipo roles institucion',
  },
  {
    titulo: 'Contacto',
    descripcion: 'Envíanos consultas, sugerencias o comentarios.',
    ruta: '/contacto',
    tipo: 'Página',
    claves: 'contacto correo formulario ayuda soporte sugerencia telefono',
  },
  {
    titulo: 'Mi perfil',
    descripcion: 'Ingresa, crea tu cuenta o administra tus credenciales.',
    ruta: '/perfil',
    tipo: 'Cuenta',
    claves: 'perfil usuario sesion login ingresar cuenta credenciales contrasena password',
  },
  {
    titulo: 'Jugadores',
    descripcion: 'Listado de jugadores con búsqueda y filtros por club, posición y nacionalidad.',
    ruta: '/jugadores',
    tipo: 'Página',
    claves: 'jugadores futbolistas plantel listado posicion nacionalidad pie dorsal',
  },
  {
    titulo: 'Clubes',
    descripcion: 'Ficha de los clubes con su plantel.',
    ruta: '/clubs',
    tipo: 'Página',
    claves: 'clubes club equipos equipo plantel escudo estadio',
  },
  {
    titulo: 'Competiciones',
    descripcion: 'Ligas, copas y torneos del fútbol chileno.',
    ruta: '/#competiciones',
    tipo: 'Sección',
    claves: 'competiciones liga primera ascenso segunda femenina copa chile supercopa torneo',
  },
  {
    titulo: 'Jugadores destacados',
    descripcion: 'Goleadores, asistidores y figuras del campeonato.',
    ruta: '/#jugadores',
    tipo: 'Sección',
    claves: 'jugadores zampedri meneses vidal futbolistas destacados',
  },
  {
    titulo: 'Estadísticas',
    descripcion: 'Rankings de goles, asistencias y tarjetas.',
    ruta: '/estadisticas',
    tipo: 'Página',
    claves: 'estadisticas goleadores asistencias tarjetas rankings datos',
  },
];

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

export default function BuscadorNavbar({ onNavegar, className = '' }: BuscadorNavbarProps) {
  const [texto, setTexto] = useState('');
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const consulta = normalizar(texto);
  const palabras = consulta ? consulta.split(/\s+/) : [];
  const resultados = palabras.length
    ? DESTINOS.filter((destino) => {
        const contenido = normalizar(`${destino.titulo} ${destino.descripcion} ${destino.claves}`);
        return palabras.every((palabra) => contenido.includes(palabra));
      }).slice(0, 6)
    : [];

  useEffect(() => {
    function cerrarAlHacerClick(evento: MouseEvent): void {
      const destino = evento.target;
      if (!(destino instanceof Element) || !destino.closest('[data-buscador-navbar]')) {
        setAbierto(false);
      }
    }

    document.addEventListener('mousedown', cerrarAlHacerClick);
    return () => document.removeEventListener('mousedown', cerrarAlHacerClick);
  }, []);

  function navegarA(ruta: string): void {
    setTexto('');
    setAbierto(false);
    onNavegar?.();

    if (ruta.startsWith('/#')) {
      const id = ruta.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    navigate(ruta);
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();

    if (resultados.length > 0) {
      navegarA(resultados[0].ruta);
    }
  }

  return (
    <div data-buscador-navbar className={`relative ${className}`}>
      <form onSubmit={manejarEnvio} role="search" className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-white/60">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={texto}
          onChange={(evento) => {
            setTexto(evento.target.value);
            setAbierto(true);
          }}
          onFocus={() => setAbierto(true)}
          onKeyDown={(evento) => {
            if (evento.key === 'Escape') {
              setAbierto(false);
            }
          }}
          placeholder="Buscar jugador, competición..."
          aria-label="Buscar en el sitio"
          className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-white/60 focus:border-white/40 focus:bg-white/15 focus:ring-4 focus:ring-white/10"
        />
      </form>

      {abierto && texto.trim() && (
        <div className="absolute right-0 top-[calc(100%+0.65rem)] z-50 w-full min-w-[18rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
          {resultados.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {resultados.map((resultado) => (
                <li key={resultado.ruta}>
                  <button
                    type="button"
                    onClick={() => navegarA(resultado.ruta)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rnfc-red/10 text-rnfc-red">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-slate-800">
                          {resultado.titulo}
                        </span>
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-slate-500">
                          {resultado.tipo}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {resultado.descripcion}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-5 text-sm text-slate-500">
              No encontramos resultados para <strong className="text-slate-700">{texto}</strong>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
