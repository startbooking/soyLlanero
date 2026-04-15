
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
  DollarSign,
  Calendar,
  MessageSquare,
  Star
} from "lucide-react";

interface TourOperatorSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "company-info",
    title: "Info de Empresa",
    icon: Building2,
  },
  {
    id: "pricing",
    title: "Tarifas",
    icon: DollarSign,
  },
  {
    id: "availability",
    title: "Disponibilidad",
    icon: Calendar,
  },
  {
    id: "messages",
    title: "Mensajes",
    icon: MessageSquare,
  },
  {
    id: "reviews",
    title: "Reseñas",
    icon: Star,
  },
];

export function TourOperatorSidebar({ currentSection, onSectionChange }: TourOperatorSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-green-600">Panel Operador</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión Turística</SidebarGroupLabel>
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
