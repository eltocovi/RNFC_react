import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import PaginaJugadores from './pages/PaginaJugadores';
import Tournament from './pages/Tournament';
import Club from './pages/Club';

export default function App() {
  return (
    <>
      <Navbar />
      {/* Rutas: por ahora todo lleva a Jugadores */}
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/jugadores" replace />} />
          <Route path="/jugadores" element={<PaginaJugadores />} />
          <Route path="/tournament" element={ <Tournament /> } />
          <Route path="/club" element={ <Club /> } />
          <Route path="*" element={<Navigate to="/jugadores" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
