// src/pages/ExperienceDetailPage.tsx (o ExperienceDetail.tsx, si lo usas como página)

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Badge, Calendar, Clock, MapPin, Navigation, Users } from "lucide-react";
import { dataService } from "@/services/dataService";
import { useCachedData } from "@/hooks/useCachedData";
import { Experience } from "@/interface/interface";

// Eliminamos ExperienceDetailModalProps y las props 'experience' y 'onClose'
// ya que este componente ahora es una página que carga sus propios datos.
export const ExperienceDetailPage = () => {
  // Los estados 'currentLanguage' y 'navigate' se mantienen.
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  
  // 1. OBTENER ID DE LA URL
  const { id: experienceIdFromUrl } = useParams<{ id: string }>();

  // 2. CARGAR TODOS LOS DATOS Y BUSCAR LA EXPERIENCIA
  const { data: allExperiences, isLoading } = useCachedData<Experience[]>({
    cacheKey: 'featured-experiences',
    fetchFn: dataService.getExperiences
  });

  // 3. BUSCAR LA EXPERIENCIA ESPECÍFICA
  // Usamos el ID obtenido de la URL para encontrar el objeto.
  // Es importante asegurar que el ID de la URL (string) coincida con el tipo del ID del objeto.
  const experience = allExperiences?.find(exp => exp.id === experienceIdFromUrl);

  // Desplazamiento al inicio al cargar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [experienceIdFromUrl]); 

  // Handlers
  const handleReservation = () => {
    alert("Funcionalidad de reserva próximamente disponible");
  };

  const handleNavigation = () => {
    const location = experience?.location || "Ubicación Desconocida";
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
  };

  // --- Manejo de Estados de Carga y Error ---
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 text-center">
        <p className="text-lg text-foreground">Cargando detalles de la experiencia...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <Header activeSection="experiences" onSectionChange={() => { }} language={currentLanguage} />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Experiencia no encontrada</h1>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Experiencias
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // --- Renderizado del Detalle ---
  
  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="experiences" onSectionChange={() => { }} language={currentLanguage} />

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

          <div className="rounded-lg bg-white shadow-xl max-w-4xl w-full mx-auto">
            <div className="relative">
              {/* Sección de Imagen y Título */}
              <div className="relative overflow-hidden rounded-t-lg h-96">
                {/* Aseguramos que la ruta de la imagen sea la correcta */}
                <img
                  src={`/images/experiences/${experience.image}`}
                  alt={experience.name} // Usamos 'name' si 'title' no existe en Experience
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-4xl font-extrabold mb-2">{experience.name || experience.title}</h1>
                  <div className="flex items-center text-lg">
                    <MapPin className="w-5 h-5 mr-2" />
                    {experience.location}
                  </div>
                </div>
                
                <Badge className="absolute top-4 left-4 bg-green-500 text-white text-base">
                  {experience.category}
                </Badge>
              </div>

              {/* Contenido Principal */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-8">
                  
                  {/* Columna de Contenido y Requisitos (2/3) */}
                  <div className="space-y-8 md:col-span-2">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-green-700">Descripción</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                        {experience.description}
                      </p>
                    </div>

                    {/* Nota: Asumo que 'includes' y 'requirements' existen en tu interfaz Experience */}
                    {(experience.includes && experience.includes.length > 0) && (
                      <div>
                        <h3 className="text-xl font-bold mb-3">Incluye</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          {experience.includes.map((item, index) => (
                            <li key={index} className="text-muted-foreground">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(experience.requirements && experience.requirements.length > 0) && (
                      <div>
                        <h3 className="text-xl font-bold mb-3">Requisitos</h3>
                        <ul className="space-y-2 list-disc list-inside">
                          {experience.requirements.map((requirement, index) => (
                            <li key={index} className="text-muted-foreground">
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Columna de Información, Precio y Botones (1/3) */}
                  <div className="space-y-6 md:col-span-1">
                    <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                      <h3 className="text-xl font-bold mb-4 text-green-700">Información Clave</h3>
                      <div className="space-y-4">
                        <InfoItem icon={Calendar} label="Fecha" value={experience.date} />
                        <InfoItem icon={Clock} label="Duración" value={experience.duration || experience.time} />
                        <InfoItem icon={Users} label="Máx. Personas" value={`${experience.max_people || experience.capacity} personas`} />
                        <InfoItem icon={Users} label="Organizador" value={experience.organizer || "No Especificado"} />
                      </div>
                    </div>

                    <div className="bg-primary-foreground rounded-lg p-6 shadow-md">
                        <div className="flex justify-between items-baseline mb-4">
                            <span className="text-xl font-semibold text-gray-700">Precio</span>
                            <span className="text-3xl font-extrabold text-green-600">
                                {experience.is_free || experience.price === 0 ? "Gratis" : experience.price}
                            </span>
                        </div>
                        
                        <Button
                          onClick={handleReservation}
                          className="w-full text-lg py-6 bg-green-600 hover:bg-green-700 mb-3"
                          size="lg"
                        >
                          Reservar
                        </Button>

                        <Button
                          variant="outline"
                          onClick={handleNavigation}
                          className="w-full border-green-600 text-green-600 hover:bg-green-50"
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
      </main>
      
      {/* Footer ya no se incluye en el código original, pero es bueno dejarlo */}
      {/* <Footer /> */}
    </div>
  );
};

export default ExperienceDetailPage;

// Componente auxiliar para la información
const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start text-muted-foreground">
        <Icon className="w-5 h-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
            <p className="font-medium text-foreground">{label}</p>
            <p className="text-sm">{value}</p>
        </div>
    </div>
);