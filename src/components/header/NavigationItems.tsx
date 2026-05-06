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
  ChevronDown,
  LogIn
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { UserMenu } from "../dashboard/UserMenu";
import { AuthModal } from "../AuthModal";
import { UserAuthAction } from "./UserAuthAction";

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
}

export const NavigationItems = ({
  navigationItems,
  activeSection,
  onNavigation,
}: NavigationItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();


  // Cerrar menú al hacer click fuera o al cambiar de ruta
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setOpenMenuId(null);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (!menuRef.current) return;

      const target = event.target as Node;

      if (!menuRef.current.contains(target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const handleSubItemClick = (route: string) => {
    navigate(route);
    setOpenMenuId(null);
  };

  // Verifica si algún subitem está activo para iluminar el padre
  const isParentActive = (item: NavigationItem) => {
    if (activeSection === item.id) return true;
    return item.subItems?.some(sub => location.pathname.includes(sub.route));
  };

  return (
    <nav
      className="hidden lg:flex items-center gap-1 xl:gap-2 z-100"
      ref={menuRef}
    >
      {navigationItems.map((item) => {
        const isActive = isParentActive(item);
        const hasSubItems = !!item.subItems;

        return (
          <div key={item.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => hasSubItems ? setOpenMenuId(openMenuId === item.id ? null : item.id) : onNavigation(item)}
              className={cn(
                "flex items-center gap-2 px-3 xl:px-4 h-10 rounded-xl font-black uppercase text-[10px] xl:text-[11px] tracking-widest transition-all duration-300",
                isActive
                  ? "text-slate"
                  : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-900",
                openMenuId === item.id && "bg-sabana/80 text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive || openMenuId === item.id ? "text-slate" : "text-current")} />
              <span className="hidden xl:inline">{item.label}</span>
              {hasSubItems && (
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform duration-300",
                  openMenuId === item.id && "rotate-180"
                )} />
              )}
            </Button>
            {/* Dropdown Mejorado */}
            {hasSubItems && openMenuId === item.id && (
              <div className="absolute top-[calc(100%+12px)] left-0 min-w-[260px] bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200/50 z-[100] p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-1">
                  {item.subItems?.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleSubItemClick(subItem.route)}
                      className={cn(
                        "group w-full flex items-center gap-4 p-3.5 rounded-[1.2rem] transition-all text-left",
                        location.pathname === subItem.route ? "bg-slate-50" : "hover:bg-slate-50/80"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-xl transition-all",
                        location.pathname === subItem.route ? "bg-white shadow-sm text-sabana" : "bg-sabana/10 text-slate-400 group-hover:bg-white group-hover:text-sabana"
                      )}>
                        <subItem.icon className="w-4 h-4" />
                      </div>
                      <span className={cn(
                        "font-black uppercase text-[10px] tracking-widest",
                        location.pathname === subItem.route ? "text-sabana/80" : "text-slate-500 group-hover:text-slate-900"
                      )}>
                        {subItem.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <UserAuthAction />

    </nav>
  );
};

export const createNavigationItems = (t: any): NavigationItem[] => [
  { id: "home", label: "Inicio", icon: Home, route: "/" },
  {
    id: "discover",
    label: "Explorar",
    icon: Compass,
    route: "/discover",
    subItems: [
      { id: "accommodation", label: "Donde Dormir", icon: Hotel, route: "/hotels" },
      { id: "activities", label: "Aventura", icon: Mountain, route: "/adventures" },
      { id: "events", label: "Agenda", icon: Calendar, route: "/events" },
      { id: "points-of-interest", label: "Destinos", icon: MapPin, route: "/points-of-interest" }
    ]
  },
  {
    id: "tourist-services",
    label: "Servicios",
    icon: Briefcase,
    route: "/services",
    subItems: [
      { id: "restaurants", label: "Comer", icon: Utensils, route: "/discover/restaurants" },
      { id: "agencies-operators", label: "Agencias", icon: Building, route: "/agencies-operators" },
      { id: "other-services", label: "Guías", icon: Star, route: "/services" }
    ]
  },
  {
    id: "information",
    label: "Info",
    icon: FileText,
    route: "/institutional",
    subItems: [
      { id: "interactive-map", label: "Mapa Meta", icon: Map, route: "/maps" },
      { id: "about-us", label: "Nosotros", icon: Users, route: "/institutional" },
      { id: "contact", label: "Contacto", icon: Phone, route: "/contact" }
    ]
  }
];