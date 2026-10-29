import { MainLogo } from "./MainLogo";
import { Navbar } from "./Navbar";

export function Header() {
    return (
        <header className="bg-rnfc-red text-white shadow-md sticky top-0 z-50">
            <div className="max-w-345 mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                    <MainLogo />
                    <Navbar/>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block w-72 md:w-80">
                        <input className="w-full bg-white text-slate-700 text-xs rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-gray-400 border-none shadow-inner" placeholder="Buscar jugador, equipo, competición..." type="text"/>
                        <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-3 text-gray-400 text-sm pointer-events-none"></i>
                    </div>
                    <button className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-sm">
                        <i className="fa-solid fa-user text-sm"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}