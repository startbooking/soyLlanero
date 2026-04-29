import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ReservationSummary = ({ reservationData }: { reservationData: any }) => {
  const { hotel, room, checkInDate, checkOutDate, guests, children } = reservationData;

  // Formateo de fechas consistente con tu imagen
  const formatDate = (date: any) => {
    if (!date) return "---";
    const d = new Date(date);
    return format(d, "dd MMM, yyyy", { locale: es });
  };

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm bg-white">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          
          {/* LADO IZQUIERDO: Imagen con Texto Superpuesto */}
          <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
            <img
              src={room?.image?.startsWith('http') ? room.image : `/images/rooms/${room?.image}`}
              alt={room?.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Overlay Gradiente para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <h3 className="text-white font-bold text-xl leading-tight">
                {hotel?.name}
              </h3>
              <p className="text-white/90 text-sm font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {room?.name}
              </p>
            </div>
          </div>

          {/* LADO DERECHO: Datos de la Reserva */}
          <div className="w-full md:w-3/5 p-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-slate-800 font-bold border-b pb-2">
              <CalendarDays className="w-4 h-4 text-sky-500" />
              Detalles de la Reserva
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Check-in */}
              <div className="space-y-1">
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Check-in</p>
                <p className="text-sm font-bold text-slate-700">{formatDate(checkInDate)}</p>
              </div>

              {/* Check-out */}
              <div className="space-y-1">
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Check-out</p>
                <p className="text-sm font-bold text-slate-700">{formatDate(checkOutDate)}</p>
              </div>
            </div>

            {/* Huéspedes */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-slate-600">
                <Users className="w-4 h-4 text-sky-500" />
                <span className="text-sm font-medium">
                  {guests} Adulto{parseInt(guests) !== 1 ? 's' : ''} 
                  {parseInt(children) > 0 && ` • ${children} Niño${parseInt(children) !== 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};