
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Car, Navigation } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventDetailModal } from "@/components/EventDetailModal";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { EventsData } from "@/interface/interface";
import { Navigate } from "react-router-dom";

const Events = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const { data: allEvents, isLoading } = useCachedData<EventsData[]>({
    cacheKey: 'featured-events',
    fetchFn: dataService.getEvents
  });

  const eventsToShow = allEvents && allEvents.length > 0 ? allEvents : [];

  const openWaze = (location: string) => {
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(location + " Villavicencio Meta")}`;
    window.open(wazeUrl, '_blank');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => { }} language={currentLanguage} />
      <main className="pt-32">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Eventos y Actividades
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Participa en los eventos más emocionantes de la región llanera
            </p>
          </div>

          {/* Grid de 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsToShow.map((event) => (
              <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`/images/events/${event.image}`}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs">
                    {event.category}
                  </Badge>
                  <Badge
                    variant={event.is_free ? "secondary" : "default"}
                    className="absolute top-3 left-3 text-xs"
                  >
                    {event.is_free ? "Gratis" : event.price}
                  </Badge>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors line-clamp-2 text-lg">
                    {event.title}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">Capacidad: {event.max_capacity}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Más información
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-primary border-primary"
                      onClick={() => openWaze(event.location)}
                    >
                      <Navigation />
                      Ir con Waze
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Events;
