
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Phone, Users, Wrench, Navigation } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { ServicesData } from "@/interface/interface";

const Services = () => {
  const { appConfig } = useAppConfig();

  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  const { data: featuredServices, isLoading } = useCachedData<ServicesData[]>({
    cacheKey: 'featured-services',
    fetchFn: dataService.getServices
  });

  const servicesToShow = featuredServices && featuredServices.length > 0 ? featuredServices : [];

  const openWaze = (location: string) => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
  };

/*   const handleViewDetails = (id: string) => {
    navigate(`/service/${id}`);
  };
 */
  const handleViewDetails = (service: typeof services[0]) => {
    navigate(`/contact-service/${service.id}`, { state: { service } });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  return (
    <div className="min-h-screen bg-white">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="services" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Wrench className="w-10 h-10 text-green-600" />
              Servicios Turísticos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Servicios especializados para hacer de tu experiencia en Villavicencio algo inolvidable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesToShow.map((service) => (
              <Card key={service.id} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${service.isVip ? 'border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100/50' : 'bg-white'}`}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`/images/services/${service.image}`}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-black-500 text-white-500 border-white-500 border-">
                    {service.category}
                  </Badge>
                  <div className="absolute top-4 left-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  </div>
                  {service.is_vip && (
                    <Badge className="absolute bottom-4 left-4 bg-green-600 text-white">
                      ⭐ VIP Sponsor
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-green-600 transition-colors">
                    {service.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {service.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.schedule}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {service.capacity}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.short_description}</p>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Servicios:</h4>
                    <div className="flex flex-wrap gap-1">
                      {/* {JSON.parse(service.services)} */}
                      {JSON.parse(service.services).slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {JSON.parse(service.services).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.services.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-black-400">{service.price_range}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-3 h-3 mr-1" />
                      {service.phone}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openWaze(service.location)}
                      className="flex items-center gap-1 text-black-500 border-black-500"
                    >
                      <Navigation />
                      Ruta
                    </Button>
                    <Button
                      size="sm"
                      variant="outline" 
                      className="flex-1 text-black-500 border-black-500 bg-black-500 "
                      onClick={() => handleViewDetails(service)}
                    >
                      Ver Detalles
                    </Button>
                    {/* <Button size="sm" variant="outline" className="flex-1 text-black-500 border-black-500 w-full">Contactar</Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
