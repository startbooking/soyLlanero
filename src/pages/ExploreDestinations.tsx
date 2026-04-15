
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Camera } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";

const ExploreDestinations = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const destinations = [
    {
      id: 1,
      name: "Bioparque Los Ocarros",
      location: "Villavicencio",
      description: "Reserva natural con fauna típica de los llanos orientales",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      rating: 4.8,
      category: "Naturaleza",
      duration: "4-6 horas",
      price: "$25.000"
    },
    {
      id: 2,
      name: "Catama",
      location: "Villavicencio",
      description: "Centro de interpretación de la fauna llanera",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      rating: 4.6,
      category: "Educativo",
      duration: "3-4 horas",
      price: "$15.000"
    },
    {
      id: 3,
      name: "Puente de la Gaviota",
      location: "Villavicencio",
      description: "Mirador panorámico de la ciudad y los llanos",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      rating: 4.7,
      category: "Mirador",
      duration: "2-3 horas",
      price: "Gratis"
    },
    {
      id: 4,
      name: "Parque Los Fundadores",
      location: "Centro, Villavicencio",
      description: "Parque principal con eventos culturales y recreativos",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      rating: 4.5,
      category: "Cultural",
      duration: "1-2 horas",
      price: "Gratis"
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian


  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="destinations" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Explora Destinos Únicos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre los lugares más fascinantes de Villavicencio y los llanos orientales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {destination.category}
                  </Badge>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{destination.duration}</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                        {destination.name}
                      </CardTitle>
                      <div className="flex items-center mt-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {destination.location}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{destination.price}</span>
                    <Button size="sm" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Ver más
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExploreDestinations;
