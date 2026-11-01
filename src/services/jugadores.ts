import type { Jugador, JugadorNuevo } from '../types/Jugador';
import { obtenerJson, peticionJson } from './api';

const URL = '/api/jugadores';

// Lista completa de jugadores
export function obtenerJugadores(): Promise<Jugador[]> {
  return obtenerJson<Jugador[]>(URL);
}

// Plantel de un club (para el Gestor Deportivo)
export function obtenerJugadoresPorClub(clubId: number): Promise<Jugador[]> {
  return obtenerJson<Jugador[]>(`${URL}?clubId=${clubId}`);
}

// Un jugador por id; si no existe lanza "El recurso solicitado no existe."
export function obtenerJugadorPorId(id: number): Promise<Jugador> {
  return obtenerJson<Jugador>(`${URL}/${id}`);
}

// Crea un jugador sin partidos ni goles; la API asigna el id y lo devuelve
export function crearJugador(jugador: JugadorNuevo): Promise<Jugador> {
  return obtenerJugadores().then((jugadores) => {
    const id = Math.max(0, ...jugadores.map((item) => item.id)) + 1;
    // json-server usa id_usuario como clave global, así que ambos IDs deben coincidir.
    return peticionJson<Jugador>(URL, 'POST', {
      ...jugador,
      id,
      id_usuario: id,
      partidos: 0,
      goles: 0,
    });
  });
}

// Actualiza los datos del formulario. Usa PATCH porque PUT reemplazaría
// el jugador completo y se perderían partidos y goles
export function actualizarJugador(id: number, jugador: JugadorNuevo): Promise<Jugador> {
  return peticionJson<Jugador>(`${URL}/${id}`, 'PATCH', jugador);
}

// Cambia solo los campos enviados (ej. { dorsal: 10 })
export function actualizarParcialJugador(id: number, cambios: Partial<JugadorNuevo>): Promise<Jugador> {
  return peticionJson<Jugador>(`${URL}/${id}`, 'PATCH', cambios);
}

export function eliminarJugador(id: number): Promise<void> {
  return peticionJson<void>(`${URL}/${id}`, 'DELETE');
}
