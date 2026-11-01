export function TournamentBanner() {
  return (
    <section
      className="relative rounded-2xl overflow-hidden shadow-xl text-white p-6 sm:p-9 bg-linear-to-r from-[#ba1325] via-[#851020] to-[#25101a]"
      data-purpose="hero-banner"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full p-2.5 shadow-2xl flex items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center text-slate-800">
            <i className="fa-solid fa-trophy text-amber-500 text-2xl mb-1"></i>
            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-none">
              LIGA DE PRIMERA
            </span>
            <span className="text-xs font-black text-red-600 tracking-tighter">
              mercado libre
            </span>
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
            <span className="bg-[#f6b426] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-tight shadow-sm">
              Temporada Oficial 2026
            </span>
            <span className="bg-white text-slate-800 text-[11px] font-semibold px-3 py-1 rounded-full tracking-tight shadow-sm">
              ANFP / Federación de Fútbol de Chile
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2 leading-tight">
            Campeonato Nacional Primera División 2026
          </h1>
          <p className="text-red-100/90 text-xs sm:text-sm font-normal max-w-4xl leading-relaxed mb-6">
            Máxima categoría del fútbol profesional chileno. El campeón y
            subcampeón clasifican directamente a la fase de grupos de la Copa
            Libertadores, mientras que los puestos del 4° al 7° acceden a la
            Copa Sudamericana.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-left max-w-xl">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="block text-[11px] text-white/70 font-medium">
                Jornada Actual
              </span>
              <span className="text-sm font-bold text-white tracking-wide">
                Fecha 8 de 30
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="block text-[11px] text-white/70 font-medium">
                Equipos Participantes
              </span>
              <span className="text-sm font-bold text-white tracking-wide">
                16 Clubes
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="block text-[11px] text-white/70 font-medium">
                Sistema
              </span>
              <span className="text-sm font-bold text-white tracking-wide">
                Liga Todos vs Todos (Ida y Vuelta)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
