import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import NavItem from './NavItem';
import { NavMenuItem } from '@/lib';

// import { useAuth } from '../../context/AuthContext';
// import clusterTurismoLogo from '../../assets/cluster_turismo.jpg'; // Importa tu logo
import { useAuth } from '@/contexts/AuthContext';
import { LogoSection } from '../header/LogoSection';
import { useTranslations } from "@/utils/translations";

import { useLanguage } from "@/contexts/LanguageContext"; // Importa el hook useLanguage
interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  language: string;
}

export const Navbar: React.FC = ({ activeSection, onSectionChange, language }: HeaderProps) => {


// const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { language: currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const t = useTranslations(currentLanguage);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Define la estructura del menú
  const navItems: NavMenuItem[] = [
    { label: `${t.nav.home}`, href: '/' },
    {
      label: `${t.nav.discovery.title}`,
      children: [
        { label: `${t.nav.discovery.hotels}`, href: '/hotels' },
        { label: `${t.nav.discovery.activities}`, href: '/experiences' },
        { label: `${t.nav.discovery.events}`, href: '/events' },
        { label: `${t.nav.discovery.points}`, href: '/points' },
      ],
    },
    {
      label: `${t.nav.services.title}`,
      children: [
        { label: `${t.nav.services.restorant}` , href: '/restaurants' },
        { label: `${t.nav.services.agency}`, href: '/agencias-operadores' },
        { label: `${t.nav.services.service}`, href: '/services' },
      ],
    },
    {
      label: `${t.nav.information.title}`,
      children: [
        { label: `${t.nav.information.whoIs}`, href: '/institutional' },
        { label: `${t.nav.information.map}`, href: '/map' },
        { label: `${t.nav.information.contact}`, href: '/contact' },
      ],
    },
  ];

  // Ítem de autenticación dinámico
  const authNavItem: NavMenuItem = isAuthenticated
    ? {
        label: `Hola, ${user?.name || 'Usuario'}`,
        authStatus: 'loggedIn',
        children: [
          { label: 'Mi Perfil', href: '/mi-perfil' },
          { label: 'Mis Reservas', href: '/mis-reservas' },
          { label: 'Mis Favoritos', href: '/mis-favoritos' },
          { separator: true, label: '' }, // Separador visual
          { label: 'Cerrar Sesión', onClick: logout },
        ],
      }
    : { label: `${t.nav.login}`, href: '/login', authStatus: 'loggedOut' };


  const filteredNavItems = navItems.filter(item => {
    if (item.isAuthItem) {
      return (item.authStatus === 'loggedIn' && isAuthenticated) ||
            (item.authStatus === 'loggedOut' && !isAuthenticated) ||
            item.authStatus === 'always';
    }
    return true;
  });

const handleNavigation = (item: any) => {
    if (item.route !== "home") {
      navigate("/");
      onSectionChange(item.id);
    } else {
      navigate(item.route);
    }
  };

const handleHomeClick = () => {
    handleNavigation({ id: "home", route: "/" });
  };


  return (
    <nav className="shadow-md sticky top-0 z-50 w-full">
      <div className="mx-auto px-4 py-2 flex justify-between items-center">
        <LogoSection onHomeClick={handleHomeClick}/>
        {/* Menú de escritorio */}
        <ul className="hidden lg:flex space-x-2">
          {filteredNavItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
          {/* Renderiza el ítem de autenticación por separado si no está en la lista principal */}
          <NavItem item={authNavItem} />
        </ul>
        {/* Botón de menú móvil */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-primary focus:outline-none">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg pb-4">
          <ul className="px-4">
            {filteredNavItems.map((item, index) => (
              <NavItem key={index} item={item} isMobile={true} onLinkClick={closeMobileMenu} />
            ))}
            <NavItem item={authNavItem} isMobile={true} onLinkClick={closeMobileMenu} />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;