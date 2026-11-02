import { obtenerJson } from './api';
import type { Competicion, EstadisticaJugador } from '../types/Estadistica';

// Id de la Liga de Primera, la que se muestra en la landing page
export const ID_LIGA_PRIMERA = 1;

export function obtenerCompeticiones(): Promise<Competicion[]> {
  return obtenerJson<Competicion[]>('/api/competiciones');
}

export function obtenerEstadisticasPorCompeticion(competicionId: number): Promise<EstadisticaJugador[]> {
  return obtenerJson<EstadisticaJugador[]>(`/api/estadisticas?competicionId=${competicionId}`);
}
