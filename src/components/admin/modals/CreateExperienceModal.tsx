
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Mountain, Clock, DollarSign, Users } from "lucide-react";

interface CreateExperienceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateExperienceModal = ({ open, onOpenChange }: CreateExperienceModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
    description: "",
    provider: "",
    difficulty: "",
    maxParticipants: "",
    includes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Crear experiencia:", formData);
    toast({
      title: "Experiencia creada",
      description: "La experiencia ha sido creada exitosamente."
    });
    onOpenChange(false);
    setFormData({
      name: "",
      category: "",
      duration: "",
      price: "",
      description: "",
      provider: "",
      difficulty: "",
      maxParticipants: "",
      includes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mountain className="w-5 h-5" />
            Crear Nueva Experiencia
          </DialogTitle>
          <DialogDescription>
            Complete la información de la nueva experiencia turística.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Experiencia *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Safari en los Llanos"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aventura">Aventura</SelectItem>
                  <SelectItem value="cultura">Cultura</SelectItem>
                  <SelectItem value="naturaleza">Naturaleza</SelectItem>
                  <SelectItem value="gastronomia">Gastronomía</SelectItem>
                  <SelectItem value="deportes">Deportes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider">Proveedor *</Label>
              <Input
                id="provider"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                placeholder="Nombre del proveedor"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duración</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="duration"
                  className="pl-10"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="8 horas, 2 días, etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  className="pl-10"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$150.000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Máximo Participantes</Label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="maxParticipants"
                  type="number"
                  className="pl-10"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  placeholder="10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Dificultad</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar dificultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facil">Fácil</SelectItem>
                  <SelectItem value="moderado">Moderado</SelectItem>
                  <SelectItem value="dificil">Difícil</SelectItem>
                  <SelectItem value="extremo">Extremo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción detallada de la experiencia..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="includes">Qué incluye</Label>
            <Textarea
              id="includes"
              value={formData.includes}
              onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
              placeholder="Transporte, almuerzo, guía, etc."
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Experiencia
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
