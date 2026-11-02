import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import FiltrosJugadores from '../components/FiltrosJugadores';
import JugadorCard from '../components/JugadorCard';
import { obtenerClubes } from '../services/clubes';
import { obtenerJugadores } from '../services/jugadores';
import type { SesionUsuario } from '../services/usuario';
import type { Club } from '../types/Club';
import type { JugadorConClub, Posicion } from '../types/Jugador';
import { FILTROS_VACIOS, filtrarJugadores, type FiltrosJugadores as Filtros } from '../utils/jugadores';
import {
  CUPO_TITULARES,
  claveEquipo,
  leerEquipo,
  MAX_EQUIPO,
  MAX_RESERVAS,
  type Equipo,
} from '../utils/ultimateTeam';

interface ContextoAutenticacion {
  sesion: SesionUsuario | null;
}

interface EquipoEnMemoria {
  usuarioId: number;
  equipo: Equipo;
}

export default function PaginaJugadores() {
  const { sesion } = useOutletContext<ContextoAutenticacion>();
  const [jugadores, setJugadores] = useState<JugadorConClub[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS);
  const [intento, setIntento] = useState(0);
  const [jugadorElegido, setJugadorElegido] = useState<JugadorConClub | null>(null);
  const [equipoEnMemoria, setEquipoEnMemoria] = useState<EquipoEnMemoria | null>(null);
  const [errorEquipo, setErrorEquipo] = useState('');
  const [mensajeEquipo, setMensajeEquipo] = useState('');

  const usuarioComunId = sesion?.rol === 'UsuarioComun' ? sesion.id_usuario : null;
  const datosEquipo = usuarioComunId ? leerEquipo(claveEquipo(usuarioComunId)) : null;
  const equipo =
    usuarioComunId && equipoEnMemoria?.usuarioId === usuarioComunId
      ? equipoEnMemoria.equipo
      : datosEquipo?.equipo ?? { titulares: [], reservas: [] };
  const jugadoresElegidos = new Set([...equipo.titulares, ...equipo.reservas]);
  const jugadoresPorId = new Map(jugadores.map((jugador) => [jugador.id, jugador]));
  const cantidadTitularesPorPosicion = (posicion: Posicion): number =>
    equipo.titulares.reduce(
      (total, id) => total + (jugadoresPorId.get(id)?.posicion === posicion ? 1 : 0),
      0,
    );

  // Carga jugadores y clubes, y une cada jugador con su club por clubId
  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const [datosJugadores, datosClubes] = await Promise.all([obtenerJugadores(), obtenerClubes()]);
        if (!activo) return;
        setJugadores(
          datosJugadores.map((j) => ({ ...j, club: datosClubes.find((c) => c.id === j.clubId) })),
        );
        setClubes(datosClubes);
        setError(null);
      } catch (e) {
        if (!activo) return;
        setError(e instanceof Error ? e.message : 'Ocurrió un error inesperado.');
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, [intento]);

  function reintentar() {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }

  function elegirJugador(jugador: JugadorConClub): void {
    if (!usuarioComunId) return;
    setEquipoEnMemoria({ usuarioId: usuarioComunId, equipo });
    setErrorEquipo(datosEquipo?.error ?? '');
    setMensajeEquipo('');
    setJugadorElegido(jugador);
  }

  function agregarJugador(tipo: 'titular' | 'reserva'): void {
    if (!jugadorElegido || !usuarioComunId || jugadoresElegidos.has(jugadorElegido.id)) return;

    const esTitular = tipo === 'titular';
    const cupoTitular = CUPO_TITULARES.find(
      (cupo) => cupo.posicion === jugadorElegido.posicion,
    );
    if (
      (esTitular &&
        (!cupoTitular ||
          cantidadTitularesPorPosicion(jugadorElegido.posicion) >= cupoTitular.cantidad)) ||
      (!esTitular &&
        (equipo.titulares.length + equipo.reservas.length >= MAX_EQUIPO ||
          equipo.reservas.length >= MAX_RESERVAS))
    ) {
      return;
    }

    const actualizado: Equipo = esTitular
      ? { ...equipo, titulares: [...equipo.titulares, jugadorElegido.id] }
      : { ...equipo, reservas: [...equipo.reservas, jugadorElegido.id] };

    try {
      localStorage.setItem(claveEquipo(usuarioComunId), JSON.stringify(actualizado));
      setEquipoEnMemoria({ usuarioId: usuarioComunId, equipo: actualizado });
      setErrorEquipo('');
      setMensajeEquipo(
        `${jugadorElegido.nombre} ${jugadorElegido.apellido} se agregó como ${
          esTitular ? 'titular' : 'reserva'
        }.`,
      );
    } catch {
      setErrorEquipo('No se pudo guardar el equipo en este navegador.');
    }
  }

  const nacionalidades = [...new Set(jugadores.map((j) => j.nacionalidad))].sort();
  const resultado = filtrarJugadores(jugadores, filtros);
  const cupoTitularElegido = jugadorElegido
    ? CUPO_TITULARES.find((cupo) => cupo.posicion === jugadorElegido.posicion)
    : undefined;
  const puedeAgregarTitular = Boolean(
    jugadorElegido &&
      cupoTitularElegido &&
      cantidadTitularesPorPosicion(jugadorElegido.posicion) < cupoTitularElegido.cantidad &&
      !jugadoresElegidos.has(jugadorElegido.id),
  );
  const puedeAgregarReserva = Boolean(
    jugadorElegido &&
      equipo.titulares.length + equipo.reservas.length < MAX_EQUIPO &&
      equipo.reservas.length < MAX_RESERVAS &&
      !jugadoresElegidos.has(jugadorElegido.id),
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-rnfc-azul">Jugadores</h1>

      <FiltrosJugadores
        filtros={filtros}
        clubes={clubes}
        nacionalidades={nacionalidades}
        onCambiar={setFiltros}
        onLimpiar={() => setFiltros(FILTROS_VACIOS)}
      />

      {cargando && <p className="mt-10 text-center text-slate-500">Cargando jugadores...</p>}

      {/* Error de la API */}
      {!cargando && error && (
        <div role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">{error}</p>
          <button
            type="button"
            onClick={reintentar}
            className="mt-4 rounded-full bg-rnfc-rojo px-5 py-2 text-sm font-semibold text-white hover:bg-rnfc-rojo-oscuro"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Lista de jugadores filtrada */}
      {!cargando && !error && (
        <>
          <p className="mt-6 mb-4 text-sm text-slate-500" aria-live="polite">
            Mostrando <strong className="text-slate-800">{resultado.length}</strong> de {jugadores.length} jugadores
          </p>

          {jugadores.length === 0 ? (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              No hay jugadores registrados.
            </p>
          ) : resultado.length === 0 ? (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              No se encontraron jugadores con esos filtros.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resultado.map((jugador) => (
                <JugadorCard
                  key={jugador.id}
                  jugador={jugador}
                  onSeleccionar={usuarioComunId ? () => elegirJugador(jugador) : undefined}
                  seleccionado={jugadoresElegidos.has(jugador.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {jugadorElegido && usuarioComunId && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="Cerrar ficha del jugador"
            onClick={() => setJugadorElegido(null)}
            className="absolute inset-0 h-full w-full bg-slate-950/50"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="ficha-jugador-titulo"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-6 shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-rnfc-red">
                  Jugador seleccionado
                </p>
                <h2
                  id="ficha-jugador-titulo"
                  className="mt-2 font-display text-3xl uppercase leading-tight text-rnfc-blue"
                >
                  {jugadorElegido.nombre} {jugadorElegido.apellido}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setJugadorElegido(null)}
                aria-label="Cerrar"
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xl leading-none text-slate-600 hover:bg-slate-200"
              >
                ×
              </button>
            </header>

            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
              {jugadorElegido.club?.escudo ? (
                <img
                  src={jugadorElegido.club.escudo}
                  alt=""
                  className="h-14 w-14 object-contain"
                />
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-rnfc-blue text-xl font-black text-white">
                  #{jugadorElegido.dorsal}
                </span>
              )}
              <div>
                <p className="font-bold text-slate-900">
                  {jugadorElegido.club?.nombreCorto ?? 'Sin club'}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {jugadorElegido.posicion} · #{jugadorElegido.dorsal}
                </p>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              {[
                ['Nacionalidad', jugadorElegido.nacionalidad],
                ['Pie dominante', jugadorElegido.pieDominante],
                ['Partidos', String(jugadorElegido.partidos)],
                ['Goles', String(jugadorElegido.goles)],
              ].map(([etiqueta, valor]) => (
                <div key={etiqueta} className="rounded-xl border border-slate-200 p-3">
                  <dt className="text-xs text-slate-500">{etiqueta}</dt>
                  <dd className="mt-1 font-bold text-slate-800">{valor}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-slate-900">Tu Ultimate Team</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {equipo.titulares.length + equipo.reservas.length} / {MAX_EQUIPO}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Titulares {equipo.titulares.length}/11 · Reservas {equipo.reservas.length}/
                {MAX_RESERVAS}
              </p>

              {errorEquipo && (
                <p role="alert" className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                  {errorEquipo}
                </p>
              )}
              {mensajeEquipo && (
                <p role="status" className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                  {mensajeEquipo}
                </p>
              )}

              {jugadoresElegidos.has(jugadorElegido.id) ? (
                <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm font-semibold text-slate-600">
                  Este jugador ya forma parte de tu equipo.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => agregarJugador('titular')}
                    disabled={!puedeAgregarTitular}
                    className="w-full rounded-xl bg-rnfc-blue px-4 py-3 text-sm font-bold text-white transition hover:bg-rnfc-red-dark disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  >
                    {cupoTitularElegido
                      ? puedeAgregarTitular
                        ? `Agregar como titular (${jugadorElegido.posicion})`
                        : `Cupo de ${jugadorElegido.posicion.toLowerCase()} completo`
                      : 'Sin cupo titular para esta posición'}
                  </button>
                  <button
                    type="button"
                    onClick={() => agregarJugador('reserva')}
                    disabled={!puedeAgregarReserva}
                    className="w-full rounded-xl border border-rnfc-blue px-4 py-3 text-sm font-bold text-rnfc-blue transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                  >
                    {puedeAgregarReserva
                      ? 'Agregar como reserva'
                      : 'Cupo de reservas completo'}
                  </button>
                </div>
              )}
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
