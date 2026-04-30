import { Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { AdventureCard } from "../common/AdventureCard";
import { Experience } from "@/interface/interface";
import { useMemo } from "react";
import { shuffleArray } from "@/utils/arrayUtils";
import { Button } from "@/components/ui/button";

interface ExperiencesSectionProps {
  language: string;
}

export const ExperiencesSection = ({ language }: ExperiencesSectionProps) => {
  const navigate = useNavigate();

  const { data: featuredExperiences, isLoading } = useCachedData<Experience[]>({
    cacheKey: 'featured-experiences',
    fetchFn: dataService.getExperiences
  });

  // Optimizamos la aleatoriedad en un solo paso memorizado
  const serviceToShowSlide = useMemo(() => {
    if (!featuredExperiences || featuredExperiences.length === 0) return [];
    // Mezclamos el array original (copiado) y tomamos 3 elementos
    return shuffleArray([...featuredExperiences]).slice(0, 3);
  }, [featuredExperiences]);

  const handleCardClick = (experience: Experience) => {
    // Enviamos el objeto completo en el state para evitar re-fetch
    navigate(`/experiences/${experience.id}`, { state: { experience } });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-sabana/5">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-sabana mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">Preparando aventuras...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-sabana/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Experiencias Únicas
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Vive aventuras inolvidables y descubre la auténtica cultura llanera con nuestras experiencias especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {serviceToShowSlide.map((experience) => (
            <AdventureCard 
              key={experience.id}
              experience={experience} // Enviamos el registro completo
              onAction={() => handleCardClick(experience)}
            />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button 
            variant="outline" 
            className="border-slate-300 text-slate-700 hover:bg-sabana hover:text-slate-900 hover:border-sabana font-bold px-8 py-6 rounded-xl transition-all"
            onClick={() => navigate('/experiences')}
          >
            Ver Todas las Experiencias
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};