
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, Bath, Tv, Wifi, Car, Utensils } from "lucide-react";
import { AmenityIcon } from "./AmenityIcon";
import { RoomImageSlider } from "./RoomImageSlider";

interface Room {
  id: number;
  name: string;
  price: string;
  capacity: number;
  amenities: string[];
  image: string;
  available: boolean;
  description?: string;
  beds?: string;
  bathroom?: string;
  size?: string;
  images?: string[];
  taxes?: number;
  taxPercentage?: number;
}

interface RoomDetailModalProps {
  room: Room;
  children: React.ReactNode;
  onReserve: (roomId: number) => void;
}

export const RoomDetailModal = ({ room, children, onReserve }: RoomDetailModalProps) => {
  const roomDetails = {
    ...room,
    description: room.description || "Habitación cómoda y elegante con todas las amenidades necesarias para una estadía placentera.",
    beds: room.beds || "1 cama king size",
    bathroom: room.bathroom || "Baño privado con ducha",
    size: room.size || "35 m²"
  };

  // Crear array de imágenes - usar images si existe, sino usar la imagen principal
  const roomImages = roomDetails.images && roomDetails.images.length > 0 
    ? roomDetails.images 
    : [roomDetails.image];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{roomDetails.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Room Image Slider */}
          <RoomImageSlider images={roomImages} roomName={roomDetails.name} />

          {/* Room Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground">{roomDetails.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Detalles</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Hasta {roomDetails.capacity} huéspedes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-primary" />
                    <span>{roomDetails.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4 text-primary" />
                    <span>{roomDetails.bathroom}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 text-center text-primary font-bold">m²</span>
                    <span>{roomDetails.size}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Amenidades</h3>
                <div className="grid grid-cols-2 gap-2">
                  {roomDetails.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AmenityIcon amenity={amenity} />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent/20 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{roomDetails.price}</div>
                  <p className="text-sm text-muted-foreground">por noche</p>
                  {roomDetails.taxes && (
                    <div className="text-sm text-muted-foreground mt-2">
                      <p>Impuestos: ${roomDetails.taxes.toLocaleString()}</p>
                      <p>({roomDetails.taxPercentage}%)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button 
              className="flex-1" 
              disabled={!roomDetails.available}
              onClick={() => onReserve(roomDetails.id)}
            >
              {roomDetails.available ? "Reservar ahora" : "No disponible"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
