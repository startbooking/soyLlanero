import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Info, Navigation } from "lucide-react";
import { EventsData } from "@/interface/interface";

interface EventCardProps {
  event: EventsData;
  onViewMore: (event: EventsData) => void;
}

export const EventCard = ({ event, onViewMore }: EventCardProps) => {
  const { 
    image, title, category, is_free, price, 
    date, time, location, max_capacity, description 
  } = event;

  const openWaze = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
      location + " Villavicencio Meta"
    )}`;
    window.open(wazeUrl, "_blank");
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col border-slate-200 bg-white">
      {/* Media Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image?.startsWith('http') ? image : `/images/events/${image}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Badge className="bg-sky-500 hover:bg-sky-600 border-none text-white shadow-lg">
            {category}
          </Badge>
          <Badge
            className={`${
              is_free ? "bg-emerald-500" : "bg-sabana text-slate-900"
            } border-none shadow-lg font-bold`}
          >
            {is_free ? "Entrada Libre" : price}
          </Badge>
        </div>
      </div>

      <CardHeader className="flex-grow pb-2">
        <CardTitle className="text-xl font-black text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight mb-4">
          {title}
        </CardTitle>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          <div className="flex items-center text-slate-500 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 mr-2 text-sky-500 shrink-0" />
            {date}
          </div>
          <div className="flex items-center text-slate-500 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 mr-2 text-sky-500 shrink-0" />
            {time}
          </div>
          <div className="flex items-center text-slate-500 text-xs font-medium col-span-2">
            <MapPin className="w-3.5 h-3.5 mr-2 text-red-500 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 space-y-4">
        <p className="text-slate-600 text-sm line-clamp-2 italic leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between py-2 border-y border-slate-50">
           <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <Users className="w-3 h-3 mr-1" />
            Capacidad: {max_capacity}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-none border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-600"
            onClick={openWaze}
            title="Ir con Waze"
          >
            <Navigation className="w-4 h-4" />
          </Button>
          <Button
            className="flex-1 bg-sabana text-white hover:bg-sabana hover:text-slate-500 font-bold transition-all"
            onClick={() => onViewMore(event)}
          >
            <Info className="w-4 h-4 mr-2" />
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};