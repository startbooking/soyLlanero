
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hotel, UtensilsCrossed, Mountain, Palette } from "lucide-react";

const DiscoverVillavicencio = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  const categories = [
    {
      id: "hotels",
      title: "Hoteles",
      description: "Descubre los mejores alojamientos de la ciudad, desde hoteles boutique hasta resorts campestres",
      icon: Hotel,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      count: "25+ hoteles",
      route: "/discover/hotels"
    },
    {
      id: "restaurants",
      title: "Restaurantes",
      description: "Saborea la auténtica gastronomía llanera y platos internacionales en los mejores restaurantes",
      icon: UtensilsCrossed,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      count: "50+ restaurantes",
      route: "/discover/restaurants"
    },
    {
      id: "adventure",
      title: "Aventura",
      description: "Vive experiencias únicas de turismo de aventura en los paisajes más espectaculares",
      icon: Mountain,
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
      count: "15+ experiencias",
      route: "/discover/adventure"
    },
    {
      id: "culture",
      title: "Cultura",
      description: "Sumérgete en la rica cultura llanera a través de museos, centros culturales y tradiciones",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b",
      count: "20+ sitios culturales",
      route: "/discover/culture"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="discover" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-primary to-primary/80 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">
                Descubre Villavicencio
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Explora la puerta de entrada a los llanos orientales y descubre todo lo que nuestra región tiene para ofrecerte
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/90 rounded-full p-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                      {category.count}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {category.description}
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => navigate(category.route)}
                    >
                      Explorar {category.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiscoverVillavicencio;
