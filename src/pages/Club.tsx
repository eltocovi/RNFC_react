import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ClubBanner from "../components/ClubBanner";
import JugadorCard from "../components/JugadorCard";
import { obtenerClubes } from "../services/clubes";
import { obtenerJugadores } from "../services/jugadores";
import type { Club as ClubType } from "../types/Club";
import type { Jugador } from "../types/Jugador";
import { normalizar } from "../utils/jugadores";

type FiltroPosicion = "Todas" | "Arquero" | "Defensa" | "Mediocampista" | "Delantero";

const FILTROS: FiltroPosicion[] = ["Todas", "Arquero", "Defensa", "Mediocampista", "Delantero"];

export default function Club() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clubes, setClubes] = useState<ClubType[]>([]);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroPosicion, setFiltroPosicion] = useState<FiltroPosicion>("Todas");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      setCargando(true);
      try {
        const [datosClubes, datosJugadores] = await Promise.all([
          obtenerClubes(),
          obtenerJugadores(),
        ]);
        if (!activo) return;
        setClubes(datosClubes);
        setJugadores(datosJugadores);
        setError(null);
      } catch (e) {
        if (!activo) return;
        setError(e instanceof Error ? e.message : "Ocurrió un error inesperado.");
      } finally {
        if (activo) setCargando(false);
      }
    }

    void cargar();
    return () => {
      activo = false;
    };
  }, [intento]);

  const club = clubes.find((item) => item.id === Number(id)) ?? (id ? undefined : clubes[0]);
  const jugadoresClub = useMemo(
    () => jugadores.filter((jugador) => jugador.clubId === club?.id),
    [club?.id, jugadores],
  );
  const jugadoresFiltrados = useMemo(() => {
    const texto = normalizar(busqueda.trim());
    return jugadoresClub.filter((jugador) => {
      const nombre = normalizar(`${jugador.nombre} ${jugador.apellido}`);
      const coincideBusqueda = nombre.includes(texto) || String(jugador.dorsal).includes(texto);
      const coincidePosicion = filtroPosicion === "Todas" || jugador.posicion === filtroPosicion;
      return coincideBusqueda && coincidePosicion;
    });
  }, [busqueda, filtroPosicion, jugadoresClub]);

  if (cargando) {
    return <main className="mx-auto w-full max-w-7xl grow px-4 py-10 text-center text-slate-500">Cargando clubes...</main>;
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-7xl grow px-4 py-10">
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => setIntento((actual) => actual + 1)}
            className="mt-4 rounded-full bg-rnfc-rojo px-5 py-2 text-sm font-semibold text-white hover:bg-rnfc-rojo-oscuro"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  if (!club) {
    return (
      <main className="mx-auto w-full max-w-7xl grow px-4 py-10">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Club no encontrado</h1>
          <p className="mt-2 text-slate-500">Selecciona uno de los clubes disponibles en el registro.</p>
          <button
            type="button"
            onClick={() => navigate("/clubs")}
            className="mt-5 rounded-full bg-rnfc-rojo px-5 py-2 text-sm font-semibold text-white hover:bg-rnfc-rojo-oscuro"
          >
            Ver clubes
          </button>
        </div>
      </main>
    );
  }

  const jugadoresConClub = jugadoresFiltrados.map((jugador) => ({ ...jugador, club }));

  return (
    <main className="mx-auto w-full max-w-7xl grow space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-rnfc-rojo">Clubes</p>
          <h2 className="text-2xl font-extrabold text-rnfc-azul">Perfil del club</h2>
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 sm:min-w-64">
          Seleccionar club
          <select
            value={club.id}
            onChange={(event) => navigate(`/clubs/${event.target.value}`)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            {clubes.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>{opcion.nombreCorto}</option>
            ))}
          </select>
        </label>
      </div>

      <ClubBanner club={club} cantidadJugadores={jugadoresClub.length} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <section className="space-y-5 lg:col-span-8" aria-labelledby="plantilla-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 id="plantilla-heading" className="text-lg font-bold text-slate-900">Plantilla de jugadores</h2>
              <p className="mt-1 text-xs text-slate-500" aria-live="polite">
                Mostrando {jugadoresFiltrados.length} de {jugadoresClub.length} jugadores registrados
              </p>
            </div>
            <label className="w-full text-xs sm:w-64">
              <span className="sr-only">Buscar por nombre o dorsal</span>
              <input
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Buscar por nombre o dorsal..."
                type="search"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-medium" aria-label="Filtrar por posición">
            {FILTROS.map((filtro) => (
              <button
                key={filtro}
                type="button"
                aria-pressed={filtroPosicion === filtro}
                onClick={() => setFiltroPosicion(filtro)}
                className={`rounded-lg px-3.5 py-1.5 transition-colors ${
                  filtroPosicion === filtro
                    ? "bg-slate-800 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filtro === "Todas" ? "Todos" : filtro === "Arquero" ? "Arqueros" : filtro === "Mediocampista" ? "Mediocampistas" : filtro === "Delantero" ? "Delanteros" : "Defensas"}
              </button>
            ))}
          </div>

          {jugadoresClub.length === 0 ? (
            <p className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-sm">Este club aún no tiene jugadores registrados.</p>
          ) : jugadoresFiltrados.length === 0 ? (
            <p className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-sm">No se encontraron jugadores con esos filtros.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {jugadoresConClub.map((jugador) => <JugadorCard key={jugador.id} jugador={jugador} />)}
            </div>
          )}
        </section>

        <aside className="space-y-5 lg:col-span-4">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 border-b border-slate-100 pb-2 text-sm font-bold text-slate-900">Información registrada</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Nombre oficial</dt><dd className="text-right font-semibold text-slate-900">{club.nombre}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Ciudad</dt><dd className="text-right font-semibold text-slate-900">{club.ciudad}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Fundación</dt><dd className="text-right font-semibold text-slate-900">{club.fundacion}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Jugadores</dt><dd className="text-right font-semibold text-slate-900">{jugadoresClub.length}</dd></div>
            </dl>
            <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-500">
              Los datos institucionales y la plantilla se cargan desde el registro local del proyecto.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
