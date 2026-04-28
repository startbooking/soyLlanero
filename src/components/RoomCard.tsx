import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, Users, Wifi, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Business } from "@/interface/interface";

// --- Constantes y Utilidades ---
const ROOM_AMENITIES: Record<string, any> = {
  wifi: Wifi,
  cama: Bed,
  size: Maximize,
  piscina: CheckCircle2, // Icono genérico para otros servicios
};

interface Room {
  amenities: string[];
  bed_type: string;
  business_id: string;
  description: string;
  has_tax: string;
  id: number;
  image: string;
  is_available: number;
  max_occupancy: string;
  name: string;
  price_per_night: string;
  room_size: string;
  tax_percentage: string;
}

interface RoomCardProps {
  room: Room;
  hotel: Business;
}

// --- Componente ---
export const RoomCard = ({ room, hotel }: RoomCardProps) => {
  const navigate = useNavigate();
  const { id: hotelId } = useParams();

  const isAvailable = Number(room.is_available) === 1;

  const handleReserve = () => {
    navigate(`/hotel/${hotelId}/reservation/${room.id}`, {
      state: { room, hotel }
    });
  };

  return (
    <Card className={`group overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-xl ${!isAvailable ? 'opacity-75 bg-slate-50' : 'border-slate-100 hover:border-sabana/20'
      }`}>
      <div className="flex flex-col lg:flex-row min-h-[280px]">

        {/* Lado Izquierdo: Imagen */}
        <div className="relative w-full lg:w-80 overflow-hidden bg-slate-200">
          <img
            src={`/images/rooms/${room.image || 'noimage.jpg'}`}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            fetchpriority="low"
            onError={(e) => (e.currentTarget.src = '/placeholder-room.jpg')}
          />

          {/* Badge de Disponibilidad */}
          <div className="absolute top-4 left-4">
            <Badge className={`${isAvailable ? 'bg-sabana/60' : 'bg-red-500'} text-white border-0 shadow-lg`}>
              {isAvailable ? 'Disponible' : 'No Disponible'}
            </Badge>
          </div>

          {!isAvailable && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
          )}
        </div>

        {/* Lado Derecho: Detalles */}
        <CardContent className="p-6 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header de la habitación */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{room.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {room.description}
                </p>
              </div>
              <Badge variant="secondary" className="whitespace-nowrap font-bold text-sabana/80 bg-sabana/20">
                <Maximize className="w-3 h-3 mr-1" />
                {room.room_size}
              </Badge>
            </div>

            {/* Características principales */}
            <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-sabana/60" />
                <span>{room.bed_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sabana/60" />
                <span>Capacidad: {room.max_occupancy}</span>
              </div>
            </div>

            {/* Lista de Servicios */}
            {/* <div className="flex flex-wrap gap-1.5 pt-2">
              {room?.amenities.slice(0, 5).map((amenity, idx) => {
                const lower = amenity.toLowerCase();
                const Icon = Object.entries(ROOM_AMENITIES).find(([key]) => lower.includes(key))?.[1] || CheckCircle2;
                
                return (
                  <Badge key={idx} variant="outline" className="bg-white text-[11px] font-normal py-0.5 px-2 border-slate-200">
                    <Icon className="w-3 h-3 mr-1.5 text-sabana/60" />
                    {amenity}
                  </Badge>
                );
              })}
            </div> */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {Array.isArray(room?.amenities) && room.amenities.slice(0, 5).map((amenity, idx) => {
                const lower = amenity.toLowerCase();
                const Icon = Object.entries(ROOM_AMENITIES).find(([key]) => lower.includes(key))?.[1] || CheckCircle2;

                return (
                  <Badge key={idx} variant="outline" className="bg-white text-[11px] font-normal py-0.5 px-2 border-slate-200">
                    <Icon className="w-3 h-3 mr-1.5 text-sabana/60" />
                    {amenity}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Footer de Precio y Botón */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Tarifa por noche</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-sabana/90 tracking-tighter">
                  {room.price_per_night}
                </span>
                {room.has_tax === "1" && (
                  <Badge variant="outline" className="text-[9px] h-5 border-green-100 text-sabana/70 bg-green-50">
                    + {room.tax_percentage}% IVA
                  </Badge>
                )}
              </div>
            </div>

            <Button
              onClick={handleReserve}
              disabled={!isAvailable}
              size="lg"
              className={`rounded-sm px-8 font-bold transition-all ${isAvailable
                  ? 'bg-sabana hover:bg-sabana/80 shadow-sabana/10 shadow-xl'
                  : 'bg-slate-300 cursor-not-allowed'
                }`}
            >
              Reservar
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};