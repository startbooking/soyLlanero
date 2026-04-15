
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdventureCard } from "@/components/common/AdventureCard";

const DiscoverAdventure = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  const adventures = [
    {
      id: "13",
      name: "Safari Bioparque Los Ocarros",
      location: "Bioparque Los Ocarros",
      description: "Aventura de avistamiento de fauna llanera en su hábitat natural",
      rating: 4.8,
      price: "$45.000 por persona",
      taxes: 8550,
      taxPercentage: 19,
      duration: "4-6 horas",
      difficulty: "Fácil",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      category: "Ecoturismo"
    },
    {
      id: "14",
      name: "Cabalgata Llanera",
      location: "Hacienda El Paraíso",
      description: "Recorrido a caballo por los paisajes más hermosos de los llanos",
      rating: 4.7,
      price: "$80.000 por persona",
      taxes: 15200,
      taxPercentage: 19,
      duration: "8 horas",
      difficulty: "Intermedio",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
      category: "Ecuestre"
    },
    {
      id: "15",
      name: "Rafting en el Río Guatiquia",
      location: "Río Guatiquia",
      description: "Emocionante descenso en balsa por rápidos de categoría II-III",
      rating: 4.9,
      price: "$65.000 por persona",
      taxes: 12350,
      taxPercentage: 19,
      duration: "5 horas",
      difficulty: "Intermedio",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      category: "Acuático"
    },
    {
      id: "16",
      name: "Canopy en Los Capachos",
      location: "Reserva Los Capachos",
      description: "Vuelo en tirolina sobre el bosque tropical con vistas espectaculares",
      rating: 4.6,
      price: "$55.000 por persona",
      taxes: 10450,
      taxPercentage: 19,
      duration: "3 horas",
      difficulty: "Fácil",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      category: "Aéreo"
    },
    {
      id: "17",
      name: "Senderismo Cerro Cristo Rey",
      location: "Cerro Cristo Rey",
      description: "Caminata hasta la cima con vista panorámica de Villavicencio",
      rating: 4.5,
      price: "$25.000 por persona",
      taxes: 4750,
      taxPercentage: 19,
      duration: "4 horas",
      difficulty: "Intermedio",
      image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e",
      category: "Senderismo"
    },
    {
      id: "18",
      name: "Pesca Deportiva en el Meta",
      location: "Río Meta",
      description: "Experiencia de pesca deportiva en uno de los ríos más importantes",
      rating: 4.4,
      price: "$120.000 por persona",
      taxes: 22800,
      taxPercentage: 19,
      duration: "8 horas",
      difficulty: "Fácil",
      image: "https://images.unsplash.com/photo-1445112098124-3e76dd67983c",
      category: "Pesca"
    }
  ];

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
              Aventura en Villavicencio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vive experiencias únicas de turismo de aventura en los paisajes más espectaculares de los llanos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <AdventureCard
                key={adventure.id}
                id={adventure.id}
                name={adventure.name}
                location={adventure.location}
                description={adventure.description}
                rating={adventure.rating}
                price={adventure.price}
                taxes={adventure.taxes}
                taxPercentage={adventure.taxPercentage}
                duration={adventure.duration}
                difficulty={adventure.difficulty}
                image={adventure.image}
                category={adventure.category}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiscoverAdventure;
