import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Navigation, Eye, Users } from "lucide-react";
import { Experience } from "@/interface/interface";
import { formatCurrency } from "@/utils/formatCurrency";

interface AdventureCardProps {
  experience: Experience;
  onAction?: (experience: Experience) => void;
}

export const AdventureCard = ({ experience, onAction }: AdventureCardProps) => {
  // Desestructuración limpia del registro
  const { 
    id, image, name, category, rating, difficulty, 
    location, duration, price, description, max_people 
  } = experience;

  const handleViewDetails = () => {
    if (onAction) {
      onAction(experience);
    }
  };

  // Lógica de colores de dificultad más profesional
  const getDifficultyStyles = (diff: string) => {
    const base = "text-[10px] uppercase font-black px-2 py-0.5 rounded-md border";
    switch (diff) {
      case "Facil": 
        return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case "Moderado": 
      case "Intermedio":
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case "Difícil": 
        return `${base} bg-red-50 text-red-700 border-red-200`;
      default: 
        return `${base} bg-slate-50 text-slate-700 border-slate-200`;
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-slate-200 bg-white">
      {/* Media Section */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={image?.startsWith('http') ? image : `/images/experiences/${image}`} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => (e.currentTarget.src = '/placeholder-adventure.jpg')}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
        
        <Badge className="absolute top-4 right-4 bg-sky-500 text-white border-none shadow-lg">
          {category}
        </Badge>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-bold">{duration}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/95 text-slate-900 px-2 py-1 rounded-lg shadow-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-black">{rating}</span>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-black text-slate-800 line-clamp-1 group-hover:text-sky-600 transition-colors">
            {name}
          </CardTitle>
        </div>
        <div className="flex items-center text-slate-500 text-xs font-medium">
          <MapPin className="w-3 h-3 mr-1 text-red-500" />
          <span className="truncate">{location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 italic">
          {description}
        </p>
        
        <div className="flex items-center gap-4 border-y py-3 border-slate-50">
          <Badge className={getDifficultyStyles(difficulty)}>
            {difficulty}
          </Badge>
          <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase">
            <Users className="w-3 h-3 mr-1" />
            Máx. {max_people} pers.
          </div>
        </div>

        {/* Precio */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[9px] uppercase font-black text-slate-400 tracking-tighter">Precio por persona</p>
            <p className="text-xl font-black text-slate-900 tracking-tight">
              {formatCurrency(Number(price))}
            </p>
          </div>
        </div>
        
        {/* Botones de Acción */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
            }}
            className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-all px-3"
          >
            <Navigation className="w-3.5 h-3.5" />
          </Button>

          <Button 
            onClick={handleViewDetails}
            size="sm"
            className="flex-1 bg-sabana text-white hover:bg-sabana hover:text-slate-500 font-bold transition-all"
          >
            <Eye className="w-3.5 h-3.5 mr-2" />
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};