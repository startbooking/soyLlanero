import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Wifi, Eye, Car, Utensils, Dumbbell } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCachedData } from "@/hooks/useCachedData";
import { Business } from "@/interface/interface";
import { dataService } from "@/services/dataService";

// --- Configuración y Constantes ---
const CATEGORIES = [
  { id: 1, value: "hoteles", label: "Hoteles" },
  { id: 2, value: "glamping", label: "Glamping" },
  { id: 3, value: "cabanas", label: "Cabañas" },
  { id: 4, value: "fincas", label: "Fincas" },
  { id: 5, value: "hostales", label: "Hostales" },
];

const AMENITY_ICONS: Record<string, any> = {
  wifi: Wifi,
  parqueadero: Car,
  parking: Car,
  restaurante: Utensils,
  cocina: Utensils,
  gimnasio: Dumbbell,
  gym: Dumbbell,
};

// --- Tipado ---
interface BusinessAccommodation extends Business {
  type_category_id: number;
  location?: string;
  price: string;
}

// --- Sub-componente: AccommodationCard ---
const AccommodationCard = ({ item }: { item: BusinessAccommodation }) => {
  const navigate = useNavigate();
  const displayLocation = item.address || item.short_description || "Meta, Colombia";
  const displayRating = item.rating ? parseFloat(item.rating).toFixed(1) : "N/A";

  const handleViewDetails = () => {
    navigate(`/hotel/${item.id}`, { state: { hotel: item } });
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-none shadow-md overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <img
          src={`/images/businnesses/${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = '/placeholder-hotel.jpg')}
        />
        <div className="absolute top-3 right-3 flex items-center bg-white/95 backdrop-blur shadow-sm rounded-sm px-2.5 py-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
          <span className="ml-1 text-xs font-bold">{displayRating}</span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-sabana transition-colors">
          {item.name}
        </CardTitle>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1 text-sabana" />
          <span className="truncate">{displayLocation}</span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.amenities?.slice(0, 3).map((amenity, idx) => {
            const lower = amenity.toLowerCase();
            const Icon = Object.entries(AMENITY_ICONS).find(([key]) => lower.includes(key))?.[1];
            return (
              <Badge key={idx} variant="primary" className="font-normal text-[10px] py-0 px-2">
                {Icon && <Icon className="w-3 h-3 mr-1" />}
                {amenity}
              </Badge>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Desde</span>
            <span className="text-lg font-extrabold text-sabana">
              {item.price || "Consultar"}
            </span>
          </div>
          <Button
            onClick={handleViewDetails}
            variant="outline"
            className="rounded-sm hover:bg-sabana/70 hover:text-white border-sabana text-white bg-sabana transition-all w-[50%]"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Componente Principal ---
const Hotels = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const { data: featuredBusinesses, isLoading } = useCachedData<BusinessAccommodation[]>({
    cacheKey: 'featured-businesses',
    fetchFn: dataService.getBusinesses
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Agrupación de datos optimizada
  const groupedData = useMemo(() => {
    const acc: Record<number, BusinessAccommodation[]> = {};
    CATEGORIES.forEach(cat => acc[cat.id] = []);

    featuredBusinesses?.filter(b => b.category_id === 1).forEach(business => {
      const typeId = business.type_category_id || 1;
      if (acc[typeId]) acc[typeId].push(business);
    });

    return acc;
  }, [featuredBusinesses]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
        <div className="animate-spin rounded-sm h-12 w-12 border-b-2 border-sabana"></div>
        <p className="text-muted-foreground animate-pulse">Buscando los mejores lugares para ti...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Alojamiento en el <span className="text-sabana">Meta</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora una selección exclusiva de hoteles, glampings y fincas en el corazón de los llanos.
            </p>
          </header>

          <Tabs defaultValue="hoteles" className="w-full">
            <TabsList className="flex flex-wrap justify-center h-auto bg-transparent gap-2 mb-8">
              {CATEGORIES.map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.value}
                  className="rounded-sm px-6 py-2 data-[state=active]:bg-sabana data-[state=active]:text-white border border-slate-200 shadow-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map(tab => (
              <TabsContent key={tab.id} value={tab.value} className="focus-visible:outline-none">
                {groupedData[tab.id]?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {groupedData[tab.id].map((item) => (
                      <AccommodationCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-medium text-lg">
                      No hay {tab.label.toLowerCase()} disponibles en este momento.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hotels;