
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Search,
  Clock,
  CheckCheck
} from "lucide-react";

export function MessagesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const messages = [
    {
      id: 1,
      subject: "Confirmación de reserva - Tour Llanos",
      company: "Llanos Adventure Tours",
      date: "2024-01-10",
      time: "10:30 AM",
      status: "respondido",
      type: "confirmacion",
      content: "Su reserva para el Tour por los Llanos Orientales ha sido confirmada para el 15 de enero. Por favor llegue 30 minutos antes del horario programado.",
      replies: [
        {
          id: 1,
          sender: "yo",
          content: "Perfecto, estaré allí puntualmente. ¿Qué debo llevar?",
          date: "2024-01-10",
          time: "11:00 AM"
        },
        {
          id: 2,
          sender: "empresa",
          content: "Recomendamos ropa cómoda, protector solar, gorra y cámara fotográfica.",
          date: "2024-01-10",
          time: "11:15 AM"
        }
      ]
    },
    {
      id: 2,
      subject: "Consulta sobre pesca deportiva",
      company: "Meta Fishing",
      date: "2024-01-25",
      time: "2:15 PM",
      status: "nuevo",
      type: "consulta",
      content: "¿Incluye el servicio de pesca todo el equipo necesario? ¿Hay algún límite de edad?",
      replies: []
    },
    {
      id: 3,
      subject: "Agradecimiento por el servicio",
      company: "EcoTours Meta",
      date: "2024-02-21",
      time: "4:00 PM",
      status: "enviado",
      type: "agradecimiento",
      content: "Quería agradecer por la excelente experiencia de avistamiento de aves. El guía fue muy profesional y vimos especies increíbles.",
      replies: [
        {
          id: 1,
          sender: "empresa",
          content: "¡Muchas gracias por sus comentarios! Nos alegra saber que disfrutó la experiencia. Lo esperamos para futuras aventuras.",
          date: "2024-02-21",
          time: "4:30 PM"
        }
      ]
    },
    {
      id: 4,
      subject: "Cambio de fecha - Cabalgata",
      company: "Cabalgatas del Llano",
      date: "2024-03-05",
      time: "9:20 AM",
      status: "pendiente",
      type: "cambio",
      content: "Por motivos personales necesito cambiar la fecha de mi cabalgata del 10 de marzo. ¿Es posible reprogramarla?",
      replies: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nuevo":
        return <Badge className="bg-blue-500 text-white">Nuevo</Badge>;
      case "respondido":
        return <Badge className="bg-green-500 text-white">Respondido</Badge>;
      case "pendiente":
        return <Badge className="bg-yellow-500 text-white">Pendiente</Badge>;
      case "enviado":
        return <Badge className="bg-gray-500 text-white">Enviado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "confirmacion":
        return "text-green-600";
      case "consulta":
        return "text-blue-600";
      case "agradecimiento":
        return "text-purple-600";
      case "cambio":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      // Aquí se enviaría la respuesta
      console.log("Enviando respuesta:", replyText);
      setReplyText("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mensajes</h2>
        <p className="text-gray-600">Conversaciones con empresas turísticas</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar mensajes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Nuevo Mensaje
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de mensajes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bandeja de Entrada ({filteredMessages.length})</h3>
          {filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`cursor-pointer transition-all ${
                selectedMessage === message.id ? 'ring-2 ring-green-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedMessage(message.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm line-clamp-1">{message.subject}</h4>
                  {getStatusBadge(message.status)}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className={`font-medium ${getTypeColor(message.type)}`}>{message.company}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {message.date} - {message.time}
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 line-clamp-2">{message.content}</p>
                
                {message.replies.length > 0 && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      {message.replies.length} respuesta{message.replies.length > 1 ? 's' : ''}
                    </span>
                    <CheckCheck className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detalle del mensaje seleccionado */}
        <div>
          {selectedMessage ? (
            (() => {
              const message = messages.find(m => m.id === selectedMessage);
              if (!message) return null;
              
              return (
                <Card className="h-fit">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{message.subject}</CardTitle>
                      {getStatusBadge(message.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className={getTypeColor(message.type)}>{message.company}</span>
                      <span>{message.date} - {message.time}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Mensaje original */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    {/* Respuestas */}
                    {message.replies.map((reply) => (
                      <div 
                        key={reply.id} 
                        className={`p-3 rounded-lg ${
                          reply.sender === 'yo' 
                            ? 'bg-green-50 ml-6' 
                            : 'bg-blue-50 mr-6'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span className="font-medium">
                            {reply.sender === 'yo' ? 'Tú' : message.company}
                          </span>
                          <span>{reply.date} - {reply.time}</span>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    ))}
                    
                    {/* Formulario de respuesta */}
                    <div className="border-t pt-4">
                      <Textarea
                        placeholder="Escribe tu respuesta..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                        className="mb-3"
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Respuesta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Selecciona un mensaje para ver los detalles</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
