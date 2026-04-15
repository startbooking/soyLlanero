
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Plus } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { es } from "date-fns/locale";

export const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");

  const events = [
    {
      id: 1,
      title: "Festival Llanero de Villavicencio 2024",
      description: "El evento cultural más importante de los llanos orientales con música joropo, coleo, bailes tradicionales y gastronomía típica.",
      date: new Date(2024, 6, 15), // 15 de julio
      endDate: new Date(2024, 6, 18), // 18 de julio
      location: "Parque Los Fundadores",
      category: "Cultural",
      price: "Gratis",
      isFree: true,
      isFeatured: true,
      organizer: "Alcaldía de Villavicencio"
    },
    {
      id: 2,
      title: "Safari Fotográfico Los Ocarros",
      description: "Experiencia única de avistamiento y fotografía de fauna llanera en su hábitat natural.",
      date: new Date(2024, 5, 25), // 25 de junio
      location: "Bioparque Los Ocarros",
      category: "Naturaleza",
      price: "$45.000",
      isFree: false,
      isFeatured: true,
      organizer: "Bioparque Los Ocarros"
    },
    {
      id: 3,
      title: "Tour Nocturno Centro Histórico",
      description: "Recorrido guiado por los sitios históricos más importantes de Villavicencio con degustación de dulces tradicionales.",
      date: new Date(2024, 5, 20), // 20 de junio
      location: "Plaza Los Libertadores",
      category: "Turismo",
      price: "$25.000",
      isFree: false,
      isFeatured: false,
      organizer: "Turismo Villavicencio"
    },
    {
      id: 4,
      title: "Competencia de Coleo",
      description: "Tradicional competencia de coleo con los mejores coleadores de la región.",
      date: new Date(2024, 6, 8), // 8 de julio
      location: "Manga de Coleo El Recreo",
      category: "Deportes",
      price: "$15.000",
      isFree: false,
      isFeatured: false,
      organizer: "Asociación de Coleadores"
    },
    {
      id: 5,
      title: "Concierto de Joropo",
      description: "Noche de música llanera con los mejores intérpretes de joropo de la región.",
      date: new Date(2024, 6, 12), // 12 de julio
      location: "Teatro Mastretta",
      category: "Musical",
      price: "$30.000",
      isFree: false,
      isFeatured: true,
      organizer: "Casa de la Cultura"
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Cultural": "bg-purple-100 text-purple-800 border-purple-200",
      "Naturaleza": "bg-green-100 text-green-800 border-green-200",
      "Turismo": "bg-blue-100 text-blue-800 border-blue-200",
      "Deportes": "bg-orange-100 text-orange-800 border-orange-200",
      "Musical": "bg-pink-100 text-pink-800 border-pink-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Calendario de Eventos</h1>
        <p className="text-muted-foreground text-lg">
          Descubre los próximos eventos y actividades en Villavicencio
        </p>
      </div>

      {/* Controles del calendario */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              ←
            </Button>
            <h2 className="text-2xl font-semibold min-w-[200px] text-center">
              {format(currentDate, "MMMM yyyy", { locale: es })}
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              →
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            Lista
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
          >
            Calendario
          </Button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="grid grid-cols-7 gap-2 mb-8">
          {/* Días de la semana */}
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="p-3 text-center font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          
          {/* Días del mes */}
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isDayToday = isToday(day);
            const isSelected = isSameDay(day, selectedDate);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                  isCurrentMonth ? "bg-background" : "bg-muted/30"
                } ${isDayToday ? "border-primary bg-primary/5" : "border-border"} ${
                  isSelected ? "ring-2 ring-primary" : ""
                } hover:bg-accent/50`}
                onClick={() => setSelectedDate(day)}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isDayToday ? "text-primary" : isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {format(day, "d")}
                </div>
                
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 mb-1 bg-primary/10 text-primary rounded truncate"
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayEvents.length - 2} más
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {events
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((event) => (
              <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </CardTitle>
                        {event.isFeatured && (
                          <Badge className="bg-primary text-primary-foreground">
                            Destacado
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {format(event.date, "dd 'de' MMMM, yyyy", { locale: es })}
                          {event.endDate && (
                            <span> - {format(event.endDate, "dd 'de' MMMM", { locale: es })}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge 
                        variant="outline" 
                        className={getCategoryColor(event.category)}
                      >
                        {event.category}
                      </Badge>
                      <Badge variant={event.isFree ? "secondary" : "default"}>
                        {event.price}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Organiza: <span className="font-medium">{event.organizer}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Compartir
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Más información
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* Eventos para la fecha seleccionada (solo en vista calendario) */}
      {viewMode === "calendar" && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Eventos para {format(selectedDate, "dd 'de' MMMM, yyyy", { locale: es })}
          </h3>
          
          {getEventsForDate(selectedDate).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay eventos programados para esta fecha
            </div>
          ) : (
            <div className="space-y-4">
              {getEventsForDate(selectedDate).map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </div>
                      </div>
                      <Badge variant={event.isFree ? "secondary" : "default"}>
                        {event.price}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
