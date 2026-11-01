export type RolUsuario = 'UsuarioComun' | 'GestorDeportivo' | 'Admin';

export const ID_ROL: Record<RolUsuario, number> = {
  UsuarioComun: 1,
  GestorDeportivo: 2,
  Admin: 3,
};

export interface Usuario {
  id_usuario: number;
  id_tipo_usuario: number;
  pass: string;
  correo: string;
  fecha_creacion: string;
  pnombre: string;
  snombre?: string;
  papellido: string;
  sapellido?: string;
}
