export type TipoCompeticion = 'Liga' | 'Copa';

export interface Competicion {
  id: number;
  nombre: string;
  tipo: TipoCompeticion;
  imagen: string;
}

// Estadísticas de un jugador en una competición
export interface EstadisticaJugador {
  id: number;
  competicionId: number;
  jugador: string;
  club: string;
  partidos: number;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  valoracion: number;
}

export type CategoriaRanking = 'goles' | 'asistencias' | 'amarillas' | 'rojas';

export const CATEGORIAS_RANKING: { tipo: CategoriaRanking; titulo: string; unidad: string }[] = [
  { tipo: 'goles', titulo: 'Goleadores', unidad: 'Goles' },
  { tipo: 'asistencias', titulo: 'Asistencias', unidad: 'Asist.' },
  { tipo: 'amarillas', titulo: 'Tarjetas amarillas', unidad: 'T. amarillas' },
  { tipo: 'rojas', titulo: 'Tarjetas rojas', unidad: 'T. rojas' },
];

export interface FilaRanking {
  posicion: number;
  jugador: string;
  club: string;
  valor: number;
}
