import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useTranslations } from "@/utils/translations";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { EventsData } from "@/interface/interface";
import { useState } from "react";
import { EventDetailModal } from "../EventDetailModal";

interface UpcomingEventsSectionProps {
  language: string;
}

export const UpcomingEventsSection = ({
  language,
}: UpcomingEventsSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const t = useTranslations(language);

  const { data: allEvents, isLoading } = useCachedData<EventsData[]>({
    cacheKey: "featured-events",
    fetchFn: dataService.getEvents,
  });

  const eventsToShow = allEvents && allEvents.length > 0 ? allEvents : [];
  const eventsShowSlide = eventsToShow.slice(0, 3);

  const openWaze = (location: string) => {
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
      location + " Villavicencio Meta"
    )}`;
    window.open(wazeUrl, "_blank");
  };

  return (
    <section className="relative mx-auto py-10">
      <div className="absolute inset-0 bg-green-100/30 via-background to-accent/50" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          {t.sections.upcoming}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventsShowSlide.map((event, index) => (
            <Card
              key={event.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`/images/events/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="border border-black-500 absolute top-3 right-3 bg-black-500 text-primary-foreground text-xs rounded-md hover:bg-primary/30">
                  {event.category}
                </Badge>
                <Badge
                  variant={event.is_free ? "secondary" : "default"}
                  className="absolute top-3 left-3 text-xs border border-black-500 text-xs bg-black-500 rounded-md hover:bg-primary/30"
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
                    <span className="text-sm">
                      Capacidad: {event.max_capacity}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-black-500 border border-black-500 text-black-500 hover:bg-primary/50"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Más información
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full w-full bg-black-500 border border-black-500 text-black-500 hover:bg-primary/50"
                    onClick={() => openWaze(event.location)}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.83 12.63c0-1.21-.31-2.4-.9-3.45l-7.86 7.86c1.05.59 2.24.9 3.45.9 4.02 0 7.29-3.27 7.29-7.29v1.98h-1.98zm-7.84-7.84c-1.21 0-2.4.31-3.45.9l7.86 7.86c-.59-1.05-.9-2.24-.9-3.45 0-4.02 3.27-7.29 7.29-7.29v1.98h1.98c0-1.21-.31-2.4-.9-3.45L12.01 4.8z" />
                    </svg>
                    Ir con Waze
                  </Button>
                </div>
              </CardContent>
            </Card>
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
