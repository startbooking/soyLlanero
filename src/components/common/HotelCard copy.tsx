
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Receipt, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  price: string;
  taxes: number;
  taxPercentage: number;
  amenities: string[];
  image: string;
  category: string;
}

export const HotelCard = ({ 
  id, 
  name, 
  location, 
  description, 
  rating, 
  price, 
  taxes,
  taxPercentage,
  amenities, 
  image, 
  category 
}: HotelCardProps) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/sponsor/${id}`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {category}
        </Badge>
        <div className="absolute bottom-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
          <span className="font-medium text-sm">{rating}</span>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-foreground group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{amenities.length - 3} más
            </Badge>
          )}
        </div>

        {/* Precio e impuestos */}
        <div className="bg-accent/20 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">{price}</span>
            <div className="text-right">
              <div className="flex items-center text-sm text-muted-foreground">
                <Receipt className="w-3 h-3 mr-1" />
                <span>Impuestos: ${taxes.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Percent className="w-3 h-3 mr-1" />
                <span>{taxPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <Button onClick={handleViewMore} className="w-full">
          Ver más
        </Button>
      </CardContent>
    </Card>
  );
};
