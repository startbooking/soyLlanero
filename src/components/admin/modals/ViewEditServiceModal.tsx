
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Wrench, MapPin, Phone, DollarSign } from "lucide-react";

interface ViewEditServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: any;
  mode: 'view' | 'edit';
}

export const ViewEditServiceModal = ({ open, onOpenChange, service, mode }: ViewEditServiceModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    provider: "",
    phone: "",
    location: "",
    price: "",
    schedule: "",
    status: ""
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        category: service.category || "",
        description: service.description || "",
        provider: service.provider || "",
        phone: service.phone || "",
        location: service.location || "",
        price: service.price || "",
        schedule: service.schedule || "",
        status: service.status || ""
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') {
      console.log("Actualizar servicio:", formData);
      toast({
        title: "Servicio actualizado",
        description: "El servicio ha sido actualizado exitosamente."
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
            <Wrench className="w-5 h-5" />
            {mode === 'view' ? 'Ver Servicio' : 'Editar Servicio'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'view' ? 'Información del servicio' : 'Modificar la información del servicio'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Servicio</Label>
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
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="guias">Guías Turísticos</SelectItem>
                    <SelectItem value="equipos">Equipos</SelectItem>
                    <SelectItem value="catering">Catering</SelectItem>
                    <SelectItem value="fotografia">Fotografía</SelectItem>
                    <SelectItem value="spa">Spa y Bienestar</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider">Proveedor</Label>
              <Input
                id="provider"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
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

            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  className={`pl-10 ${isReadOnly ? "bg-gray-100" : ""}`}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Horario</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                className={`pl-10 ${isReadOnly ? "bg-gray-100" : ""}`}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Input
                id="status"
                value={formData.status}
                readOnly
                className="bg-gray-100"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {mode === 'view' ? 'Cerrar' : 'Cancelar'}
            </Button>
            {mode === 'edit' && (
              <Button type="submit" variant="warning">
                Actualizar Servicio
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
