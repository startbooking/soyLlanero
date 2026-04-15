
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Phone, MapPin, Calendar, Users, Award } from "lucide-react";

interface VIPClient {
  id: number;
  name: string;
  company: string;
  category: string;
  image: string;
  phone: string;
  email: string;
  location: string;
  memberSince: string;
  totalBookings: number;
  rating: number;
  preferredServices: string[];
  specialRequests: string[];
  benefits: string[];
  description: string;
}

export const VIPClients = () => {
  const [selectedClient, setSelectedClient] = useState<VIPClient | null>(null);

  const vipClients: VIPClient[] = [
    {
      id: 1,
      name: "María Elena Rodríguez",
      company: "Grupo Empresarial Los Llanos",
      category: "Empresarial",
      image: "/placeholder.svg?height=400&width=400&text=María+Elena",
      phone: "+57 300 123 4567",
      email: "maria.rodriguez@grupollanos.com",
      location: "Villavicencio, Meta",
      memberSince: "2020",
      totalBookings: 45,
      rating: 5.0,
      preferredServices: ["Hoteles de lujo", "Turismo corporativo", "Eventos empresariales"],
      specialRequests: ["Suite presidencial", "Servicios de protocolo", "Transporte ejecutivo"],
      benefits: ["Descuento del 20%", "Check-in prioritario", "Upgrades gratuitos", "Concierge personal"],
      description: "Empresaria destacada del sector agropecuario con más de 20 años de experiencia en la región de los Llanos Orientales."
    },
    {
      id: 2,
      name: "Carlos Alberto Vásquez",
      company: "Fundación Turística Meta",
      category: "Institucional",
      image: "/placeholder.svg?height=400&width=400&text=Carlos+Alberto",
      phone: "+57 310 234 5678",
      email: "carlos.vasquez@fundacionmeta.org",
      location: "Acacías, Meta",
      memberSince: "2019",
      totalBookings: 38,
      rating: 4.9,
      preferredServices: ["Ecoturismo", "Turismo cultural", "Aventura"],
      specialRequests: ["Guías especializados", "Actividades grupales", "Documentación fotográfica"],
      benefits: ["Descuento del 25%", "Servicios personalizados", "Acceso VIP", "Reportes detallados"],
      description: "Director de proyectos turísticos sostenibles, promotor del desarrollo ecoturístico en la región del Meta."
    },
    {
      id: 3,
      name: "Ana Patricia Morales",
      company: "Inversiones Ganaderas del Oriente",
      category: "Agropecuario",
      image: "/placeholder.svg?height=400&width=400&text=Ana+Patricia",
      phone: "+57 320 345 6789",
      email: "ana.morales@inversionesoriente.com",
      location: "Puerto López, Meta",
      memberSince: "2021",
      totalBookings: 32,
      rating: 4.8,
      preferredServices: ["Turismo rural", "Hoteles boutique", "Gastronomía regional"],
      specialRequests: ["Habitaciones familiares", "Servicios veterinarios", "Tours ganaderos"],
      benefits: ["Descuento del 18%", "Flexibilidad en reservas", "Servicios especializados", "Asesoría técnica"],
      description: "Empresaria ganadera reconocida por sus aportes al desarrollo del turismo rural en los Llanos Orientales."
    }
  ];

  const handleContact = (client: VIPClient) => {
    window.open(`tel:${client.phone}`, '_self');
  };

  const handleEmailContact = (client: VIPClient) => {
    window.open(`mailto:${client.email}`, '_self');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-8 h-8 text-primary" />
          Clientes VIP
        </h2>
        <p className="text-muted-foreground text-lg">
          Nuestros clientes más distinguidos y sus experiencias excepcionales
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vipClients.map((client) => (
          <Card key={client.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-primary/20">
                  <AvatarImage src={client.image} alt={client.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white">
                  VIP
                </Badge>
              </div>
              
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {client.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {client.company}
              </CardDescription>
              
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 text-green-500 fill-current" />
                <span className="font-medium text-sm">{client.rating}</span>
                <Badge variant="outline" className="ml-2 text-xs">{client.category}</Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">{client.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Miembro desde {client.memberSince}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{client.totalBookings} reservas realizadas</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {client.preferredServices.slice(0, 2).map((service, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
                {client.preferredServices.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{client.preferredServices.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => handleContact(client)}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Contactar
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => setSelectedClient(client)}
                    >
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    {selectedClient && (
                      <>
                        <DialogHeader>
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="w-16 h-16 ring-4 ring-primary/20">
                              <AvatarImage src={selectedClient.image} alt={selectedClient.name} />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {selectedClient.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <DialogTitle className="text-xl">{selectedClient.name}</DialogTitle>
                              <DialogDescription className="text-base">
                                {selectedClient.company}
                              </DialogDescription>
                              <Badge className="mt-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white">
                                Cliente VIP - {selectedClient.category}
                              </Badge>
                            </div>
                          </div>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2">Descripción</h4>
                            <p className="text-muted-foreground">{selectedClient.description}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Información de Contacto</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-primary" />
                                  <span>{selectedClient.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  <span>{selectedClient.location}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Estadísticas</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Calificación:</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-green-500 fill-current" />
                                    <span>{selectedClient.rating}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <span>Total reservas:</span>
                                  <span>{selectedClient.totalBookings}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Miembro desde:</span>
                                  <span>{selectedClient.memberSince}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Servicios Preferidos</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedClient.preferredServices.map((service, index) => (
                                <Badge key={index} variant="secondary">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Solicitudes Especiales</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedClient.specialRequests.map((request, index) => (
                                <Badge key={index} variant="outline">
                                  {request}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Beneficios VIP</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedClient.benefits.map((benefit, index) => (
                                <Badge key={index} className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button 
                              className="flex-1"
                              onClick={() => handleContact(selectedClient)}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Llamar
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleEmailContact(selectedClient)}
                            >
                              Enviar Email
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
