
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, Mail, Send, Reply, Archive, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  from: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'contact' | 'support' | 'complaint' | 'general';
  priority: 'high' | 'medium' | 'low';
  businessName?: string;
}

export function MessagesSection() {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "Ana García",
      email: "ana@email.com",
      subject: "Consulta sobre servicios turísticos",
      content: "Hola, estoy interesada en conocer más sobre los servicios que ofrecen en Villavicencio. Me gustaría información sobre tours y experiencias.",
      date: "2024-06-14T10:30:00",
      isRead: false,
      type: 'contact',
      priority: 'high',
      businessName: "Aventuras Llanos"
    },
    {
      id: 2,
      from: "Carlos López",
      email: "carlos@email.com",
      subject: "Problema técnico en la plataforma",
      content: "Buenos días, tengo problemas para acceder a mi cuenta de operador turístico. No puedo actualizar la información de mi empresa.",
      date: "2024-06-14T09:15:00",
      isRead: false,
      type: 'support',
      priority: 'high',
      businessName: "Ecoturismo Meta"
    },
    {
      id: 3,
      from: "María Rodríguez",
      email: "maria@email.com",
      subject: "Queja sobre servicio",
      content: "Quiero expresar mi inconformidad con el servicio recibido. La experiencia no cumplió con las expectativas prometidas en la plataforma.",
      date: "2024-06-13T16:45:00",
      isRead: true,
      type: 'complaint',
      priority: 'high'
    },
    {
      id: 4,
      from: "Pedro Martínez",
      email: "pedro@email.com",
      subject: "Solicitud de información general",
      content: "Buenas tardes, quisiera información sobre cómo registrar mi empresa en la plataforma turística.",
      date: "2024-06-13T14:20:00",
      isRead: true,
      type: 'general',
      priority: 'medium'
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.businessName && message.businessName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || message.type === filterType;
    return matchesSearch && matchesType;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const markAsRead = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    setSelectedMessage(null);
    toast({
      title: "Mensaje eliminado",
      description: "El mensaje ha sido eliminado exitosamente."
    });
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
      case 'contact': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-orange-100 text-orange-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'contact': return 'Contacto';
      case 'support': return 'Soporte';
      case 'complaint': return 'Queja';
      case 'general': return 'General';
      default: return 'Desconocido';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Centro de Mensajes</h2>
          <p className="text-gray-600">Gestiona todos los mensajes de la plataforma</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">{unreadCount} no leídos</Badge>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Nuevo Mensaje
          </Button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar mensajes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select 
              className="px-3 py-2 border rounded-md"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value="contact">Contacto</option>
              <option value="support">Soporte</option>
              <option value="complaint">Quejas</option>
              <option value="general">General</option>
            </select>
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
                  className={`p-4 border-l-4 ${getPriorityColor(message.priority)} rounded-lg cursor-pointer transition-colors ${
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
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h5 className="font-medium mb-1">{message.subject}</h5>
                  {message.businessName && (
                    <p className="text-sm text-green-600 mb-1">Empresa: {message.businessName}</p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detalle del mensaje seleccionado */}
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
                    <span className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.date).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>De:</strong> {selectedMessage.from}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {selectedMessage.email}
                  </p>
                  {selectedMessage.businessName && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Empresa:</strong> {selectedMessage.businessName}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setShowReplyModal(true)}>
                    <Reply className="w-4 h-4 mr-2" />
                    Responder
                  </Button>
                  <Button variant="outline">
                    <Archive className="w-4 h-4 mr-2" />
                    Archivar
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
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
