import React, { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { NavigationItems } from "./NavigationItems";

// 1. Tipado más estricto
interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon | React.ElementType; 
  route: string;
}

interface MobileNavigationProps {
  navigationItems: NavigationItem[];
  activeSection: string;
  onNavigation: (item: NavigationItem) => void;
}

export const MobileNavigation = ({ 
  navigationItems, 
  activeSection, 
  onNavigation 
}: MobileNavigationProps) => {
  // 2. Referencia al contenedor en lugar de querySelector
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollNavigation = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = 200;
      
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <nav className="lg:hidden flex-1 mx-4 relative max-w-xs sm:max-w-md" aria-label="Navegación móvil">
      <div className="flex items-center group">
        {/* Botón Izquierdo */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Deslizar izquierda"
          className="absolute left-0 z-10 bg-sabana-tenue/80 backdrop-blur-sm hover:bg-sabana-200 shadow-sm h-8 w-8 p-0 rounded-full"
          onClick={() => scrollNavigation('left')}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        {/* Contenedor de Scroll */}
        <div 
          ref={scrollContainerRef}
          className="nav-scroll-container flex gap-1 overflow-x-auto scrollbar-hide nav-mobile-scroll mx-6 py-1 snap-x"
        >
          <div className="flex gap-1 min-w-max">
            <NavigationItems 
              navigationItems={navigationItems}
              activeSection={activeSection}
              onNavigation={onNavigation}
              isMobile={true}
            />
          </div>
        </div>

        {/* Botón Derecho */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Deslizar derecha"
          className="absolute right-0 z-10 bg-sabana-tenue/80 backdrop-blur-sm hover:bg-sabana-200 shadow-sm h-8 w-8 p-0 rounded-full"
          onClick={() => scrollNavigation('right')}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
};