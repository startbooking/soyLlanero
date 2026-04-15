import React, { useState, useRef } from 'react';
import { NavMenuItem } from '@/lib';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import { Link } from 'react-router-dom'; // Asume react-router-dom

interface NavItemProps {
  item: NavMenuItem;
  isMobile?: boolean;
  onLinkClick?: () => void; // Para cerrar el menú móvil
}

const NavItem: React.FC<NavItemProps> = ({ item, isMobile = false, onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (!isMobile && item.children) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && item.children) {
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 200); // Pequeño retraso para permitir movimiento del ratón
    }
  };

  const handleMobileClick = () => {
    if (isMobile && item.children) {
      setIsOpen(!isOpen);
    } else if (item.onClick) {
      item.onClick();
      onLinkClick?.(); // Cerrar menú móvil si se hace clic en un ítem sin submenú
    } else if (item.href) {
      onLinkClick?.(); // Cerrar menú móvil si es un enlace
    }
  };

  const LinkOrDiv = item.href ? Link : 'div';

  return (
    <li
      className={`relative ${isMobile ? 'block' : 'inline-block'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LinkOrDiv
        to={item.href || '#'}
        onClick={handleMobileClick}
        className={`
          flex items-center justify-between py-2 px-4 rounded-lg
          font-medium text-gray-700 hover:bg-gray-100 hover:text-primary
          ${isMobile ? 'w-full' : ''}
        `}
      >
        {item.label}
        {item.children && (
          isMobile ? (isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />) : <ChevronDown className="w-4 h-4 ml-1 hidden lg:block" />
        )}
      </LinkOrDiv>

      {item.children && (
        <DropdownMenu
          items={item.children}
          isOpen={isOpen}
          isMobile={isMobile}
          onLinkClick={onLinkClick} // Pasa el handler para cerrar el menú móvil
        />
      )}
    </li>
  );
};

export default NavItem;