export default function ClubBanner() {
  return (
    <section className="relative rounded-2xl overflow-hidden shadow-xl text-white p-6 sm:p-9 bg-linear-to-r from-[#ba1325] via-[#851020] to-[#25101a]"
      data-purpose="hero-banner">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-2 flex items-center justify-center shadow-xl shrink-0 border-4 border-slate-100">
          <div className="w-full h-full rounded-full border-2 border-slate-300 flex flex-col items-center justify-center bg-white text-slate-900 relative overflow-hidden">
            <div className="w-full bg-[#002f6c] text-[9px] font-bold text-white text-center py-0.5 tracking-tight">
              COLO-COLO
            </div>
            <div className="my-auto text-center px-1">
              <i className="fa-solid fa-feather-pointed text-red-600 text-base mb-0.5"></i>
              <div className="text-[11px] font-black uppercase leading-3 tracking-tighter">
                COLO-COLO
              </div>
            </div>
            <div className="w-full bg-red-600 text-[7px] text-white text-center py-0.2 font-semibold">
              1925
            </div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <span className="bg-black/40 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-0.5 rounded-full font-medium border border-white/10">
              Fundado en 1925
            </span>
            <span className="bg-amber-400 text-slate-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
              #1 en Primera División
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1 text-white">
            Club Social y Deportivo Colo-Colo
          </h1>
          <p className="text-red-200 text-sm font-medium mb-6">
            El Cacique / Los Albos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
            <div className="bg-black/35 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-300 block tracking-wider">
                Estadio
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate block">
                Estadio Monumental David Arellano
              </span>
            </div>
            <div className="bg-black/35 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-300 block tracking-wider">
                Director Técnico
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate block">
                Jorge Almirón
              </span>
            </div>
            <div className="bg-black/35 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-300 block tracking-wider">
                Títulos Nacionales
              </span>
              <span className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1">
                <span>★</span> 33 Campeonatos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
