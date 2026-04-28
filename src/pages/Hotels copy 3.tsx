import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Wifi, Eye, Car, Utensils, Dumbbell, Receipt, Percent } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// import { HotelDetail } from "@/components/HotelDetail"; // No se usa directamente aquí
import { useNavigate } from "react-router-dom";
import { useCachedData } from "@/hooks/useCachedData";
import { Business } from "@/interface/interface"; // Asegúrate de que esta interfaz esté actualizada
import { dataService } from "@/services/dataService";


// --- Tipado de datos (Ajustado para mayor claridad) ---
interface BusinessAccommodation extends Business {
  type_category_id: number;
  location?: string; // Asumiendo que se puede usar 'address' o una propiedad 'location' calculada.
  price: string; // La propiedad price ahora es un string, ejemplo: "Desde $ 150.000"
}

// --- Componente AccommodationCard (Refactorizado para usar BusinessAccommodation) ---

interface AccommodationCardProps {
  item: BusinessAccommodation;
}

const getAmenityIcon = (amenity: string) => {
  // Ajuste de lógica de íconos para ser más flexible
  const lowerAmenity = amenity.toLowerCase();
  if (lowerAmenity.includes("wifi")) return <Wifi className="w-4 h-4" />;
  if (lowerAmenity.includes("parqueadero") || lowerAmenity.includes("parking")) return <Car className="w-4 h-4" />;
  if (lowerAmenity.includes("restaurante") || lowerAmenity.includes("cocina")) return <Utensils className="w-4 h-4" />;
  if (lowerAmenity.includes("gimnasio") || lowerAmenity.includes("dumbbell")) return <Dumbbell className="w-4 h-4" />;
  return null;
};

const AccommodationCard = ({ item }: AccommodationCardProps) => {
  const navigate = useNavigate();
  // Usa 'address' como 'location' si no hay una propiedad 'location' dedicada.
  const displayLocation = item.address || item.short_description || "Meta, Colombia";
  const displayPrice = item.price ? item.price : "Consultar precio";
  const displayRating = item.rating ? parseFloat(item.rating).toFixed(1) : "N/A";

  /* const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    }
  };
  const handleViewDetails = (business: Business) => {
    console.log(business)
    navigate(`/hotel/${business.id}`, { state: { business } });
  };
  */
  const handleViewDetails = (business: Business) => {
    // Enviamos el objeto business dentro del estado de la ruta
    navigate(`/hotel/${business.id}`, { state: { hotel: business } });
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={`/images/businnesses/${item.image}`} // Asumiendo que 'image' es una URL accesible
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => (e.currentTarget.src = 'placeholder.svg')} // Fallback en caso de error de imagen
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="ml-1 text-sm font-medium">{displayRating}</span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-foreground group-hover:text-sabana transition-colors">
          {item.name}
        </CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {displayLocation}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">{item.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.amenities && item.amenities.slice(0, 4).map((amenity: string, index: number) => ( // Muestra un máximo de 4 amenities
            <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs">
              {getAmenityIcon(amenity)}
              <span className="truncate">{amenity}</span>
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-sabana">{displayPrice}{item.price && '/noche'}</span>
          {/* <Button size="sm" onClick={() => navigate(`/hotel/${item.id}`)}>
            Ver Detalles
          </Button> */}
          <Button 
          className="w-full bg-white-500 text-black-500 border border-black-500 hover:bg-sabana/50"
          onClick={() => handleViewDetails(item)}

        >
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalles
        </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Componente principal Hotels ---

const Hotels = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  // El hook useCachedData ya está trayendo los negocios. Asumo que son tipo BusinessAccommodation[]
  const { data: featuredBusinesses, isLoading } = useCachedData<BusinessAccommodation[]>({
    cacheKey: 'featured-businesses',
    fetchFn: dataService.getBusinesses
  });

  // console.log(featuredBusinesses);

  // Función para agrupar los negocios por type_category_id
  const groupedAccommodations = useMemo(() => {
    if (!featuredBusinesses || featuredBusinesses.length === 0) {
      return { 1: [], 2: [], 3: [], 4: [], 5: [] }; // Inicializar con arrays vacíos
    }

    const accommodationsMap: Record<number, BusinessAccommodation[]> = {
      1: [], // Hoteles
      2: [], // Glamping
      3: [], // Cabañas
      4: [], // Fincas
      5: [], // Hostales
    };

    // Filtra solo los alojamientos (category_id === 1) y los agrupa
    featuredBusinesses
      .filter(business => business.category_id === 1)
      .forEach(business => {
        const typeId = business.type_category_id || 1; // Default a Hotel (1) si no tiene type_category_id
        if (accommodationsMap[typeId]) {
          accommodationsMap[typeId].push(business);
        } else {
          // Si el ID de categoría no está predefinido, lo agregamos como una nueva categoría (aunque por ahora solo manejamos 1-4)
          accommodationsMap[typeId] = [business];
        }
      });

    return accommodationsMap;
  }, [featuredBusinesses]);

  // Manejo de scroll al montar el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando alojamientos...
      </div>
    );
  }

  // --- Mapeo de type_category_id a nombres de pestaña ---
  const tabCategories = [
    { id: 1, value: "hoteles", label: "Hoteles" },
    { id: 2, value: "glamping", label: "Glamping" },
    { id: 3, value: "cabanas", label: "Cabañas" },
    { id: 4, value: "fincas", label: "Fincas" },
    { id: 5, value: "hostales", label: "Hostales" },

  ];

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
              Encuentra el lugar perfecto para tu estadía en los llanos orientales.
            </p>
          </div>

          <Tabs defaultValue="hoteles" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-primary/30">
              {tabCategories.map(tab => (
                <TabsTrigger key={tab.id} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabCategories.map(tab => {
              const items = groupedAccommodations[tab.id] || [];
              const itemsCount = items.length;

              return (
                <TabsContent key={tab.id} value={tab.value} className="mt-8">
                  {itemsCount > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {items.map((item) => (
                        <AccommodationCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      No hay alojamientos de tipo **{tab.label}** disponibles por el momento.
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hotels;