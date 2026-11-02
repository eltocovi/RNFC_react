import { useEffect, useState } from 'react';
import { obtenerClubes } from '../services/clubes';
import { obtenerJugadores } from '../services/jugadores';
import type { Club } from '../types/Club';
import type { Jugador, JugadorConClub, Posicion } from '../types/Jugador';
import {
  CUPO_TITULARES,
  claveEquipo,
  leerEquipo,
  MAX_EQUIPO,
  MAX_RESERVAS,
  type Equipo,
} from '../utils/ultimateTeam';

function nombreJugador(jugador: Jugador): string {
  return `${jugador.nombre} ${jugador.apellido}`;
}

export default function UltimateTeam({ usuarioId }: { usuarioId: number }) {
  const clave = claveEquipo(usuarioId);
  const [guardado] = useState(() => leerEquipo(clave));
  const [equipo, setEquipo] = useState(guardado.equipo);
  const [errorAlmacenamiento, setErrorAlmacenamiento] = useState(guardado.error);
  const [jugadores, setJugadores] = useState<JugadorConClub[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState('');

  useEffect(() => {
    let activo = true;

    async function cargarJugadores(): Promise<void> {
      setCargando(true);
      setErrorCarga('');
      try {
        const [listaJugadores, clubes] = await Promise.all([obtenerJugadores(), obtenerClubes()]);
        if (!activo) return;
        const clubesPorId = new Map<number, Club>(clubes.map((club) => [club.id, club]));
        setJugadores(
          listaJugadores.map((jugador) => ({
            ...jugador,
            club: clubesPorId.get(jugador.clubId),
          })),
        );
      } catch (error: unknown) {
        if (activo) {
          setErrorCarga(
            error instanceof Error ? error.message : 'No se pudo cargar el listado de jugadores.',
          );
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    void cargarJugadores();
    return () => {
      activo = false;
    };
  }, []);

  function guardarEquipo(actualizado: Equipo): void {
    setEquipo(actualizado);
    try {
      localStorage.setItem(clave, JSON.stringify(actualizado));
    } catch {
      setErrorAlmacenamiento('No se pudo guardar el equipo en este navegador.');
    }
  }

  const seleccionados = new Set([...equipo.titulares, ...equipo.reservas]);
  const jugadorPorId = new Map(jugadores.map((jugador) => [jugador.id, jugador]));
  const resultados = jugadores.filter((jugador) => {
    const texto = `${nombreJugador(jugador)} ${jugador.club?.nombreCorto ?? ''}`.toLocaleLowerCase(
      'es-CL',
    );
    return !seleccionados.has(jugador.id) && texto.includes(busqueda.trim().toLocaleLowerCase('es-CL'));
  });
  const cantidadTitularesPorPosicion = (posicion: Posicion): number =>
    equipo.titulares.reduce(
      (total, id) => total + (jugadorPorId.get(id)?.posicion === posicion ? 1 : 0),
      0,
    );
  const equipoCompleto =
    equipo.titulares.length === 11 && equipo.reservas.length === MAX_RESERVAS;

  function agregarTitular(jugador: Jugador): void {
    const cupo = CUPO_TITULARES.find((item) => item.posicion === jugador.posicion);
    if (
      !cupo ||
      cantidadTitularesPorPosicion(jugador.posicion) >= cupo.cantidad ||
      seleccionados.has(jugador.id)
    ) {
      return;
    }
    guardarEquipo({ ...equipo, titulares: [...equipo.titulares, jugador.id] });
  }

  function agregarReserva(jugador: Jugador): void {
    if (
      seleccionados.has(jugador.id) ||
      equipo.titulares.length + equipo.reservas.length >= MAX_EQUIPO ||
      equipo.reservas.length >= MAX_RESERVAS
    ) {
      return;
    }
    guardarEquipo({ ...equipo, reservas: [...equipo.reservas, jugador.id] });
  }

  function quitarJugador(id: number): void {
    guardarEquipo({
      titulares: equipo.titulares.filter((item) => item !== id),
      reservas: equipo.reservas.filter((item) => item !== id),
    });
  }

  return (
    <div className="space-y-6">
      <header className="overflow-hidden rounded-3xl bg-gradient-to-r from-rnfc-blue via-rnfc-blue to-rnfc-red-dark p-6 text-white shadow-xl sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-gold">
          Arma tu equipo
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
              Ultimate Team
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Elige 11 titulares en formación 1-4-3-3 y completa tu banca con 7 reservas.
            </p>
          </div>
          <span className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold">
            {equipo.titulares.length + equipo.reservas.length} / {MAX_EQUIPO} jugadores
          </span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {CUPO_TITULARES.map(({ posicion, cantidad }) => {
            const cuenta = cantidadTitularesPorPosicion(posicion);
            return (
              <div key={posicion} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-white/75">Titulares {posicion.toLowerCase()}</span>
                  <strong>{cuenta} / {cantidad}</strong>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-rnfc-gold transition-all"
                    style={{ width: `${(cuenta / cantidad) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white/10 px-3 py-1.5">
            Titulares: {equipo.titulares.length} / 11
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1.5">
            Reservas: {equipo.reservas.length} / {MAX_RESERVAS}
          </span>
          {equipoCompleto && (
            <span className="rounded-full bg-emerald-400/20 px-3 py-1.5 text-emerald-100">
              Equipo completo
            </span>
          )}
        </div>
      </header>

      {errorAlmacenamiento && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {errorAlmacenamiento}
        </p>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900">
              Alineación titular
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Formación 1-4-3-3 · {equipo.titulares.length} de 11 listos
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
            {equipo.reservas.length} / 7 reservas
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {CUPO_TITULARES.map(({ posicion, cantidad }) => {
            const miembros = equipo.titulares
              .map((id) => jugadorPorId.get(id))
              .filter((jugador): jugador is JugadorConClub => jugador?.posicion === posicion);
            const espacios = Array.from({ length: cantidad - miembros.length }, (_, index) => index);
            return (
              <div key={posicion} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">{posicion}</h4>
                  <span className="text-xs font-semibold text-slate-500">
                    {miembros.length} / {cantidad}
                  </span>
                </div>
                <ul className="space-y-2">
                  {miembros.map((jugador) => (
                    <li key={jugador.id} className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
                      <span className="min-w-0 truncate text-sm font-semibold text-slate-700">
                        {nombreJugador(jugador)}
                      </span>
                      <button
                        type="button"
                        onClick={() => quitarJugador(jugador.id)}
                        aria-label={`Quitar a ${nombreJugador(jugador)} de titulares`}
                        className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                  {espacios.map((_, index) => (
                    <li
                      key={`vacio-${posicion}-${index}`}
                      className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-400"
                    >
                      Cupo disponible
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900">Reservas</h3>
            <p className="mt-1 text-sm text-slate-500">
              Cualquier combinación de posiciones · {equipo.reservas.length} de 7
            </p>
          </div>
        </div>
        {equipo.reservas.length ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {equipo.reservas.map((id) => {
              const jugador = jugadorPorId.get(id);
              if (!jugador) return null;
              return (
                <li key={id} className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-700">
                      {nombreJugador(jugador)}
                    </span>
                    <span className="text-xs text-slate-500">{jugador.posicion}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => quitarJugador(id)}
                    aria-label={`Quitar a ${nombreJugador(jugador)} de reservas`}
                    className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50"
                  >
                    Quitar
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
            Todavía no agregas reservas.
          </p>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900">
              Seleccionar jugadores
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Los titulares respetan los cupos de la formación; las reservas no tienen límite por posición.
            </p>
          </div>
          <label className="w-full sm:max-w-xs">
            <span className="sr-only">Buscar jugador o club</span>
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar jugador o club..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-rnfc-red focus:ring-4 focus:ring-rnfc-red/10"
            />
          </label>
        </div>

        {errorCarga && (
          <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorCarga}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="ml-3 font-bold underline"
            >
              Reintentar
            </button>
          </div>
        )}
        {cargando ? (
          <p className="py-10 text-center text-sm text-slate-500">Cargando jugadores...</p>
        ) : resultados.length ? (
          <ul className="mt-5 divide-y divide-slate-100">
            {resultados.map((jugador) => {
              const cupoTitular = CUPO_TITULARES.find(
                (item) => item.posicion === jugador.posicion,
              );
              const titularDisponible =
                equipo.titulares.length < 11 &&
                !!cupoTitular &&
                cantidadTitularesPorPosicion(jugador.posicion) < cupoTitular.cantidad;
              const reservaDisponible =
                equipo.reservas.length < MAX_RESERVAS &&
                equipo.titulares.length + equipo.reservas.length < MAX_EQUIPO;
              const cuposAgotados = !titularDisponible && !reservaDisponible;
              return (
                <li key={jugador.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    {jugador.club?.escudo && (
                      <img
                        src={jugador.club.escudo}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-xl bg-slate-50 object-contain p-1"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-bold text-slate-900">{nombreJugador(jugador)}</p>
                      <p className="mt-1 truncate text-sm text-slate-500">
                        {jugador.posicion} · {jugador.club?.nombreCorto ?? 'Sin club'} · #{jugador.dorsal}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => agregarTitular(jugador)}
                      disabled={!titularDisponible}
                      title={
                        titularDisponible
                          ? `Agregar como titular (${cantidadTitularesPorPosicion(jugador.posicion)} / ${cupoTitular?.cantidad} ${jugador.posicion.toLowerCase()})`
                          : 'Cupo titular agotado para esta posición'
                      }
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-rnfc-red hover:text-rnfc-red disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      + Titular
                    </button>
                    <button
                      type="button"
                      onClick={() => agregarReserva(jugador)}
                      disabled={!reservaDisponible}
                      title={reservaDisponible ? 'Agregar como reserva' : 'Cupo de reservas agotado'}
                      className="rounded-lg bg-rnfc-blue px-3 py-2 text-xs font-bold text-white transition hover:bg-rnfc-red disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      + Reserva
                    </button>
                    {cuposAgotados && (
                      <span className="sr-only">No quedan cupos disponibles para este jugador.</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-5 rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">
            {jugadores.length
              ? 'No hay jugadores disponibles que coincidan con tu búsqueda.'
              : 'No hay jugadores disponibles en la plataforma.'}
          </p>
        )}
      </section>
    </div>
  );
}
