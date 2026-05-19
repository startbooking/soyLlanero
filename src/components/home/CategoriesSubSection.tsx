
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/utils/translations";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useNavigate } from "react-router-dom";
import { 
  Hotel, 
  Utensils, 
  Compass, 
  Palmtree, 
  Ticket, 
  ChevronRight,
  Plus, Home, Map, 
  Sparkles
} from "lucide-react";
interface CategoriesSectionProps {
  language: string;
}




export const CategoriesSubSection = ({ language }: CategoriesSectionProps) => {
  const t = useTranslations(language);
  const { appCategoriesStats } = useAppConfig();
  const categories = appCategoriesStats || [];
  const navigate = useNavigate();

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
      3: "/agencies-operators",
      4: "/points-of-interest"
    };
    navigate(routes[categoryId] || "/map");
  };

  return (
    <section className="relative py-10">
      <div className="absolute inset-0 bg-primary/5 via-background to-accent/50" />
      <div className="container mx-auto px-4">

        {/* <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          {t.sections.discover}
        </h2> */}
        {/* Grid de Categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appCategoriesStats?.map((category, index) => {
            const IconComponent = iconMap [category.icon] || iconMap.Default;

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
