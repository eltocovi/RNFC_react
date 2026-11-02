import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import TarjetaRanking from '../components/TarjetaRanking';
import {
  ID_LIGA_PRIMERA,
  obtenerCompeticiones,
  obtenerEstadisticasPorCompeticion,
} from '../services/estadisticas';
import { CATEGORIAS_RANKING } from '../types/Estadistica';
import type { Competicion, EstadisticaJugador } from '../types/Estadistica';
import { calcularRanking, obtenerLider, ordenarPor } from '../utils/estadisticas';
import type { CampoNumerico } from '../utils/estadisticas';

const COLUMNAS: { campo: CampoNumerico; corto: string; largo: string }[] = [
  { campo: 'partidos', corto: 'PJ', largo: 'Partidos jugados' },
  { campo: 'goles', corto: 'G', largo: 'Goles' },
  { campo: 'asistencias', corto: 'A', largo: 'Asistencias' },
  { campo: 'amarillas', corto: 'TA', largo: 'Tarjetas amarillas' },
  { campo: 'rojas', corto: 'TR', largo: 'Tarjetas rojas' },
  { campo: 'valoracion', corto: 'VAL', largo: 'Valoración promedio' },
];

const DESTACADOS: { campo: CampoNumerico; titulo: string; unidad: string }[] = [
  { campo: 'goles', titulo: 'Máximo goleador', unidad: 'Goles' },
  { campo: 'asistencias', titulo: 'Máximo asistidor', unidad: 'Asistencias' },
  { campo: 'valoracion', titulo: 'Jugador más valorado', unidad: 'Valoración' },
];

function formatearValor(campo: CampoNumerico, valor: number): string {
  return campo === 'valoracion' ? valor.toFixed(2) : String(valor);
}

