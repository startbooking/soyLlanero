
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationItems } from "./NavigationItems";

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
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
  const scrollNavigation = (direction: 'left' | 'right') => {
    const container = document.querySelector('.nav-scroll-container');
    if (container) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="lg:hidden flex-1 mx-4 relative max-w-xs sm:max-w-md">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-0 z-10 bg-green-tenue backdrop-blur-sm hover:bg-green-200 shadow-sm h-8 w-8 p-0"
          onClick={() => scrollNavigation('left')}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="nav-scroll-container flex gap-1 overflow-x-auto scrollbar-hide nav-mobile-scroll mx-6 py-1">
          <div className="flex gap-1 min-w-max">
            <NavigationItems 
              navigationItems={navigationItems}
              activeSection={activeSection}
              onNavigation={onNavigation}
              isMobile={true}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 z-10 bg-green-tenue backdrop-blur-sm hover:bg-green-200 shadow-sm h-8 w-8 p-0"
          onClick={() => scrollNavigation('right')}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
