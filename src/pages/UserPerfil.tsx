import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router';
import Formulario from '../components/Formulario';
import type { CampoFormulario } from '../components/Formulario';
import GestionJugadoresGestor from '../components/GestionJugadoresGestor';
import UltimateTeam from '../components/UltimateTeam';
import {
  borrarUsuario,
  crearUsuario,
  editarUsuario,
  iniciarSesion,
  nombreCompleto,
  obtenerUsuario,
  obtenerUsuarios,
  rolDeUsuario,
} from '../services/usuario';
import type { SesionUsuario } from '../services/usuario';
import { ID_ROL } from '../types/Usuarios';
import type { RolUsuario, Usuario } from '../types/Usuarios';

type UsuarioPublico = Omit<Usuario, 'pass'>;

interface Mensaje {
  tipo: 'error' | 'exito';
  texto: string;
}

interface ContextoAutenticacion {
  sesion: SesionUsuario | null;
  cargandoSesion: boolean;
  refrescarSesion: () => Promise<SesionUsuario | null>;
  cerrarSesion: () => void;
}

const ROLES: Record<RolUsuario, { etiqueta: string }> = {
  UsuarioComun: { etiqueta: 'Usuario común' },
  GestorDeportivo: { etiqueta: 'Gestor deportivo' },
  Admin: { etiqueta: 'Administrador' },
};

const ESTILO_ROL: Record<RolUsuario, string> = {
  UsuarioComun: 'border-sky-200 bg-sky-50 text-sky-700',
  GestorDeportivo: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Admin: 'border-red-200 bg-red-50 text-red-700',
};

const CAMPOS_LOGIN: CampoFormulario[] = [
  {
    name: 'correo',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'tu@correo.cl',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'pass',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Tu contraseña',
    autoComplete: 'current-password',
    required: true,
  },
];

const CAMPOS_REGISTRO: CampoFormulario[] = [
  {
    name: 'pnombre',
    label: 'Primer nombre',
    type: 'text',
    placeholder: 'Ej: Camila',
    autoComplete: 'given-name',
    required: true,
  },
  {
    name: 'snombre',
    label: 'Segundo nombre',
    type: 'text',
    placeholder: 'Opcional',
    autoComplete: 'additional-name',
  },
  {
    name: 'papellido',
    label: 'Primer apellido',
    type: 'text',
    placeholder: 'Ej: Rojas',
    autoComplete: 'family-name',
    required: true,
  },
  {
    name: 'sapellido',
    label: 'Segundo apellido',
    type: 'text',
    placeholder: 'Opcional',
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
    name: 'pass',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    autoComplete: 'new-password',
    minLength: 8,
    required: true,
  },
  {
    name: 'confirmarPass',
    label: 'Confirmar contraseña',
    type: 'password',
    placeholder: 'Repite tu contraseña',
    autoComplete: 'new-password',
    minLength: 8,
    required: true,
  },
];

const CAMPOS_PERFIL: CampoFormulario[] = [
  {
    name: 'pnombre',
    label: 'Primer nombre',
    type: 'text',
    autoComplete: 'given-name',
    required: true,
  },
  {
    name: 'snombre',
    label: 'Segundo nombre',
    type: 'text',
    autoComplete: 'additional-name',
  },
  {
    name: 'papellido',
    label: 'Primer apellido',
    type: 'text',
    autoComplete: 'family-name',
    required: true,
  },
  {
    name: 'sapellido',
    label: 'Segundo apellido',
    type: 'text',
  },
  {
    name: 'correo',
    label: 'Correo electrónico',
    type: 'email',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'pass',
    label: 'Nueva contraseña (opcional)',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    autoComplete: 'new-password',
    minLength: 8,
    help: 'Déjala vacía si no quieres cambiarla.',
  },
  {
    name: 'confirmarPass',
    label: 'Confirmar contraseña',
    type: 'password',
    placeholder: 'Repite la nueva contraseña',
    autoComplete: 'new-password',
    minLength: 8,
  },
];

const OPCIONES_ROL = [
  { label: ROLES.UsuarioComun.etiqueta, value: String(ID_ROL.UsuarioComun) },
  { label: ROLES.GestorDeportivo.etiqueta, value: String(ID_ROL.GestorDeportivo) },
  { label: ROLES.Admin.etiqueta, value: String(ID_ROL.Admin) },
];

