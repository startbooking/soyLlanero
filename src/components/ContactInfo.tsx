
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Navigation,
  Phone,
  Globe,
  Mail
} from "lucide-react";

interface Hotel {
  phone?: string;
  email?: string;
  website?: string;
  location: string;
}

interface ContactInfoProps {
  hotel: Hotel;
  isMobile: boolean;
  onNavigation: () => void;
}

export const ContactInfo = ({ hotel, isMobile, onNavigation }: ContactInfoProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Información de contacto</h3>
        
        {hotel.phone && (
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Teléfono</p>
              <p className="text-muted-foreground">{hotel.phone}</p>
            </div>
          </div>
        )}
        
        {hotel.email && (
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{hotel.email}</p>
            </div>
          </div>
        )}
        
        {hotel.website && (
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Sitio web</p>
              <a 
                href={hotel.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {hotel.website}
              </a>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ubicación</h3>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="font-medium">Dirección</p>
            <p className="text-muted-foreground">{hotel.location}</p>
          </div>
        </div>
        
        <Button 
          onClick={onNavigation} 
          variant="outline" 
          className="w-full"
        >
          <Navigation className="w-4 h-4 mr-2" />
          {isMobile ? "Cómo llegar (Waze)" : "Cómo llegar (Google Maps)"}
        </Button>
      </div>
    </div>
  );
};
