import type { Club } from './Club';

export type Posicion = 'Arquero' | 'Defensa' | 'Mediocampista' | 'Delantero';
export const POSICIONES: Posicion[] = ['Arquero', 'Defensa', 'Mediocampista', 'Delantero'];

export type PieDominante = 'Diestro' | 'Zurdo' | 'Ambidiestro';
export const PIES: PieDominante[] = ['Diestro', 'Zurdo', 'Ambidiestro'];

// Jugador tal como viene de la API
export interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string; // "AAAA-MM-DD"
  nacionalidad: string;
  posicion: Posicion;
  pieDominante: PieDominante;
  dorsal: number;
  clubId: number;
  partidos: number;
  goles: number;
}

// Jugador con los datos de su club ya unidos
export interface JugadorConClub extends Jugador {
  club?: Club;
}
