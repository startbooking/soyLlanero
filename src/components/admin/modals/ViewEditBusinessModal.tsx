
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Building, MapPin, Phone, User } from "lucide-react";

interface ViewEditBusinessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  business: any;
  mode: 'view' | 'edit';
}

export const ViewEditBusinessModal = ({ open, onOpenChange, business, mode }: ViewEditBusinessModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    owner: "",
    phone: "",
    address: "",
    description: "",
    status: "",
    rating: "",
    date: ""
  });

  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || "",
        category: business.category || "",
        owner: business.owner || "",
        phone: business.phone || "",
        address: business.address || "",
        description: business.description || "",
        status: business.status || "",
        rating: business.rating?.toString() || "",
        date: business.date || ""
      });
    }
  }, [business]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') {
      console.log("Actualizar empresa:", formData);
      toast({
        title: "Empresa actualizada",
        description: "La empresa ha sido actualizada exitosamente."
      });
      onOpenChange(false);
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            {mode === 'view' ? 'Ver Empresa' : 'Editar Empresa'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'view' ? 'Información de la empresa' : 'Modificar la información de la empresa'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Empresa</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              {isReadOnly ? (
                <Input
                  value={formData.category}
                  readOnly
                  className="bg-gray-100"
                />
              ) : (
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoteles">Hoteles</SelectItem>
                    <SelectItem value="restaurantes">Restaurantes</SelectItem>
                    <SelectItem value="experiencias">Experiencias</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Propietario</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="owner"
                  className={`pl-10 ${isReadOnly ? "bg-gray-100" : ""}`}
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  className={`pl-10 ${isReadOnly ? "bg-gray-100" : ""}`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  readOnly={isReadOnly}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                className={`pl-10 ${isReadOnly ? "bg-gray-100" : ""}`}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              readOnly={isReadOnly}
              className={isReadOnly ? "bg-gray-100" : ""}
              rows={3}
            />
          </div>

          {isReadOnly && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="rating">Calificación</Label>
                <Input
                  id="rating"
                  value={formData.rating}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Fecha de Registro</Label>
                <Input
                  id="date"
                  value={formData.date}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {mode === 'view' ? 'Cerrar' : 'Cancelar'}
            </Button>
            {mode === 'edit' && (
              <Button type="submit" variant="warning">
                Actualizar Empresa
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
