import type { Club } from '../types/Club';
import { PIES, POSICIONES } from '../types/Jugador';
import type { FiltrosJugadores as Filtros } from '../utils/jugadores';

interface Props {
  filtros: Filtros;
  clubes: Club[];
  nacionalidades: string[];
  onCambiar: (filtros: Filtros) => void;
  onLimpiar: () => void;
}

const ESTILO_CAMPO =
  'w-full rounded-full border-0 bg-white px-4 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-rnfc-rojo';
const ESTILO_ETIQUETA = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80';

// Panel de búsqueda y filtros: muestra los campos y avisa los cambios a la página
export default function FiltrosJugadores({ filtros, clubes, nacionalidades, onCambiar, onLimpiar }: Props) {
  function cambiar<K extends keyof Filtros>(campo: K, valor: Filtros[K]) {
    onCambiar({ ...filtros, [campo]: valor });
  }

  return (
    <section aria-label="Filtros de jugadores" className="rounded-2xl bg-rnfc-indigo p-5 shadow-lg">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label htmlFor="filtro-texto" className={ESTILO_ETIQUETA}>Buscar jugador</label>
          <input
            id="filtro-texto"
            type="search"
            placeholder="Nombre, apellido o dorsal..."
            value={filtros.texto}
            onChange={(e) => cambiar('texto', e.target.value)}
            className={ESTILO_CAMPO}
          />
        </div>

        <div>
          <label htmlFor="filtro-club" className={ESTILO_ETIQUETA}>Club</label>
          <select
            id="filtro-club"
            value={filtros.clubId}
            onChange={(e) => cambiar('clubId', e.target.value)}
            className={ESTILO_CAMPO}
          >
            <option value="">Todos</option>
            {clubes.map((club) => (
              <option key={club.id} value={club.id}>{club.nombreCorto}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-posicion" className={ESTILO_ETIQUETA}>Posición</label>
          <select
            id="filtro-posicion"
            value={filtros.posicion}
            onChange={(e) => cambiar('posicion', e.target.value as Filtros['posicion'])}
            className={ESTILO_CAMPO}
          >
            <option value="">Todas</option>
            {POSICIONES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-pais" className={ESTILO_ETIQUETA}>Nacionalidad</label>
          <select
            id="filtro-pais"
            value={filtros.nacionalidad}
            onChange={(e) => cambiar('nacionalidad', e.target.value)}
            className={ESTILO_CAMPO}
          >
            <option value="">Todas</option>
            {nacionalidades.map((pais) => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-pie" className={ESTILO_ETIQUETA}>Pie dominante</label>
          <select
            id="filtro-pie"
            value={filtros.pieDominante}
            onChange={(e) => cambiar('pieDominante', e.target.value as Filtros['pieDominante'])}
            className={ESTILO_CAMPO}
          >
            <option value="">Todos</option>
            {PIES.map((pie) => (
              <option key={pie} value={pie}>{pie}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end border-t border-white/15 pt-4">
        <button
          type="button"
          onClick={onLimpiar}
          className="rounded-full px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/40 transition-colors hover:bg-white/10"
        >
          Limpiar filtros
        </button>
      </div>
    </section>
  );
}