const CAMPOS_ADMIN: CampoFormulario[] = [
  { name: 'pnombre', label: 'Primer nombre', type: 'text', required: true },
  { name: 'snombre', label: 'Segundo nombre', type: 'text' },
  { name: 'papellido', label: 'Primer apellido', type: 'text', required: true },
  { name: 'sapellido', label: 'Segundo apellido', type: 'text' },
  { name: 'correo', label: 'Correo electrónico', type: 'email', required: true },
  {
    name: 'rol',
    label: 'Rol del usuario',
    type: 'select',
    options: OPCIONES_ROL,
    required: true,
  },
  {
    name: 'pass',
    label: 'Nueva contraseña',
    type: 'password',
    placeholder: 'Opcional',
    autoComplete: 'new-password',
    minLength: 8,
    help: 'Déjala vacía para conservar la contraseña actual.',
  },
];

function obtenerMensajeError(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
}

function formatearFecha(fecha: string): string {
  const valor = new Date(fecha);
  if (Number.isNaN(valor.getTime())) {
    return 'Sin fecha';
  }
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(valor);
}

export default function UserPerfil() {
  const { sesion, cargandoSesion, refrescarSesion, cerrarSesion } =
    useOutletContext<ContextoAutenticacion>();

  const [vistaAuth, setVistaAuth] = useState<'login' | 'registro'>('login');
  const [procesandoAuth, setProcesandoAuth] = useState(false);
  const [mensajeAuth, setMensajeAuth] = useState<Mensaje | null>(null);

  const [usuarioCargado, setUsuarioCargado] = useState<UsuarioPublico | null>(null);
  const [versionCarga, setVersionCarga] = useState(0);

  const [procesandoPerfil, setProcesandoPerfil] = useState(false);
  const [mensajePerfil, setMensajePerfil] = useState<Mensaje | null>(null);
  const [versionPerfil, setVersionPerfil] = useState(0);

  const [usuariosAdmin, setUsuariosAdmin] = useState<UsuarioPublico[]>([]);
  const [cargandoUsuariosAdmin, setCargandoUsuariosAdmin] = useState(false);
  const [errorUsuariosAdmin, setErrorUsuariosAdmin] = useState('');
  const [usuarioAdmin, setUsuarioAdmin] = useState<UsuarioPublico | null>(null);
  const [procesandoAdmin, setProcesandoAdmin] = useState(false);
  const [mensajeAdmin, setMensajeAdmin] = useState<Mensaje | null>(null);
  const [versionAdmin, setVersionAdmin] = useState(0);
  const [seccionElegida, setSeccionElegida] = useState<
    'jugadores' | 'ultimate-team' | 'configuracion' | 'usuarios' | null
  >(null);

  const usuario =
    sesion && usuarioCargado?.id_usuario === sesion.id_usuario ? usuarioCargado : null;
  const cargandoPerfil = Boolean(sesion && !usuario && !mensajePerfil);

  useEffect(() => {
    if (cargandoSesion || !sesion) {
      return;
    }

    let activo = true;

    obtenerUsuario(sesion.id_usuario)
      .then((encontrado) => {
        if (activo) {
          setUsuarioCargado(encontrado);
          setMensajePerfil((actual) => (actual?.tipo === 'error' ? null : actual));
        }
      })
      .catch((error: unknown) => {
        if (activo) {
          setMensajePerfil({ tipo: 'error', texto: obtenerMensajeError(error) });
        }
      });

    return () => {
      activo = false;
    };
  }, [sesion, cargandoSesion, versionCarga]);

  const valoresPerfil: Record<string, string> = usuario
    ? {
        pnombre: usuario.pnombre,
        snombre: usuario.snombre ?? '',
        papellido: usuario.papellido,
        sapellido: usuario.sapellido ?? '',
        correo: usuario.correo,
      }
    : {};
  const valoresAdmin: Record<string, string> = usuarioAdmin
    ? {
        pnombre: usuarioAdmin.pnombre,
        snombre: usuarioAdmin.snombre ?? '',
        papellido: usuarioAdmin.papellido,
        sapellido: usuarioAdmin.sapellido ?? '',
        correo: usuarioAdmin.correo,
        rol: String(usuarioAdmin.id_tipo_usuario),
        pass: '',
      }
    : {};

  useEffect(() => {
    if (sesion?.rol !== 'Admin') return;

    let activo = true;

    async function cargarUsuarios(): Promise<void> {
      setCargandoUsuariosAdmin(true);
      setErrorUsuariosAdmin('');
      try {
        const usuarios = await obtenerUsuarios();
        if (activo) setUsuariosAdmin(usuarios);
      } catch (error: unknown) {
        if (activo) setErrorUsuariosAdmin(obtenerMensajeError(error));
      } finally {
        if (activo) setCargandoUsuariosAdmin(false);
      }
    }

    void cargarUsuarios();

    return () => {
      activo = false;
    };
  }, [sesion?.id_usuario, sesion?.rol, versionAdmin]);

  async function manejarLogin(valores: Record<string, string>): Promise<void> {
    setProcesandoAuth(true);
    setMensajeAuth(null);
    setMensajePerfil(null);
    setUsuarioCargado(null);

    try {
      await iniciarSesion({ correo: valores.correo, pass: valores.pass });
      await refrescarSesion();
    } catch (error) {
      setMensajeAuth({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setProcesandoAuth(false);
    }
  }

  async function manejarRegistro(valores: Record<string, string>): Promise<void> {
    setProcesandoAuth(true);
    setMensajeAuth(null);
    setMensajePerfil(null);
    setUsuarioCargado(null);

    try {
      if (valores.pass !== valores.confirmarPass) {
        throw new Error('Las contraseñas no coinciden.');
      }

      await crearUsuario({
        pnombre: valores.pnombre,
        snombre: valores.snombre,
        papellido: valores.papellido,
        sapellido: valores.sapellido,
        correo: valores.correo,
        pass: valores.pass,
      });

      await iniciarSesion({ correo: valores.correo, pass: valores.pass });
      await refrescarSesion();
    } catch (error) {
      setMensajeAuth({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setProcesandoAuth(false);
    }
  }

  async function manejarPerfil(valores: Record<string, string>): Promise<void> {
    if (!usuario) {
      return;
    }

    setProcesandoPerfil(true);
    setMensajePerfil(null);

    try {
      const pass = valores.pass.trim();
      const confirmarPass = valores.confirmarPass.trim();
      if ((pass || confirmarPass) && pass !== confirmarPass) {
        throw new Error('Las contraseñas no coinciden.');
      }

      const actualizado = await editarUsuario(usuario.id_usuario, {
        pnombre: valores.pnombre,
        snombre: valores.snombre,
        papellido: valores.papellido,
        sapellido: valores.sapellido,
        correo: valores.correo,
        ...(pass ? { pass } : {}),
      });

      setUsuarioCargado(actualizado);
      await refrescarSesion();
      setVersionPerfil((version) => version + 1);
      setMensajePerfil({
        tipo: 'exito',
        texto: pass
          ? 'Datos personales y contraseña actualizados correctamente.'
          : 'Datos personales actualizados correctamente.',
      });
    } catch (error) {
      setMensajePerfil({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setProcesandoPerfil(false);
    }
  }

  async function seleccionarUsuarioAdmin(id: number): Promise<void> {
    setMensajeAdmin(null);

    try {
      const encontrado = await obtenerUsuario(id);
      setUsuarioAdmin(encontrado);
    } catch (error) {
      setUsuarioAdmin(null);
      setMensajeAdmin({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  }

  async function manejarEdicionAdmin(valores: Record<string, string>): Promise<void> {
    if (!usuarioAdmin) {
      return;
    }

    setProcesandoAdmin(true);
    setMensajeAdmin(null);

    try {
      const cambios = {
        pnombre: valores.pnombre,
        snombre: valores.snombre,
        papellido: valores.papellido,
        sapellido: valores.sapellido,
        correo: valores.correo,
        id_tipo_usuario: Number.parseInt(valores.rol, 10),
        ...(valores.pass.trim() ? { pass: valores.pass } : {}),
      };

      const actualizado = await editarUsuario(usuarioAdmin.id_usuario, cambios);
      setUsuarioAdmin(actualizado);
      setUsuariosAdmin((usuarios) =>
        usuarios.map((item) =>
          item.id_usuario === actualizado.id_usuario ? actualizado : item,
        ),
      );
      setVersionAdmin((version) => version + 1);
      await refrescarSesion();
      setMensajeAdmin({ tipo: 'exito', texto: 'Usuario actualizado correctamente.' });
    } catch (error) {
      setMensajeAdmin({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setProcesandoAdmin(false);
    }
  }

  async function eliminarUsuarioAdmin(): Promise<void> {
    if (!usuarioAdmin) {
      return;
    }

    const confirmado = window.confirm(
      `¿Eliminar definitivamente a ${nombreCompleto(usuarioAdmin)}? Esta acción no se puede deshacer.`,
    );

    if (!confirmado) {
      return;
    }

    setProcesandoAdmin(true);
    setMensajeAdmin(null);

    try {
      await borrarUsuario(usuarioAdmin.id_usuario);
      setMensajeAdmin({
        tipo: 'exito',
        texto: `El usuario ${nombreCompleto(usuarioAdmin)} fue eliminado.`,
      });
      setUsuariosAdmin((usuarios) =>
        usuarios.filter((item) => item.id_usuario !== usuarioAdmin.id_usuario),
      );
      setUsuarioAdmin(null);
    } catch (error) {
      setMensajeAdmin({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setProcesandoAdmin(false);
    }
  }

  if (cargandoSesion) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-100">
        <div className="text-center">
          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-rnfc-red/20 border-t-rnfc-red" />
          <p className="mt-4 text-sm font-semibold text-slate-500">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  if (!sesion) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-rnfc-blue via-rnfc-blue to-rnfc-red-dark py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full border-[45px] border-white" />
          <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full border-[35px] border-white" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="text-white">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              <Link to="/" className="transition hover:text-white">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-rnfc-gold">Mi perfil</span>
            </nav>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl">
              Tu perfil, tus credenciales
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Inicia sesión para administrar tus datos o crea una cuenta de usuario común. La sesión
              se protege con un token JWT con vigencia de 8 horas.
            </p>

            <div className="mt-8 space-y-3">
              {[
                {
                  rol: 'Admin',
                  correo: 'admin@rnfc.cl',
                  pass: 'admin123',
                  descripcion: 'Puede editar cualquier usuario y supervisar la plataforma.',
                },
                {
                  rol: 'GestorDeportivo',
                  correo: 'gestor@rnfc.cl',
                  pass: 'gestor123',
                  descripcion: 'Gestiona solo los jugadores que le pertenecen.',
                },
                {
                  rol: 'UsuarioComun',
                  correo: 'usuario@rnfc.cl',
                  pass: 'usuario123',
                  descripcion: 'Administra únicamente sus propias credenciales.',
                },
              ].map((cuenta) => (
                <div
                  key={cuenta.correo}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${ESTILO_ROL[cuenta.rol as RolUsuario]}`}
                    >
                      {ROLES[cuenta.rol as RolUsuario].etiqueta}
                    </span>
                    <span className="text-[0.62rem] text-white/40">Cuenta de prueba</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-white">
                    {cuenta.correo} <span className="font-normal text-white/40">/</span>{' '}
                    <span className="font-mono text-xs text-rnfc-gold">{cuenta.pass}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{cuenta.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur">
              <button
                type="button"
                onClick={() => {
                  setVistaAuth('login');
                  setMensajeAuth(null);
                }}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  vistaAuth === 'login'
                    ? 'bg-white text-rnfc-red shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setVistaAuth('registro');
                  setMensajeAuth(null);
                }}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  vistaAuth === 'registro'
                    ? 'bg-white text-rnfc-red shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Crear cuenta
              </button>
            </div>

            {vistaAuth === 'login' ? (
              <Formulario
                key="login"
                campos={CAMPOS_LOGIN}
                onSubmit={manejarLogin}
                titulo="Acceso a la plataforma"
                descripcion="Ingresa con tu correo institucional y contraseña."
                textoBoton="Ingresar"
                cargando={procesandoAuth}
                error={mensajeAuth?.tipo === 'error' ? mensajeAuth.texto : ''}
              />
            ) : (
              <Formulario
                key="registro"
                campos={CAMPOS_REGISTRO}
                onSubmit={manejarRegistro}
                titulo="Crea tu cuenta"
                descripcion="Las cuentas nuevas se crean con el rol de usuario común."
                textoBoton="Crear cuenta"
                cargando={procesandoAuth}
                error={mensajeAuth?.tipo === 'error' ? mensajeAuth.texto : ''}
                columnas={2}
                pie={
                  <p className="text-center text-xs text-slate-500">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setVistaAuth('login');
                        setMensajeAuth(null);
                      }}
                      className="font-bold text-rnfc-red hover:underline"
                    >
                      Inicia sesión
                    </button>
                  </p>
                }
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  const rolActual: RolUsuario = usuario ? rolDeUsuario(usuario) : sesion.rol;
  const esAdmin = sesion.rol === 'Admin';
  const seccionPredeterminada =
    sesion.rol === 'GestorDeportivo'
      ? 'jugadores'
      : sesion.rol === 'Admin'
        ? 'usuarios'
        : 'ultimate-team';
  const seccionActiva =
    (seccionElegida === 'jugadores' && sesion.rol !== 'GestorDeportivo') ||
    (seccionElegida === 'usuarios' && !esAdmin) ||
    (seccionElegida === 'ultimate-team' && sesion.rol !== 'UsuarioComun')
      ? seccionPredeterminada
      : seccionElegida ?? seccionPredeterminada;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-r from-rnfc-blue via-rnfc-blue to-rnfc-red-dark py-14">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white" />
          <div className="absolute bottom-0 left-1/3 h-44 w-44 translate-y-1/2 rounded-full border-[28px] border-white" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            <Link to="/" className="transition hover:text-white">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-rnfc-gold">Mi perfil</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 font-display text-3xl tracking-wider text-white">
                {(usuario ? nombreCompleto(usuario) : sesion.nombre)
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((parte) => parte.charAt(0).toUpperCase())
                  .join('') || 'RN'}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
                    {usuario ? nombreCompleto(usuario) : sesion.nombre}
                  </h1>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider ${ESTILO_ROL[rolActual]}`}
                  >
                    {ROLES[rolActual].etiqueta}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-white/60">{sesion.correo}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={cerrarSesion}
              className="flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:border-red-300/40 hover:bg-red-950/30"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Cerrar sesión
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/50">
                Correo
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white">{sesion.correo}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/50">
                Rol
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{ROLES[rolActual].etiqueta}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/50">
                Miembro desde
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {usuario ? formatearFecha(usuario.fecha_creacion) : 'Cargando...'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {cargandoPerfil && !usuario && (
            <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white py-16">
              <span className="h-9 w-9 animate-spin rounded-full border-4 border-rnfc-red/20 border-t-rnfc-red" />
            </div>
          )}

          {!cargandoPerfil && !usuario && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-sm font-semibold text-red-700">
                {mensajePerfil?.texto ?? 'No se pudieron cargar tus datos.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMensajePerfil(null);
                  setVersionCarga((version) => version + 1);
                }}
                className="mt-4 rounded-full bg-rnfc-red px-5 py-2.5 text-sm font-bold text-white"
              >
                Reintentar
              </button>
            </div>
          )}

          {usuario && (
            <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
              <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5 lg:sticky lg:top-28">
                <div className="border-b border-slate-100 px-3 pb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Mi espacio
                  </p>
                  <p className="mt-1 truncate font-bold text-slate-800">{sesion.nombre}</p>
                  <p className="mt-1 text-xs text-slate-500">{ROLES[rolActual].etiqueta}</p>
                </div>
                <nav className="mt-3 space-y-1" aria-label="Navegación del perfil">
                  {[
                    ...(rolActual === 'UsuarioComun'
                      ? [{ id: 'ultimate-team' as const, label: 'Mi Ultimate Team', icon: '🏆' }]
                      : []),
                    ...(rolActual === 'GestorDeportivo'
                      ? [{ id: 'jugadores' as const, label: 'Mis jugadores', icon: '⚽' }]
                      : []),
                    { id: 'configuracion' as const, label: 'Configuración de usuario', icon: '⚙' },
                    ...(esAdmin
                      ? [{ id: 'usuarios' as const, label: 'Administrar usuarios', icon: '♙' }]
                      : []),
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSeccionElegida(item.id)}
                      aria-current={seccionActiva === item.id ? 'page' : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                        seccionActiva === item.id
                          ? 'bg-rnfc-red/10 text-rnfc-red'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-base">
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </nav>
                <button
                  type="button"
                  onClick={cerrarSesion}
                  className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  Cerrar sesión
                </button>
              </aside>

              <div className="min-w-0">
                {seccionActiva === 'jugadores' && rolActual === 'GestorDeportivo' && (
                  <GestionJugadoresGestor gestorId={sesion.id_usuario} />
                )}
                {seccionActiva === 'ultimate-team' && rolActual === 'UsuarioComun' && (
                  <UltimateTeam key={sesion.id_usuario} usuarioId={sesion.id_usuario} />
                )}
                {seccionActiva === 'configuracion' && (
                  <Formulario
                    key={`perfil-${usuario.id_usuario}-${versionPerfil}-${usuario.correo}-${usuario.pnombre}-${usuario.papellido}`}
                    campos={CAMPOS_PERFIL}
                    valoresIniciales={valoresPerfil}
                    onSubmit={manejarPerfil}
                    titulo="Datos personales"
                    descripcion="Actualiza tus datos y, si quieres, cambia tu contraseña. Para conservarla, deja los campos de contraseña vacíos."
                    textoBoton="Guardar cambios"
                    cargando={procesandoPerfil}
                    error={mensajePerfil?.tipo === 'error' ? mensajePerfil.texto : ''}
                    exito={mensajePerfil?.tipo === 'exito' ? mensajePerfil.texto : ''}
                    columnas={2}
                  />
                )}

              {seccionActiva === 'usuarios' && esAdmin && (
                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rnfc-red">
                        Solo administradores
                      </p>
                      <h2 className="mt-1 font-display text-3xl uppercase tracking-wide text-slate-900">
                        Administración de usuarios
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                        Selecciona un usuario de la lista para editar su cuenta o administrar su rol.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVersionAdmin((version) => version + 1)}
                      disabled={cargandoUsuariosAdmin}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-rnfc-red hover:text-rnfc-red disabled:opacity-50"
                    >
                      Actualizar lista
                    </button>
                  </div>

                  {errorUsuariosAdmin && (
                    <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {errorUsuariosAdmin}
                    </div>
                  )}

                  {cargandoUsuariosAdmin ? (
                    <p className="py-10 text-center text-sm text-slate-500">Cargando usuarios...</p>
                  ) : usuariosAdmin.length === 0 && !errorUsuariosAdmin ? (
                    <p className="mt-5 rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                      No hay usuarios registrados.
                    </p>
                  ) : (
                    <ul className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-100">
                      {usuariosAdmin.map((item) => {
                        const rol = rolDeUsuario(item);
                        const seleccionado = usuarioAdmin?.id_usuario === item.id_usuario;
                        return (
                          <li
                            key={item.id_usuario}
                            className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between ${
                              seleccionado ? 'bg-rnfc-red/5' : 'bg-white'
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="truncate font-bold text-slate-900">
                                {nombreCompleto(item)}
                              </p>
                              <p className="mt-1 truncate text-sm text-slate-500">{item.correo}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${ESTILO_ROL[rol]}`}>
                                  {ROLES[rol].etiqueta}
                                </span>
                                <span className="text-xs text-slate-400">ID #{item.id_usuario}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => void seleccionarUsuarioAdmin(item.id_usuario)}
                              disabled={procesandoAdmin}
                              className="shrink-0 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-rnfc-red hover:text-rnfc-red disabled:opacity-50"
                            >
                              {seleccionado ? 'Seleccionado' : 'Administrar'}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {mensajeAdmin?.tipo === 'error' && (
                    <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {mensajeAdmin.texto}
                    </div>
                  )}

                  {usuarioAdmin && (
                    <div className="mt-6 border-t border-slate-100 pt-6">
                      <Formulario
                        key={`admin-${usuarioAdmin.id_usuario}-${usuarioAdmin.correo}-${usuarioAdmin.id_tipo_usuario}-${versionAdmin}`}
                        campos={CAMPOS_ADMIN}
                        valoresIniciales={valoresAdmin}
                        onSubmit={manejarEdicionAdmin}
                        titulo={`Editar usuario #${usuarioAdmin.id_usuario}`}
                        descripcion="Como administrador puedes modificar todos los campos, incluido el rol."
                        textoBoton="Guardar usuario"
                        cargando={procesandoAdmin}
                        error={mensajeAdmin?.tipo === 'error' ? mensajeAdmin.texto : ''}
                        exito={mensajeAdmin?.tipo === 'exito' ? mensajeAdmin.texto : ''}
                        columnas={2}
                        pie={
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-slate-400">
                              Esta acción elimina al usuario de forma permanente.
                            </p>
                            <button
                              type="button"
                              onClick={() => void eliminarUsuarioAdmin()}
                              disabled={procesandoAdmin}
                              className="shrink-0 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Eliminar usuario
                            </button>
                          </div>
                        }
                      />
                    </div>
                  )}
                </div>
              )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
