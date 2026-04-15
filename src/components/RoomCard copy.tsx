
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { AmenityIcon } from "./AmenityIcon";
import { RoomDetailModal } from "./RoomDetailModal";
import { useNavigate, useParams } from "react-router-dom";

interface Room {
  id: number;
  name: string;
  price: string;
  capacity: number;
  amenities: string[];
  image: string;
  available: boolean;
  taxes?: number;
  taxPercentage?: number;
}

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  const navigate = useNavigate();
  const { id: hotelId } = useParams();

  const handleReserve = (roomId: number) => {
    navigate(`/hotel/${hotelId}/reservation/${roomId}`);
  };

  return (
    <Card className={`${!room.available ? 'opacity-60' : ''}`}>
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
    </Card>
  );
};
