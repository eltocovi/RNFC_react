import type { CategoriaRanking, EstadisticaJugador, FilaRanking } from '../types/Estadistica';

export type CampoNumerico = CategoriaRanking | 'partidos' | 'valoracion';

// Ordena de mayor a menor; los empates se ordenan por nombre
export function ordenarPor(estadisticas: EstadisticaJugador[], campo: CampoNumerico): EstadisticaJugador[] {
  return [...estadisticas].sort(
    (a, b) => b[campo] - a[campo] || a.jugador.localeCompare(b.jugador, 'es'),
  );
}

// Top N de una categoría con ranking de competición (empates comparten puesto: 1, 1, 3...)
export function calcularRanking(
  estadisticas: EstadisticaJugador[],
  categoria: CategoriaRanking,
  limite = 5,
): FilaRanking[] {
  const ordenadas = ordenarPor(estadisticas, categoria).filter((e) => e[categoria] > 0);

  return ordenadas.slice(0, limite).map((e) => ({
    posicion: ordenadas.findIndex((otra) => otra[categoria] === e[categoria]) + 1,
    jugador: e.jugador,
    club: e.club,
    valor: e[categoria],
  }));
}

// Jugador con el valor más alto en un campo (o undefined si no hay datos)
export function obtenerLider(
  estadisticas: EstadisticaJugador[],
  campo: CampoNumerico,
): EstadisticaJugador | undefined {
  const lider = ordenarPor(estadisticas, campo)[0];
  return lider && lider[campo] > 0 ? lider : undefined;
}
