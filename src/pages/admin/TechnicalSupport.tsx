
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, ArrowLeft, Send, Phone, Mail, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TechnicalSupport = () => {
  const [ticketData, setTicketData] = useState({
    subject: "",
    description: "",
    priority: "medium"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Ticket de soporte creado exitosamente. Te contactaremos pronto.");
      setTicketData({ subject: "", description: "", priority: "medium" });
    }, 1000);
  };

  const supportChannels = [
    {
      title: "Teléfono",
      description: "+57 8 123 4567",
      icon: Phone,
      available: "Lun - Vie: 8:00 AM - 6:00 PM"
    },
    {
      title: "Email",
      description: "soporte@villavicencio.com",
      icon: Mail,
      available: "Respuesta en 24 horas"
    },
    {
      title: "WhatsApp",
      description: "+57 312 345 6789",
      icon: MessageCircle,
      available: "Lun - Sab: 8:00 AM - 8:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Crear Ticket de Soporte
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Usuario: {user?.name} ({user?.email})
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Input
                      id="subject"
                      value={ticketData.subject}
                      onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
                      placeholder="Describe brevemente el problema"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Prioridad</Label>
                    <select
                      id="priority"
                      value={ticketData.priority}
                      onChange={(e) => setTicketData({...ticketData, priority: e.target.value})}
                      className="w-full p-2 border rounded-md bg-green-tenue"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción Detallada</Label>
                    <Textarea
                      id="description"
                      value={ticketData.description}
                      onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
                      placeholder="Describe el problema en detalle, pasos para reproducirlo, etc."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? "Enviando..." : "Enviar Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Canales de Soporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-green-tenue">
                    <div className="flex items-center gap-2 mb-2">
                      <channel.icon className="w-4 h-4" />
                      <span className="font-medium">{channel.title}</span>
                    </div>
                    <p className="text-sm font-mono">{channel.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{channel.available}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">FAQ Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium">¿Olvidaste tu contraseña?</p>
                  <p className="text-muted-foreground">Usa la opción "Cambiar Contraseña" en tu perfil.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">¿Problemas de acceso?</p>
                  <p className="text-muted-foreground">Verifica tu rol y permisos con el administrador.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSupport;