export default function PaginaEstadisticas() {
  const [parametros, setParametros] = useSearchParams();
  const idParametro = Number(parametros.get('competicion'));
  const competicionId = Number.isInteger(idParametro) && idParametro > 0 ? idParametro : ID_LIGA_PRIMERA;

  const [competiciones, setCompeticiones] = useState<Competicion[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticaJugador[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  const [busqueda, setBusqueda] = useState('');
  const [club, setClub] = useState('');
  const [orden, setOrden] = useState<CampoNumerico>('goles');

  // Carga las competiciones y las estadísticas de la competición elegida
  useEffect(() => {
    let activo = true;

    async function cargar() {
      setCargando(true);
      try {
        const [datosCompeticiones, datosEstadisticas] = await Promise.all([
          obtenerCompeticiones(),
          obtenerEstadisticasPorCompeticion(competicionId),
        ]);
        if (!activo) return;
        setCompeticiones(datosCompeticiones);
        setEstadisticas(datosEstadisticas);
        setError(null);
      } catch (e) {
        if (!activo) return;
        setError(e instanceof Error ? e.message : 'Ocurrió un error inesperado.');
      } finally {
        if (activo) setCargando(false);
      }
    }

    void cargar();
    return () => {
      activo = false;
    };
  }, [competicionId, intento]);

  const competicion = competiciones.find((c) => c.id === competicionId);

  const clubes = useMemo(
    () => [...new Set(estadisticas.map((e) => e.club))].sort((a, b) => a.localeCompare(b, 'es')),
    [estadisticas],
  );

  // Tabla completa con búsqueda, filtro por club y orden por columna
  const filasTabla = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    const filtradas = estadisticas.filter(
      (e) => (!club || e.club === club) && (!texto || e.jugador.toLowerCase().includes(texto)),
    );
    return ordenarPor(filtradas, orden);
  }, [estadisticas, busqueda, club, orden]);

  function cambiarCompeticion(id: number): void {
    setParametros({ competicion: String(id) });
    setBusqueda('');
    setClub('');
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-rnfc-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-rnfc-blue via-rnfc-blue/95 to-rnfc-red-dark/80" />
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-rnfc-red/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-gold">Temporada 2026</p>
          <h1 className="mt-2 font-display text-5xl uppercase tracking-wide text-white sm:text-6xl">
            Estadísticas
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Rankings de goles, asistencias y tarjetas de cada competición del fútbol chileno.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {competiciones.length > 0 && (
          <nav aria-label="Competiciones" className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {competiciones.map((c) => {
              const activa = c.id === competicionId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => cambiarCompeticion(c.id)}
                  aria-pressed={activa}
                  className={`flex shrink-0 items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold transition ${
                    activa
                      ? 'border-rnfc-red bg-rnfc-red text-white shadow-md shadow-rnfc-red/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-rnfc-red/40 hover:text-rnfc-red'
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-1">
                    <img src={c.imagen} alt="" className="max-h-full max-w-full object-contain" />
                  </span>
                  {c.nombre}
                </button>
              );
            })}
          </nav>
        )}

        {cargando && <p className="py-10 text-center text-slate-500">Cargando estadísticas...</p>}

        {!cargando && error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => setIntento((actual) => actual + 1)}
              className="mt-4 rounded-full bg-rnfc-red px-5 py-2 text-sm font-semibold text-white hover:bg-rnfc-red-dark"
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !error && !competicion && (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-500">
            La competición seleccionada no existe.
          </p>
        )}

        {!cargando && !error && competicion && (
          <>
            <section aria-label="Jugadores destacados" className="grid gap-4 md:grid-cols-3">
              {DESTACADOS.map((destacado) => {
                const lider = obtenerLider(estadisticas, destacado.campo);
                return (
                  <article
                    key={destacado.campo}
                    className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-rnfc-red">
                        {destacado.titulo}
                      </p>
                      <p className="mt-1 truncate font-display text-2xl tracking-wide text-slate-900">
                        {lider?.jugador ?? 'Sin datos'}
                      </p>
                      <p className="truncate text-sm text-slate-500">{lider?.club ?? '—'}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-5xl leading-none text-rnfc-navy">
                        {lider ? formatearValor(destacado.campo, lider[destacado.campo]) : '—'}
                      </p>
                      <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                        {destacado.unidad}
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>

            <section aria-labelledby="titulo-rankings">
              <h2 id="titulo-rankings" className="font-display text-3xl uppercase tracking-wide text-slate-900">
                Top 5 · {competicion.nombre}
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
            </section>

            <section
              aria-labelledby="titulo-tabla"
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5"
            >
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 id="titulo-tabla" className="font-display text-3xl uppercase tracking-wide text-slate-900">
                    Todos los jugadores
                  </h2>
                  <p className="text-xs text-slate-400">Haz clic en una columna para ordenar.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="search"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar jugador..."
                    aria-label="Buscar jugador"
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-rnfc-red focus:ring-2 focus:ring-rnfc-red/15"
                  />
                  <select
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                    aria-label="Filtrar por club"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-rnfc-red focus:ring-2 focus:ring-rnfc-red/15"
                  >
                    <option value="">Todos los clubes</option>
                    {clubes.map((nombre) => (
                      <option key={nombre} value={nombre}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filasTabla.length === 0 ? (
                <p className="p-8 text-center text-sm text-slate-500">
                  No se encontraron jugadores con los filtros seleccionados.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-[0.68rem] font-bold uppercase tracking-wide text-slate-500">
                      <tr>
                        <th scope="col" className="w-12 px-4 py-3 text-center">#</th>
                        <th scope="col" className="px-4 py-3">Jugador</th>
                        {COLUMNAS.map((columna) => (
                          <th key={columna.campo} scope="col" className="px-2 py-3 text-center" aria-sort={orden === columna.campo ? 'descending' : 'none'}>
                            <button
                              type="button"
                              onClick={() => setOrden(columna.campo)}
                              title={columna.largo}
                              className={`rounded-full px-2.5 py-1 transition ${
                                orden === columna.campo ? 'bg-rnfc-red text-white' : 'hover:bg-slate-200'
                              }`}
                            >
                              {columna.corto}
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filasTabla.map((fila, indice) => (
                        <tr key={fila.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-center text-xs font-bold text-slate-400">{indice + 1}</td>
                          <td className="px-4 py-3">
                            <p className="whitespace-nowrap font-bold text-slate-800">{fila.jugador}</p>
                            <p className="whitespace-nowrap text-xs text-slate-400">{fila.club}</p>
                          </td>
                          {COLUMNAS.map((columna) => (
                            <td
                              key={columna.campo}
                              className={`px-2 py-3 text-center tabular-nums ${
                                orden === columna.campo ? 'font-extrabold text-rnfc-navy' : ''
                              }`}
                            >
                              {formatearValor(columna.campo, fila[columna.campo])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
