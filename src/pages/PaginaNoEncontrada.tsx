import { Link } from 'react-router';

export default function PaginaNoEncontrada() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-linear-to-br from-rnfc-blue via-rnfc-blue to-rnfc-red-dark py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/2 top-1/2 h-144 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full border-80 border-white" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full border-40 border-white" />
        <div className="absolute -right-16 top-0 h-56 w-56 rounded-full border-32 border-white" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-display text-[8rem] leading-none tracking-wider text-white/10 sm:text-[12rem]">
          404
        </p>
        <div className="-mt-16 sm:-mt-24">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur">
            <img
              src="/assets/escudo_rnfc.png"
              alt="Escudo RNFC"
              className="h-14 w-14 object-contain"
            />
          </span>
          <h1 className="mt-6 font-display text-4xl uppercase leading-none tracking-wide text-white sm:text-6xl">
            Página no encontrada
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            La página que buscas no existe, cambió de dirección o el enlace está incompleto. Vuelve
            al inicio y sigue explorando el fútbol chileno.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-rnfc-red transition hover:bg-rnfc-gold hover:text-rnfc-blue"
            >
              Volver al inicio
            </Link>
            <Link
              to="/contacto"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contactar soporte
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            <Link to="/quienes-somos" className="transition hover:text-white">
              Quiénes somos
            </Link>
            <Link to="/#competiciones" className="transition hover:text-white">
              Competiciones
            </Link>
            <Link to="/#estadisticas" className="transition hover:text-white">
              Estadísticas
            </Link>
            <Link to="/perfil" className="transition hover:text-white">
              Mi perfil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
