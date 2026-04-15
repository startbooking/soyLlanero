import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Wifi, Car, Utensils, Dumbbell } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HotelDetail } from "@/components/HotelDetail";
import { useNavigate } from "react-router-dom";
import { useCachedData } from "@/hooks/useCachedData";
import { Business } from "@/interface/interface";
import { dataService } from "@/services/dataService";

const Hotels = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  const { data: featuredBusinesses, isLoading } = useCachedData<Business[]>({
    cacheKey: 'featured-businesses',
    fetchFn: dataService.getBusinesses
  });



  const businessesToShow = featuredBusinesses && featuredBusinesses.length > 0 ? featuredBusinesses : [];
  
  const allHotels = businessesToShow.filter(
    (business) => business.category_id === 1
  );

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wifi": return <Wifi className="w-4 h-4" />;
      case "Parking": return <Car className="w-4 h-4" />;
      case "Restaurante": return <Utensils className="w-4 h-4" />;
      case "Gimnasio": return <Dumbbell className="w-4 h-4" />;
      default: return null;
    }
  };

  const AccommodationCard = ({ item }: { item: any }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="ml-1 text-sm font-medium">{item.rating}</span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-foreground group-hover:text-primary transition-colors">
          {item.name}
        </CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {item.location}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.amenities.map((amenity: string, index: number) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{item.price}/noche</span>
          <Button size="sm" onClick={() => navigate(`/hotel/${item.id}`)}>
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Alojamiento en Villavicencio y el Meta
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentra el lugar perfecto para tu estadía en los llanos orientales
            </p>
          </div>

          <Tabs defaultValue="hoteles" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-primary/30">
              <TabsTrigger value="hoteles">Hoteles</TabsTrigger>
              <TabsTrigger value="glamping">Glamping</TabsTrigger>
              <TabsTrigger value="cabanas">Cabañas</TabsTrigger>
              <TabsTrigger value="fincas">Fincas</TabsTrigger>
            </TabsList>

            <TabsContent value="hoteles" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accommodations.hoteles.map((hotel) => (
                  <AccommodationCard key={hotel.id} item={hotel} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="glamping" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accommodations.glamping.map((glamping) => (
                  <AccommodationCard key={glamping.id} item={glamping} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cabanas" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accommodations.cabanas.map((cabana) => (
                  <AccommodationCard key={cabana.id} item={cabana} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fincas" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accommodations.fincas.map((finca) => (
                  <AccommodationCard key={finca.id} item={finca} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hotels;
