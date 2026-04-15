
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, MapPin, Calendar, Heart } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const UniqueExperiences = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("experiences");

  const experiences = [
    {
      id: 1,
      title: "Safari en los Llanos Orientales",
      description: "Vive una aventura única observando la fauna y flora de los llanos colombianos en su hábitat natural.",
      image: "/placeholder.svg",
      duration: "8 horas",
      groupSize: "2-12 personas",
      price: "$180.000",
      rating: 4.9,
      reviews: 156,
      location: "Meta, Colombia",
      highlights: ["Avistamiento de aves", "Fauna silvestre", "Guía especializado", "Almuerzo típico"]
    },
    {
      id: 2,
      title: "Experiencia Cultural Llanera",
      description: "Sumérgete en la cultura llanera con música, danza, gastronomía y tradiciones ancestrales.",
      image: "/placeholder.svg",
      duration: "6 horas",
      groupSize: "4-20 personas",
      price: "$120.000",
      rating: 4.8,
      reviews: 89,
      location: "Villavicencio, Meta",
      highlights: ["Música llanera", "Danza tradicional", "Gastronomía típica", "Artesanías locales"]
    },
    {
      id: 3,
      title: "Aventura en Caño Cristales",
      description: "Descubre el río de los cinco colores en una expedición de múltiples días llena de naturaleza.",
      image: "/placeholder.svg",
      duration: "3 días",
      groupSize: "6-15 personas",
      price: "$450.000",
      rating: 5.0,
      reviews: 201,
      location: "La Macarena, Meta",
      highlights: ["Río multicolor", "Camping", "Senderismo", "Fotografía natural"]
    },
    {
      id: 4,
      title: "Tour Gastronómico Llanero",
      description: "Un recorrido culinario por los sabores más auténticos de la región de los llanos.",
      image: "/placeholder.svg",
      duration: "4 horas",
      groupSize: "2-8 personas",
      price: "$85.000",
      rating: 4.7,
      reviews: 67,
      location: "Villavicencio, Meta",
      highlights: ["Mamona llanera", "Cachama", "Arepa de huevo", "Chicha de maíz"]
    },
    {
      id: 5,
      title: "Pesca Deportiva en el Meta",
      description: "Disfruta de una jornada de pesca deportiva en las aguas del río Meta con guías expertos.",
      image: "/placeholder.svg",
      duration: "10 horas",
      groupSize: "2-6 personas",
      price: "$200.000",
      rating: 4.6,
      reviews: 43,
      location: "Puerto López, Meta",
      highlights: ["Pesca de pavón", "Equipo incluido", "Guía especializado", "Almuerzo"]
    },
    {
      id: 6,
      title: "Observación de Estrellas Llaneras",
      description: "Una experiencia nocturna única para observar las constelaciones en los cielos despejados de los llanos.",
      image: "/placeholder.svg",
      duration: "5 horas",
      groupSize: "4-15 personas",
      price: "$65.000",
      rating: 4.9,
      reviews: 92,
      location: "Restrepo, Meta",
      highlights: ["Telescopios", "Guía astronómico", "Cena bajo estrellas", "Mitología llanera"]
    }
  ];

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} language={currentLanguage} />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-green-tenue py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Experiencias Únicas en Villavicencio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Descubre aventuras inolvidables y vive momentos únicos en la puerta de entrada a los Llanos Orientales
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Experiencias Premium
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Grupos Pequeños
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                Guías Locales
              </Badge>
            </div>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experiences.map((experience) => (
                <Card key={experience.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground">
                        <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                        {experience.rating}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute top-4 left-4 bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{experience.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {experience.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {experience.reviews} reseñas
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{experience.price}</p>
                        <p className="text-sm text-muted-foreground">por persona</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{experience.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                        {experience.groupSize}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="font-semibold mb-2">Lo que incluye:</p>
                      <div className="flex flex-wrap gap-2">
                        {experience.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 btn-primary">
                        Reservar Ahora
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-tenue py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Creamos experiencias personalizadas según tus intereses y preferencias. 
              Contáctanos para diseñar tu aventura perfecta.
            </p>
            <Button size="lg" className="btn-primary">
              <Calendar className="w-5 h-5 mr-2" />
              Crear Experiencia Personalizada
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UniqueExperiences;
