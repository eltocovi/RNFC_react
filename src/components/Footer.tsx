export function Footer() {
  return (
    <footer className="bg-[#0b131e] text-slate-400 text-xs mt-12 border-t border-slate-800">
      <div className="max-w-345 mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight mb-0.5">
            <i className="fa-solid fa-shield-halved text-red-500 text-base"></i>
            <span>Registro Nacional de Fútbol Chileno (RNFC)</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Plataforma oficial para la consulta de clubes, competiciones y
            futbolistas del fútbol profesional chileno.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center space-x-6 text-[12px]">
            <a className="hover:text-white transition-colors" href="#">
              Competiciones
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Clubes
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Privacidad
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Términos
            </a>
          </div>
          <p className="text-[11px] text-slate-500">
            © 2026 RNFC. Proyecto Académico FullStack 2.
          </p>
        </div>
      </div>
    </footer>
  );
}
