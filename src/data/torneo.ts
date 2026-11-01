export interface PosicionTorneo {
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
  ultimosResultados: Array<"V" | "E" | "D">;
}

export interface PartidoTorneo {
  fecha: string;
  estado: string;
  local: string;
  visita: string;
  marcador: string;
  estadio: string;
}

export interface GoleadorTorneo {
  nombre: string;
  nacionalidad: string;
  club: string;
  golesPenal: number;
  goles: number;
}

// Datos de muestra heredados de la vista estática; no representan una tabla oficial.
export const posicionesMuestra: PosicionTorneo[] = [
  { posicion: 1, club: "Colo-Colo", abreviatura: "CC", clubId: 1, pj: 8, pg: 6, pe: 1, pp: 1, gf: 17, gc: 6, puntos: 19, ultimosResultados: ["V", "V", "V", "E", "V"] },
  { posicion: 2, club: "U. de Chile", abreviatura: "U", clubId: 2, pj: 8, pg: 5, pe: 2, pp: 1, gf: 15, gc: 7, puntos: 17, ultimosResultados: ["V", "D", "V", "V", "V"] },
  { posicion: 3, club: "U. Católica", abreviatura: "UC", clubId: 3, pj: 8, pg: 5, pe: 1, pp: 2, gf: 14, gc: 9, puntos: 16, ultimosResultados: ["V", "V", "D", "V", "D"] },
  { posicion: 4, club: "Coquimbo Unido", abreviatura: "CQ", pj: 8, pg: 4, pe: 2, pp: 2, gf: 11, gc: 7, puntos: 14, ultimosResultados: ["E", "V", "D", "V", "E"] },
  { posicion: 5, club: "Deportes Iquique", abreviatura: "IQ", pj: 8, pg: 4, pe: 1, pp: 3, gf: 13, gc: 11, puntos: 13, ultimosResultados: ["V", "D", "V", "D", "V"] },
  { posicion: 6, club: "Unión Española", abreviatura: "UE", pj: 8, pg: 3, pe: 3, pp: 2, gf: 12, gc: 10, puntos: 12, ultimosResultados: ["E", "V", "D", "E", "V"] },
  { posicion: 7, club: "Palestino", abreviatura: "PAL", pj: 8, pg: 3, pe: 2, pp: 3, gf: 10, gc: 9, puntos: 11, ultimosResultados: ["D", "V", "E", "D", "V"] },
  { posicion: 8, club: "Everton", abreviatura: "EVE", pj: 8, pg: 3, pe: 2, pp: 3, gf: 9, gc: 9, puntos: 11, ultimosResultados: ["V", "E", "V", "D", "D"] },
  { posicion: 9, club: "Ñublense", abreviatura: "ÑUB", pj: 8, pg: 3, pe: 1, pp: 4, gf: 8, gc: 10, puntos: 10, ultimosResultados: ["D", "D", "V", "V", "E"] },
  { posicion: 10, club: "Cobreloa", abreviatura: "COB", clubId: 4, pj: 8, pg: 3, pe: 0, pp: 5, gf: 8, gc: 14, puntos: 9, ultimosResultados: ["V", "D", "D", "V", "D"] },
  { posicion: 11, club: "O'Higgins", abreviatura: "OHI", pj: 8, pg: 2, pe: 3, pp: 3, gf: 7, gc: 10, puntos: 9, ultimosResultados: ["E", "E", "D", "V", "D"] },
  { posicion: 12, club: "Huachipato", abreviatura: "HUA", pj: 8, pg: 2, pe: 2, pp: 4, gf: 7, gc: 11, puntos: 8, ultimosResultados: ["D", "E", "D", "D", "V"] },
  { posicion: 13, club: "Cobresal", abreviatura: "CSL", pj: 8, pg: 2, pe: 2, pp: 4, gf: 9, gc: 14, puntos: 8, ultimosResultados: ["D", "E", "V", "D", "D"] },
  { posicion: 14, club: "Audax Italiano", abreviatura: "AUD", pj: 8, pg: 2, pe: 1, pp: 5, gf: 8, gc: 12, puntos: 7, ultimosResultados: ["V", "D", "D", "D", "E"] },
  { posicion: 16, club: "Unión La Calera", abreviatura: "ULC", pj: 8, pg: 1, pe: 1, pp: 6, gf: 5, gc: 13, puntos: 4, ultimosResultados: ["D", "D", "E", "D", "D"] },
];

export const partidosPorJornada: Record<number, PartidoTorneo[]> = {
  8: [
    { fecha: "Viernes 4 Septiembre", estado: "Finalizado", local: "Colo-Colo", visita: "U. Católica", marcador: "1 - 0", estadio: "Estadio Monumental" },
    { fecha: "Sábado 5 Septiembre", estado: "Finalizado", local: "U. de Chile", visita: "Palestino", marcador: "1 - 0", estadio: "Estadio Nacional" },
    { fecha: "Sábado 5 Septiembre", estado: "Finalizado", local: "Coquimbo Unido", visita: "Everton", marcador: "1 - 1", estadio: "Francisco Sánchez Rumoroso" },
    { fecha: "Domingo 6 Septiembre", estado: "Finalizado", local: "Cobreloa", visita: "Coquimbo Unido", marcador: "1 - 0", estadio: "Zorros del Desierto" },
  ],
};

export const goleadoresMuestra: GoleadorTorneo[] = [
  { nombre: "Fernando Zampedri", nacionalidad: "Argentina", club: "U. Católica", golesPenal: 3, goles: 13 },
  { nombre: "Leandro Fernández", nacionalidad: "Argentina", club: "U. de Chile", golesPenal: 2, goles: 9 },
  { nombre: "Javier Correa", nacionalidad: "Argentina", club: "Colo-Colo", golesPenal: 1, goles: 8 },
  { nombre: "Carlos Palacios", nacionalidad: "Chile", club: "Colo-Colo", golesPenal: 2, goles: 7 },
  { nombre: "Gonzalo Tapia", nacionalidad: "Chile", club: "U. Católica", golesPenal: 0, goles: 7 },
  { nombre: "Cristian Insaurralde", nacionalidad: "Argentina", club: "Cobreloa", golesPenal: 1, goles: 6 },
  { nombre: "Arturo Vidal", nacionalidad: "Chile", club: "Colo-Colo", golesPenal: 2, goles: 6 },
];
