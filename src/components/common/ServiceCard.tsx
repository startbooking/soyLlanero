import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Clock, Navigation, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Interface actualizada para coincidir con la base de datos
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
  services: string; // Viene como string JSON de la DB
  image: string;
  isVip?: boolean;
}

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();
  
  // Parseo seguro de servicios
  const getServicesList = () => {
    try {
      return typeof service.services === 'string' 
        ? JSON.parse(service.services) 
        : service.services;
    } catch (e) {
      return [];
    }
  };

  const servicesList = getServicesList();

  const openWaze = (location: string) => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}&navigate=yes`, '_blank');
  };

  const handleViewDetails = () => {
    navigate(`/contact-service/${service.id}`, { state: { service } });
  };

  return (
    <Card className={`group hover:shadow-2xl transition-all duration-500 border-none shadow-sm overflow-hidden rounded-2xl bg-white ${service.isVip ? 'ring-2 ring-sabana/20' : ''}`}>
      {/* Imagen con Overlay de Rating */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={`/images/services/${service.image}`}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => (e.currentTarget.src = '/placeholder-service.jpg')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <Badge className="absolute top-4 right-4 bg-sabana text-white border-none font-bold uppercase text-[10px] tracking-widest px-3">
          {service.category}
        </Badge>
        
        <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur rounded-full px-3 py-1 shadow-lg">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current mr-1" />
          <span className="text-xs font-black text-slate-800">{service.rating || "5.0"}</span>
        </div>

        {service.isVip && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-yellow-400 text-black font-black border-none animate-pulse">
              ⭐ DESTACADO
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-black text-slate-800 group-hover:text-sabana transition-colors tracking-tighter uppercase">
          {service.name}
        </CardTitle>
        <div className="flex items-center text-slate-400 text-sm font-medium">
          <MapPin className="w-4 h-4 mr-1 text-sabana" />
          {service.location}
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full">
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        
        {/* Chips de Servicios */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5">
            {servicesList.slice(0, 3).map((item: string, index: number) => (
              <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-500 border-none text-[10px] font-bold">
                <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-sabana" />
                {item}
              </Badge>
            ))}
            {servicesList.length > 3 && (
              <span className="text-[10px] font-bold text-slate-400 self-center ml-1">
                +{servicesList.length - 3} más
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Desde</span>
            <span className="text-lg font-black text-sabana leading-none">{service.price}</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
               <Clock className="w-3 h-3" /> Horario
             </span>
             <span className="text-xs font-bold text-slate-600">{service.schedule}</span>
          </div>
        </div>
        
        {/* Botonera Dual */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button 
            variant="secondary"
            onClick={() => openWaze(service.location)}
            className="border-slate-200 text-slate-600 font-bold rounded-xl transition-all h-11 flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            WAZE
          </Button>

          <Button 
            className="bg-sabana hover:bg-sabana/90 text-white font-black rounded-xl h-11 shadow-md shadow-sabana/10 transition-all active:scale-95 uppercase text-xs tracking-wider"
            onClick={handleViewDetails}
          >
            DETALLES
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};