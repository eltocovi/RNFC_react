import type { JugadorConClub } from './Jugador';

export type ResultadoTorneo = 'V' | 'E' | 'D';

export interface PosicionTorneo {
  id: number;
  posicion: number;
  club: string;
  abreviatura: string;
  clubId?: number;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  puntos: number;
  ultimosResultados: ResultadoTorneo[];
}

export interface PartidoTorneo {
  id: number;
  jornada: number;
  fecha: string;
  estado: string;
  local: string;
  visita: string;
  marcador: string;
  estadio: string;
}

export interface GoleadorTorneo {
  id: number;
  jugadorId: number;
  golesPenal: number;
}

export interface GoleadorConJugador extends GoleadorTorneo {
  jugador: JugadorConClub;
}
