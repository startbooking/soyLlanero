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

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
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
          <div className="p-8 bg-slate-900 text-white relative overflow-hidden">
             {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sabana/20 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-sabana rounded-2xl flex items-center justify-center shadow-lg shadow-sabana/20">
                <span className="text-white font-black text-xl italic">V</span>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter leading-tight">Villavicencio</h2>
                <p className="text-[10px] font-bold text-sabana uppercase tracking-widest italic">Guía de Territorio</p>
              </div>
            </div>
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
            </nav>

            {/* Accesos Rápidos */}
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
              <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Explora más</p>
              
              <Button
                variant="ghost"
                onClick={onUniqueExperiencesClick}
                className="w-full justify-start h-14 rounded-2xl bg-slate-50 hover:bg-sabana/10 group px-4"
              >
                <div className="p-2 bg-white rounded-xl mr-3 group-hover:text-sabana transition-colors">
                    <Mountain className="w-4 h-4" />
                </div>
                <span className="font-black uppercase text-[11px] tracking-widest text-slate-700">Experiencias</span>
                <Sparkles className="w-3 h-3 ml-auto text-sabana animate-pulse" />
              </Button>

              <Button
                variant="ghost"
                onClick={onAdminClick}
                className="w-full justify-start h-14 rounded-2xl hover:bg-slate-100 px-4"
              >
                <div className="p-2 bg-slate-100 rounded-xl mr-3">
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                </div>
                <span className="font-black uppercase text-[11px] tracking-widest text-slate-700">Admin</span>
              </Button>
            </div>
          </div>

          {/* Footer del Menú: Estadísticas */}
          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Empresas</p>
                <div className="flex items-center gap-2">
                    <Building className="w-3 h-3 text-sabana" />
                    <span className="text-sm font-black text-slate-900">125+</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Eventos</p>
                <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-sabana" />
                    <span className="text-sm font-black text-slate-900">25+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};