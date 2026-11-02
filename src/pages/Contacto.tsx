import { useState } from 'react';
import { Link } from 'react-router';
import Formulario from '../components/Formulario';
import type { CampoFormulario } from '../components/Formulario';

const CAMPOS: CampoFormulario[] = [
  {
    name: 'nombre',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Tu nombre',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'correo',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'tu@correo.cl',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'asunto',
    label: 'Asunto',
    type: 'text',
    placeholder: '¿En qué podemos ayudarte?',
    required: true,
  },
  {
    name: 'mensaje',
    label: 'Mensaje',
    type: 'textarea',
    placeholder: 'Escribe tu mensaje...',
    required: true,
  },
];

const VALORES_INICIALES = {
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: '',
};

const PREGUNTAS = [
  {
    pregunta: '¿Cómo puedo crear una cuenta?',
    respuesta:
      'Ingresa a Mi perfil, selecciona la pestaña Crear cuenta y completa tus datos. La cuenta se crea con el rol de usuario común.',
  },
  {
    pregunta: '¿Cómo solicito ser gestor deportivo?',
    respuesta:
      'Los roles de gestor deportivo y administrador son asignados por un administrador desde la plataforma.',
  },
  {
    pregunta: '¿Puedo modificar la información de un jugador?',
    respuesta:
      'Depende de tu rol. Un gestor deportivo solo puede modificar los jugadores que le pertenecen; un administrador puede editar todo.',
  },
];

export default function Contacto() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  async function enviarMensaje(): Promise<void> {
    setEnviando(true);
    setError('');
    setExito('');

    try {
      await new Promise((resolver) => window.setTimeout(resolver, 700));
      setExito('Mensaje enviado correctamente. Te responderemos a la brevedad.');
    } catch {
      setError('No pudimos enviar tu mensaje. Inténtalo nuevamente.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-r from-rnfc-red-dark via-rnfc-red to-rnfc-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full border-40 border-white" />
          <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full border-55 border-white" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-20 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            <Link to="/" className="transition hover:text-white">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-rnfc-gold">Contacto</span>
          </nav>
          <h1 className="max-w-3xl font-display text-5xl uppercase leading-none tracking-wide text-white sm:text-6xl">
            Estamos para escucharte
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            ¿Tienes una consulta, sugerencia o comentario? Completa el formulario y nos pondremos en
            contacto contigo.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
              Canales de atención
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-slate-900">
              Conversemos
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Nuestro equipo responde consultas relacionadas con la plataforma, los roles de usuario
              y la información publicada.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  titulo: 'Correo electrónico',
                  valor: 'contacto@rnfc.cl',
                  detalle: 'Respuesta en un plazo de 24 a 48 horas.',
                  icono: (
                    <>
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ),
                },
                {
                  titulo: 'Teléfono',
                  valor: '+56 2 2345 6789',
                  detalle: 'Lunes a viernes, de 09:00 a 18:00 hrs.',
                  icono: (
                    <path
                      d="M6.5 3.5h2.2l1.2 4.1-1.8 1.4a15 15 0 0 0 6.9 6.9l1.4-1.8 4.1 1.2v2.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  ),
                },
                {
                  titulo: 'Ubicación',
                  valor: 'Santiago, Chile',
                  detalle: 'Región Metropolitana.',
                  icono: (
                    <>
                      <path
                        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                    </>
                  ),
                },
              ].map((canal) => (
                <div
                  key={canal.titulo}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-rnfc-red shadow-sm">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      {canal.icono}
                    </svg>
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {canal.titulo}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">{canal.valor}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{canal.detalle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
              Este formulario es demostrativo. No almacena mensajes en un servidor externo.
            </div>
          </div>

          <Formulario
            campos={CAMPOS}
            valoresIniciales={VALORES_INICIALES}
            onSubmit={enviarMensaje}
            titulo="Envíanos un mensaje"
            descripcion="Completa todos los campos para que podamos orientarte de la mejor forma."
            textoBoton="Enviar mensaje"
            cargando={enviando}
            error={error}
            exito={exito}
            columnas={2}
            reiniciarAlEnviar
          />
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
              Antes de escribirnos
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-slate-900">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {PREGUNTAS.map((item) => (
              <details
                key={item.pregunta}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-lg open:shadow-slate-900/5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-800">
                  {item.pregunta}
                  <svg
                    className="h-5 w-5 shrink-0 text-rnfc-red transition group-open:rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.respuesta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
