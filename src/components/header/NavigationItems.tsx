import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Home,
  Map,
  Calendar,
  Hotel,
  Star,
  User as Users,
  Utensils,
  FileText,
  Phone,
  Mountain,
  Building,
  Compass,
  MapPin,
  Briefcase,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  route: string;
  subItems?: NavigationItem[];
}

interface NavigationItemsProps {
  navigationItems: NavigationItem[];
  activeSection: string;
  onNavigation: (item: NavigationItem) => void;
  isMobile?: boolean;
}

export const NavigationItems = ({
  navigationItems,
  activeSection,
  onNavigation,
  isMobile = false
}: NavigationItemsProps) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleSubItemClick = (route: string) => {
    navigate(route);
    setOpenMenuId(null);
  };

  const toggleMenu = (itemId: string) => {
    setOpenMenuId(openMenuId === itemId ? null : itemId);
  };

  if (isMobile) {
    return (
      <>
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            size="default"
            onClick={() => onNavigation(item)}
            className="flex flex-col items-center gap-1 h-auto py-3 min-w-[80px] flex-shrink-0"
          >
            <item.icon className="w-4 h-4" />
            <span className="text-xs text-center whitespace-nowrap">{item.label}</span>
          </Button>
        ))}
      </>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {navigationItems.map((item) => (
        <div key={item.id} className="relative">
          {item.subItems ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMenu(item.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap hover:bg-llanero/20",
                  openMenuId === item.id && "bg-llanero/20"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    openMenuId === item.id && "rotate-180"
                  )}
                />
              </Button>

              {openMenuId === item.id && (
                <div className="absolute top-full left-0 mt-1 min-w-[240px] bg-popover border border-border rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
                  <div className="p-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(subItem.route)}
                        className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-llanero/20 transition-colors text-left"
                      >
                        <subItem.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant={activeSection === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigation(item)}
              className="flex items-center gap-2 whitespace-nowrap bg-white text-black hover:bg-llanero/20"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          )}
        </div>
      ))}
    </nav>
  );
};

export const createNavigationItems = (t: any): NavigationItem[] => [
  {
    id: "home",
    label: "Inicio",
    icon: Home,
    route: "/"
  },
  {
    id: "discover",
    label: "Descubre el Meta",
    icon: Compass,
    route: "/discover",
    subItems: [
      { id: "accommodation", label: "Alojamiento", icon: Hotel, route: "/hotels" },
      { id: "activities", label: "Actividades y Tours", icon: Mountain, route: "/adventures" },
      { id: "events", label: "Eventos", icon: Calendar, route: "/events" },
      { id: "points-of-interest", label: "Puntos de Interés", icon: MapPin, route: "/points-of-interest" }
    ]
  },
  {
    id: "tourist-services",
    label: "Servicios Turísticos",
    icon: Briefcase,
    route: "/services",
    subItems: [
      { id: "restaurants", label: "Restaurantes", icon: Utensils, route: "/restaurants" },
      { id: "agencies-operators", label: "Agencias / Operadores", icon: Building, route: "/agencies-operators" },
      { id: "other-services", label: "Otros Servicios", icon: Star, route: "/services" }
    ]
  },
  {
    id: "information",
    label: "Información",
    icon: FileText,
    route: "/institutional",
    subItems: [
      { id: "about-us", label: "Quiénes Somos", icon: Users, route: "/institutional" },
      { id: "interactive-map", label: "Mapa Interactivo", icon: Map, route: "/" },
      { id: "contact", label: "Contacto", icon: Phone, route: "/contact" }
    ]
  }
];