import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubItemClick = (route: string) => {
    navigate(route);
    setOpenMenuId(null);
  };

  const toggleMenu = (itemId: string) => {
    setOpenMenuId(openMenuId === itemId ? null : itemId);
  };

  if (isMobile) {
    return (
      <div className="flex flex-row items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => onNavigation(item)}
            className={cn(
              "flex flex-col items-center gap-1 h-auto py-4 px-6 min-w-[90px] rounded-2xl transition-all",
              activeSection === item.id ? "bg-sababa/80 text-white" : "text-sabana-500"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeSection === item.id ? "text-sabana" : "")} />
            <span className="text-[10px] font-black uppercase tracking-tighter italic">{item.label}</span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-2" ref={menuRef}>
      {navigationItems.map((item) => (
        <div key={item.id} className="relative">
          {item.subItems ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleMenu(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 h-10 rounded-xl font-black uppercase text-[11px] tracking-widest transition-all",
                  openMenuId === item.id 
                    ? "bg-sabana/80 text-slate-500 shadow-lg" 
                    : "text-sabana-600 hover:bg-sabana/10 hover:text-slate-900",
                  activeSection === item.id && "text-sabana"
                )}
              >
                <item.icon className={cn("w-4 h-4", openMenuId === item.id && "text-sabana")} />
                {item.label}
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform duration-300 opacity-50",
                  openMenuId === item.id && "rotate-180 opacity-100"
                )} />
              </Button>

              {/* Dropdown Estilizado */}
              {openMenuId === item.id && (
                <div className="absolute top-[calc(100%+8px)] left-0 min-w-[280px] bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200/80 z-[100] p-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid gap-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(subItem.route)}
                        className="group w-full flex items-center gap-4 p-4 rounded-[1.2rem] hover:bg-slate-50 transition-all text-left"
                      >
                        <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                          <subItem.icon className="w-4 h-4 text-slate-400 group-hover:text-sabana" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 uppercase text-[10px] tracking-widest">
                            {subItem.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigation(item)}
              className={cn(
                "flex items-center gap-2 px-4 h-10 rounded-xl font-black uppercase text-[11px] tracking-widest transition-all",
                activeSection === item.id 
                  ? "bg-white/80 text-slate-800 hover:bg-sabana/10" 
                  : "text-slate-600 hover:bg-sabana/10"
              )}
            >
              <item.icon className={cn("w-4 h-4", activeSection === item.id && "text-slate-800")} />
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
    label: "Explorar",
    icon: Compass,
    route: "/discover",
    subItems: [
      { id: "accommodation", label: "Donde Dormir", icon: Hotel, route: "/discover/hotels" },
      { id: "activities", label: "Aventura y Tours", icon: Mountain, route: "/discover/adventure" },
      { id: "events", label: "Agenda Eventos", icon: Calendar, route: "/events" },
      { id: "points-of-interest", label: "Imperdibles", icon: MapPin, route: "/points-of-interest" }
    ]
  },
  {
    id: "tourist-services",
    label: "Servicios",
    icon: Briefcase,
    route: "/services",
    subItems: [
      { id: "restaurants", label: "Restaurantes", icon: Utensils, route: "/discover/restaurants" },
      { id: "agencies-operators", label: "Agencias", icon: Building, route: "/agencies-operators" },
      { id: "other-services", label: "Guías & Transporte", icon: Star, route: "/services" }
    ]
  },
  {
    id: "information",
    label: "Info",
    icon: FileText,
    route: "/institutional",
    subItems: [
      { id: "interactive-map", label: "Mapa del Meta", icon: Map, route: "/maps" },
      { id: "about-us", label: "Nuestro Equipo", icon: Users, route: "/institutional" },
      { id: "contact", label: "Soporte 24/7", icon: Phone, route: "/contact" }
    ]
  }
];