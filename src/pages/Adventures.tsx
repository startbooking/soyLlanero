
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Users, Mountain } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Adventures = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const adventures = [
    {
      id: 1,
      name: "Rafting en el Río Guatiquía",
      location: "Río Guatiquía, Villavicencio",
      description: "Emocionante descenso en rápidos clase II-III por el río más importante de la región.",
      rating: 4.8,
      duration: "4-5 horas",
      difficulty: "Intermedio",
      price: "$85.000",
      maxPeople: 12,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
    },
    {
      id: 2,
      name: "Canopy Bioparque Los Ocarros",
      location: "Bioparque Los Ocarros",
      description: "Vuela entre las copas de los árboles en una experiencia de canopy única.",
      rating: 4.7,
      duration: "2-3 horas",
      difficulty: "Principiante",
      price: "$45.000",
      maxPeople: 8,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
    },
    {
      id: 3,
      name: "Parapente Los Llanos",
      location: "Cerro de la Cruz",
      description: "Vuela sobre los llanos orientales en una experiencia de parapente inolvidable.",
      rating: 4.9,
      duration: "3-4 horas",
      difficulty: "Avanzado",
      price: "$120.000",
      maxPeople: 4,
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9"
    },
    {
      id: 4,
      name: "Escalada en Roca",
      location: "Formaciones rocosas del Meta",
      description: "Escalada en roca natural con vistas espectaculares de la sabana.",
      rating: 4.6,
      duration: "6-8 horas",
      difficulty: "Intermedio",
      price: "$95.000",
      maxPeople: 6,
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851"
    },
    {
      id: 5,
      name: "Ciclomontañismo Extremo",
      location: "Senderos del Piedemonte",
      description: "Recorridos en bicicleta de montaña por senderos desafiantes.",
      rating: 4.5,
      duration: "5-6 horas",
      difficulty: "Avanzado",
      price: "$65.000",
      maxPeople: 10,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13"
    },
    {
      id: 6,
      name: "Kayak en Caño Cristales",
      location: "Caño Cristales, La Macarena",
      description: "Navegación en kayak por el río más hermoso del mundo.",
      rating: 5.0,
      duration: "8-10 horas",
      difficulty: "Intermedio",
      price: "$150.000",
      maxPeople: 8,
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante": return "bg-green-500";
      case "Intermedio": return "bg-yellow-500";
      case "Avanzado": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const openWaze = (location: string) => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="adventures" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Mountain className="w-10 h-10 text-primary" />
              Aventura Extrema
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vive experiencias emocionantes en los llanos orientales con actividades de aventura y deporte extremo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <Card key={adventure.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={adventure.image} 
                    alt={adventure.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className={`absolute top-4 right-4 text-white ${getDifficultyColor(adventure.difficulty)}`}>
                    {adventure.difficulty}
                  </Badge>
                  <div className="absolute top-4 left-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{adventure.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {adventure.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {adventure.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {adventure.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      Máximo {adventure.maxPeople} personas
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{adventure.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">{adventure.price}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openWaze(adventure.location)}
                      className="flex items-center gap-1 hover:bg-green-50 border-green-500 text-green-700"
                    >
                      <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/waze_logo_icon_168210.png" alt="Waze" className="w-4 h-4" />
                      Ver Waze
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => console.log(`Ver detalles de ${adventure.name}`)}
                    >
                      Ver Detalles
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => console.log(`Reservar ${adventure.name}`)}
                    >
                      Reservar Aventura
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Adventures;
