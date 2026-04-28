import { User, Mail, Phone, FileText, Globe, MessageSquare, ShieldAlert, MapPin, Clock, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const GuestInfoForm = ({ onBack, onNext, formData, setFormData, hotel }: any) => {
  
  const handleWazeClick = () => {
    const url = `https://waze.com/ul?q=${encodeURIComponent(hotel.address)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <Card className="border-sabana/20 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sabana font-bold">
            <User className="w-5 h-5" /> 2. Información del Huésped
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Fila: Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600">Nombre</Label>
              <Input 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="Ej: Carlos" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600">Apellido</Label>
              <Input 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                placeholder="Ej: Restrepo" 
              />
            </div>
          </div>

          {/* Fila: Documentación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600">Tipo de Documento</Label>
              <Select 
                value={formData.documentType} 
                onValueChange={(v) => setFormData({...formData, documentType: v})}
              >
                <SelectTrigger className="border-sabana/30">
                  <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                  <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                  <SelectItem value="PP">Pasaporte</SelectItem>
                  <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600">N° Identificación</Label>
              <Input 
                value={formData.identification}
                onChange={(e) => setFormData({...formData, identification: e.target.value})}
                placeholder="Documento" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600">Nacionalidad</Label>
              <Input 
                value={formData.nationality}
                onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                placeholder="Ej: Colombiano" 
              />
            </div>
          </div>

          {/* Fila: Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600">Correo Electrónico</Label>
              <Input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="ejemplo@correo.com" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600">Teléfono / WhatsApp</Label>
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+57 300..." 
              />
            </div>
          </div>

          {/* Requerimientos Especiales */}
          <div className="space-y-2">
            <Label className="text-slate-600 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Requerimientos Especiales
            </Label>
            <Textarea 
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              placeholder="¿Alguna dieta especial, alergia o petición para tu llegada?"
              className="resize-none h-24 border-sabana/30"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <Button variant="outline" className="flex-1 border-sabana text-sabana" onClick={onBack}>
              Atrás
            </Button>
            <Button className="flex-1 bg-sabana text-white hover:bg-sabana/90 font-bold" onClick={onNext}>
              Continuar al Resumen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Información del Hotel y Políticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Datos del Hotel */}
        <Card className="border-slate-200 bg-slate-50/50">
          <CardContent className="p-4 space-y-3">
            <h4 className="font-bold text-sabana text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Ubicación y Contacto
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <p className="font-bold text-slate-800">{hotel.name}</p>
              <p>{hotel.address}</p>
              <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {hotel.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <p className="flex items-center gap-1 font-medium"><Clock className="w-3 h-3" /> Check-in: {hotel.check_in || '15:00'}</p>
                <p className="flex items-center gap-1 font-medium"><Clock className="w-3 h-3" /> Check-out: {hotel.check_out || '11:00'}</p>
              </div>
            </div>
            <Button 
              onClick={handleWazeClick}
              variant="secondary" 
              className="w-full mt-2 bg-[#33ccff] hover:bg-[#2db8e6] text-white text-xs h-9"
            >
              <Navigation className="w-4 h-4 mr-2" /> Cómo llegar con Waze
            </Button>
          </CardContent>
        </Card>

        {/* Políticas de Cancelación */}
        <Card className="border-red-100 bg-red-50/30">
          <CardContent className="p-4 space-y-3">
            <h4 className="font-bold text-red-600 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Políticas de Cancelación
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-600 italic">
              {hotel.cancellation_policy || "Este establecimiento permite cancelaciones gratuitas hasta 48 horas antes de la llegada. Después de este periodo, se cobrará la primera noche como penalidad."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};