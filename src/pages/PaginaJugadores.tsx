import { useEffect, useState } from 'react';
import FiltrosJugadores from '../components/FiltrosJugadores';
import JugadorCard from '../components/JugadorCard';
import { obtenerClubes } from '../services/clubes';
import { obtenerJugadores } from '../services/jugadores';
import type { Club } from '../types/Club';
import type { JugadorConClub } from '../types/Jugador';
import { FILTROS_VACIOS, filtrarJugadores, type FiltrosJugadores as Filtros } from '../utils/jugadores';

export default function PaginaJugadores() {
  const [jugadores, setJugadores] = useState<JugadorConClub[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS);
  const [intento, setIntento] = useState(0);

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

  const nacionalidades = [...new Set(jugadores.map((j) => j.nacionalidad))].sort();
  const resultado = filtrarJugadores(jugadores, filtros);

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
                <JugadorCard key={jugador.id} jugador={jugador} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
