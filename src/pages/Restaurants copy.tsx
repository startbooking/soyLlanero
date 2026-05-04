
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Phone, Utensils } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";

const Restaurants = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const restaurants = [
    {
      id: 1,
      name: "Restaurante Los Llanos",
      location: "Calle 37, Villavicencio",
      description: "Auténtica cocina llanera con los mejores cortes de carne y platos típicos.",
      rating: 4.6,
      priceRange: "$$",
      cuisine: "Llanera",
      hours: "11:00 AM - 10:00 PM",
      phone: "+57 8 123 4567",
      specialties: ["Mamona", "Cachama", "Hayaca"],
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    {
      id: 2,
      name: "El Hato Restaurant",
      location: "Centro Comercial Unicentro",
      description: "Especialidad en carnes a la brasa y comida internacional.",
      rating: 4.4,
      priceRange: "$$$",
      cuisine: "Internacional",
      hours: "12:00 PM - 11:00 PM",
      phone: "+57 8 234 5678",
      specialties: ["Parrillada", "Pescados", "Pasta"],
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    },
    {
      id: 3,
      name: "La Casa del Joropo",
      location: "Barrio La Grama",
      description: "Ambiente típico llanero con música en vivo y platos tradicionales.",
      rating: 4.8,
      priceRange: "$$",
      cuisine: "Tradicional",
      hours: "6:00 PM - 2:00 AM",
      phone: "+57 8 345 6789",
      specialties: ["Lomo al trapo", "Guarapo", "Chicharrón"],
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    },
    {
      id: 4,
      name: "Café del Llano",
      location: "Plaza Los Libertadores",
      description: "Cafetería artesanal con café de la región y postres caseros.",
      rating: 4.5,
      priceRange: "$",
      cuisine: "Café",
      hours: "6:00 AM - 6:00 PM",
      phone: "+57 8 456 7890",
      specialties: ["Café Especial", "Postres", "Desayunos"],
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    },
    {
      id: 5,
      name: "Mariscos del Río",
      location: "Malecón del Río Guatiquía",
      description: "Especialidad en pescados y mariscos frescos del río.",
      rating: 4.3,
      priceRange: "$$",
      cuisine: "Mariscos",
      hours: "11:00 AM - 9:00 PM",
      phone: "+57 8 567 8901",
      specialties: ["Mojarra frita", "Bagre", "Cazuela de mariscos"],
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
    }
  ];

  const getPriceRangeText = (range: string) => {
    switch (range) {
      case "$": return "Económico";
      case "$$": return "Moderado";
      case "$$$": return "Costoso";
      default: return range;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Restaurantes en Villavicencio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre los sabores auténticos de la gastronomía llanera
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {restaurant.cuisine}
                  </Badge>
                  <div className="absolute top-4 left-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {restaurant.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {restaurant.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {restaurant.hours}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-4 h-4 mr-1" />
                      {restaurant.phone}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{restaurant.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {getPriceRangeText(restaurant.priceRange)}
                      </span>
                    </div>
                    <Button size="sm">Ver menú</Button>
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

export default Restaurants;
