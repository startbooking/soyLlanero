import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Navigation,
  Sparkles,
  Info,
  Ticket
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventDetailModal } from "@/components/EventDetailModal";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { EventsData } from "@/interface/interface";
import { useBusinessActions } from "@/hooks/useBusinessActions";

const Events = () => {
  const { handleNavigation, handleContact } = useBusinessActions();

  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);

  const { data: allEvents, isLoading } = useCachedData<EventsData[]>({
    cacheKey: 'featured-events',
    fetchFn: dataService.getEvents
  });

  const eventsToShow = allEvents && allEvents.length > 0 ? allEvents : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="events" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24 pb-20">

        {/* SECCIÓN HERO / CABECERA */}
        <div className="bg-white border-b border-slate-100 mb-12">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <Badge className="bg-sabana/10 text-sabana border-none font-black px-4 py-1 uppercase tracking-widest text-[10px]">
                <Sparkles className="w-3 h-3 mr-2 inline" /> Agenda Cultural y Social
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">
                VIVE EL <span className="text-sabana">LLANO</span> AL MÁXIMO
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                No te pierdas los festivales, eventos deportivos y encuentros culturales que hacen latir el corazón del Meta.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* GRID DE EVENTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {eventsToShow.map((event) => (
              <Card
                key={event.id}
                className="group border-none shadow-xl shadow-slate-200/60 rounded-[2.5rem] overflow-hidden bg-white hover:translate-y-[-8px] transition-all duration-500 flex flex-col"
              >
                {/* Imagen con Badges dinámicos */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`/images/events/${event.image}`}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => (e.currentTarget.src = '/placeholder-event.jpg')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />

                  <Badge className="absolute top-5 right-5 bg-white text-slate-900 border-none font-black text-[10px] uppercase px-3 py-1 shadow-lg">
                    {event.category}
                  </Badge>

                  <Badge
                    className={`absolute top-5 left-5 border-none font-black text-[10px] uppercase px-3 py-1 shadow-lg ${event.is_free ? "bg-green-500 text-white" : "bg-sabana text-white"
                      }`}
                  >
                    {event.is_free ? "Entrada Libre" : event.price}
                  </Badge>
                </div>

                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-sabana transition-colors duration-300 line-clamp-1">
                    {event.title}
                  </CardTitle>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                      <Calendar className="w-4 h-4 mr-2 text-sabana" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                      <MapPin className="w-4 h-4 mr-2 text-slate-300" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-0 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium mb-6">
                      {event.description}
                    </p>

                    {/* Fila de Micro-info */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-500">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-500">Cap. {event.max_capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase h-12"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <Info className="w-3 h-3 mr-2" /> Detalles
                    </Button>
                    <Button
                      className="bg-sabana hover:bg-sabana/90 text-white rounded-2xl font-black text-[10px] uppercase h-12 shadow-lg shadow-sabana/20"
                      onClick={() => handleNavigation(event.location)}
                    >
                      <Navigation className="w-3 h-3 mr-2" /> Ir ahora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estado de carga vacío */}
          {eventsToShow.length === 0 && !isLoading && (
            <div className="text-center py-24">
              <Ticket className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tighter">Próximamente más eventos</h3>
              <p className="text-slate-500 font-medium">Estamos preparando la agenda para el próximo mes.</p>
            </div>
          )}
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