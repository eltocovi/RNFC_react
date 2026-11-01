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

// Datos del formulario para crear o editar (el id lo asigna la API; partidos y goles no se editan)
export type JugadorNuevo = Omit<Jugador, 'id' | 'partidos' | 'goles'>;

// Jugador con los datos de su club ya unidos
export interface JugadorConClub extends Jugador {
  club?: Club;
}
