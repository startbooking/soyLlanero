
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowLeft, Clock } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DiscoverCulture = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  const culturalSites = [
    {
      id: "19",
      name: "Casa de la Cultura Jorge Eliécer Gaitán",
      location: "Centro, Villavicencio",
      description: "Centro cultural que preserva y difunde las tradiciones llaneras",
      rating: 4.6,
      price: "Entrada gratuita",
      schedule: "Lunes a Viernes 8:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b",
      category: "Museo"
    },
    {
      id: "20",
      name: "Monumento a los Fundadores",
      location: "Parque Los Fundadores",
      description: "Emblemático monumento que honra a los fundadores de la ciudad",
      rating: 4.4,
      price: "Entrada gratuita",
      schedule: "24 horas",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      category: "Monumento"
    },
    {
      id: "21",
      name: "Teatro Marco Fidel Suárez",
      location: "Centro, Villavicencio",
      description: "Teatro histórico que presenta las mejores producciones culturales",
      rating: 4.7,
      price: "Varía según evento",
      schedule: "Consultar cartelera",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35",
      category: "Teatro"
    },
    {
      id: "22",
      name: "Biblioteca Germán Arciniegas",
      location: "Centro, Villavicencio",
      description: "Principal biblioteca pública con amplio acervo cultural",
      rating: 4.3,
      price: "Entrada gratuita",
      schedule: "Lunes a Sábado 8:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
      category: "Biblioteca"
    },
    {
      id: "23",
      name: "Galería de Arte Contemporáneo",
      location: "Zona Rosa, Villavicencio",
      description: "Espacio dedicado al arte contemporáneo regional y nacional",
      rating: 4.5,
      price: "Entrada gratuita",
      schedule: "Martes a Domingo 10:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      category: "Galería"
    },
    {
      id: "24",
      name: "Centro de Interpretación Llanera",
      location: "Catama",
      description: "Museo interactivo sobre la cultura y tradiciones llaneras",
      rating: 4.8,
      price: "$15.000 por persona",
      schedule: "Miércoles a Domingo 9:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      category: "Centro Cultural"
    }
  ];

  const handleViewMore = (siteId: string) => {
    navigate(`/sponsor/${siteId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="discover" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/discover")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Descubre Villavicencio
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Cultura en Villavicencio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sumérgete en la rica cultura llanera a través de museos, teatros y centros culturales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturalSites.map((site) => (
              <Card key={site.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={site.image} 
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {site.category}
                  </Badge>
                  <div className="absolute bottom-4 left-4 text-white flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Ver horarios</span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium text-sm">{site.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {site.name}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {site.location}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{site.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Horarios:</span>
                      <span className="text-sm text-muted-foreground">{site.schedule}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Entrada:</span>
                      <span className="text-sm font-bold text-primary">{site.price}</span>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleViewMore(site.id)} className="w-full">
                    Ver más
                  </Button>
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

export default DiscoverCulture;
