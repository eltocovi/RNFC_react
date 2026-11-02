import type { CategoriaRanking, FilaRanking } from '../types/Estadistica';

interface Props {
  titulo: string;
  unidad: string;
  tipo: CategoriaRanking;
  filas: FilaRanking[];
}

function IconoCategoria({ tipo }: { tipo: CategoriaRanking }) {
  if (tipo === 'goles') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m12 7.5 3 2.2-1.1 3.5h-3.8L9 9.7l3-2.2ZM5.2 10.5l2.2.8M18.8 10.5l-2.2.8M9.7 17.3l1.2-2.1M14.3 17.3l-1.2-2.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (tipo === 'asistencias') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7.5 8.5 4l3.9 3.5L16.5 4 20 7.5l-3.5 3.2v7.8h-2.7v-5.2h-3.6v5.2H7.5V10.7L4 7.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (tipo === 'amarillas') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7.5" y="4" width="9" height="16" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10.5 8h3M10.5 11.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7.5" y="4" width="9" height="16" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// Tarjeta con el top de una categoría; la usan la landing y la página de estadísticas
export default function TarjetaRanking({ titulo, unidad, tipo, filas }: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-rnfc-red-dark to-rnfc-red py-3.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white">
        <IconoCategoria tipo={tipo} />
        {titulo}
      </div>
      <div className="px-4 py-2">
        {filas.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-400">Sin registros en esta categoría.</p>
        )}
        {filas.map((fila, indice) => (
          <div
            key={`${fila.jugador}-${indice}`}
            className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rnfc-navy text-[0.68rem] font-bold text-white">
              {fila.posicion}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold leading-tight text-slate-800">{fila.jugador}</p>
              <p className="truncate text-[0.7rem] text-slate-400">{fila.club}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-lg font-extrabold leading-none text-rnfc-navy">{fila.valor}</p>
              <p className="mt-0.5 text-[0.56rem] font-bold uppercase tracking-wide text-slate-400">
                {unidad}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
