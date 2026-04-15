
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, Mail, Phone, Calendar, Eye, Archive } from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  businessName?: string;
  serviceType: 'contact' | 'service_inquiry';
  isRead: boolean;
  createdAt: string;
}

interface MessagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MessagesModal = ({ open, onOpenChange }: MessagesModalProps) => {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@email.com",
      phone: "+57 300 123 4567",
      subject: "Consulta sobre servicios",
      message: "Hola, estoy interesado en conocer más sobre los paquetes turísticos disponibles en Villavicencio.",
      serviceType: 'contact',
      isRead: false,
      createdAt: "2024-06-14T10:30:00"
    },
    {
      id: 2,
      name: "María García",
      email: "maria@email.com",
      phone: "+57 311 987 6543",
      subject: "Información sobre Hotel Plaza",
      message: "Me gustaría obtener información sobre tarifas y disponibilidad para el próximo fin de semana.",
      businessName: "Hotel Plaza Villavicencio",
      serviceType: 'service_inquiry',
      isRead: false,
      createdAt: "2024-06-14T09:15:00"
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos@email.com",
      phone: "+57 320 456 7890",
      subject: "Reserva de tour",
      message: "Quisiera reservar un tour de aventura para 4 personas. ¿Cuáles son las opciones disponibles?",
      businessName: "Aventuras Llanos",
      serviceType: 'service_inquiry',
      isRead: true,
      createdAt: "2024-06-13T16:45:00"
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const markAsRead = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Mensajes de Clientes
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} nuevos</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Gestiona los mensajes de contacto y consultas de servicios
          </DialogDescription>
        </DialogHeader>

        {!selectedMessage ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lista de Mensajes</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archivar Leídos
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    message.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => handleViewMessage(message)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${message.isRead ? 'bg-gray-300' : 'bg-blue-500'}`} />
                      <h4 className="font-medium">{message.name}</h4>
                      <Badge variant={message.serviceType === 'contact' ? 'secondary' : 'outline'}>
                        {message.serviceType === 'contact' ? 'Contacto' : 'Consulta Servicio'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {message.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {message.phone}
                    </div>
                    {message.businessName && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {message.businessName}
                      </div>
                    )}
                  </div>
                  
                  <h5 className="font-medium mb-1">{message.subject}</h5>
                  <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                  
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                ← Volver a la lista
              </Button>
              <Badge variant={selectedMessage.serviceType === 'contact' ? 'secondary' : 'outline'}>
                {selectedMessage.serviceType === 'contact' ? 'Contacto General' : 'Consulta de Servicio'}
              </Badge>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedMessage.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedMessage.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedMessage.phone}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                  {selectedMessage.businessName && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Consulta sobre: <strong>{selectedMessage.businessName}</strong>
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Asunto:</h4>
                <p className="text-lg">{selectedMessage.subject}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Mensaje:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Responder por Email
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar
                </Button>
                <Button variant="outline">
                  <Archive className="w-4 h-4 mr-2" />
                  Archivar
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
