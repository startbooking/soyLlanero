
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Dumbbell, Maximize, Users, Wifi } from "lucide-react";
import { AmenityIcon } from "./AmenityIcon";
import { RoomDetailModal } from "./RoomDetailModal";
import { useNavigate, useParams } from "react-router-dom";

interface Room {
  amenities: string;
  bed_type: string;
  business_id: string;
  created_at: string;
  description: string;
  has_tax: string;
  id: number;
  image: string;
  images: string;
  is_available: string;
  max_occupancy: string;
  name: string;
  price_per_night: string;
  room_size: string;
  tax_percentage: string;
  total_rooms: string;
  updated_at: string;
/*   price: string;
  capacity: number;
  available: boolean;
  taxes?: number;
  taxPercentage?: number; */
}

interface RoomCardProps {
  room: Room;
}

const getRoomAmenityIcon = (amenity: string) => {
  const lowerAmenity = amenity.toLowerCase();
  if (lowerAmenity.includes("wifi")) return <Wifi className="w-4 h-4 text-muted-foreground" />;
  if (lowerAmenity.includes("cama")) return <Bed className="w-4 h-4 text-muted-foreground" />;
  return null;
};

export const RoomCard = ({ room }: RoomCardProps) => {
  // console.log(room)
  const navigate = useNavigate();
  const { id: hotelId } = useParams();

  const handleReserve = (roomId: number) => {
    navigate(`/hotel/${hotelId}/reservation/${roomId}`);
  };



  return (
    <Card className={`${!room.is_available ? 'opacity-60' : ''}`}>
        {/* 
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img 
            src={room.image} 
            alt={room.name}
            className="w-full h-48 object-cover rounded-l-lg"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <Users className="w-4 h-4 mr-1" />
                Hasta {room.capacity} huéspedes
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-primary">{room.price}</span>
              <p className="text-sm text-muted-foreground">por noche</p>
              {room.taxes && (
                <p className="text-xs text-muted-foreground">
                  +${room.taxes.toLocaleString()} impuestos ({room.taxPercentage}%)
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.map((amenity, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <AmenityIcon amenity={amenity} />
                {amenity}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <RoomDetailModal room={room} onReserve={handleReserve}>
              <Button variant="outline" className="flex-1">
                Ver Detalles
              </Button>
            </RoomDetailModal>
            
            <Button 
              className="flex-1" 
              disabled={!room.available}
              onClick={() => handleReserve(room.id)}
            >
              {room.available ? "Reservar ahora" : "No disponible"}
            </Button>
          </div>
        </div>
      </div>
        */}
        <Card className="flex flex-col md:flex-row shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Imagen de la Habitación */}
            <img
              // Se asume que las imágenes de las habitaciones están bajo un subdirectorio 'rooms'
              src={`/images/businnesses/rooms/${room.image}`}
              alt={room.name}
              className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
        
            {/* Contenido de la Habitación */}
            <CardContent className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-primary">{room.name}</h3>
                <p className="text-muted-foreground mb-3 line-clamp-2">{room.description}</p>
        
                {/* Detalles clave */}
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1 text-foreground">
                    <Bed className="w-4 h-4 text-primary" />
                    <span>{room.bed_type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Maximize className="w-4 h-4 text-primary" />
                    <span>{room.room_size}</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Dumbbell className="w-4 h-4 text-primary" />
                    <span>Capacidad: {room.max_occupancy} pers.</span>
                  </div>
                </div>
        
                {/* Amenities de la Habitación */}
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs">
                      {getRoomAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 4 && <Badge variant="outline" className="text-xs">+{room.amenities.length - 4} más</Badge>}
                </div>
              </div>
        
              {/* Precio y Reserva */}
              <div className="flex items-center justify-between mt-4 border-t pt-4">
                <div>
                  <span className="text-sm text-muted-foreground block">Precio por noche</span>
                  <span className="text-2xl font-extrabold text-primary">{room.price_per_night}</span>
                  {room.has_tax && <span className="text-xs text-muted-foreground ml-2">(Impuestos: {room.tax_percentage}%)</span>}
                </div>
                {/* <Button size="lg" disabled={!room.is_available}>
                  {room.is_available ? 'Reservar Ahora' : 'No Disponible'}
                </Button> */}
                <Button 
                  size="lg"
                  disabled={!room.is_available}
                  onClick={() => handleReserve(room.id)}
                >
                  {room.is_available ? "Reservar ahora" : "No disponible"}
                </Button>
              </div>
            </CardContent>
          </Card>
      
    </Card>
  );
};
