import React from 'react';
import { NavMenuItem } from '@/lib';
import { Link } from 'react-router-dom';

interface DropdownMenuProps {
  items: NavMenuItem[];
  isOpen: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void; // Para cerrar el menú móvil
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, isOpen, isMobile, onLinkClick }) => {
  const commonClasses = `absolute bg-white shadow-lg rounded-lg py-2 z-10
                         ${isMobile ? 'relative shadow-none rounded-none py-0' : 'min-w-[200px] top-full left-0 mt-2'}
                         ${isOpen ? 'block' : 'hidden'}`;

  return (
    <ul className={commonClasses}>
      {items.map((subItem, index) => (
        <React.Fragment key={index}>
          {subItem.separator && <hr className="my-1 border-gray-200" />}
          <li key={subItem.label + index}>
            {subItem.href ? (
              <Link
                to={subItem.href}
                onClick={onLinkClick} // Cierra el menú móvil al hacer clic en un enlace
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary whitespace-nowrap"
              >
                {subItem.label}
              </Link>
            ) : (
              <button
                onClick={() => {
                  subItem.onClick?.();
                  onLinkClick?.(); // Cierra el menú móvil al hacer clic en un botón
                }}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary whitespace-nowrap"
              >
                {subItem.label}
              </button>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default DropdownMenu;