import { useState, useMemo } from "react";
import { useTranslations } from "@/utils/translations";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { EventsData } from "@/interface/interface";
import { EventCard } from "@/components/common/EventCard";
import { EventDetailModal } from "../EventDetailModal";
import { Loader2 } from "lucide-react";

interface UpcomingEventsSectionProps {
  language: string;
}

export const UpcomingEventsSection = ({ language }: UpcomingEventsSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);
  const t = useTranslations(language);

  const { data: allEvents, isLoading } = useCachedData<EventsData[]>({
    cacheKey: "featured-events",
    fetchFn: dataService.getEvents,
  });

  // Optimización de datos: Seleccionamos los 3 primeros eventos
  const eventsToShow = useMemo(() => {
    return allEvents?.slice(0, 3) || [];
  }, [allEvents]);

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-sabana mb-4" />
        <p className="text-slate-400 font-medium">Buscando eventos próximos...</p>
      </div>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decorativo mejorado */}
      <div className="absolute inset-0 bg-gradient-to-b from-sabana/5 via-transparent to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            {t.sections.upcoming}
          </h2>
          <p className="text-slate-500">
            No te pierdas los mejores eventos culturales, musicales y deportivos en la región.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsToShow.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewMore={(ev) => setSelectedEvent(ev)}
            />
          ))}
        </div>

        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </section>
  );
};