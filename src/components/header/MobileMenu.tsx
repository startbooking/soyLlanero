
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Mountain, Building, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <Button variant="ghost" size="sm" className="sm:hidden hover:bg-green-tenue">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-green-tenue">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Villavicencio</h2>
              <p className="text-sm text-muted-foreground">Turismo</p>
            </div>
          </div>

          <nav className="space-y-2 mb-6">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <Collapsible open={openGroups.includes(item.id)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:bg-green-200"
                        onClick={() => toggleGroup(item.id)}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${openGroups.includes(item.id) ? 'rotate-90' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-6 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Button
                          key={subItem.id}
                          variant="ghost"
                          className="w-full justify-start text-sm hover:bg-green-200"
                          onClick={() => handleSubItemClick(subItem.route)}
                        >
                          <subItem.icon className="w-4 h-4 mr-2" />
                          {subItem.label}
                        </Button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Button
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => onNavigation(item)}
                    className="w-full justify-start hover:bg-green-200"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-border pt-4 mb-6">
            <Button
              variant="ghost"
              onClick={onUniqueExperiencesClick}
              className="w-full justify-start mb-2"
            >
              <Mountain className="w-4 h-4 mr-2" />
              Experiencias Únicas
            </Button>
            <Button
              variant="ghost"
              onClick={onAdminClick}
              className="w-full justify-start"
            >
              <Building className="w-4 h-4 mr-2" />
              Dashboard Admin
            </Button>
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Empresas registradas</span>
                <Badge variant="secondary">125+</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Eventos activos</span>
                <Badge variant="secondary">25+</Badge>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
