import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Eye, Utensils, Clock, Phone, Map } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCachedData } from "@/hooks/useCachedData";
import { Business } from "@/interface/interface";
import { dataService } from "@/services/dataService";
import { RestaurantMenuModal } from "@/components/restaurant/RestaurantMenuModal";
import { useBusinessActions } from "@/hooks/useBusinessActions";

// --- Sub-componente: RestaurantCard ---
const RestaurantCard = ({ item }: { item: Business }) => {
  const navigate = useNavigate();
  // Validación de datos
  const displayLocation = item.address || item.city || "Meta, Colombia";
  const displayRating = item.rating ? parseFloat(item.rating).toFixed(1) : "N/A";
  const { handleNavigation, handleContact,  } = useBusinessActions();

  // const displayLocation = item.address || item.city || "Meta, Colombia";

  // Función para abrir Waze
  /* const handleWazeClick = () => {
    // Si tienes coordenadas lat/lng en tu tabla business, úsalas. 
    // De lo contrario, usamos la dirección.
    const query = encodeURIComponent(`${item.name} ${displayLocation}`);
    window.open(`https://waze.com/ul?q=${query}&navigate=yes`, "_blank");
  }; */

// handleNavigation

  /* const handleNavigation = (business: Business) => {
    const dest = business.latitude && business.longitude
      ? `${business.latitude},${business.longitude}`
      : encodeURIComponent(`${business.name} Villavicencio`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank');
  }; */


  const handleViewDetails = () => {
    // Redirigir a detalle de negocio o restaurante según tu ruta
    navigate(`/business/${item.id}`, { state: { business: item } });
  };

  const mockSpecialties = ["Mamona a la Llanera", "Cachama Ahumada", "Carne a la Perra"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);



  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-none shadow-sm overflow-hidden rounded-2xl bg-white">
      <div className="relative h-56 overflow-hidden">
        <img
          src={`/images/businnesses/${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = '/placeholder-restaurant.jpg')}
        />
        {/* Badge de Categoría Gastronómica */}
        <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur text-sabana border-none font-bold shadow-sm">
          <Utensils className="w-3 h-3 mr-1" />
          Restaurante
        </Badge>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center bg-sabana text-white rounded-full px-3 py-1 shadow-lg">
          <Star className="w-3 h-3 fill-current mr-1" />
          <span className="text-xs font-black">{displayRating}</span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-sabana transition-colors">
            {item.name}
          </CardTitle>
        </div>
        <div className="flex items-center text-slate-400 text-sm font-medium mt-1">
          <MapPin className="w-4 h-4 mr-1 text-sabana" />
          {displayLocation}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {item.description || "Descubre los sabores auténticos del Llano en este establecimiento seleccionado."}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Especialidad</span>
            <span className="text-sm font-bold text-slate-700">Cocina Regional</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">

          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-50 w-full">

            {/* BOTÓN WAZE */}
            <Button
              variant="outline"
              onClick={handleNavigation}
              className="border-slate-200 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-bold rounded-sm transition-all flex items-center justify-center gap-2"
            >
              <Map className="w-4 h-4" />
              Waze
            </Button>
            <RestaurantMenuModal
              restaurantName={item.name}
              description={item.description}
              specialties={mockSpecialties} // Aquí pasarías la data real de la tabla si existe
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Componente Principal ---
const Restaurants = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const { data: allBusinesses, isLoading } = useCachedData<Business[]>({
    cacheKey: 'all-businesses',
    fetchFn: dataService.getBusinesses
  });

  // Filtrado estricto por category_id = 2
  const restaurantList = useMemo(() => {
    return allBusinesses?.filter(b => b.category_id === 2) || [];
  }, [allBusinesses]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sabana"></div>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest animate-pulse">Cocinando las mejores opciones...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="restaurants" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-sabana text-sabana font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
              Gastronomía Llanera
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              Donde comer en el <span className="text-sabana">Meta</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Desde la tradicional carne a la perra hasta propuestas internacionales.
              Descubre los mejores restaurantes de Villavicencio y sus alrededores.
            </p>
          </header>

          {restaurantList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {restaurantList.map((item) => (
                <RestaurantCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 max-w-4xl mx-auto">
              <Utensils className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-xl">
                Estamos actualizando nuestra guía gastronómica.
              </p>
              <p className="text-slate-300 text-sm mt-2">Vuelve pronto para descubrir nuevos sabores.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Restaurants;