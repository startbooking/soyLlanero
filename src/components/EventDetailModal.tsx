import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  X,
  Navigation,
  Sparkles,
  Info,
  ChevronRight
} from "lucide-react";
import { useBusinessActions } from "@/hooks/useBusinessActions";
import { formatCurrency } from "@/utils/formatCurrency";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  price: number;
  isFree: boolean;
  max_capacity: number;
  category: string;
  image: string;
  organizer?: string;
}

interface EventDetailModalProps {
  event: Event;
  onClose: () => void;
}

export const EventDetailModal = ({ event, onClose }: EventDetailModalProps) => {
  const { handleNavigation } = useBusinessActions();

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[3rem] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Botón Cerrar Flotante */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-sabana/50 hover:bg-sabana backdrop-blur-md rounded-full transition-all group"
        >
          <X className="w-5 h-5 text-white group-hover:text-slate-900" />
        </button>

        {/* COLUMNA IZQUIERDA: IMAGEN (40%) */}
        <div className="relative w-full md:w-[45%] h-64 md:h-auto overflow-hidden">
          <img 
            src={`/images/events/${event.image}`} 
            alt={event.title}
            className="w-full h-[50%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10">
            <Badge className="bg-sabana text-white border-none font-black uppercase text-[10px] px-4 py-1.5 mb-4">
              {event.category}
            </Badge>
            <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
              {event.title}
            </h1>
          </div>
        </div>

        {/* COLUMNA DERECHA: CONTENIDO (60%) */}
        <div className="w-full md:w-[55%] p-8 md:p-12 overflow-y-auto bg-white custom-scrollbar">
          <div className="space-y-8">
            
            {/* Header de Información */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 font-bold italic">
                <MapPin className="w-4 h-4 text-sabana" />
                {event.location}
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">
                {event.isFree || event.price == 0 ? "Entrada Libre" : formatCurrency(event.price)}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Grid de Datos */}
            <div className="grid grid-cols-2 gap-6">
              <InfoItem icon={Calendar} label="Fecha" value={event.date} />
              <InfoItem icon={Clock} label="Horario" value={event.time} />
              <InfoItem icon={Users} label="Capacidad" value={`${event.max_capacity} personas`} />
              <InfoItem icon={Sparkles} label="Organiza" value={event.organizer || "Clúster Turístico"} />
            </div>

            {/* Descripción */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-sabana" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sobre el evento</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {event.description}
              </p>
            </div>

            {/* Botones de Acción (Simétricos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Button 
                variant="outline"
                className="h-14 rounded-2xl border-2 uppercase text-[10px]"
                onClick={() => handleNavigation({ name: event.title, location: event.location })}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Ir al Evento
              </Button>
              
              <Button 
                className="h-14 rounded-2xl bg-sabana/90 text-white hover:bg-sabana/60 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-200"
                onClick={() => alert("Reserva en proceso...")}
              >
                Reservar Cupo
                <ChevronRight className="w-4 h-4 ml-2 text-white" />
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para los items de info
const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-slate-50 rounded-xl">
      <Icon className="w-4 h-4 text-sabana" />
    </div>
    <div>
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter leading-none">{label}</p>
      <p className="text-xs font-bold text-slate-700">{value}</p>
    </div>
  </div>
);