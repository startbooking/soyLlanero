
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Phone, Users, Globe, Mail, Calendar } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BusinessDetail = () => {
  const { id } = useParams();
  const [currentLanguage, setCurrentLanguage] = useState("es");

  // Datos de ejemplo de empresas
  const businesses = {
    "1": {
      id: 1,
      name: "Hotel Orinoco Plaza",
      category: "Hoteles",
      description: "Hotel de lujo en el centro de Villavicencio con vista panorámica a los llanos orientales. Ofrece habitaciones elegantes, restaurante gourmet, spa, piscina y centro de convenciones. Ideal para viajeros de negocios y turistas que buscan comodidad y ubicación privilegiada.",
      rating: 4.8,
      reviewCount: 156,
      price: "$150.000/noche",
      phone: "+57 8 123 4567",
      email: "reservas@hotelorinoco.com",
      website: "www.hotelorinoco.com",
      address: "Carrera 30 #15-45, Centro, Villavicencio",
      schedule: "24 horas",
      capacity: "120 huéspedes",
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
      ],
      amenities: ["WiFi gratuito", "Piscina", "Spa", "Restaurante", "Parqueadero", "Centro de convenciones"],
      isVip: true
    },
    "4": {
      id: 4,
      name: "Transporte VIP Llanos",
      category: "Transporte",
      description: "Servicio de transporte ejecutivo y turístico con vehículos de lujo. Ofrecemos traslados al aeropuerto, tours personalizados, transporte empresarial y servicios especiales para eventos. Flota moderna con conductores profesionales y seguros.",
      rating: 4.5,
      reviewCount: 89,
      price: "Desde $50.000",
      phone: "+57 311 456 7890",
      email: "info@transportevipllanos.com",
      website: "www.transportevipllanos.com",
      address: "Calle 40 #25-30, Villavicencio",
      schedule: "24 horas",
      capacity: "1-15 pasajeros",
      images: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
      ],
      amenities: ["Aire acondicionado", "WiFi", "Agua gratuita", "Música", "GPS", "Seguro completo"],
      isVip: true
    }
  };

  const business = businesses[id as keyof typeof businesses];

  if (!business) {
    return <Navigate to="/404" replace />;
  }

  const openWaze = () => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(business.address)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Galería de imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {business.images.map((image, index) => (
              <div key={index} className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={`${business.name} - ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información principal */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-foreground">{business.name}</h1>
                  {business.isVip && (
                    <Badge className="bg-primary text-primary-foreground">
                      ⭐ VIP SPONSOR
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline">{business.category}</Badge>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{business.rating}</span>
                    <span className="text-muted-foreground ml-1">({business.reviewCount} reseñas)</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{business.description}</p>
              </div>

              {/* Servicios y amenidades */}
              <Card>
                <CardHeader>
                  <CardTitle>Servicios y Amenidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {business.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center p-2 bg-accent/10 rounded-lg">
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Panel lateral */}
            <div className="space-y-6">
              {/* Información de contacto */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Información de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{business.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{business.website}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{business.address}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={openWaze}
                  >
                    <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/waze_logo_icon_168210.png" alt="Waze" className="w-4 h-4 mr-2" />
                    Ver Ruta en Waze
                  </Button>
                </CardContent>
              </Card>

              {/* Información operativa */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Información Operativa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Horario:</span>
                    <span>{business.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Capacidad:</span>
                    <span>{business.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Precio:</span>
                    <span className="font-bold text-primary">{business.price}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Acciones */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Reservar Ahora
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar Directamente
                </Button>
                <Button variant="outline" className="w-full">
                  <Star className="w-4 h-4 mr-2" />
                  Escribir Reseña
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessDetail;
