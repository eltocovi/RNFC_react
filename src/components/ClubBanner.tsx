import type { Club } from "../types/Club";

interface Props {
  club: Club;
  cantidadJugadores: number;
}

export default function ClubBanner({ club, cantidadJugadores }: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#ba1325] via-[#851020] to-[#25101a] p-6 text-white shadow-xl sm:p-9"
      data-purpose="hero-banner">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-slate-100 bg-white p-3 shadow-xl sm:h-32 sm:w-32">
          <img src={club.escudo} alt={`Escudo de ${club.nombreCorto}`} className="h-full w-full object-contain" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <span className="bg-black/40 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-0.5 rounded-full font-medium border border-white/10">
              Fundado en {club.fundacion}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1 text-white">
            {club.nombre}
          </h1>
          <p className="text-red-100 text-sm font-medium mb-6">{club.ciudad}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            <div className="bg-black/35 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-300 block tracking-wider">
                Ciudad
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate block">
                {club.ciudad}
              </span>
            </div>
            <div className="bg-black/35 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-300 block tracking-wider">
                Jugadores registrados
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate block">
                {cantidadJugadores}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
