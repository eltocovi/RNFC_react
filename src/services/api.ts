// GET genérico con mensajes de error amigables (ERS 3.3.3)
export async function obtenerJson<T>(url: string): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url);
  } catch {
    throw new Error('No se pudo conectar al servidor. Por favor, intente más tarde.');
  }

  if (res.status === 404) throw new Error('El recurso solicitado no existe.');
  if (res.status >= 500) throw new Error('Ha ocurrido un error interno. Por favor, intente más tarde.');
  if (!res.ok) throw new Error(`Error ${res.status} al consultar el servidor.`);

  return res.json();
}
