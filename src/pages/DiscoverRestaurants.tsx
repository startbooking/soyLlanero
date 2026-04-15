
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RestaurantCard } from "@/components/common/RestaurantCard";

const DiscoverRestaurants = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  const restaurants = [
    {
      id: "7",
      name: "Restaurante El Llano",
      location: "Av. 40, Villavicencio",
      description: "Auténtica gastronomía llanera en un ambiente tradicional",
      rating: 4.6,
      price: "$$ - Precio medio",
      taxes: 6650,
      taxPercentage: 19,
      specialties: ["Mamona", "Casabe", "Chicha"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      category: "Llanera"
    },
    {
      id: "8",
      name: "Asadero Los Capachos",
      location: "Centro, Villavicencio",
      description: "El mejor asado de la región con recetas tradicionales",
      rating: 4.7,
      price: "$$ - Precio medio",
      taxes: 5700,
      taxPercentage: 19,
      specialties: ["Churrasco", "Costillas", "Chorizo"],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      category: "Asadero"
    },
    {
      id: "9",
      name: "Marisquería El Puerto",
      location: "Zona Rosa, Villavicencio",
      description: "Pescados y mariscos frescos en preparaciones exquisitas",
      rating: 4.5,
      price: "$$$ - Precio alto",
      taxes: 9500,
      taxPercentage: 19,
      specialties: ["Mojarra", "Bagre", "Camarones"],
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      category: "Mariscos"
    },
    {
      id: "10",
      name: "Restaurante Vegetariano Verde",
      location: "Barrio Barzal",
      description: "Opciones saludables y deliciosas para todos los gustos",
      rating: 4.4,
      price: "$$ - Precio medio",
      taxes: 4750,
      taxPercentage: 19,
      specialties: ["Ensaladas", "Bowls", "Jugos naturales"],
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      category: "Vegetariano"
    },
    {
      id: "11",
      name: "Pizzería Italiana Nonna",
      location: "Centro Comercial Llanocentro",
      description: "Auténticas pizzas italianas con ingredientes importados",
      rating: 4.3,
      price: "$$ - Precio medio",
      taxes: 4275,
      taxPercentage: 19,
      specialties: ["Pizza Margherita", "Lasagna", "Tiramisú"],
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      category: "Italiana"
    },
    {
      id: "12",
      name: "Café Cultural El Encuentro",
      location: "Barrio La Grama",
      description: "Café de especialidad con ambiente cultural y artístico",
      rating: 4.8,
      price: "$ - Precio bajo",
      taxes: 2375,
      taxPercentage: 19,
      specialties: ["Café de origen", "Postres artesanales", "Té especial"],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
      category: "Café"
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
              Restaurantes en Villavicencio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre los sabores únicos de los llanos orientales y deléitate con la mejor gastronomía
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                location={restaurant.location}
                description={restaurant.description}
                rating={restaurant.rating}
                price={restaurant.price}
                taxes={restaurant.taxes}
                taxPercentage={restaurant.taxPercentage}
                specialties={restaurant.specialties}
                image={restaurant.image}
                category={restaurant.category}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiscoverRestaurants;
