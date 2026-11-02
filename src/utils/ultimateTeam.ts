import type { Posicion } from '../types/Jugador';

export const CUPO_TITULARES: { posicion: Posicion; cantidad: number }[] = [
  { posicion: 'Arquero', cantidad: 1 },
  { posicion: 'Defensa', cantidad: 4 },
  { posicion: 'Mediocampista', cantidad: 3 },
  { posicion: 'Delantero', cantidad: 3 },
];

export const MAX_RESERVAS = 7;
export const MAX_EQUIPO = 18;

export interface Equipo {
  titulares: number[];
  reservas: number[];
}

export interface DatosEquipoGuardado {
  equipo: Equipo;
  error: string;
}

export function claveEquipo(usuarioId: number): string {
  return `rnfc_ultimate_team_${usuarioId}`;
}

export function leerEquipo(clave: string): DatosEquipoGuardado {
  try {
    const guardado = localStorage.getItem(clave);
    if (!guardado) return { equipo: { titulares: [], reservas: [] }, error: '' };

    const equipo = JSON.parse(guardado) as Partial<Equipo>;
    if (
      !Array.isArray(equipo.titulares) ||
      !Array.isArray(equipo.reservas) ||
      !equipo.titulares.every(Number.isInteger) ||
      !equipo.reservas.every(Number.isInteger)
    ) {
      return {
        equipo: { titulares: [], reservas: [] },
        error: 'El equipo guardado no es válido. Se iniciará una selección nueva.',
      };
    }

    return {
      equipo: {
        titulares: equipo.titulares.slice(0, 11),
        reservas: equipo.reservas.slice(0, MAX_RESERVAS),
      },
      error: '',
    };
  } catch {
    return {
      equipo: { titulares: [], reservas: [] },
      error: 'No se pudo leer el equipo guardado en este navegador.',
    };
  }
}
