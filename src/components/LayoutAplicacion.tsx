import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';
import { cerrarSesion as cerrarSesionServicio, obtenerSesion } from '../services/usuario';
import type { SesionUsuario } from '../services/usuario';

function DesplazamientoRutas() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const elemento = hash ? document.getElementById(hash.slice(1)) : null;
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function LayoutAplicacion() {
  const [sesion, setSesion] = useState<SesionUsuario | null>(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    let activo = true;

    obtenerSesion()
      .then((actual) => {
        if (activo) setSesion(actual);
      })
      .catch(() => {
        if (activo) setSesion(null);
      })
      .finally(() => {
        if (activo) setCargandoSesion(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  async function refrescarSesion(): Promise<SesionUsuario | null> {
    const actual = await obtenerSesion();
    setSesion(actual);
    return actual;
  }

  function cerrarSesion(): void {
    cerrarSesionServicio();
    setSesion(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <DesplazamientoRutas />
      <Navbar sesion={sesion} onCerrarSesion={cerrarSesion} />
      <main className="flex-1">
        <Outlet context={{ sesion, cargandoSesion, refrescarSesion, cerrarSesion }} />
      </main>
      <Footer />
    </div>
  );
}
