
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Clock, Users, ArrowLeft, MessageCircle, Share2, Heart } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactServiceModal } from "@/components/ContactServiceModal";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { ServicesData } from "@/interface/interface";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const { id: experienceIdFromUrl } = useParams<{ id: string }>();
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const [showContactModal, setShowContactModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: featuredServices, isLoading } = useCachedData<ServicesData[]>({
    cacheKey: 'featured-services',
    fetchFn: dataService.getServices
  });


  const service = featuredServices?.find(
    (exp) => exp.id == id
  );



  // Datos simulados del servicio
  /* const service = {
    id: parseInt(id || "1"),
    name: "Transporte VIP Llanos",
    location: "Villavicencio",
    description: "Servicio de transporte ejecutivo y turístico con vehículos de lujo y conductores profesionales especializados en la región de los Llanos Orientales. Ofrecemos experiencias personalizadas para turistas y ejecutivos.",
    rating: 4.5,
    reviewCount: 127,
    price: "Desde $50.000",
    phone: "+57 311 456 7890",
    whatsapp: "+57 311 456 7890",
    email: "info@transportevipllanos.com",
    schedule: "24 horas",
    capacity: "1-15 pasajeros",
    category: "Transporte",
    services: [
      "Traslados aeropuerto",
      "Tours personalizados", 
      "Transporte empresarial",
      "Eventos especiales",
      "Servicio de conductor",
      "Vehículos de lujo"
    ],
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f"
    ],
    features: [
      "Vehículos con aire acondicionado",
      "Conductores bilingües",
      "Seguro de viajeros incluido",
      "WiFi gratuito",
      "Agua y snacks cortesía",
      "Servicio 24/7"
    ],
    policies: {
      cancellation: "Cancelación gratuita hasta 24 horas antes",
      payment: "Efectivo, tarjetas de crédito y transferencias",
      requirements: "Documento de identidad requerido"
    },
    isVip: true
  }; */

  const openWaze = () => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(service.location)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.name,
        text: service.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  
  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="services" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/services')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Servicios
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Galería de imágenes */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-96 overflow-hidden rounded-t-lg">
                    <img 
                      src={service.images[0]} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    {service.is_vip && (
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                        ⭐ VIP SPONSOR
                      </Badge>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={handleShare}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {service.images.slice(1).map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${service.name} ${index + 2}`}
                        className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Información principal */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{service.rating}</span>
                          <span className="text-muted-foreground">({service.reviewCount} reseñas)</span>
                        </div>
                        <Badge>{service.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{service.price}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{service.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{service.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{service.phone}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Servicios Incluidos:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {service.services.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Características:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="justify-start">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Políticas */}
              <Card>
                <CardHeader>
                  <CardTitle>Políticas y Términos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Cancelación:</h4>
                      <p className="text-sm text-muted-foreground">{service.policies.cancellation}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Métodos de Pago:</h4>
                      <p className="text-sm text-muted-foreground">{service.policies.payment}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Requisitos:</h4>
                      <p className="text-sm text-muted-foreground">{service.policies.requirements}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar de contacto */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Contactar Servicio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => setShowContactModal(true)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Consulta
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(`https://wa.me/${service.whatsapp.replace(/\D/g, '')}`, '_blank')}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(`tel:${service.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={openWaze}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ver Ubicación
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ContactServiceModal 
        open={showContactModal} 
        onOpenChange={setShowContactModal}
        serviceName={service.name}
        serviceId={service.id}
      />
    </div>
  );
};

export default ServiceDetail;
