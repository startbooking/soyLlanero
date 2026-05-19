import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "@/utils/translations";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { EventsData } from "@/interface/interface";
import { EventCard } from "@/components/common/EventCard";
import { Loader2, CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventDetailModal } from "../EventDetailModal";

interface UpcomingEventsSectionProps {
  language: string;
}

export const UpcomingEventsSection = ({ language }: UpcomingEventsSectionProps) => {
  const navigate = useNavigate();
  const t = useTranslations(language);
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);

  const { data: allEvents, isLoading } = useCachedData<EventsData[]>({
    cacheKey: "featured-events",
    fetchFn: dataService.getEvents,
  });

  // Filtramos y limitamos a 3 para el Home
  const eventsToShow = useMemo(() => {
    return allEvents?.slice(0, 3) || [];
  }, [allEvents]);

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sabana mb-4" />
        <p className="text-slate-400 font-black uppercase tracking-tighter animate-pulse">
          Sincronizando agenda cultural...
        </p>
      </div>
    );
  }

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-12 translate-x-20 -z-10" />

      <div className="container mx-auto px-4">
        {/* Cabecera estilizada */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-sabana/10 text-sabana border-none font-black px-4 py-1 uppercase tracking-[0.2em] text-[9px]">
              <CalendarDays className="w-3 h-3 mr-2 inline" /> Agenda del mes
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              {t.sections.upcoming || "Próximos Eventos"} <span className="text-sabana italic">Imperdibles</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-lg">
              Descubre festivales, conciertos y ferias que hacen vibrar nuestro territorio.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate('/events')}
            className="rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest h-12 px-8 hover:bg-slate-200/60 transition-all"
          >
            Ver calendario completo
          </Button>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {eventsToShow.map((event) => (
            <div key={event.id} className="group">
              <EventCard
                key={event.id}
                event={event}
                // Redirigimos a la página de detalle de experiencia/evento que creamos antes
                onViewMore={(ev) => setSelectedEvent(ev)}
              />
            </div>
          ))}
        </div>

        {/* Banner de invitación (Call to Action) */}
        <div className="mt-20 p-1 rounded-[3rem]">
          <div className="bg-slate-100/50 rounded-[2.8rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-slate uppercase tracking-tighter">
                ¿Organizas un evento?
              </h3>
              <p className="text-slate-400 font-medium">
                Únete a nuestra red de aliados y promociona tus actividades con nosotros.
              </p>
            </div>
            <Button className="bg-white text-slate-900 hover:bg-slate-100/20 rounded-2xl font-black uppercase tracking-widest text-[12px] h-14 px-10 transition-all">
              Postular mi evento <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
};