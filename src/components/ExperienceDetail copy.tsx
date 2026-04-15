
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { HotelDetail } from "@/components/HotelDetail";
import { BusinessDetail } from "@/components/BusinessDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Badge, Calendar, Clock, MapPin, Navigation, Users } from "lucide-react";
import { dataService } from "@/services/dataService";
import { useCachedData } from "@/hooks/useCachedData";
import { Experience } from "@/interface/interface";


interface ExperienceDetailModalProps {
  experience: Experience;
  onClose: () => void;
}

export const ExperienceDetail = ({ experience, onClose }: ExperienceDetailModalProps) => {
  const { id } = useParams();
  console.log(experience)
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  // const [experience, setExperience] = useState<any>(null);

  /* const { data: featuredExperiences, isLoading } = useCachedData<Experience[]>({
    cacheKey: 'featured-experiences',
    fetchFn: dataService.getExperiences
  });

  const experienceToShow = featuredExperiences && featuredExperiences.length > 0 ? featuredExperiences : [];


  console.log(id)

  useEffect(() => {
    // const foundExperience = experienceToShow.find(s => s.id == id);
    const foundExperience = experienceToShow.find(experience => experience.id == id);

    
    setExperience(foundExperience);
  }, [id]); */

  console.log(experience)

  const handleReservation = () => {
    // Aquí iría la lógica de reserva
    alert("Funcionalidad de reserva próximamente disponible");
  };

  const handleNavigation = () => {
    // Aquí iría la lógica de reserva
    alert("Funcionalidad de reserva próximamente disponible");
  };


  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <Header activeSection="" onSectionChange={() => { }} language={currentLanguage} />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Experiencia no encontrado</h1>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="inset-0 flex items-center justify-center p-4">
            <div className="rounded-lg max-w-4xl w-full">
              <div className="relative">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={`/images/events/${experience.image}`}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {experience.location}
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {experience.category}
                  </Badge>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Detalles del Evento</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                          {experience.description}
                        </p>
                      </div>

                      {experience.includes && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Incluye</h3>
                          <ul className="space-y-2">
                            {experience.includes.map((item, index) => (
                              <li key={index} className="flex items-center text-muted-foreground">
                                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {experience.requirements && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Requisitos</h3>
                          <ul className="space-y-2">
                            {experience.requirements.map((requirement, index) => (
                              <li key={index} className="flex items-center text-muted-foreground">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                                {requirement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Información del Experiencia</h3>
                        <div className="space-y-4">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-5 h-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">Fecha</p>
                              <p>{experience.date}</p>
                            </div>
                          </div>

                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-5 h-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">Horario</p>
                              <p>{experience.time}</p>
                            </div>
                          </div>

                          <div className="flex items-center text-muted-foreground">
                            <Users className="w-5 h-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">Capacidad</p>
                              <p>{experience.capacity} personas</p>
                            </div>
                          </div>

                          {experience.organizer && (
                            <div className="flex items-center text-muted-foreground">
                              <Users className="w-5 h-5 mr-3 text-primary" />
                              <div>
                                <p className="font-medium text-foreground">Organizador</p>
                                <p>{experience.organizer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          onClick={handleReservation}
                          className="w-full text-lg py-6"
                          size="lg"
                        >
                          Reservar {!experience.is_free && `- ${experience.price}`}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={handleNavigation}
                          className="w-full"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Cómo llegar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* {sponsor.type === "hotel" ? (
            <HotelDetail hotel={sponsor} onClose={() => navigate(-1)} />
          ) : (
            <BusinessDetail business={sponsor} />
          )} */}
        </div>
      </main>
    </div>
  );
};

export default ExperienceDetail;
