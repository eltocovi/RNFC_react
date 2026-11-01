import type { JugadorConClub, Posicion } from '../types/Jugador';
import { calcularEdad } from '../utils/jugadores';

const COLOR_POSICION: Record<Posicion, string> = {
  Arquero: 'bg-amber-400 text-amber-950',
  Defensa: 'bg-blue-600 text-white',
  Mediocampista: 'bg-green-600 text-white',
  Delantero: 'bg-red-600 text-white',
};

interface Props {
  jugador: JugadorConClub;
}

export default function JugadorCard({ jugador }: Props) {
  const { club } = jugador;

  return (
    <article className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Posición y dorsal */}
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${COLOR_POSICION[jugador.posicion]}`}>
          {jugador.posicion}
        </span>
        <span className="text-2xl font-black text-rnfc-rojo">#{jugador.dorsal}</span>
      </div>

      {/* Nombre y club */}
      <h3 className="mt-3 text-lg leading-tight font-bold text-rnfc-azul">
        {jugador.nombre} {jugador.apellido}
      </h3>
      <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
        {club && <img src={club.escudo} alt="" className="h-5 w-5 object-contain" />}
        <span>{club?.nombreCorto ?? 'Sin club'}</span>
      </div>

      {/* Datos del jugador */}
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-slate-100 pt-3 text-sm">
        <dt className="text-slate-500">Nacionalidad</dt>
        <dd className="text-right font-semibold">{jugador.nacionalidad}</dd>
        <dt className="text-slate-500">Edad</dt>
        <dd className="text-right font-semibold">{calcularEdad(jugador.fechaNacimiento)} años</dd>
        <dt className="text-slate-500">Pie dominante</dt>
        <dd className="text-right font-semibold">{jugador.pieDominante}</dd>
        <dt className="text-slate-500">Partidos / Goles</dt>
        <dd className="text-right font-semibold">{jugador.partidos} / {jugador.goles}</dd>
      </dl>
    </article>
  );
}
