import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, Clock, Star, Camera,
  ChevronRight, Sparkles, Map as MapIcon,
  Info
} from "lucide-react";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { PointsData } from "@/interface/interface";
import { PointDetailModal } from "@/components/PointDetailModal";
import { useBusinessActions } from "@/hooks/useBusinessActions"
const PointsOfInterest = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [selectedPoint, setSelectedPoint] = useState<PointsData | null>(null);
  const { handleNavigation, handleContact,  } = useBusinessActions();

  const { data: featuredPoints, isLoading } = useCachedData<PointsData[]>({
    cacheKey: 'featured-points',
    fetchFn: dataService.getPointsOfInterest
  });

  const pointsToShow = featuredPoints && featuredPoints.length > 0 ? featuredPoints : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="points-of-interest" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24 pb-20">

        {/* SECCIÓN HERO / CABECERA */}
        <div className="bg-white border-b border-slate-100 mb-12">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <Badge className="bg-sabana/10 text-sabana border-none font-black px-4 py-1 uppercase tracking-widest text-[10px]">
                <Sparkles className="w-3 h-3 mr-2 inline" /> Destinos Imperdibles
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">
                LUGARES QUE <span className="text-sabana">ENAMORAN</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                Explora la riqueza natural, cultural y arquitectónica que hace de Villavicencio la verdadera Puerta del Llano.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* GRID DE PUNTOS DE INTERÉS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pointsToShow.map((point) => (
              <Card
                key={point.id}
                className="group border-none shadow-xl shadow-slate-200/60 rounded-[2rem] overflow-hidden bg-white hover:translate-y-[-8px] transition-all duration-500"
              >
                {/* Imagen con Overlays */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`images/points/${point.image}`}
                    alt={point.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => (e.currentTarget.src = '/placeholder-service.jpg')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                  {/* Categoría Flotante */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur text-slate-900 border-none font-bold text-[10px] uppercase px-3 py-1 shadow-lg">
                      {point.category}
                    </Badge>
                  </div>

                  {/* Rating Flotante */}
                  <div className="absolute bottom-4 left-4 flex items-center bg-sabana text-white rounded-xl px-2 py-1 shadow-lg">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    <span className="font-black text-xs">{point.rating || '4.5'}</span>
                  </div>
                </div>

                <CardHeader className="p-6 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-sabana transition-colors duration-300">
                      {point.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-slate-400 font-bold text-[11px] uppercase tracking-wider mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-sabana" />
                    {point.address}
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                    {point.description}
                  </p>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center text-[11px] font-bold text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-sabana" />
                      {point.opening_hours}
                    </div>
                    <Badge variant="outline" className="text-[9px] border-sabana/20 text-sabana font-black uppercase">
                      Abierto
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      variant="default"
                      className="text-white rounded-xl font-black text-[10px] uppercase h-11"
                      onClick={() => setSelectedPoint(point)}
                    >
                      <Info className="w-3 h-3 mr-2" /> Detalles
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl font-black text-[10px] uppercase h-11 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que se disparen otros eventos
                        handleNavigation(point);
                      }}
                    >
                      <MapIcon className="w-3 h-3 mr-2" /> Cómo llegar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estado de carga vacío o error */}
          {pointsToShow.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No encontramos puntos de interés</h3>
              <p className="text-slate-500">Estamos actualizando nuestra base de datos para ti.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      {selectedPoint && (
        <PointDetailModal
          point={selectedPoint}
          onClose={() => setSelectedPoint(null)}
        />
      )}
    </div>
  );
};

export default PointsOfInterest;