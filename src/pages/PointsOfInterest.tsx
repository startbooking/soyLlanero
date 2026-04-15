
import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Camera } from "lucide-react";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { PointsData } from "@/interface/interface";
import { PointDetailModal } from "@/components/PointDetailModal";

const PointsOfInterest = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [selectedPoint, setSelectedPoint] = useState();

  const { data: featuredPoints, isLoading } = useCachedData<PointsData[]>({
    cacheKey: 'featured-points',
    fetchFn: dataService.getPointsOfInterest
  });

  const poinstToShow = featuredPoints && featuredPoints.length > 0 ? featuredPoints : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="points-of-interest" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Puntos de Interés</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre los lugares más emblemáticos y atractivos de Villavicencio y el Meta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poinstToShow.map((point) => (
              <Card key={point.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`images/points/${point.image}`}
                    alt={point.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {point.category}
                  </Badge>
                  <div className="absolute bottom-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium text-sm">{point.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {point.name}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {point.address}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 text-justify text-sm">{point.description}</p>

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {point.opening_hours}
                  </div>

                  <Button className="w-full"
                    onClick={() => setSelectedPoint(point)}
                  >

                    <Camera className="w-4 h-4 mr-2" />
                    Ver más detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
