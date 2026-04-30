
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { AdventureCard } from "../common/AdventureCard";
import { Experience } from "@/interface/interface";
import { useMemo } from "react";
import { shuffleArray } from "@/utils/arrayUtils";

interface ExperiencesSectionProps {
  language: string;
}

export const ExperiencesSection = ({ language }: ExperiencesSectionProps) => {
  const navigate = useNavigate();

  const { data: featuredExperiences, isLoading } = useCachedData<Experience[]>({
    cacheKey: 'featured-experiences',
    fetchFn: dataService.getExperiences
  });

  const experienceToShow = featuredExperiences && featuredExperiences.length > 0 ? featuredExperiences : [];
  const shuffledItems = useMemo(() => shuffleArray(experienceToShow), [experienceToShow]);
  const serviceToShowSlide = shuffleArray(shuffledItems).slice(0, 3);
  
  
  // const serviceToShowSlide = experienceToShow.slice(0,3)

  if (isLoading) {
    return (
      <section className="py-16 bg-sabana/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Experiencias Únicas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vive aventuras inolvidables y descubre la auténtica cultura llanera con nuestras experiencias especializadas
            </p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  const handleCardClick = (id: string) => {
    navigate(`/experiences/${id}`);
  };

  return (
    <section className="py-16 bg-sabana/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Experiencias Únicas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vive aventuras inolvidables y descubre la auténtica cultura llanera con nuestras experiencias especializadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceToShowSlide?.map((experience) => (
            <div 
                  key={experience.id} 
                  onClick={() => handleCardClick(experience.id)} // Manejador de click
                  className="cursor-pointer transition-shadow duration-300 hover:shadow-xl rounded-lg"
              >
                <AdventureCard 
                  // ... todas las props de AdventureCard se pasan aquí
                  key = {experience.id}
                  id={experience.id}
                  image={experience.image}
                  name={experience.name}
                  price={experience.price}
                  category={experience.category}
                  rating={experience.rating}
                  difficulty={experience.difficulty}
                  location={experience.location}
                  duration={experience.duration}
                  max_people={experience.max_people}
                  experience={experience}
                />
              </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-black-500 text-black-600 hover:bg-primary/50"
            onClick={() => navigate('/experiences')}
          >
            Ver Todas las Experiencias
          </Button>
        </div>
      </div>
    </section>
  );
};
