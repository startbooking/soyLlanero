
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ChevronDown, Lock, HelpCircle, Book, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserManualModal } from "@/components/common/UserManualModal";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate("/admin/change-password");
  };

  const handleTechnicalSupport = () => {
    navigate("/admin/technical-support");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      "administrador": "Administrador",
      "usuario-administrador": "Usuario Admin",
      "empresario": "Empresario",
      "usuario-empresario": "Usuario Empresario",
      "turista": "Turista",
      "huesped": "Huésped"
    };
    return roleMap[role] || role;
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-green-tenue">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{user.name}</span>
          <Badge variant="outline" className="hidden md:inline-flex">
            {getRoleDisplayName(user.role)}
          </Badge>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleChangePassword}>
          <Lock className="w-4 h-4 mr-2" />
          Cambiar Contraseña
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTechnicalSupport}>
          <HelpCircle className="w-4 h-4 mr-2" />
          Soporte Técnico
        </DropdownMenuItem>
        <div className="px-2 py-1.5">
          <UserManualModal />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
