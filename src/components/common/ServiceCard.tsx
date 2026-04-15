import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  price: string;
  phone: string;
  schedule: string;
  capacity: string;
  category: string;
  services: string[];
  image: string;
  isVip?: boolean;
}

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();
  
  const openWaze = (location: string) => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
  };

  const handleViewDetails = () => {
    navigate(`/contact-service/${service.id}`, { state: { service } });
  };

  const handleContact = () => {
    navigate(`/contact/${service.id}`, { state: { service } });
  };

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${service.isVip ? 'border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100/50' : 'bg-white'}`}>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`/images/services/${service.image}`}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-green-500 text-white">
          {service.category}
        </Badge>
        <div className="absolute top-4 left-4 flex items-center bg-white/90 rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="ml-1 text-sm font-medium">{service.rating}</span>
        </div>
        {service.isVip && (
          <Badge className="absolute bottom-4 left-4 bg-green-600 text-white">
            ⭐ VIP SPONSOR
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-foreground group-hover:text-green-600 transition-colors">
          {service.name}
        </CardTitle>
        <div className="space-y-1">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {service.location}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {service.schedule}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{service.description}</p>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Servicios:</h4>
          <div className="flex flex-wrap gap-1">
            {JSON.parse(service.services).slice(0, 3).map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
            {JSON.parse(service.services).length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.services.length - 3} más
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-green-600">{service.price}</span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="w-3 h-3 mr-1" />
            {service.phone}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => openWaze(service.location)}
            className="border border-black-500 flex items-center gap-1"
          >
            <Navigation />
            Ver Ruta
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 border border-black-500 bg-black-500 text-black-500"
            onClick={handleViewDetails}
          >
            Ver Detalles
          </Button>
          {/* <Button size="sm" variant="outline" className="flex-1 border border-black-500 bg-black-500 text-black-500" onClick={handleContact}>
            Contactar
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};