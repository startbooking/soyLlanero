
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send } from "lucide-react";

interface ContactServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  serviceId: number;
}

export const ContactServiceModal = ({ open, onOpenChange, serviceName, serviceId }: ContactServiceModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: `Consulta sobre ${serviceName}`,
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular guardado en base de datos
    console.log("Mensaje guardado:", {
      ...formData,
      serviceId,
      serviceName,
      timestamp: new Date().toISOString(),
      type: 'service_inquiry'
    });

    toast({
      title: "Mensaje enviado",
      description: "Tu consulta ha sido enviada exitosamente. Te contactaremos pronto."
    });

    // Limpiar formulario y cerrar modal
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: `Consulta sobre ${serviceName}`,
      message: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Contactar Servicio
          </DialogTitle>
          <DialogDescription>
            Envía tu consulta sobre <strong>{serviceName}</strong> y te contactaremos pronto
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+57 300 123 4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Asunto *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Asunto de tu consulta"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe tu consulta o solicitud..."
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Enviar Consulta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
