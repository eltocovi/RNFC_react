import type { Jugador } from '../types/Jugador';
import { obtenerJson } from './api';

const URL = '/api/jugadores';

export function obtenerJugadores(): Promise<Jugador[]> {
  return obtenerJson<Jugador[]>(URL);
}
