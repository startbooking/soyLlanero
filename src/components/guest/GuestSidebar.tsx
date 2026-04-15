
import { Calendar, MessageSquare, Star, User, Hotel } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface GuestSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function GuestSidebar({ currentSection, onSectionChange }: GuestSidebarProps) {
  const menuItems = [
    {
      id: "bookings",
      title: "Mis Reservas",
      icon: Calendar,
      description: "Gestiona tus reservas"
    },
    {
      id: "messages",
      title: "Mensajes",
      icon: MessageSquare,
      description: "Comunícate con proveedores"
    },
    {
      id: "reviews",
      title: "Mis Reseñas",
      icon: Star,
      description: "Califica tus experiencias"
    },
    {
      id: "profile",
      title: "Mi Perfil",
      icon: User,
      description: "Información personal"
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-3">
          <Hotel className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg">Panel de Huésped</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={currentSection === item.id}
                    className="w-full justify-start"
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
