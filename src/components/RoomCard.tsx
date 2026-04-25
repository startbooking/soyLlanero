import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, Users, Wifi, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Business } from "@/interface/interface";

interface Room {
  amenities: string[]; // Actualizado a array según los cambios previos
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

const getRoomAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();
  if (lower.includes("wifi")) return <Wifi className="w-4 h-4 text-green-700" />;
  if (lower.includes("cama")) return <Bed className="w-4 h-4 text-green-700" />;
  return null;
};

export const RoomCard = ({ room, hotel }: RoomCardProps) => {
  const navigate = useNavigate();
  const { id: hotelId } = useParams();
  
  // Normalización de disponibilidad
  const isAvailable = Number(room.is_available) === 1;

  const handleReserve = () => {
    // CORRECCIÓN CRÍTICA: Se separa el string de la URL del objeto de opciones
    navigate(`/hotel/${hotelId}/reservation/${room.id}`, { 
      state: { 
        room, 
        hotel 
      } 
    });
  };

  return (
    <Card className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${!isAvailable ? 'opacity-70 bg-slate-50' : 'border-[#D9E4C5]'}`}>
      <div className="flex flex-col md:flex-row">
        
        {/* Lado Izquierdo: Imagen con Overlay de disponibilidad */}
        <div className="relative w-full md:w-2/5 lg:w-1/3 h-56 md:h-auto overflow-hidden">
          <img
            src={`/images/rooms/${room.image || 'noimage.jpg'}`}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
              <Badge variant="destructive" className="text-sm py-1 px-4 uppercase font-bold">
                No Disponible
              </Badge>
            </div>
          )}
        </div>

        {/* Lado Derecho: Contenido */}
        <CardContent className="p-6 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-slate-900">{room.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mt-1">{room.description}</p>
              </div>
              <Badge variant="outline" className="bg-[#F7F9F2] text-green-800 border-[#D9E4C5]">
                {room.room_size}
              </Badge>
            </div>

            {/* Características en Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <Bed className="w-4 h-4 text-green-700" />
                <span>{room.bed_type}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Users className="w-4 h-4 text-green-700" />
                <span>Hasta {room.max_occupancy} pers.</span>
              </div>
            </div>

            {/* Amenities Render */}
            <div className="flex flex-wrap gap-2">
              {room.amenities?.slice(0, 4).map((amenity, idx) => (
                <Badge key={idx} variant="secondary" className="bg-white border text-[11px] font-normal py-0.5">
                  {getRoomAmenityIcon(amenity)}
                  <span className="ml-1">{amenity}</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Precio y Acción */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Precio por noche</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-green-800">{room.price_per_night}</span>
                {room.has_tax === "1" && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    + {room.tax_percentage}% IVA
                  </span>
                )}
              </div>
            </div>

            <Button 
              onClick={handleReserve}
              disabled={!isAvailable}
              className="bg-green-700 hover:bg-green-800 text-white shadow-md active:scale-95 transition-all"
            >
              Reservar ahora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};