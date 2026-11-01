import type { JugadorConClub, PieDominante, Posicion } from '../types/Jugador';

// Valores del panel de filtros ('' = Todos)
export interface FiltrosJugadores {
  texto: string;
  posicion: Posicion | '';
  clubId: string;
  nacionalidad: string;
  pieDominante: PieDominante | '';
}

export const FILTROS_VACIOS: FiltrosJugadores = {
  texto: '',
  posicion: '',
  clubId: '',
  nacionalidad: '',
  pieDominante: '',
};

// Minúsculas y sin tildes, para buscar "cortes" y encontrar "Cortés"
export function normalizar(texto: string): string {
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Devuelve los jugadores que cumplen todos los filtros activos
export function filtrarJugadores(jugadores: JugadorConClub[], filtros: FiltrosJugadores): JugadorConClub[] {
  const busqueda = normalizar(filtros.texto.trim());

  return jugadores.filter((j) => {
    const nombreCompleto = normalizar(`${j.nombre} ${j.apellido}`);
    const coincideTexto =
      busqueda === '' || nombreCompleto.includes(busqueda) || String(j.dorsal) === busqueda;

    return (
      coincideTexto &&
      (filtros.posicion === '' || j.posicion === filtros.posicion) &&
      (filtros.clubId === '' || j.clubId === Number(filtros.clubId)) &&
      (filtros.nacionalidad === '' || j.nacionalidad === filtros.nacionalidad) &&
      (filtros.pieDominante === '' || j.pieDominante === filtros.pieDominante)
    );
  });
}

export function calcularEdad(fechaNacimiento: string): number {
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const aunNoCumple =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (aunNoCumple) edad--;
  return edad;
}
