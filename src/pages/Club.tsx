import ClubBanner from "../components/ClubBanner";

export default function Club() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full grow">
        <ClubBanner />
        <br />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-8 flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-users text-red-600"></i>
                Plantilla Oficial de Jugadores
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mostrando 15 de 15 futbolistas registrados
              </p>
            </div>
            <div className="w-full sm:w-64">
              <input
                className="w-full text-xs rounded-lg border-slate-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500 py-2 px-3 text-slate-700 placeholder-slate-400"
                placeholder="Buscar por nombre o dorsal..."
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <button className="px-4 py-1.5 rounded-lg bg-slate-800 text-white shadow-sm">
              Todos
            </button>
            <button className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              Porteros
            </button>
            <button className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              Defensas
            </button>
            <button className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              Mediocampistas
            </button>
            <button className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              Delanteros
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #1
                  </span>
                  <span className="text-[10px] font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                    Portero
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    1
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Brayan Cortés
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 29 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">18</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">0</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #12
                  </span>
                  <span className="text-[10px] font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                    Portero
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    12
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Fernando de Paul
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 33 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">4</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">0</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                    Suplente
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #4
                  </span>
                  <span className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Defensa
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    4
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Alan Saldivia
                  </h3>
                  <p className="text-xs text-slate-500">Uruguay · 22 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">19</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">1</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #15
                  </span>
                  <span className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Defensa
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    15
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Emiliano Amor
                  </h3>
                  <p className="text-xs text-slate-500">Argentina · 29 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">16</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">0</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #16
                  </span>
                  <span className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Defensa
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    16
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Óscar Opazo
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 33 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">17</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">1</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #21
                  </span>
                  <span className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Defensa
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    21
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Erick Wiemberg
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 29 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">18</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">2</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #23
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    Mediocampista
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    23
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Arturo Vidal
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 37 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">16</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">6</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #8
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    Mediocampista
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    8
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Esteban Pavez
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 34 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">20</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">1</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #5
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    Mediocampista
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    5
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Leonardo Gil
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 33 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">18</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">3</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #10
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    Mediocampista
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    10
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Carlos Palacios
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 24 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">19</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">7</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #7
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    Mediocampista
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    7
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Carlos Palacios Jr
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 21 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">9</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">1</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                    Suplente
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #9
                  </span>
                  <span className="text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
                    Delantero
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    9
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Javier Correa
                  </h3>
                  <p className="text-xs text-slate-500">Argentina · 31 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">12</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">8</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #11
                  </span>
                  <span className="text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
                    Delantero
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    11
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Marcos Bolados
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 28 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">17</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">4</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    Titular
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #20
                  </span>
                  <span className="text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
                    Delantero
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    20
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Alexander Oroz
                  </h3>
                  <p className="text-xs text-slate-500">Chile · 22 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">10</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">2</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                    Suplente
                  </span>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    #29
                  </span>
                  <span className="text-[10px] font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
                    Delantero
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-xl shadow-inner border border-slate-200">
                    29
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Guillermo Paiva
                  </h3>
                  <p className="text-xs text-slate-500">Paraguay · 27 años</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Partidos
                  </span>
                  <span className="font-bold text-slate-800">15</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">
                    Goles
                  </span>
                  <span className="font-bold text-red-600">5</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400">Rol</span>
                  <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                    Suplente
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>
        <aside className="lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <i className="fa-solid fa-circle-info text-blue-600"></i>
              Información Institucional
            </h3>
            <dl className="space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <dt className="text-slate-500 font-medium">Nombre Oficial:</dt>
                <dd className="text-slate-900 font-bold text-right">
                  Club Social y Deportivo Colo-Colo
                </dd>
              </div>
              <div className="flex justify-between items-start">
                <dt className="text-slate-500 font-medium">Ciudad / Región:</dt>
                <dd className="text-slate-900 font-bold text-right">
                  Santiago (Macul), Región Metropolitana
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-slate-500 font-medium">Presidente:</dt>
                <dd className="text-slate-900 font-bold">Aníbal Mosa</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-slate-500 font-medium">
                  Colores Oficiales:
                </dt>
                <dd className="text-slate-900 font-bold">Blanco y Negro</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-slate-500 font-medium">Copas Chile:</dt>
                <dd className="text-slate-900 font-bold">14 títulos</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-slate-500 font-medium">Sitio Oficial:</dt>
                <dd>
                  <a
                    className="text-blue-600 hover:underline font-semibold"
                    href="https://colocolo.cl"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    colocolo.cl
                  </a>
                </dd>
              </div>
            </dl>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100 leading-relaxed text-justify">
              Fundado el 19 de abril de 1925 por un grupo de futbolistas
              liderados por David Arellano. Es el club más laureado del fútbol
              profesional chileno y el único del país en ganar la Copa
              Libertadores de América (1991).
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <i className="fa-solid fa-location-dot text-red-600"></i>
              Estadio Principal
            </h3>
            <div className="space-y-1 mb-4">
              <h4 className="text-xs font-bold text-slate-900">
                Estadio Monumental David Arellano
              </h4>
              <p className="text-[11px] text-slate-500">
                Santiago (Macul) · Región Metropolitana
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Aforo / Capacidad:</span>
              <span className="bg-slate-700 text-white font-bold px-3 py-1 rounded text-xs">
                47.000 espectadores
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <i className="fa-regular fa-calendar-check text-emerald-600"></i>
              Últimos Partidos
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-bold text-slate-800">vs U. de Chile</p>
                  <p className="text-[10px] text-slate-400">Condición: Local</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] mb-0.5">
                    2 - 1
                  </span>
                  <span className="text-[9px] text-slate-400">Victoria</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-bold text-slate-800">vs Huachipato</p>
                  <p className="text-[10px] text-slate-400">
                    Condición: Visita
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] mb-0.5">
                    1 - 0
                  </span>
                  <span className="text-[9px] text-slate-400">Victoria</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-bold text-slate-800">vs Coquimbo U.</p>
                  <p className="text-[10px] text-slate-400">Condición: Local</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] mb-0.5">
                    2 - 0
                  </span>
                  <span className="text-[9px] text-slate-400">Victoria</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-bold text-slate-800">vs Cobresal</p>
                  <p className="text-[10px] text-slate-400">
                    Condición: Visita
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11px] mb-0.5">
                    2 - 2
                  </span>
                  <span className="text-[9px] text-slate-400">Empate</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">vs U. Católica</p>
                  <p className="text-[10px] text-slate-400">Condición: Local</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] mb-0.5">
                    1 - 0
                  </span>
                  <span className="text-[9px] text-slate-400">Victoria</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
