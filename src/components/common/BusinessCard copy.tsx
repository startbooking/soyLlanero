import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Eye, Percent, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WordCountDisplay from "@/utils/WordCountDisplay";
import { BusinessCardProps } from "@/interface/interface";
import { formatCurrency } from "@/utils/formatCurrency";

export const BusinessCard = ({ 
  id, 
  name, 
  category, 
  phone,
  email,
  address, 
  rating, 
  image, 
  description, 
  is_sponsor = false,
  price,
  taxes,
  tax_percentage,
  specialties,
  amenities,
  onViewDetails
}: BusinessCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    } else if (is_sponsor) {
      navigate(`/sponsor/${id}`);
    } else {
      navigate(`/hotel/${id}`);
    }
  };

  const DISPLAY_LIMIT = 20;


  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={`/images/businnesses/${image}`} // Asumiendo que 'image' es una URL accesible
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => (e.currentTarget.src = 'placeholder.svg')} // Fallback en caso de error de imagen
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Badge className="bg-white-500 rounded-md text-primary-foreground border border-black-500 hover:bg-primary/50">
            {category}
          </Badge>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
          <span className="font-bold text-sm">{rating}</span>
        </div>
        
        {is_sponsor && (
          <div className="absolute bottom-4 left-4">
            <Badge variant="outline" className="bg-white/90 text-black-500 border-black-500">
              VIP Sponsor
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-foreground group-hover:text-primary/50 transition-colors">
          {name}
        </CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{address}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <WordCountDisplay
          text={description}
          wordLimit={DISPLAY_LIMIT}
        />

        {/* Precio e impuestos */}
        {price && (
          <div className="bg-accent/20 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black/50">Desde {formatCurrency(price)}</span>
              {taxes && tax_percentage && (
                <div className="text-right">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Receipt className="w-3 h-3 mr-1" />
                    <span>Impuestos : ${taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Percent className="w-3 h-3 mr-1" />
                    <span>{tax_percentage}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Especialidades o amenidades */}
        {/* {(specialties || amenities) && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {(specialties || amenities)?.slice(0, 3).map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
              {(specialties || amenities) && (specialties || amenities).length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(specialties || amenities).length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )} */}
        
        <Button 
          className="w-full bg-sabana text-black-500 border border-black-500 hover:bg-sabana/50"
          onClick={handleViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
};