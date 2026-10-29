export function Navbar() {
  return (
    <nav className="hidden md:flex items-center space-x-6 text-[14px] font-medium">
        <NavItem label="Inicio" href="#" />
        <NavItem label="Quienes somos" href="#" />
        <div className="relative group cursor-pointer flex items-center gap-1 font-semibold text-white">
            <span>Competiciones</span>
            <i className="fa-solid fa-chevron-down text-xs ml-0.5"></i>
        </div>
        <NavItem label="Jugadores" href="#" />
        <NavItem label="Estadisticas" href="#" />
        <NavItem label="Contacto" href="#" />
    </nav>
  );
}

type NavItemProps = {
  label: string;
  href: string;
};

const NavItem = ({ label, href } : NavItemProps) => {
    return <a className="hover:text-red-200 transition-colors" href={href}>{label}</a>
}