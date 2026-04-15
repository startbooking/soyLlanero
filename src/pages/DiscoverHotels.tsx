import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HotelCard } from "@/components/common/HotelCard";

const DiscoverHotels = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  const hotels = [
    {
      id: "1",
      name: "Hotel Plaza Mayor",
      location: "Centro, Villavicencio",
      description: "Hotel boutique en el corazón de la ciudad con todas las comodidades modernas",
      rating: 4.8,
      price: "Desde $150.000/noche",
      taxes: 28500,
      taxPercentage: 19,
      amenities: ["Wifi", "Parking", "Restaurante", "Piscina", "Aire Acondicionado"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      category: "Boutique"
    },
    {
      id: "2",
      name: "GHL Hotel Villavicencio",
      location: "Zona Rosa, Villavicencio",
      description: "Hotel moderno con excelente ubicación y servicios de primera clase",
      rating: 4.6,
      price: "Desde $200.000/noche",
      taxes: 38000,
      taxPercentage: 19,
      amenities: ["Wifi", "Parking", "Restaurante", "Gimnasio", "Business Center"],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      category: "Ejecutivo"
    },
    {
      id: "3",
      name: "Hacienda El Origen",
      location: "Vía Puerto López",
      description: "Resort campestre que ofrece una experiencia auténtica llanera",
      rating: 4.9,
      price: "Desde $300.000/noche",
      taxes: 57000,
      taxPercentage: 19,
      amenities: ["Wifi", "Restaurante", "Piscina", "Actividades Ecuestres", "Spa"],
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      category: "Resort"
    },
    {
      id: "4",
      name: "Hotel Don Lolo",
      location: "Centro, Villavicencio",
      description: "Hotel tradicional con el mejor servicio personalizado",
      rating: 4.4,
      price: "Desde $120.000/noche",
      taxes: 22800,
      taxPercentage: 19,
      amenities: ["Wifi", "Restaurante", "Aire Acondicionado", "Servicio 24h"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      category: "Tradicional"
    },
    {
      id: "5",
      name: "Hotel Campestre Apiay",
      location: "Corregimiento Apiay",
      description: "Escape natural con vistas panorámicas y tranquilidad absoluta",
      rating: 4.7,
      price: "Desde $180.000/noche",
      taxes: 34200,
      taxPercentage: 19,
      amenities: ["Wifi", "Restaurante", "Piscina", "Zona BBQ", "Senderos"],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      category: "Campestre"
    },
    {
      id: "6",
      name: "Hotel Boutique Casa Colonial",
      location: "Barrio La Grama",
      description: "Encantador hotel en una casona colonial restaurada",
      rating: 4.5,
      price: "Desde $160.000/noche",
      taxes: 30400,
      taxPercentage: 19,
      amenities: ["Wifi", "Parking", "Jardines", "Biblioteca", "Terraza"],
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      category: "Colonial"
    }
  ];

  return (
    <div className="min-h-screen bg-accent/30">
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
              Hoteles en Villavicencio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentra el alojamiento perfecto para tu estadía en la puerta de entrada a los llanos orientales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                location={hotel.location}
                description={hotel.description}
                rating={hotel.rating}
                price={hotel.price}
                taxes={hotel.taxes}
                taxPercentage={hotel.taxPercentage}
                amenities={hotel.amenities}
                image={hotel.image}
                category={hotel.category}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiscoverHotels;
