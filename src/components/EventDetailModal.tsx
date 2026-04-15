
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  X,
  Navigation,
  Car
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  price: string;
  isFree: boolean;
  capacity: number;
  category: string;
  image: string;
  organizer?: string;
  requirements?: string[];
  includes?: string[];
}

interface EventDetailModalProps {
  event: Event;
  onClose: () => void;
}

export const EventDetailModal = ({ event, onClose }: EventDetailModalProps) => {
  const handleNavigation = () => {
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(event.location + " Villavicencio Meta")}`;
    window.open(wazeUrl, '_blank');
  };

  const handleReservation = () => {
    // Aquí iría la lógica de reserva
    alert("Funcionalidad de reserva próximamente disponible");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="relative overflow-hidden rounded-t-lg">
            <img 
              src={`images/events/${event.image}`} 
              alt={event.title}
              className="w-full h-[60vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {event.location}
              </div>
            </div>
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {event.category}
            </Badge>
            <Badge 
              variant={event.price ? "secondary" : "default"} 
              className="absolute top-4 right-16"
            >
              {event.price ? "Gratis" : event.price}
            </Badge>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Detalles del Evento</h2>
                  <p className="text-sm text-muted-foreground text-lg leading-relaxed text-justify">
                    {event.description}
                  </p>
                </div>

                {event.includes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Incluye</h3>
                    <ul className="space-y-2">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Requisitos</h3>
                    <ul className="space-y-2">
                      {event.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Información del Evento</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Fecha</p>
                        <p>{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Horario</p>
                        <p>{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Capacidad</p>
                        <p>{event.capacity} personas</p>
                      </div>
                    </div>

                    {event.organizer && (
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Organizador</p>
                          <p>{event.organizer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleReservation}
                    className="w-full text-md py-6"
                    size="lg"
                  >
                    Reservar {!event.isFree && `- ${event.price}`}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleNavigation}
                    className="w-full border-primary text-primary"
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Cómo llegar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
