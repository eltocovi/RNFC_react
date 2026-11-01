import { ID_ROL } from '../types/Usuarios';
import type { RolUsuario, Usuario } from '../types/Usuarios';

// Tipos

export type UsuarioPublico = Omit<Usuario, 'pass'>;

export interface SesionUsuario {
  id_usuario: number;
  id_tipo_usuario: number;
  correo: string;
  nombre: string;
  rol: RolUsuario;
  exp: number;
}

type CredencialesLogin = Pick<Usuario, 'correo' | 'pass'>;
type DatosPersonales = Pick<Usuario, 'pnombre' | 'snombre' | 'papellido' | 'sapellido'>;

interface NuevoUsuario extends DatosPersonales {
  correo: string;
  pass: string;
  id_tipo_usuario?: number;
}

type ActualizacionUsuario = Partial<NuevoUsuario>;

interface RespuestaAutenticacion {
  token: string;
  sesion: SesionUsuario;
  usuario: UsuarioPublico;
}

// Configuración

const API_URL = '/api/usuarios';
const TOKEN_KEY = 'rnfc_token';
const JWT_SECRET = 'rnfc_jwt_academico_2026';
const DURACION_TOKEN_MS = 1000 * 60 * 60 * 8;
const CORREO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAMPOS_TEXTO = ['pnombre', 'snombre', 'papellido', 'sapellido'] as const;

const ENCABEZADO_JWT = { alg: 'HS256', typ: 'JWT' };
const MENSAJES_HTTP: Record<number, string> = {
  404: 'Usuario no encontrado.',
  409: 'El correo ya está registrado.',
};
const ROL_POR_ID: Record<number, RolUsuario> = {
  [ID_ROL.UsuarioComun]: 'UsuarioComun',
  [ID_ROL.GestorDeportivo]: 'GestorDeportivo',
  [ID_ROL.Admin]: 'Admin',
};

// Helpers

const normalizarCorreo = (correo: string): string => correo.trim().toLowerCase();
const normalizarTexto = (texto?: string): string => (texto ?? '').trim();

function validarCorreo(correo: string): void {
  if (!CORREO_REGEX.test(correo)) throw new Error('Ingresa un correo electrónico válido.');
}

