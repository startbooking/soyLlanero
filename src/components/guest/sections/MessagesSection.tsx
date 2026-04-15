
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Search, Clock, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MessagesSection() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const [conversations] = useState([
    {
      id: "1",
      businessName: "Hotel Los Llanos",
      businessType: "Hotel",
      lastMessage: "Gracias por su reserva. Confirmaremos su habitación en breve.",
      timestamp: "2024-01-14 10:30",
      unread: 2,
      status: "active"
    },
    {
      id: "2",
      businessName: "Aventuras Llanos",
      businessType: "Tour Operador",
      lastMessage: "El tour de mañana sale a las 8:00 AM desde el hotel.",
      timestamp: "2024-01-13 16:45",
      unread: 0,
      status: "active"
    },
    {
      id: "3",
      businessName: "Restaurante Tradicional",
      businessType: "Restaurante",
      lastMessage: "Su mesa para 6 personas está confirmada para las 7:00 PM.",
      timestamp: "2024-01-12 14:20",
      unread: 1,
      status: "active"
    }
  ]);

  const [messages] = useState([
    {
      id: "1",
      conversationId: "1",
      sender: "business",
      senderName: "Hotel Los Llanos",
      content: "Buenos días. Hemos recibido su reserva para el 15 de enero. ¿Necesita algún servicio adicional?",
      timestamp: "2024-01-14 09:15",
      type: "text"
    },
    {
      id: "2",
      conversationId: "1",
      sender: "guest",
      senderName: "Laura Cliente",
      content: "Hola, sí, necesitaría servicio de transporte desde el aeropuerto.",
      timestamp: "2024-01-14 09:30",
      type: "text"
    },
    {
      id: "3",
      conversationId: "1",
      sender: "business",
      senderName: "Hotel Los Llanos",
      content: "Perfecto. Nuestro servicio de transporte cuesta $50.000. ¿Confirma su vuelo de llegada?",
      timestamp: "2024-01-14 10:00",
      type: "text"
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      console.log("Enviando mensaje:", newMessage);
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado exitosamente."
      });
      setNewMessage("");
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.businessType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const conversationMessages = selectedConversation
    ? messages.filter(msg => msg.conversationId === selectedConversation)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mensajes</h2>
        <p className="text-gray-600">Comunícate con proveedores de servicios turísticos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Lista de Conversaciones */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversaciones
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversaciones..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{conversation.businessName}</h4>
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Building2 className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{conversation.businessType}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{conversation.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Área de Chat */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <CardTitle>
                  {conversations.find(c => c.id === selectedConversation)?.businessName}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-[500px]">
                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'guest' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'guest'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'guest' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Área de envío */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[60px]"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} size="sm" className="self-end">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Selecciona una conversación para comenzar</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
