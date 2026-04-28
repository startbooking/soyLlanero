import { User, Mail, Phone, MessageSquare, MapPin, Clock, Navigation, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const GuestInfoForm = ({ formData, setFormData, onBack, onNext, hotel }: any) => {
  const handleWaze = () => window.open(`https://waze.com/ul?q=${encodeURIComponent(hotel.address)}`, '_blank');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <Card className="border-sabana/20 shadow-sm">
        <CardHeader><CardTitle className="flex items-center gap-2 text-sabana font-bold"><User /> Información del Huésped</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nombre</Label><Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="Ej: Carlos" /></div>
            <div className="space-y-2"><Label>Apellido</Label><Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Ej: Restrepo" /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo Documento</Label>
              <Select value={formData.documentType} onValueChange={(v) => setFormData({...formData, documentType: v})}>
                <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                  <SelectItem value="PP">Pasaporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>N° Identificación</Label><Input value={formData.identification} onChange={(e) => setFormData({...formData, identification: e.target.value})} /></div>
            <div className="space-y-2"><Label>Nacionalidad</Label><Input value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} /></div>
          </div>

          <div className="space-y-2"><Label>Requerimientos Especiales</Label><Textarea value={formData.specialRequests} onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} className="h-20" /></div>

          <div className="flex gap-4 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={onBack}>Atrás</Button>
            <Button className="flex-1 bg-sabana text-white font-bold" onClick={onNext}>Continuar al Resumen</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-50/50 p-4 space-y-3 text-xs">
          <h4 className="font-bold text-sabana flex items-center gap-2"><MapPin className="w-4 h-4" /> Ubicación</h4>
          <p>{hotel.address}</p>
          <div className="flex gap-4"><p>Check-in: {hotel.check_in || '15:00'}</p><p>Check-out: {hotel.check_out || '11:00'}</p></div>
          <Button onClick={handleWaze} className="w-full bg-[#33ccff] text-white h-8"><Navigation className="w-3 h-3 mr-2" /> Waze</Button>
        </Card>
        <Card className="bg-red-50/30 p-4 space-y-2 text-xs text-slate-600 italic">
          <h4 className="font-bold text-red-600 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Cancelación</h4>
          <p>{hotel.cancellation_policy || "Cancelación gratuita 48h antes."}</p>
        </Card>
      </div>
    </div>
  );
};