import { obtenerJson } from './api';
import type { GoleadorTorneo, PartidoTorneo, PosicionTorneo } from '../types/Torneo';

export function obtenerPosiciones(): Promise<PosicionTorneo[]> {
  return obtenerJson<PosicionTorneo[]>('/api/posiciones');
}

export function obtenerPartidos(): Promise<PartidoTorneo[]> {
  return obtenerJson<PartidoTorneo[]>('/api/partidos');
}

export function obtenerGoleadores(): Promise<GoleadorTorneo[]> {
  return obtenerJson<GoleadorTorneo[]>('/api/goleadores');
}
