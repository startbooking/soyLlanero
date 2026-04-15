
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Receipt, Percent, Car, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Experience } from "@/interface/interface";
import { useState } from "react";

export const AdventureCard = ({ 
  id,
  image,
  name,
  category,
  rating,
  difficulty,
  location,
  duration,
  price,
  tax_percentage,
  description,
  max_people,
  experience,
}: Experience) => {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint]  = useState();

  const handleViewMore = () => {
    navigate(`/experiences/${id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facil": return "bg-black-100 text-black-800 rounded-md hover:bg-primary/20";
      case "Moderado": return "bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-500";
      case "Intermedio": return "bg-yellow-100 text-yellow-800 rounded-md";
      case "Difícil": return "bg-red-100 text-red-800 rounded-md";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`/images/experiences/${image}`} 
          alt={name}
          className="w-full h-[30vh] group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="border border-black/50 rounded-md absolute top-4 right-4 bg-bl/50 text-black-foreground hover:bg-primary/40">
          {category}
        </Badge>
        <div className="absolute bottom-4 left-4 text-white flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
        <div className="rounded-md absolute bottom-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
          <span className="font-medium text-sm">{rating}</span>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-foreground group-hover:text-primary/50 transition-colors">
          {name}
        </CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <Badge className={getDifficultyColor(difficulty)}>
            Dificultad: {difficulty}
          </Badge>
        </div>

        {/* Precio e impuestos */}
        <div className="bg-accent/20 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-black">{price}</span>
            <div className="text-right">
              {/* <div className="flex items-center text-sm text-muted-foreground">
                <Receipt className="w-3 h-3 mr-1" />
                <span>Impuestos: ${taxes.toLocaleString()}</span>
              </div> */}
              {/* <div className="flex items-center text-sm text-muted-foreground">
                <Percent className="w-3 h-3 mr-1" />
                <span>{tax_percentage}</span>
              </div> */}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank')}
            className="border border-black/50 flex items-center gap-1 hover:bg-primary-50 border-black-500 text-black-700 hover:bg-primary/50 hover:border-primary/60 "
          >
          <Navigation className="w-4 h-4 mr-2" />
            Ver Waze
          </Button>
          {/* <Button 
            size="sm"
            onClick={() => console.log(`Reservar ${name}`)}
            className="flex-1"
          >
            Reservar
          </Button> */}
          <Button 
            onClick={() => setSelectedPoint(experience)}
            size="sm"
            className="bg-white-50 border flex items-center gap-1 border-black-500 text-black-700 hover:bg-primary/50 hover:border-primary/60 flex-1">
            Ver Detalles
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
};
