
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Calendar, Users, Camera } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { Experience } from "@/interface/interface";
import { AdventureCard } from "@/components/common/AdventureCard";
import ExperienceDetail from "@/components/ExperienceDetail";


const Experiences = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  const { data: featuredExperiences, isLoading } = useCachedData<Experience[]>({
    cacheKey: 'featured-experiences',
    fetchFn: dataService.getExperiences
  });

  const experienceToShow = featuredExperiences && featuredExperiences.length > 0 ? featuredExperiences : [];

  const openWaze = (location: string) => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  return (
    <div className="min-h-screen bg-white">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="experiences" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Camera className="w-10 h-10 text-green-600" />
              Experiencias Únicas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vive aventuras inolvidables y descubre la auténtica cultura llanera con nuestras experiencias especializadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experienceToShow.map((experience) => (
              <AdventureCard 
                key = {experience.id}
                id = {experience.id}
                image = {experience.image}
                name = {experience.name}
                price= {experience.price}
                category = {experience.category}
                rating = {experience.rating}
                difficulty = {experience.difficulty}
                location = {experience.location}
                duration = {experience.duration}
                max_people = {experience.max_people}
                experience= {experience}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      {selectedExperience && (
        <ExperienceDetail
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </div>
  );
};

export default Experiences;
