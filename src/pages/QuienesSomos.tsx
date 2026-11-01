import { Link } from 'react-router';

const VALORES = [
  {
    titulo: 'Transparencia',
    texto: 'Información clara y trazable para que cada consulta tenga respaldo.',
    icono: (
      <path
        d="M12 3 4.5 6v5.5c0 4.4 3.2 8.4 7.5 9.5 4.3-1.1 7.5-5.1 7.5-9.5V6L12 3ZM9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: 'Pasión',
    texto: 'El fútbol chileno se vive con intensidad y nuestra plataforma lo refleja.',
    icono: (
      <path
        d="M12 20.5s-7-4.4-7-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: 'Rigor',
    texto: 'Datos ordenados y roles definidos para un trabajo serio y responsable.',
    icono: (
      <path
        d="M9 4h6v3.5a3 3 0 0 1-6 0V4Zm0 1.5H6.5A2.5 2.5 0 0 0 9 8.5M15 5.5h2.5A2.5 2.5 0 0 1 15 8.5M12 12v5M9 20h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: 'Comunidad',
    texto: 'Un punto de encuentro para aficionados, gestores y administradores.',
    icono: (
      <path
        d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 4.3a3.5 3.5 0 0 1 0 6.8M21 20v-1.5a4 4 0 0 0-3-3.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const ROLES = [
  {
    nombre: 'Usuario común',
    descripcion:
      'Puede crear su cuenta, iniciar sesión y administrar únicamente sus propias credenciales. Accede a la información pública de la plataforma.',
    permisos: ['Editar su correo y contraseña', 'Actualizar sus datos personales', 'Consultar el contenido público'],
    etiqueta: 'Acceso básico',
    color: 'border-sky-200 bg-sky-50 text-sky-700',
  },
  {
    nombre: 'Gestor deportivo',
    descripcion:
      'Administra la información de los jugadores que tiene asignados: puede agregarlos, modificarlos o quitarlos. Solo ve los registros que le pertenecen.',
    permisos: ['Agregar jugadores', 'Modificar sus jugadores', 'Eliminar sus registros'],
    etiqueta: 'Gestión deportiva',
    color: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  {
    nombre: 'Administrador',
    descripcion:
      'Tiene control total sobre la plataforma. Puede editar cualquier usuario, cambiar roles y supervisar la información registrada por los gestores.',
    permisos: ['Editar cualquier usuario', 'Asignar roles', 'Supervisar toda la información'],
    etiqueta: 'Acceso total',
    color: 'border-red-200 bg-red-50 text-red-700',
  },
];

const HITOS = [
  {
    anio: '2024',
    titulo: 'Nace la idea',
    texto: 'Un proyecto académico para ordenar la información del fútbol chileno.',
  },
  {
    anio: '2025',
    titulo: 'Primera versión',
    texto: 'Se construyen las fichas de clubes, competiciones y jugadores destacados.',
  },
  {
    anio: '2026',
    titulo: 'Plataforma de usuarios',
    texto: 'Se incorporan roles, autenticación JWT y gestión de credenciales.',
  },
];

export default function QuienesSomos() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-r from-rnfc-blue via-rnfc-blue to-rnfc-red-dark">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-white" />
          <div className="absolute bottom-0 left-1/4 h-52 w-52 translate-y-1/2 rounded-full border-[30px] border-white" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-20 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            <Link to="/" className="transition hover:text-white">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-rnfc-gold">Quiénes somos</span>
          </nav>
          <h1 className="max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl">
            Más que un registro, una forma de vivir el fútbol chileno
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            Somos una plataforma académica que reúne información de jugadores, clubes y
            competiciones para acercar el deporte nacional a su comunidad.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-rnfc-red/10 to-rnfc-navy/10" />
            <div className="relative flex aspect-square items-center justify-center rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10">
              <img
                src="/assets/escudo_rnfc.png"
                alt="Escudo RNFC"
                className="w-full max-w-xs object-contain drop-shadow-xl"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl">
              <p className="font-display text-4xl leading-none text-rnfc-red">2026</p>
              <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                Temporada oficial
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
              Nuestra identidad
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-tight tracking-wide text-slate-900 sm:text-5xl">
              Un proyecto hecho por y para el fútbol chileno
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              El Registro Nacional del Fútbol Chileno nace con la idea de centralizar la información
              deportiva en una experiencia simple, ordenada y accesible. Buscamos que cualquier
              aficionado pueda encontrar lo que necesita y que quienes gestionan la información
              cuenten con herramientas claras para hacerlo.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              La plataforma combina consulta pública, perfiles de usuario y permisos diferenciados
              para garantizar que cada persona vea y modifique únicamente lo que le corresponde.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-rnfc-red">Misión</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Facilitar el acceso a información confiable del fútbol chileno y profesionalizar
                  su gestión.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-rnfc-red">Visión</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Ser el registro de referencia para la comunidad futbolística nacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
              Lo que nos mueve
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-slate-900 sm:text-5xl">
              Nuestros valores
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((valor) => (
              <article
                key={valor.titulo}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rnfc-red/10 text-rnfc-red">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {valor.icono}
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-2xl tracking-wide text-slate-900">
                  {valor.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{valor.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
              Permisos claros
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-slate-900 sm:text-5xl">
              Tres roles, una misma pasión
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Cada perfil tiene responsabilidades definidas para proteger la información y mantener
              la plataforma ordenada.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {ROLES.map((rol) => (
              <article
                key={rol.nombre}
                className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5"
              >
                <span
                  className={`inline-flex w-fit rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider ${rol.color}`}
                >
                  {rol.etiqueta}
                </span>
                <h3 className="mt-4 font-display text-3xl tracking-wide text-slate-900">
                  {rol.nombre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{rol.descripcion}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                  {rol.permisos.map((permiso) => (
                    <li key={permiso} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="m5 12 4.5 4.5L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {permiso}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rnfc-blue py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-gold">
                Nuestra historia
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">
                Un camino que recién comienza
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                De una idea de curso a una plataforma con identidad propia. Estos son los hitos que
                nos trajeron hasta aquí.
              </p>
            </div>

            <ol className="relative space-y-6 border-l border-white/15 pl-6">
              {HITOS.map((hito) => (
                <li key={hito.anio} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-rnfc-gold ring-4 ring-rnfc-blue" />
                  <p className="font-display text-2xl tracking-wide text-rnfc-gold">{hito.anio}</p>
                  <h3 className="mt-1 text-base font-bold text-white">{hito.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{hito.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10 lg:flex-row">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-wide text-slate-900">
              ¿Quieres saber más?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Escríbenos y conversemos sobre el proyecto, sus funcionalidades o una posible
              colaboración.
            </p>
          </div>
          <Link
            to="/contacto"
            className="shrink-0 rounded-full bg-rnfc-red px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-rnfc-red/20 transition hover:bg-rnfc-red-dark"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </>
  );
}
