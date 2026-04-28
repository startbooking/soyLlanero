import { User, Mail, Phone, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const GuestInfoForm = ({ onBack, onNext, formData, setFormData }: any) => (
  <Card className="border-sabana/20 shadow-sm animate-in fade-in slide-in-from-right-4">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-sabana font-bold">
        <User className="w-5 h-5" /> 2. Información del Huésped
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nombre</Label>
          <Input 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            placeholder="Nombre completo" 
          />
        </div>
        <div className="space-y-2">
          <Label>Apellido</Label>
          <Input 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            placeholder="Apellidos" 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Correo Electrónico</Label>
          <Input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="ejemplo@correo.com" 
          />
        </div>
        <div className="space-y-2">
          <Label>Teléfono / WhatsApp</Label>
          <Input 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="+57 300..." 
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8 pt-4 border-t">
        <Button variant="outline" className="flex-1 border-sabana text-sabana" onClick={onBack}>
          Atrás
        </Button>
        <Button className="flex-1 bg-sabana text-white hover:bg-sabana/90 font-bold" onClick={onNext}>
          Continuar al Resumen
        </Button>
      </div>
    </CardContent>
  </Card>
);