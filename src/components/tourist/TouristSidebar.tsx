
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
  MapPin,
  MessageSquare,
  User
} from "lucide-react";

interface TouristSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "activities",
    title: "Mis Actividades",
    icon: MapPin,
  },
  {
    id: "messages",
    title: "Mensajes",
    icon: MessageSquare,
  },
  {
    id: "profile",
    title: "Mi Perfil",
    icon: User,
  },
];

export function TouristSidebar({ currentSection, onSectionChange }: TouristSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-green-600">Panel Turista</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mi Cuenta</SidebarGroupLabel>
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
