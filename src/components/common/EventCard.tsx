import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight, Navigation, Sparkles } from "lucide-react";
import { EventsData } from "@/interface/interface";
import { useBusinessActions } from "@/hooks/useBusinessActions";
import { useState } from "react";

interface EventCardProps {
  event: EventsData;
  onViewMore: (event: EventsData) => void;
}

export const EventCard = ({ event, onViewMore }: EventCardProps) => {
  const { handleNavigation } = useBusinessActions();
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);
  const {
    image, title, category, is_free, price,
    date, time, location, description
  } = event;

  return (
    <Card className="group relative border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full">

      {/* Contenedor de Imagen con Overlay Dinámico */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image?.startsWith('http') ? image : `/images/events/${image}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />

        {/* Degradados decorativos */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges Flotantes */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
          <Badge className="bg-white/20 backdrop-blur-md text-white border-none font-black uppercase text-[9px] px-3 py-1 tracking-widest">
            {category}
          </Badge>
          <div className="bg-sabana p-2 rounded-xl shadow-lg shadow-sabana/40 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Info Rápida sobre Imagen */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-3 group-hover:text-sabana transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-white/70 font-bold italic text-xs">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-sabana" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-8 flex flex-col flex-grow space-y-6">

        {/* Grid de Datos Técnicos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Cuándo</p>
            <div className="flex items-center font-bold text-slate-700 text-sm">
              <Calendar className="w-3.5 h-3.5 mr-2 text-sabana" />
              {date}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Hora</p>
            <div className="flex items-center font-bold text-slate-700 text-sm">
              <Clock className="w-3.5 h-3.5 mr-2 text-sabana" />
              {time}
            </div>
          </div>
        </div>

        {/* Descripción Corta */}
        <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2 italic">
          "{description}"
        </p>

        {/* Precio / Costo Destacado */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Inversión</p>
            <p className="text-xl font-black text-slate-900 tracking-tighter">
              {is_free ? "ACCESO LIBRE" : price}
            </p>
          </div>
          <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[10px] rounded-lg">
            Próximamente
          </Badge>
        </div>

        {/* Botones de Acción SIMÉTRICOS */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="secondary"
            className="h-12 rounded-2xl border-2 border-slate-100 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation({ name: title, location: location });
            }}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Cómo ir
          </Button>

          <Button
            className="h-12 rounded-2xl bg-sabana/90 text-white hover:bg-sabana/50 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-slate-200 transition-all hover:scale-[1.03]"
            onClick={() => onViewMore(event)}
          >
            Ver más
            <ArrowRight className="w-4 h-4 ml-2 text-white" />
          </Button>

         {/*  <Button
            className="..."
            onClick={() => onViewMore(event)} // Esto activará el setSelectedEvent del padre
          >
            Ver más
          </Button> */}
        </div>

      </CardContent>
    </Card>
  );
};