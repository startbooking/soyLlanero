import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Mountain, 
  Building, 
  ChevronRight, 
  X, 
  Sparkles,
  MapPin,
  Calendar,
  LayoutDashboard
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { LogoSection } from "./LogoSection";
import { UserAuthAction } from "./UserAuthAction";

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  route: string;
  subItems?: NavigationItem[];
}

interface MobileMenuProps {
  navigationItems: NavigationItem[];
  activeSection: string;
  onNavigation: (item: NavigationItem) => void;
  onUniqueExperiencesClick: () => void;
  onAdminClick: () => void;
}

export const MobileMenu = ({ 
  navigationItems, 
  activeSection, 
  onNavigation,
  onUniqueExperiencesClick,
  onAdminClick
}: MobileMenuProps) => {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const navigate = useNavigate();
  const { appConfig } = useAppConfig();

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleNavigation = (item: any) => {
    if (item.route === "/") {
      navigate("/");
      onSectionChange(item.id);
    } else {
      navigate(item.route);
    }
  };

  const handleSubItemClick = (route: string) => {
    navigate(route);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-slate-100 rounded-xl">
          <Menu className="w-6 h-6 text-slate-900" />
        </Button>
      </SheetTrigger>
      
      {/* Contenido del Menú con Fondo Premium */}
      <SheetContent side="right" className="w-[320px] p-0 bg-white border-l-0">
        <div className="flex flex-col h-full">
          
          {/* Header del Menú */}
          <div className="p-8 bg-slate-800 text-white relative overflow-hidden">
             {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sabana/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <LogoSection onHomeClick={() => handleNavigation ({ id: "home", route: "/" })} />
          </div>

          {/* Navegación Scrolleable */}
          <div className="flex-grow overflow-y-auto custom-scrollbar px-4 py-6">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.id} className="mb-1">
                  {item.subItems ? (
                    <Collapsible 
                      open={openGroups.includes(item.id)}
                      onOpenChange={() => toggleGroup(item.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between h-14 rounded-2xl px-4 transition-all",
                            openGroups.includes(item.id) ? "bg-slate-50 text-slate-900" : "text-slate-500"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2 rounded-xl transition-colors",
                                openGroups.includes(item.id) ? "bg-white text-sabana" : "bg-slate-50"
                            )}>
                                <item.icon className="w-4 h-4" />
                            </div>
                            <span className="font-black uppercase text-[11px] tracking-widest">{item.label}</span>
                          </div>
                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform duration-300 opacity-50",
                            openGroups.includes(item.id) && "rotate-90 opacity-100"
                          )} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-1 ml-4 border-l-2 border-slate-50 space-y-1 animate-in slide-in-from-left-2 duration-300">
                        {item.subItems.map((subItem) => (
                          <SheetClose asChild key={subItem.id}>
                            <Button
                                variant="ghost"
                                className="w-full justify-start h-12 text-slate-500 hover:text-sabana hover:bg-transparent pl-8"
                                onClick={() => handleSubItemClick(subItem.route)}
                            >
                                <span className="font-bold text-[11px] uppercase tracking-wider">{subItem.label}</span>
                            </Button>
                          </SheetClose>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SheetClose asChild>
                        <Button
                        variant="ghost"
                        onClick={() => onNavigation(item)}
                        className={cn(
                            "w-full justify-start h-14 rounded-2xl px-4 gap-3",
                            activeSection === item.id ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                        )}
                        >
                        <item.icon className={cn("w-4 h-4", activeSection === item.id && "text-sabana")} />
                        <span className="font-black uppercase text-[11px] tracking-widest">{item.label}</span>
                        </Button>
                    </SheetClose>
                  )}
                </div>
              ))}
              <UserAuthAction className="sm:hidden bg-white" />
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};