function validarPass(pass: string): void {
  if (pass.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres.');
}

async function hashPass(pass: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pass));
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function nombreCompleto(
  usuario: Pick<Usuario, 'pnombre' | 'snombre' | 'papellido' | 'sapellido'>,
): string {
  return [usuario.pnombre, usuario.snombre, usuario.papellido, usuario.sapellido]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function rolDeUsuario(usuario: Pick<Usuario, 'id_tipo_usuario'>): RolUsuario {
  return ROL_POR_ID[usuario.id_tipo_usuario] ?? 'UsuarioComun';
}

function sinPass(usuario: Usuario): UsuarioPublico {
  const { id_usuario, id_tipo_usuario, correo, fecha_creacion, pnombre, snombre, papellido, sapellido } =
    usuario;
  return { id_usuario, id_tipo_usuario, correo, fecha_creacion, pnombre, snombre, papellido, sapellido };
}

const esAdminOPropietario = (sesion: SesionUsuario, idUsuario: number): boolean =>
  sesion.rol === 'Admin' || sesion.id_usuario === idUsuario;

// API

async function solicitar<T>(url: string, init?: RequestInit): Promise<T> {
  let respuesta: Response;

  try {
    respuesta = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch {
    throw new Error('No se pudo conectar con la API. Verifica que json-server esté en ejecución.');
  }

  if (!respuesta.ok) {
    throw new Error(
      MENSAJES_HTTP[respuesta.status] ??
        'No se pudo completar la operación. Inténtalo nuevamente.',
    );
  }

  const texto = await respuesta.text();
  return texto ? (JSON.parse(texto) as T) : (undefined as T);
}

async function buscarPorCorreo(correo: string): Promise<Usuario[]> {
  // GET - Buscar usuario por correo
  return solicitar<Usuario[]>(`${API_URL}?correo=${encodeURIComponent(correo)}`);
}

// Autenticación y sesión

type PayloadJwt = SesionUsuario & { sub: string; iat: number };

let claveJwt: Promise<CryptoKey> | undefined;

function codificarBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function decodificarBase64Url(valor: string): Uint8Array<ArrayBuffer> {
  const base64 = valor.replace(/-/g, '+').replace(/_/g, '/');
  const binario = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
  const bytes = new Uint8Array(new ArrayBuffer(binario.length));
  for (let indice = 0; indice < binario.length; indice += 1) {
    bytes[indice] = binario.charCodeAt(indice);
  }
  return bytes;
}

const textoABase64Url = (texto: string): string =>
  codificarBase64Url(new TextEncoder().encode(texto));
const base64UrlATexto = (valor: string): string =>
  new TextDecoder().decode(decodificarBase64Url(valor));

function obtenerClaveJwt(): Promise<CryptoKey> {
  claveJwt ??= crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  return claveJwt;
}

async function firmarJwt(datos: string): Promise<string> {
  const clave = await obtenerClaveJwt();
  const firma = await crypto.subtle.sign('HMAC', clave, new TextEncoder().encode(datos));
  return codificarBase64Url(new Uint8Array(firma));
}

async function crearToken(usuario: Usuario): Promise<string> {
  const ahora = Math.floor(Date.now() / 1000);
  const payload: PayloadJwt = {
    sub: String(usuario.id_usuario),
    id_usuario: usuario.id_usuario,
    id_tipo_usuario: usuario.id_tipo_usuario,
    correo: usuario.correo,
    nombre: nombreCompleto(usuario),
    rol: rolDeUsuario(usuario),
    iat: ahora,
    exp: ahora + Math.floor(DURACION_TOKEN_MS / 1000),
  };

  const encabezado = textoABase64Url(JSON.stringify(ENCABEZADO_JWT));
  const cuerpo = textoABase64Url(JSON.stringify(payload));

  return `${encabezado}.${cuerpo}.${await firmarJwt(`${encabezado}.${cuerpo}`)}`;
}

async function verificarToken(token: string): Promise<SesionUsuario | null> {
  try {
    const partes = token.split('.');
    if (partes.length !== 3) {
      return null;
    }

    const [encabezado, cuerpo, firma] = partes;
    const firmaValida = await crypto.subtle.verify(
      'HMAC',
      await obtenerClaveJwt(),
      decodificarBase64Url(firma),
      new TextEncoder().encode(`${encabezado}.${cuerpo}`),
    );

    if (!firmaValida) {
      return null;
    }

    const payload = JSON.parse(base64UrlATexto(cuerpo)) as PayloadJwt;
    if (!payload.exp || payload.exp * 1000 <= Date.now() || !ROL_POR_ID[payload.id_tipo_usuario]) {
      return null;
    }

    return {
      id_usuario: payload.id_usuario,
      id_tipo_usuario: payload.id_tipo_usuario,
      correo: payload.correo,
      nombre: payload.nombre,
      rol: payload.rol,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

async function actualizarToken(usuario: Usuario): Promise<void> {
  localStorage.setItem(TOKEN_KEY, await crearToken(usuario));
}

export async function iniciarSesion(
  credenciales: CredencialesLogin,
): Promise<RespuestaAutenticacion> {
  const correo = normalizarCorreo(credenciales.correo);
  const pass = credenciales.pass.trim();

  if (!correo || !pass) {
    throw new Error('Ingresa tu correo y contraseña.');
  }

  const usuarios = await buscarPorCorreo(correo);
  const usuario = usuarios.find((item) => normalizarCorreo(item.correo) === correo);

  if (!usuario || usuario.pass !== (await hashPass(pass))) {
    throw new Error('Correo o contraseña incorrectos.');
  }

  const token = await crearToken(usuario);
  const sesion = await verificarToken(token);

  if (!sesion) {
    throw new Error('No se pudo iniciar la sesión.');
  }

  localStorage.setItem(TOKEN_KEY, token);

  return { token, sesion, usuario: sinPass(usuario) };
}

export async function obtenerSesion(): Promise<SesionUsuario | null> {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return null;
  }

  const sesion = await verificarToken(token);
  if (!sesion) {
    localStorage.removeItem(TOKEN_KEY);
  }

  return sesion;
}

export function cerrarSesion(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// GET - Todos los usuarios
export async function obtenerUsuarios(): Promise<UsuarioPublico[]> {
  const sesion = await obtenerSesion();

  if (!sesion) {
    throw new Error('Debes iniciar sesión para consultar usuarios.');
  }

  if (sesion.rol !== 'Admin') {
    throw new Error('Solo un administrador puede consultar todos los usuarios.');
  }

  const usuarios = await solicitar<Usuario[]>(API_URL);
  return usuarios.map(sinPass);
}

// GET - Usuario por ID
export async function obtenerUsuario(id: number): Promise<UsuarioPublico> {
  const sesion = await obtenerSesion();

  if (!sesion) {
    throw new Error('Debes iniciar sesión para consultar un usuario.');
  }

  if (!esAdminOPropietario(sesion, id)) {
    throw new Error('No tienes permiso para consultar este usuario.');
  }

  return sinPass(await solicitar<Usuario>(`${API_URL}/${id}`));
}

// POST - Crear usuario
export async function crearUsuario(datos: NuevoUsuario): Promise<UsuarioPublico> {
  const correo = normalizarCorreo(datos.correo);
  const pass = datos.pass.trim();
  const pnombre = normalizarTexto(datos.pnombre);
  const papellido = normalizarTexto(datos.papellido);

  validarCorreo(correo);
  validarPass(pass);

  if (!pnombre || !papellido) {
    throw new Error('El nombre y el apellido son obligatorios.');
  }

  const existentes = await buscarPorCorreo(correo);
  if (existentes.some((item) => normalizarCorreo(item.correo) === correo)) {
    throw new Error('El correo ya está registrado.');
  }

  const sesion = await obtenerSesion();
  const idTipoUsuario =
    sesion?.rol === 'Admin' && datos.id_tipo_usuario
      ? datos.id_tipo_usuario
      : ID_ROL.UsuarioComun;

  if (!ROL_POR_ID[idTipoUsuario]) {
    throw new Error('El rol seleccionado no es válido.');
  }

  const usuario = await solicitar<Usuario>(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      id_tipo_usuario: idTipoUsuario,
      pass: await hashPass(pass),
      correo,
      fecha_creacion: new Date().toISOString(),
      pnombre,
      snombre: normalizarTexto(datos.snombre),
      papellido,
      sapellido: normalizarTexto(datos.sapellido),
    }),
  });

  return sinPass(usuario);
}

// DELETE - Eliminar usuario
export async function borrarUsuario(id: number): Promise<void> {
  const sesion = await obtenerSesion();

  if (!sesion) {
    throw new Error('Debes iniciar sesión para eliminar un usuario.');
  }

  if (sesion.rol !== 'Admin' || sesion.id_usuario === id) {
    throw new Error('Solo un administrador puede eliminar otros usuarios.');
  }

  await solicitar<void>(`${API_URL}/${id}`, { method: 'DELETE' });
}

// PUT - Editar usuario
export async function editarUsuario(
  id: number,
  cambios: ActualizacionUsuario,
): Promise<UsuarioPublico> {
  const sesion = await obtenerSesion();

  if (!sesion) {
    throw new Error('Debes iniciar sesión para editar un usuario.');
  }

  if (!esAdminOPropietario(sesion, id)) {
    throw new Error('No tienes permiso para editar este usuario.');
  }

  // GET - Obtener datos actuales del usuario
  const existente = await solicitar<Usuario>(`${API_URL}/${id}`);
  const actualizado: Usuario = { ...existente };

  for (const campo of CAMPOS_TEXTO) {
    const valor = cambios[campo];
    if (valor === undefined) {
      continue;
    }

    const normalizado = normalizarTexto(valor);
    if (!normalizado && (campo === 'pnombre' || campo === 'papellido')) {
      throw new Error(`El ${campo === 'pnombre' ? 'nombre' : 'apellido'} es obligatorio.`);
    }
    actualizado[campo] = normalizado;
  }

  if (cambios.correo !== undefined) {
    const correo = normalizarCorreo(cambios.correo);
    validarCorreo(correo);

    if (correo !== normalizarCorreo(existente.correo)) {
      const existentes = await buscarPorCorreo(correo);
      if (existentes.some((item) => item.id_usuario !== id)) {
        throw new Error('El correo ya está registrado por otro usuario.');
      }
    }

    actualizado.correo = correo;
  }

  if (cambios.pass?.trim()) {
    const pass = cambios.pass.trim();
    validarPass(pass);
    actualizado.pass = await hashPass(pass);
  }

  if (cambios.id_tipo_usuario !== undefined) {
    const cambiaRol = cambios.id_tipo_usuario !== existente.id_tipo_usuario;

    if (sesion.rol !== 'Admin') {
      if (cambiaRol) {
        throw new Error('Solo un administrador puede cambiar el rol de un usuario.');
      }
    } else {
      if (!ROL_POR_ID[cambios.id_tipo_usuario]) {
        throw new Error('El rol seleccionado no es válido.');
      }
      actualizado.id_tipo_usuario = cambios.id_tipo_usuario;
    }
  }

  // PUT - Guardar cambios del usuario
  const guardado = await solicitar<Usuario>(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(actualizado),
  });

  if (id === sesion.id_usuario) {
    await actualizarToken(guardado);
  }

  return sinPass(guardado);
}
