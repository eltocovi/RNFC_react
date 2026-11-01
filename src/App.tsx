import { Navigate, Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import PaginaJugadores from './pages/PaginaJugadores';

export default function App() {
  return (
    <>
      <Navbar />
      {/* Rutas: por ahora todo lleva a Jugadores */}
      <Routes>
        <Route path="/" element={<Navigate to="/jugadores" replace />} />
        <Route path="/jugadores" element={<PaginaJugadores />} />
        <Route path="*" element={<Navigate to="/jugadores" replace />} />
      </Routes>
    </>
  );
}
