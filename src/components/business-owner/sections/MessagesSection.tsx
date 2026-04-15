
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, Mail, Send, Reply, Search, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  from: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'inquiry' | 'booking' | 'review' | 'complaint';
  rating?: number;
}

export function MessagesSection() {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "María González",
      email: "maria@email.com",
      subject: "Consulta sobre disponibilidad",
      content: "Hola, quisiera saber si tienen disponibilidad para el fin de semana del 20-22 de julio para 2 personas.",
      date: "2024-06-14T10:30:00",
      isRead: false,
      type: 'inquiry'
    },
    {
      id: 2,
      from: "Carlos Rodríguez",
      email: "carlos@email.com",
      subject: "Reserva confirmada",
      content: "Gracias por confirmar mi reserva. Tengo algunas preguntas sobre el check-in.",
      date: "2024-06-14T09:15:00",
      isRead: false,
      type: 'booking'
    },
    {
      id: 3,
      from: "Ana Martínez",
      email: "ana@email.com",
      subject: "Excelente servicio",
      content: "Quería felicitarlos por el excelente servicio durante nuestra estadía. Todo estuvo perfecto.",
      date: "2024-06-13T16:45:00",
      isRead: true,
      type: 'review',
      rating: 5
    }
  ]);

  const filteredMessages = messages.filter(message => 
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(m => !m.isRead).length;

  const markAsRead = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const handleReply = () => {
    console.log("Enviando respuesta:", replyContent);
    toast({
      title: "Respuesta enviada",
      description: "Tu respuesta ha sido enviada exitosamente."
    });
    setReplyContent("");
    setShowReplyModal(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'inquiry': return 'bg-blue-100 text-blue-800';
      case 'booking': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'inquiry': return 'Consulta';
      case 'booking': return 'Reserva';
      case 'review': return 'Reseña';
      case 'complaint': return 'Queja';
      default: return 'General';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Mensajes</h2>
          <p className="text-gray-600">Gestiona la comunicación con tus clientes</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">{unreadCount} no leídos</Badge>
        </div>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar mensajes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de mensajes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Bandeja de Entrada ({filteredMessages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    message.isRead ? 'bg-white' : 'bg-blue-50'
                  } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.isRead) markAsRead(message.id);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${message.isRead ? 'bg-gray-300' : 'bg-blue-500'}`} />
                      <h4 className="font-medium">{message.from}</h4>
                      <Badge className={getTypeColor(message.type)}>
                        {getTypeText(message.type)}
                      </Badge>
                      {message.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{message.rating}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h5 className="font-medium mb-1">{message.subject}</h5>
                  <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detalle del mensaje */}
        <Card>
          <CardHeader>
            <CardTitle>Detalle del Mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getTypeColor(selectedMessage.type)}>
                      {getTypeText(selectedMessage.type)}
                    </Badge>
                    {selectedMessage.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{selectedMessage.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>De:</strong> {selectedMessage.from}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {selectedMessage.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fecha:</strong> {new Date(selectedMessage.date).toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>

                <Button onClick={() => setShowReplyModal(true)} className="w-full">
                  <Reply className="w-4 h-4 mr-2" />
                  Responder
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Selecciona un mensaje para ver los detalles</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de respuesta */}
      <Dialog open={showReplyModal} onOpenChange={setShowReplyModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Responder Mensaje</DialogTitle>
            <DialogDescription>
              Respondiendo a: {selectedMessage?.from} - {selectedMessage?.subject}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tu respuesta:</label>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                rows={6}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowReplyModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleReply}>
                <Send className="w-4 h-4 mr-2" />
                Enviar Respuesta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
