
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  Building2,
  MessageSquare,
  BarChart3
} from "lucide-react";

interface BusinessOwnerSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "company",
    title: "Mi Empresa",
    icon: Building2,
  },
  {
    id: "messages",
    title: "Mensajes",
    icon: MessageSquare,
  },
  {
    id: "statistics",
    title: "Estadísticas",
    icon: BarChart3,
  },
];

export function BusinessOwnerSidebar({ currentSection, onSectionChange }: BusinessOwnerSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-green-600">Panel Empresario</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={currentSection === item.id}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
