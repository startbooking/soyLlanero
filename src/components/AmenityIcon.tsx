
import { 
  Wifi, 
  Car, 
  Utensils, 
  Dumbbell, 
  Bath,
  AirVent,
  Coffee,
  Tv,
  Shield
} from "lucide-react";

interface AmenityIconProps {
  amenity: string;
  className?: string;
}

export const AmenityIcon = ({ amenity, className = "w-4 h-4" }: AmenityIconProps) => {
  switch (amenity) {
    case "Wifi": return <Wifi className={className} />;
    case "Parking": return <Car className={className} />;
    case "Restaurante": return <Utensils className={className} />;
    case "Gimnasio": return <Dumbbell className={className} />;
    case "Piscina": return <Bath className={className} />;
    case "Aire Acondicionado": return <AirVent className={className} />;
    case "TV": return <Tv className={className} />;
    case "Minibar": return <Coffee className={className} />;
    case "Seguridad": return <Shield className={className} />;
    default: return null;
  }
};
