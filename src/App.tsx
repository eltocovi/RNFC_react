import { BrowserRouter, Route, Routes } from 'react-router';
import LayoutAplicacion from './components/LayoutAplicacion';
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada';
import QuienesSomos from './pages/QuienesSomos';
import UserPerfil from './pages/UserPerfil';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutAplicacion />}>
          <Route index element={<Home />} />
          <Route path="quienes-somos" element={<QuienesSomos />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="perfil" element={<UserPerfil />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
