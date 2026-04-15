
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Shield } from "lucide-react";

interface ViewEditUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  mode: 'view' | 'edit';
}

export const ViewEditUserModal = ({ open, onOpenChange, user, mode }: ViewEditUserModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    status: "",
    registerDate: "",
    lastLogin: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        phone: user.phone || "",
        status: user.status || "",
        registerDate: user.registerDate || "",
        lastLogin: user.lastLogin || ""
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') {
      console.log("Actualizar usuario:", formData);
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado exitosamente."
      });
      onOpenChange(false);
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {mode === 'view' ? 'Ver Usuario' : 'Editar Usuario'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'view' ? 'Información del usuario' : 'Modificar la información del usuario'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              readOnly={isReadOnly}
              className={isReadOnly ? "bg-gray-100" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                className={`pl-10 ${isReadOnly ? "bg-gray-100" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              {isReadOnly ? (
                <Input
                  className="pl-10 bg-gray-100"
                  value={formData.role}
                  readOnly
                />
              ) : (
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="empresa">Empresa</SelectItem>
                    <SelectItem value="turista">Turista</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              readOnly={isReadOnly}
              className={isReadOnly ? "bg-gray-100" : ""}
            />
          </div>

          {isReadOnly && (
            <>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Input
                  id="status"
                  value={formData.status}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registerDate">Fecha de Registro</Label>
                <Input
                  id="registerDate"
                  value={formData.registerDate}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastLogin">Último Acceso</Label>
                <Input
                  id="lastLogin"
                  value={formData.lastLogin}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {mode === 'view' ? 'Cerrar' : 'Cancelar'}
            </Button>
            {mode === 'edit' && (
              <Button type="submit" variant="warning">
                Actualizar Usuario
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
