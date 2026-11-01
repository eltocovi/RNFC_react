import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { TournamentBanner } from '../components/TournamentBanner';
import { obtenerClubes } from '../services/clubes';
import { obtenerGoleadores, obtenerPartidos, obtenerPosiciones } from '../services/torneo';
import { obtenerJugadores } from '../services/jugadores';
import type { GoleadorConJugador, PartidoTorneo, PosicionTorneo } from '../types/Torneo';
import type { JugadorConClub } from '../types/Jugador';

const jornadas = [7, 8, 9];

function claseResultado(resultado: 'V' | 'E' | 'D') {
  if (resultado === 'V') return 'bg-emerald-500';
  if (resultado === 'E') return 'bg-amber-400';
  return 'bg-red-500';
}

export default function Tournament() {
  const [jornada, setJornada] = useState(8);
  const [posiciones, setPosiciones] = useState<PosicionTorneo[]>([]);
  const [partidos, setPartidos] = useState<PartidoTorneo[]>([]);
  const [goleadores, setGoleadores] = useState<GoleadorConJugador[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargarDatos() {
      setCargando(true);
      try {
        const [datosPosiciones, datosPartidos, datosGoleadores, datosJugadores, clubes] = await Promise.all([
          obtenerPosiciones(),
          obtenerPartidos(),
          obtenerGoleadores(),
          obtenerJugadores(),
          obtenerClubes(),
        ]);
        if (!activo) return;

        const clubesPorId = new Map(clubes.map((club) => [club.id, club] as const));
        const jugadoresPorId = new Map<number, JugadorConClub>();
        datosJugadores.forEach((jugador) => {
          jugadoresPorId.set(jugador.id, {
            ...jugador,
            club: clubesPorId.get(jugador.clubId),
          });
        });

        const goleadoresConJugador: GoleadorConJugador[] = [];
        datosGoleadores.forEach((goleador) => {
          const jugador = jugadoresPorId.get(goleador.jugadorId);
          if (jugador) goleadoresConJugador.push({ ...goleador, jugador });
        });

        setPosiciones(datosPosiciones);
        setPartidos(datosPartidos);
        setGoleadores(goleadoresConJugador);
        setError(null);
      } catch (e) {
        if (!activo) return;
        setError(e instanceof Error ? e.message : 'Ocurrió un error inesperado.');
      } finally {
        if (activo) setCargando(false);
      }
    }

    void cargarDatos();
    return () => {
      activo = false;
    };
  }, [intento]);

  if (cargando) {
    return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 text-center text-slate-500">Cargando información del torneo...</main>;
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setCargando(true);
              setIntento((actual) => actual + 1);
            }}
            className="mt-4 rounded-full bg-rnfc-rojo px-5 py-2 text-sm font-semibold text-white hover:bg-rnfc-rojo-oscuro"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  const partidosJornada = partidos
    .filter((partido) => partido.jornada === jornada)
    .sort((a, b) => a.id - b.id);
  const posicionesOrdenadas = [...posiciones].sort((a, b) => a.posicion - b.posicion);
  const goleadoresOrdenados = [...goleadores].sort((a, b) => b.jugador.goles - a.jugador.goles);

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col space-y-7 px-4 py-7 sm:px-6 lg:px-8">
      <TournamentBanner jornada={jornada} />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8" aria-label="Tabla del torneo">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-slate-900">Tabla de Posiciones</h2>
                <p className="text-[11px] font-medium text-slate-400">Datos de muestra · Fecha 8</p>
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] font-medium text-slate-600">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />Copa Libertadores</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-sky-500" />Copa Sudamericana</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-red-500" />Descenso</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
                  <tr>
                    {['POS', 'CLUB', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'PTS', 'ÚLTIMOS 5'].map((titulo) => (
                      <th key={titulo} scope="col" className="whitespace-nowrap px-3 py-3 text-center first:w-12 first:px-2 first:text-center">{titulo}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {posicionesOrdenadas.map((fila) => {
                    const diferencia = fila.gf - fila.gc;
                    const zona = fila.posicion <= 2
                      ? 'border-emerald-500 text-emerald-600'
                      : fila.posicion <= 7
                        ? 'border-sky-400 text-sky-600'
                        : fila.posicion >= 15
                          ? 'border-red-500 text-red-600'
                          : 'border-transparent text-slate-500';

                    return (
                      <tr key={fila.id} className="transition-colors hover:bg-slate-50/70">
                        <td className={`border-l-4 px-3 py-2.5 text-center font-bold ${zona}`}>{fila.posicion}</td>
                        <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-slate-800">
                          <span className="mr-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full border bg-slate-50 px-1 text-[9px] font-bold text-slate-700">{fila.abreviatura}</span>
                          {fila.clubId ? <Link className="hover:text-red-600" to={`/clubs/${fila.clubId}`}>{fila.club}</Link> : <span>{fila.club}</span>}
                        </td>
                        {[fila.pj, fila.pg, fila.pe, fila.pp, fila.gf, fila.gc].map((dato, indice) => (
                          <td key={indice} className="px-2 py-2.5 text-center">{dato}</td>
                        ))}
                        <td className={`px-2 py-2.5 text-center font-semibold ${diferencia > 0 ? 'text-emerald-600' : diferencia < 0 ? 'text-red-500' : 'text-slate-500'}`}>
                          {diferencia > 0 ? `+${diferencia}` : diferencia}
                        </td>
                        <td className="px-3 py-2.5 text-center text-sm font-black text-blue-600">{fila.puntos}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex justify-center gap-1" aria-label={`Últimos resultados: ${fila.ultimosResultados.join(', ')}`}>
                            {fila.ultimosResultados.map((resultado, indice) => (
                              <span key={`${fila.id}-${indice}`} className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${claseResultado(resultado)}`}>{resultado}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="border-t border-slate-100 bg-slate-50/80 px-4 py-3 text-xs text-slate-500">
              Las fichas locales disponibles son Colo-Colo, U. de Chile, U. Católica y Cobreloa.
            </p>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-slate-800">Criterios de Clasificación y Premios 2026</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3"><span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">1° - 2°</span><p className="mt-2 text-xs font-bold text-emerald-800">Fase de Grupos Copa Libertadores</p></div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3"><span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">3°</span><p className="mt-2 text-xs font-bold text-blue-800">Fase Previa Copa Libertadores</p></div>
              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-3"><span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">4° - 7°</span><p className="mt-2 text-xs font-bold text-cyan-800">Copa Sudamericana</p></div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-3"><span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">15° - 16°</span><p className="mt-2 text-xs font-bold text-red-700">Descenso directo a Primera B</p></div>
            </div>
          </section>
        </section>

        <aside className="space-y-6 lg:col-span-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-center">
              <h2 className="text-sm font-bold text-slate-800">Fixture / Jornadas</h2>
              <div className="flex items-center overflow-hidden rounded-md border border-slate-200 text-xs font-semibold" aria-label="Seleccionar jornada">
                {jornadas.map((numero) => (
                  <button
                    key={numero}
                    type="button"
                    aria-pressed={jornada === numero}
                    onClick={() => setJornada(numero)}
                    className={`px-2.5 py-1 transition-colors ${jornada === numero ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    F{numero}
                  </button>
                ))}
              </div>
            </div>
            <p className="mb-3 text-xs text-slate-400">Jornada {jornada} · fixture de muestra</p>
            {partidosJornada.length === 0 ? (
              <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">No hay partidos de muestra registrados para esta jornada.</p>
            ) : (
              <div className="space-y-3">
                {partidosJornada.map((partido) => (
                  <article key={partido.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-slate-500">{partido.fecha}</span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{partido.estado}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 px-1 py-1 text-xs">
                      <span className="w-2/5 font-bold text-slate-800">{partido.local}</span>
                      <span className="rounded border border-slate-200 bg-white px-2.5 py-1 font-black text-slate-900 shadow-sm">{partido.marcador}</span>
                      <span className="w-2/5 text-right font-bold text-slate-800">{partido.visita}</span>
                    </div>
                    <p className="mt-2 text-center text-[10px] text-slate-400">{partido.estadio}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <h2 className="border-b border-slate-100 p-4 text-sm font-bold text-slate-800">Tabla de Goleadores <span className="font-normal text-slate-400">· muestra</span></h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase text-slate-400">
                  <tr><th className="px-3 py-2.5 text-center">#</th><th className="px-2 py-2.5">Jugador</th><th className="px-2 py-2.5">Club</th><th className="px-2 py-2.5 text-center">Penal</th><th className="px-3 py-2.5 text-center">Goles</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {goleadoresOrdenados.map((goleador, indice) => (
                    <tr key={goleador.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2.5 text-center font-bold text-slate-400">{indice + 1}</td>
                      <td className="px-2 py-2.5"><p className="font-bold text-slate-900">{goleador.jugador.nombre} {goleador.jugador.apellido}</p><p className="text-[10px] text-slate-400">{goleador.jugador.nacionalidad}</p></td>
                      <td className="whitespace-nowrap px-2 py-2.5 text-[11px] text-slate-600">{goleador.jugador.club?.nombreCorto ?? 'Sin club'}</td>
                      <td className="px-2 py-2.5 text-center text-slate-400">{goleador.golesPenal}</td>
                      <td className="px-3 py-2.5 text-center text-sm font-black text-red-600">{goleador.jugador.goles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
