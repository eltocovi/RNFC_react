import { TournamentBanner } from "../components/TournamentBanner";

export default function Home() {
  return (
    <main className="max-w-345 mx-auto px-4 sm:px-6 lg:px-8 py-7 flex-1 w-full space-y-7">
        <TournamentBanner />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <section
          className="lg:col-span-8 space-y-6"
          data-purpose="standings-and-rules"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-red-500 text-lg">
                  <i className="fa-solid fa-table-cells"></i>
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    Tabla de Posiciones
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Actualizado tras la Fecha 8
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
                  <span>Copa Libertadores</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block"></span>
                  <span>Copa Sudamericana</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block"></span>
                  <span>Descenso</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-left border-collapse">
                <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3 text-center w-12" scope="col">
                      POS
                    </th>
                    <th className="py-3 px-3 min-w-[190px]" scope="col">
                      CLUB
                    </th>
                    <th className="py-3 px-2 text-center" scope="col">
                      PJ
                    </th>
                    <th className="py-3 px-2 text-center" scope="col">
                      PG
                    </th>
                    <th className="py-3 px-2 text-center" scope="col">
                      PE
                    </th>
                    <th className="py-3 px-2 text-center" scope="col">
                      PP
                    </th>
                    <th className="py-3 px-2 text-center" scope="col">
                      GF
                    </th>
                    <th className="py-3 px-2 text-center" scope="col">
                      GC
                    </th>
                    <th className="py-3 px-2 text-center" scope="col">
                      DIF
                    </th>
                    <th
                      className="py-3 px-3 text-center font-black"
                      scope="col"
                    >
                      PTS
                    </th>
                    <th
                      className="py-3 px-4 text-center min-w-[140px]"
                      scope="col"
                    >
                      ÚLTIMOS 5
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-600 border-l-4 border-emerald-500">
                      1
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-800 border">
                        CC
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Colo-Colo
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">6</td>
                    <td className="text-center">1</td>
                    <td className="text-center">1</td>
                    <td className="text-center">17</td>
                    <td className="text-center">6</td>
                    <td className="text-center font-semibold text-emerald-600">
                      +11
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      19
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-600 border-l-4 border-emerald-500">
                      2
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[10px] border">
                        U
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        U. de Chile
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">5</td>
                    <td className="text-center">2</td>
                    <td className="text-center">1</td>
                    <td className="text-center">15</td>
                    <td className="text-center">7</td>
                    <td className="text-center font-semibold text-emerald-600">
                      +8
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      17
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-sky-600 border-l-4 border-sky-400">
                      3
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-[10px] border">
                        UC
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        U. Católica
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">5</td>
                    <td className="text-center">1</td>
                    <td className="text-center">2</td>
                    <td className="text-center">14</td>
                    <td className="text-center">9</td>
                    <td className="text-center font-semibold text-emerald-600">
                      +5
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      16
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-sky-600 border-l-4 border-sky-400">
                      4
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-[10px] border">
                        CQ
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Coquimbo Unido
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">4</td>
                    <td className="text-center">2</td>
                    <td className="text-center">2</td>
                    <td className="text-center">11</td>
                    <td className="text-center">7</td>
                    <td className="text-center font-semibold text-emerald-600">
                      +4
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      14
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-sky-600 border-l-4 border-sky-400">
                      5
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-[10px] border">
                        IQ
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Deportes Iquique
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">4</td>
                    <td className="text-center">1</td>
                    <td className="text-center">3</td>
                    <td className="text-center">13</td>
                    <td className="text-center">11</td>
                    <td className="text-center font-semibold text-emerald-600">
                      +2
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      13
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-sky-600 border-l-4 border-sky-400">
                      6
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-[10px] border">
                        UE
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Unión Española
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">3</td>
                    <td className="text-center">3</td>
                    <td className="text-center">2</td>
                    <td className="text-center">12</td>
                    <td className="text-center">10</td>
                    <td className="text-center font-semibold text-emerald-600">
                      +2
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      12
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-sky-600 border-l-4 border-sky-400">
                      7
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-green-50 text-green-700 flex items-center justify-center font-bold text-[10px] border">
                        PAL
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Palestino
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">3</td>
                    <td className="text-center">2</td>
                    <td className="text-center">3</td>
                    <td className="text-center">10</td>
                    <td className="text-center">9</td>
                    <td className="text-center font-semibold text-emerald-600">
                      +1
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      11
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-l-4 border-transparent">
                      8
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-[10px] border">
                        EVE
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Everton
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">3</td>
                    <td className="text-center">2</td>
                    <td className="text-center">3</td>
                    <td className="text-center">9</td>
                    <td className="text-center">9</td>
                    <td className="text-center font-semibold text-slate-500">
                      0
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      11
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-l-4 border-transparent">
                      9
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-red-50 text-red-700 flex items-center justify-center font-bold text-[10px] border">
                        ÑUB
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Ñublense
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">3</td>
                    <td className="text-center">1</td>
                    <td className="text-center">4</td>
                    <td className="text-center">8</td>
                    <td className="text-center">10</td>
                    <td className="text-center font-semibold text-red-500">
                      -2
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      10
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-l-4 border-transparent">
                      10
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-[10px] border">
                        COB
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Cobreloa
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">3</td>
                    <td className="text-center">0</td>
                    <td className="text-center">5</td>
                    <td className="text-center">8</td>
                    <td className="text-center">14</td>
                    <td className="text-center font-semibold text-red-500">
                      -6
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      9
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-l-4 border-transparent">
                      11
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-[10px] border">
                        OHI
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        O'Higgins
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">2</td>
                    <td className="text-center">3</td>
                    <td className="text-center">3</td>
                    <td className="text-center">7</td>
                    <td className="text-center">10</td>
                    <td className="text-center font-semibold text-red-500">
                      -3
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      9
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-l-4 border-transparent">
                      12
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] border">
                        HUA
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Huachipato
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">2</td>
                    <td className="text-center">2</td>
                    <td className="text-center">4</td>
                    <td className="text-center">7</td>
                    <td className="text-center">11</td>
                    <td className="text-center font-semibold text-red-500">
                      -4
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      8
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-l-4 border-transparent">
                      13
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-700 flex items-center justify-center font-bold text-[10px] border">
                        CSL
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Cobresal
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">2</td>
                    <td className="text-center">2</td>
                    <td className="text-center">4</td>
                    <td className="text-center">9</td>
                    <td className="text-center">14</td>
                    <td className="text-center font-semibold text-red-500">
                      -5
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      8
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-l-4 border-transparent">
                      14
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px] border">
                        AUD
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Audax Italiano
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">2</td>
                    <td className="text-center">1</td>
                    <td className="text-center">5</td>
                    <td className="text-center">8</td>
                    <td className="text-center">12</td>
                    <td className="text-center font-semibold text-red-500">
                      -4
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      7
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-v flex items-center justify-center">
                          V
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-red-600 border-l-4 border-red-500">
                      16
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-red-50 text-red-700 flex items-center justify-center font-bold text-[10px] border">
                        ULC
                      </span>
                      <a
                        className="hover:text-red-600 transition-colors"
                        href="#"
                      >
                        Unión La Calera
                      </a>
                    </td>
                    <td className="text-center font-medium">8</td>
                    <td className="text-center">1</td>
                    <td className="text-center">1</td>
                    <td className="text-center">6</td>
                    <td className="text-center">5</td>
                    <td className="text-center">13</td>
                    <td className="text-center font-semibold text-red-500">
                      -8
                    </td>
                    <td className="text-center font-black text-blue-600 text-sm">
                      4
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white font-bold">
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-e flex items-center justify-center">
                          E
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                        <span className="w-4 h-4 rounded-full badge-d flex items-center justify-center">
                          D
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
              <i className="fa-solid fa-circle-info text-slate-400 text-xs"></i>
              <span>
                Haz clic en el nombre de cualquier club para ver su ficha
                técnica institucional y plantilla completa.
              </span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-500">
                <i className="fa-solid fa-medal"></i>
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                Criterios de Clasificación y Premios 2026
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex flex-col justify-between">
                <span className="inline-block bg-slate-900 text-white font-bold text-[10px] px-2 py-0.5 rounded w-max mb-1.5">
                  1° - 2°
                </span>
                <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 leading-snug">
                  <i className="fa-solid fa-trophy text-emerald-600 text-xs"></i>
                  Fase de Grupos Copa Libertadores
                </p>
              </div>
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex flex-col justify-between">
                <span className="inline-block bg-slate-900 text-white font-bold text-[10px] px-2 py-0.5 rounded w-max mb-1.5">
                  3°
                </span>
                <p className="text-xs font-bold text-blue-800 flex items-center gap-1.5 leading-snug">
                  <i className="fa-solid fa-star text-blue-600 text-xs"></i>
                  Fase Previa Copa Libertadores
                </p>
              </div>
              <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-xl p-3 flex flex-col justify-between">
                <span className="inline-block bg-slate-900 text-white font-bold text-[10px] px-2 py-0.5 rounded w-max mb-1.5">
                  4° - 7°
                </span>
                <p className="text-xs font-bold text-cyan-800 flex items-center gap-1.5 leading-snug">
                  <i className="fa-solid fa-globe text-cyan-600 text-xs"></i>
                  Copa Sudamericana
                </p>
              </div>
              <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3 flex flex-col justify-between">
                <span className="inline-block bg-slate-900 text-white font-bold text-[10px] px-2 py-0.5 rounded w-max mb-1.5">
                  15° - 16°
                </span>
                <p className="text-xs font-bold text-red-700 flex items-center gap-1.5 leading-snug">
                  <i className="fa-solid fa-circle-down text-red-600 text-xs"></i>
                  Descenso directo a Primera B
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="lg:col-span-4 space-y-6"
          data-purpose="fixtures-and-scorers"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-calendar-days text-blue-600"></i>
                <h2 className="text-sm font-bold text-slate-800">
                  Fixture / Jornadas
                </h2>
              </div>
              <div className="flex items-center border border-slate-200 rounded-md overflow-hidden text-xs font-semibold">
                <button className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 transition-colors">
                  F7
                </button>
                <button className="px-2.5 py-1 bg-slate-800 text-white transition-colors">
                  F8
                </button>
                <button className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 transition-colors">
                  F9
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[10px]"></i> Viernes
                    4 Septiembre
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                    Finalizado
                  </span>
                </div>
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-left">
                    Colo-Colo
                  </span>
                  <span className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-black text-slate-900 shadow-sm">
                    1 - 0
                  </span>
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-right">
                    U. Católica
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-location-dot text-[9px]"></i>{" "}
                  Estadio Monumental
                </p>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[10px]"></i> Sábado 5
                    Septiembre
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                    Finalizado
                  </span>
                </div>
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-left">
                    U. de Chile
                  </span>
                  <span className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-black text-slate-900 shadow-sm">
                    1 - 0
                  </span>
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-right">
                    Palestino
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-location-dot text-[9px]"></i>{" "}
                  Estadio Nacional
                </p>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[10px]"></i> Sábado 5
                    Septiembre
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                    Finalizado
                  </span>
                </div>
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-left truncate">
                    Coquimbo Un...
                  </span>
                  <span className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-black text-slate-900 shadow-sm">
                    1 - 1
                  </span>
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-right">
                    Everton
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-location-dot text-[9px]"></i>{" "}
                  Francisco Sánchez Rumoroso
                </p>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[10px]"></i> Domingo
                    6 Septiembre
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                    Finalizado
                  </span>
                </div>
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-left">
                    Cobreloa
                  </span>
                  <span className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-black text-slate-900 shadow-sm">
                    1 - 0
                  </span>
                  <span className="font-bold text-xs text-slate-800 w-2/5 text-right">
                    Coquimbo U.
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-location-dot text-[9px]"></i> Zorros
                  del Desierto
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
              <span className="text-rose-500">
                <i className="fa-solid fa-bullseye"></i>
              </span>
              <h2 className="text-sm font-bold text-slate-800">
                Tabla de Goleadores
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-3 text-center w-8">#</th>
                    <th className="py-2.5 px-2">Jugador</th>
                    <th className="py-2.5 px-2">Club</th>
                    <th className="py-2.5 px-2 text-center">Penal</th>
                    <th className="py-2.5 px-3 text-center">Goles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                      1
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-bold text-slate-900 leading-tight">
                        Fernando Zampedri
                      </p>
                      <p className="text-[10px] text-slate-400">Argentina</p>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      U. Católica
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      3
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-red-600 text-sm">
                      13
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                      2
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-bold text-slate-900 leading-tight">
                        Leandro Fernández
                      </p>
                      <p className="text-[10px] text-slate-400">Argentina</p>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      U. de Chile
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      2
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-red-600 text-sm">
                      9
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                      3
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-bold text-slate-900 leading-tight">
                        Javier Correa
                      </p>
                      <p className="text-[10px] text-slate-400">Argentina</p>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      Colo-Colo
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      1
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-red-600 text-sm">
                      8
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                      4
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-bold text-slate-900 leading-tight">
                        Carlos Palacios
                      </p>
                      <p className="text-[10px] text-slate-400">Chile</p>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      Colo-Colo
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      2
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-red-600 text-sm">
                      7
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                      5
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-bold text-slate-900 leading-tight">
                        Gonzalo Tapia
                      </p>
                      <p className="text-[10px] text-slate-400">Chile</p>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      U. Católica
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      0
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-red-600 text-sm">
                      7
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                      6
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-bold text-slate-900 leading-tight">
                        Cristian Insaurralde
                      </p>
                      <p className="text-[10px] text-slate-400">Argentina</p>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      Cobreloa
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      1
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-red-600 text-sm">
                      6
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                      7
                    </td>
                    <td className="py-2.5 px-2">
                      <p className="font-bold text-slate-900 leading-tight">
                        Arturo Vidal
                      </p>
                      <p className="text-[10px] text-slate-400">Chile</p>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                      Colo-Colo
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      2
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-red-600 text-sm">
                      6
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
