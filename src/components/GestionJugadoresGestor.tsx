import { useEffect, useState } from 'react';
import Formulario from './Formulario';
import type { CampoFormulario } from './Formulario';
import { obtenerClubes } from '../services/clubes';
import {
  actualizarJugador,
  crearJugador,
  eliminarJugador,
  obtenerJugadores,
} from '../services/jugadores';
import type { Club } from '../types/Club';
import { PIES, POSICIONES } from '../types/Jugador';
import type { Jugador, JugadorNuevo } from '../types/Jugador';

interface Props {
  gestorId: number;
}

const CAMPOS_BASE: Omit<CampoFormulario, 'options'>[] = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'apellido', label: 'Apellido', required: true },
  { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date', required: true },
  { name: 'nacionalidad', label: 'Nacionalidad', required: true },
  { name: 'dorsal', label: 'Dorsal', type: 'number', required: true },
];

function mensajeError(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
}

export default function GestionJugadoresGestor({ gestorId }: Props) {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [jugadorEditando, setJugadorEditando] = useState<Jugador | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargar(): Promise<void> {
      setCargando(true);
      setError('');
      try {
        const [listaJugadores, listaClubes] = await Promise.all([
          obtenerJugadores(),
          obtenerClubes(),
        ]);
        if (activo) {
          setJugadores(listaJugadores.filter((jugador) => jugador.gestorId === gestorId));
          setClubes(listaClubes);
        }
      } catch (error: unknown) {
        if (activo) setError(mensajeError(error));
      } finally {
        if (activo) setCargando(false);
      }
    }

    void cargar();
    return () => {
      activo = false;
    };
  }, [gestorId, version]);

  const campos: CampoFormulario[] = [
    ...CAMPOS_BASE,
    {
      name: 'posicion',
      label: 'Posición',
      type: 'select',
      options: POSICIONES.map((posicion) => ({ label: posicion, value: posicion })),
      required: true,
    },
    {
      name: 'pieDominante',
      label: 'Pie dominante',
      type: 'select',
      options: PIES.map((pie) => ({ label: pie, value: pie })),
      required: true,
    },
    {
      name: 'clubId',
      label: 'Club',
      type: 'select',
      options: clubes.map((club) => ({ label: club.nombreCorto, value: String(club.id) })),
      required: true,
    },
  ];

  function valoresIniciales(jugador: Jugador | null): Record<string, string> {
    if (!jugador) return {};
    return {
      nombre: jugador.nombre,
      apellido: jugador.apellido,
      fechaNacimiento: jugador.fechaNacimiento,
      nacionalidad: jugador.nacionalidad,
      dorsal: String(jugador.dorsal),
      posicion: jugador.posicion,
      pieDominante: jugador.pieDominante,
      clubId: String(jugador.clubId),
    };
  }

  async function guardarJugador(valores: Record<string, string>): Promise<void> {
    setProcesando(true);
    setError('');
    setExito('');
    const datos: JugadorNuevo = {
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      fechaNacimiento: valores.fechaNacimiento,
      nacionalidad: valores.nacionalidad.trim(),
      dorsal: Number(valores.dorsal),
      posicion: valores.posicion as JugadorNuevo['posicion'],
      pieDominante: valores.pieDominante as JugadorNuevo['pieDominante'],
      clubId: Number(valores.clubId),
      gestorId,
    };

    try {
      if (jugadorEditando) {
        await actualizarJugador(jugadorEditando.id, datos);
        setExito('Jugador actualizado correctamente.');
      } else {
        await crearJugador(datos);
        setExito('Jugador creado correctamente.');
      }
      setJugadorEditando(null);
      setVersion((actual) => actual + 1);
    } catch (error: unknown) {
      setError(mensajeError(error));
    } finally {
      setProcesando(false);
    }
  }

  async function borrar(jugador: Jugador): Promise<void> {
    if (!window.confirm(`¿Eliminar a ${jugador.nombre} ${jugador.apellido}?`)) return;
    setProcesando(true);
    setError('');
    setExito('');
    try {
      await eliminarJugador(jugador.id);
      setExito('Jugador eliminado correctamente.');
      if (jugadorEditando?.id === jugador.id) setJugadorEditando(null);
      setVersion((actual) => actual + 1);
    } catch (error: unknown) {
      setError(mensajeError(error));
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl bg-linear-to-r from-rnfc-blue to-rnfc-red-dark p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Gestión deportiva</p>
        <h2 className="mt-2 font-display text-4xl uppercase tracking-wide">Mis jugadores</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Crea y administra el plantel asociado a tu cuenta de gestor.
        </p>
        <div className="mt-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
          {jugadores.length} {jugadores.length === 1 ? 'jugador registrado' : 'jugadores registrados'}
        </div>
      </header>

      <Formulario
        key={`${jugadorEditando?.id ?? 'nuevo'}-${clubes.length}`}
        campos={campos}
        valoresIniciales={valoresIniciales(jugadorEditando)}
        onSubmit={guardarJugador}
        titulo={jugadorEditando ? 'Editar jugador' : 'Registrar jugador'}
        descripcion="Completa los datos deportivos y asigna el club correspondiente."
        textoBoton={jugadorEditando ? 'Guardar cambios' : 'Crear jugador'}
        cargando={procesando || cargando || clubes.length === 0}
        error={error || (!cargando && clubes.length === 0 ? 'No hay clubes disponibles para asignar el jugador.' : '')}
        exito={exito}
        columnas={2}
        pie={
          jugadorEditando ? (
            <button
              type="button"
              onClick={() => {
                setJugadorEditando(null);
                setError('');
                setExito('');
              }}
              className="text-sm font-bold text-slate-500 transition hover:text-slate-800"
            >
              Cancelar edición
            </button>
          ) : undefined
        }
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900">Plantel</h3>
            <p className="mt-1 text-sm text-slate-500">Solo aparecen los jugadores creados desde tu cuenta.</p>
          </div>
          <button
            type="button"
            onClick={() => setVersion((actual) => actual + 1)}
            disabled={cargando}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-rnfc-red hover:text-rnfc-red disabled:opacity-50"
          >
            Actualizar
          </button>
        </div>

        {cargando ? (
          <p className="py-10 text-center text-sm text-slate-500">Cargando jugadores...</p>
        ) : error && jugadores.length === 0 ? (
          <div role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
        ) : jugadores.length === 0 ? (
          <p className="mt-5 rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">
            Aún no tienes jugadores registrados. Usa el formulario para crear el primero.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-slate-100">
            {jugadores.map((jugador) => (
              <li key={jugador.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-slate-900">{jugador.nombre} {jugador.apellido}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {jugador.posicion} · {jugador.nacionalidad} · Dorsal {jugador.dorsal}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {clubes.find((club) => club.id === jugador.clubId)?.nombreCorto ?? 'Club no disponible'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setJugadorEditando(jugador);
                      setError('');
                      setExito('');
                    }}
                    disabled={procesando}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-rnfc-red hover:text-rnfc-red disabled:opacity-50"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => void borrar(jugador)}
                    disabled={procesando}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
