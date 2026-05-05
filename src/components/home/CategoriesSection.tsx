import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Hotel, 
  Utensils, 
  Compass, 
  Palmtree, 
  Ticket, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useTranslations } from "@/utils/translations";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useNavigate } from "react-router-dom";

interface CategoriesSectionProps {
  language: string;
}

export const CategoriesSection = ({ language }: CategoriesSectionProps) => {
  const t = useTranslations(language);
  const { appCategoriesStats } = useAppConfig();
  const navigate = useNavigate();

  // Mapeo extendido de iconos para mayor flexibilidad
  const iconMap: Record<string, any> = {
    'Map': Compass,
    'Hotel': Hotel,
    'Utensils': Utensils,
    'Agencies': Palmtree,
    'Events': Ticket,
    'Default': Compass
  };

  const handleCategoryClick = (categoryId: number) => {
    // Lógica para navegar según la categoría seleccionada
    const routes: Record<number, string> = {
      1: "/hotels",
      2: "/restaurants",
      3: "/agencies",
      4: "/points-of-interest"
    };
    navigate(routes[categoryId] || "/map");
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-0 left-10 w-72 h-72 bg-sabana/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Cabecera de Sección */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Badge className="bg-slate-900 text-white border-none font-black px-4 py-1 uppercase tracking-[0.2em] text-[9px]">
            <Sparkles className="w-3 h-3 mr-2 inline text-sabana" /> {t.sections.explore || "Explora"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            {t.sections.discover || "Encuentra lo mejor de nuestra tierra"}
          </h2>
          <div className="w-20 h-1.5 bg-sabana mx-auto rounded-full" />
        </div>

        {/* Grid de Categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appCategoriesStats?.map((category, index) => {
            const IconComponent = iconMap[category.icon] || iconMap.Default;

            return (
              <Card 
                key={index} 
                onClick={() => handleCategoryClick(category.id)}
                className="group relative overflow-hidden rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-sabana/20 transition-all duration-500 cursor-pointer bg-white"
              >
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  
                  {/* Icono animado con gradiente */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-sabana/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-0 group-hover:scale-110" />
                    <div className="relative w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:bg-sabana group-hover:rotate-[10deg]">
                      <IconComponent className="w-10 h-10 text-slate-900 group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Textos */}
                  <div className="space-y-2">
                    <h3 className="font-black text-slate-900 text-xl uppercase tracking-tighter group-hover:text-sabana transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                      {category.description || "Explora las mejores opciones de la región."}
                    </p>
                  </div>

                  {/* Badge de Conteo y Flecha */}
                  <div className="pt-2 flex items-center gap-3">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-bold text-[10px] py-1 px-3">
                      {category.count} {t.buttons.places || "Sitios"}
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                </CardContent>

                {/* Línea decorativa inferior */}
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-sabana group-hover:w-full transition-all duration-700" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};