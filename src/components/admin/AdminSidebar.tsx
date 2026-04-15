
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
  BarChart3,
  Settings,
  Users,
  Building2,
  Calendar,
  Star,
  Briefcase,
  Newspaper,
  MessageSquare
} from "lucide-react";

interface AdminSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: BarChart3,
  },
  {
    id: "app-config",
    title: "Configuración App",
    icon: Settings,
  },
  {
    id: "users",
    title: "Usuarios",
    icon: Users,
  },
  {
    id: "businesses",
    title: "Empresas",
    icon: Building2,
  },
  {
    id: "events",
    title: "Eventos",
    icon: Calendar,
  },
  {
    id: "experiences",
    title: "Experiencias",
    icon: Star,
  },
  {
    id: "services",
    title: "Servicios",
    icon: Briefcase,
  },
  {
    id: "news",
    title: "Noticias",
    icon: Newspaper,
  },
  {
    id: "messages",
    title: "Mensajes",
    icon: MessageSquare,
  },
];

export function AdminSidebar({ currentSection, onSectionChange }: AdminSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-green-600">Panel Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
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
