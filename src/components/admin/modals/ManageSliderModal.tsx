import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Sliders, Upload, Eye, Trash2, Plus, Edit } from "lucide-react";

interface SliderItem {
  id: number;
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
}

interface ManageSliderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManageSliderModal = ({ open, onOpenChange }: ManageSliderModalProps) => {
  const { toast } = useToast();
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([
    {
      id: 1,
      title: "Llanos Orientales",
      description: "Paisajes infinitos de los llanos colombianos",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
      order: 1,
      active: true
    },
    {
      id: 2,
      title: "Naturaleza Exuberante",
      description: "Biodiversidad única de la región",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
      order: 2,
      active: true
    }
  ]);

  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    order: 1,
    active: true
  });

  const handleEdit = (item: SliderItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      order: item.order,
      active: item.active
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Está seguro de eliminar este elemento del slider?")) {
      setSliderItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Elemento eliminado",
        description: "El elemento ha sido eliminado del slider."
      });
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setSliderItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
      toast({
        title: "Elemento actualizado",
        description: "El elemento del slider ha sido actualizado exitosamente."
      });
    } else {
      const newItem: SliderItem = {
        id: Date.now(),
        ...formData
      };
      setSliderItems(prev => [...prev, newItem]);
      toast({
        title: "Elemento creado",
        description: "El nuevo elemento ha sido agregado al slider."
      });
    }
    
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      order: 1,
      active: true
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      order: 1,
      active: true
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Gestionar Slider Principal
          </DialogTitle>
          <DialogDescription>
            Administra las imágenes y contenido del slider de la página principal
          </DialogDescription>
        </DialogHeader>

        {!showForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Elementos del Slider</h3>
              <Button onClick={() => setShowForm(true)} variant="success">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Elemento
              </Button>
            </div>

            <div className="space-y-3">
              {sliderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-100">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs">Orden: {item.order}</span>
                        <span className={`text-xs ${item.active ? 'text-green-600' : 'text-red-600'}`}>
                          {item.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {editingItem ? 'Editar Elemento' : 'Nuevo Elemento'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Título del elemento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Orden</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descripción del elemento"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de la Imagen</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="flex-1"
                />
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir
                </Button>
                {formData.image && (
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {formData.image && (
              <div className="space-y-2">
                <Label>Vista Previa</Label>
                <img 
                  src={formData.image} 
                  alt="Vista previa"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
              />
              <Label htmlFor="active">Elemento activo</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSave} variant="success">
                {editingItem ? 'Actualizar' : 'Crear'} Elemento
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
