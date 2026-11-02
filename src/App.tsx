import { Route, Routes } from 'react-router';
import LayoutAplicacion from './components/LayoutAplicacion';
import Club from './pages/Club';
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import PaginaEstadisticas from './pages/PaginaEstadisticas';
import PaginaJugadores from './pages/PaginaJugadores';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada';
import QuienesSomos from './pages/QuienesSomos';
import Tournament from './pages/Tournament';
import UserPerfil from './pages/UserPerfil';

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutAplicacion />}>
        <Route index element={<Home />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="perfil" element={<UserPerfil />} />
        <Route path="jugadores" element={<PaginaJugadores />} />
        <Route path="estadisticas" element={<PaginaEstadisticas />} />
        <Route path="tournaments" element={<Tournament />} />
        <Route path="clubs" element={<Club />} />
        <Route path="clubs/:id" element={<Club />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Route>
    </Routes>
  );
}
