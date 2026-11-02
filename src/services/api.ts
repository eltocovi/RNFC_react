type Metodo = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Petición genérica a la API con mensajes de error amigables (ERS 3.3.3)
export async function peticionJson<T>(url: string, metodo: Metodo = 'GET', cuerpo?: unknown): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url, {
      method: metodo,
      headers: cuerpo !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new Error('No se pudo conectar al servidor. Por favor, intente más tarde.');
  }

  if (res.status === 404) throw new Error('El recurso solicitado no existe.');
  if (res.status >= 500) throw new Error('Ha ocurrido un error interno. Por favor, intente más tarde.');
  if (!res.ok) throw new Error(`Error ${res.status} al consultar el servidor.`);

  // Algunas respuestas (ej. DELETE en el backend real) pueden venir sin cuerpo
  const texto = await res.text();
  return (texto ? JSON.parse(texto) : undefined) as T;
}

export function obtenerJson<T>(url: string): Promise<T> {
  return peticionJson<T>(url);
}
