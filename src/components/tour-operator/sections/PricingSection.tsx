
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  maxPeople: number;
  includes: string[];
  isActive: boolean;
}

export function PricingSection() {
  const { toast } = useToast();
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: 1,
      name: "Tour Básico",
      description: "Recorrido por los principales atractivos de los Llanos",
      price: 150000,
      duration: "4 horas",
      maxPeople: 8,
      includes: ["Transporte", "Guía turístico", "Refrigerio"],
      isActive: true
    },
    {
      id: 2,
      name: "Aventura Completa",
      description: "Experiencia completa con actividades de aventura",
      price: 250000,
      duration: "8 horas",
      maxPeople: 6,
      includes: ["Transporte", "Guía especializado", "Almuerzo", "Equipos de seguridad"],
      isActive: true
    },
    {
      id: 3,
      name: "Safari Nocturno",
      description: "Observación de vida silvestre nocturna",
      price: 180000,
      duration: "6 horas",
      maxPeople: 4,
      includes: ["Transporte 4x4", "Guía especializado", "Cena", "Equipo de observación"],
      isActive: false
    }
  ]);

  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
  };

  const handleSave = () => {
    if (editingPlan) {
      setPricingPlans(prev => prev.map(p => p.id === editingPlan.id ? editingPlan : p));
      setEditingPlan(null);
      toast({
        title: "Tarifa actualizada",
        description: "La tarifa ha sido actualizada exitosamente."
      });
    }
  };

  const toggleStatus = (id: number) => {
    setPricingPlans(prev => prev.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
    toast({
      title: "Estado actualizado",
      description: "El estado de la tarifa ha sido cambiado."
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestión de Tarifas</h2>
          <p className="text-gray-600">Administra los precios de tus servicios turísticos</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarifa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className={`relative ${!plan.isActive ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={plan.isActive ? "default" : "secondary"}>
                    {plan.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 flex items-center justify-center gap-1">
                  <DollarSign className="w-6 h-6" />
                  {formatPrice(plan.price)}
                </div>
                <p className="text-sm text-gray-500">{plan.duration} • Máx. {plan.maxPeople} personas</p>
              </div>

              <p className="text-gray-600 text-sm">{plan.description}</p>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Incluye:</Label>
                <ul className="text-sm text-gray-600 space-y-1">
                  {plan.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(plan)}>
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button 
                  size="sm" 
                  variant={plan.isActive ? "secondary" : "default"}
                  onClick={() => toggleStatus(plan.id)}
                >
                  {plan.isActive ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de edición */}
      {editingPlan && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Editar Tarifa: {editingPlan.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre del Plan</Label>
                <Input
                  id="edit-name"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-price">Precio (COP)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duración</Label>
                <Input
                  id="edit-duration"
                  value={editingPlan.duration}
                  onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-maxpeople">Máx. Personas</Label>
                <Input
                  id="edit-maxpeople"
                  type="number"
                  value={editingPlan.maxPeople}
                  onChange={(e) => setEditingPlan({ ...editingPlan, maxPeople: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Guardar Cambios</Button>
              <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
