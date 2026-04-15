
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Star, 
  Navigation,
  X
} from "lucide-react";
import { RoomCard } from "./RoomCard";
import { AmenityIcon } from "./AmenityIcon";
import { ContactInfo } from "./ContactInfo";

interface Room {
  id: number;
  name: string;
  price: string;
  capacity: number;
  amenities: string[];
  image: string;
  available: boolean;
}

interface HotelDetailProps {
  hotel: {
    id: number;
    name: string;
    location: string;
    description: string;
    rating: number;
    price: string;
    amenities: string[];
    image: string;
    phone?: string;
    email?: string;
    website?: string;
    coordinates?: { lat: number; lng: number };
  };
  onClose: () => void;
}

export const HotelDetail = ({ hotel, onClose }: HotelDetailProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const rooms: Room[] = [
    {
      id: 1,
      name: "Habitación Estándar",
      price: "$120.000",
      capacity: 2,
      amenities: ["Wifi", "TV", "Aire Acondicionado", "Baño Privado"],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      available: true
    },
    {
      id: 2,
      name: "Suite Ejecutiva",
      price: "$200.000",
      capacity: 4,
      amenities: ["Wifi", "TV", "Aire Acondicionado", "Minibar", "Balcón", "Sala de Estar"],
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843",
      available: true
    },
    {
      id: 3,
      name: "Suite Presidencial",
      price: "$350.000",
      capacity: 6,
      amenities: ["Wifi", "TV", "Aire Acondicionado", "Jacuzzi", "Balcón", "Cocina", "Sala de Estar"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      available: false
    }
  ];

  const handleNavigation = () => {
    if (isMobile) {
      window.open(`https://waze.com/ul?q=${encodeURIComponent(hotel.location)}`, '_blank');
    } else {
      window.open(`https://maps.google.com?q=${encodeURIComponent(hotel.location)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="relative h-64 overflow-hidden rounded-t-lg">
            <img 
              src={hotel.image} 
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                {hotel.location}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="ml-1 font-medium">{hotel.rating}</span>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="rooms">Habitaciones</TabsTrigger>
                <TabsTrigger value="amenities">Amenidades</TabsTrigger>
                <TabsTrigger value="contact">Contacto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-lg">{hotel.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">Desde {hotel.price}/noche</span>
                    <Button onClick={handleNavigation} className="flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      {isMobile ? "Abrir en Waze" : "Ver en Google Maps"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rooms" className="mt-6">
                <div className="grid gap-6">
                  {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <AmenityIcon amenity={amenity} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="mt-6">
                <ContactInfo 
                  hotel={hotel} 
                  isMobile={isMobile} 
                  onNavigation={handleNavigation} 
                />
              </TabsContent>
            </Tabs>ExperienceDetail
          </div>
        </div>
      </div>
    </div>
  );
};
