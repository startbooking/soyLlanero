
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Settings, Plus, Edit, Trash2, Eye } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
}

interface ManageCategoriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManageCategoriesModal = ({ open, onOpenChange }: ManageCategoriesModalProps) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Hoteles", description: "Alojamiento y hospedaje", icon: "Hotel", color: "#3B82F6", isActive: true, sortOrder: 1 },
    { id: 2, name: "Restaurantes", description: "Gastronomía y comidas", icon: "Utensils", color: "#EF4444", isActive: true, sortOrder: 2 },
    { id: 3, name: "Aventura", description: "Actividades de aventura", icon: "Mountain", color: "#10B981", isActive: true, sortOrder: 3 },
    { id: 4, name: "Cultura", description: "Sitios culturales e históricos", icon: "Landmark", color: "#F59E0B", isActive: true, sortOrder: 4 }
  ]);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    color: "#3B82F6",
    isActive: true,
    sortOrder: 1
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      isActive: category.isActive,
      sortOrder: category.sortOrder
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Está seguro de eliminar esta categoría?")) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast({
        title: "Categoría eliminada",
        description: "La categoría ha sido eliminada exitosamente."
      });
    }
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
      toast({
        title: "Categoría actualizada",
        description: "La categoría ha sido actualizada exitosamente."
      });
    } else {
      const newCategory: Category = {
        id: Date.now(),
        ...formData
      };
      setCategories(prev => [...prev, newCategory]);
      toast({
        title: "Categoría creada",
        description: "La nueva categoría ha sido creada exitosamente."
      });
    }
    
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      icon: "",
      color: "#3B82F6",
      isActive: true,
      sortOrder: 1
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gestionar Categorías
          </DialogTitle>
          <DialogDescription>
            Administra las categorías de empresas y servicios de la aplicación
          </DialogDescription>
        </DialogHeader>

        {!showForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Categorías Existentes</h3>
              <Button onClick={() => setShowForm(true)} variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Categoría
              </Button>
            </div>

            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs">Orden: {category.sortOrder}</span>
                        <span className={`text-xs ${category.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {category.isActive ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
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
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nombre de la categoría"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descripción de la categoría"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icono</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  placeholder="Nombre del icono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Orden</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              />
              <Label htmlFor="active">Categoría activa</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {editingCategory ? 'Actualizar' : 'Crear'} Categoría
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
