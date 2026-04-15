import { useEffect, useState } from "react";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { Experience } from "@/interface/interface";
import { Camera } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdventureCard } from "@/components/common/AdventureCard";
import { useNavigate } from "react-router-dom"; // Importamos el hook de navegación

const Experiences = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate(); // Inicializamos la navegación

  const { data: featuredExperiences, isLoading } = useCachedData<Experience[]>({
    cacheKey: 'featured-experiences',
    fetchFn: dataService.getExperiences
  });

  const experienceToShow = featuredExperiences && featuredExperiences.length > 0 ? featuredExperiences : [];

  // Se mantiene la función de Waze, aunque no se usa en el renderizado actual
  const openWaze = (location: string) => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/experiences/${id}`);
  };

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
              <div 
                  key={experience.id} 
                  onClick={() => handleCardClick(experience.id)} // Manejador de click
                  className="cursor-pointer transition-shadow duration-300 hover:shadow-xl rounded-lg"
              >
                <AdventureCard 
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
        </div>
      </main>
      
      <Footer />
      {/* El modal de ExperienceDetail ha sido eliminado de aquí */}
    </div>
  );
};

export default Experiences;