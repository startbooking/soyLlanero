import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Phone, Users, Globe, Mail, Calendar, ArrowLeft, Receipt, Percent, Navigation } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
// Solo importamos la interfaz, eliminamos las importaciones de fetching
import { Business } from "@/interface/interface"

const FeaturedBusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acceder al estado pasado
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const business: Business | undefined = location.state?.business;

  if (!business) {
    // El original intentaba hacer un fetch que fallaba, la mejor corrección es redirigir.
    return <Navigate to="/404" replace />;
  }


  // console.log(business)
  // Aseguramos que la navegación a teléfonos y correos use el método correcto.
  const handleCall = () => {
    window.location.href = `tel:${business.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${business.email}`;
  };

  const openWaze = () => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(business.address)}`, '_blank');
  };

  const handleReservation = () => {
    console.log("Iniciar proceso de reserva para:", business.name);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="home" onSectionChange={() => { }} language={currentLanguage} />
      <main className="pt-24">
        <div className="container mx-auto px-4 relative">
          <Button
            variant="ghost"
            className="relative top-3 z-50 left-1 top-[3rem] border border-black text-black bg-transparent hover:border-primary/50 hover:text-primary/70"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver 
          </Button>

          <div className="rounded-lg bg-white shadow-xl max-w-[80%] w-full mx-auto">
            <div className="relative">
              <div className="relative overflow-hidden rounded-t-lg h-96">
                <div className="md:col-span-2 relative h-64 md:h-96 overflow-hidden rounded-lg">
                  <div className="grid grid-cols-3 gap-4 h-64 md:h-96 rounded-lg overflow-hidden">
                    {/* 1. SECCIÓN PRINCIPAL (2/3 del Ancho) */}
                    <div className="col-span-2 relative overflow-hidden rounded-lg">
                      {business.images && business.images.length > 0 ? (
                        <img
                          // Muestra SIEMPRE la primera imagen de la matriz
                          src={`/images/businnesses/${business.images[0]}`}
                          alt={`${business.name} - Imagen Principal`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg">
                          Sin imagen principal
                        </div>
                      )}
                    </div>

                    {/* 2. SECCIÓN DE GALERÍA LATERAL (1/3 del Ancho) */}
                    {/* Esta sección ocupará el col-span-1 restante */}
                    <div className="col-span-1 grid grid-cols-1 gap-4 overflow-y-auto">
                      {/* Mapear TODAS las imágenes, excluyendo la primera (slice(1)) */}
                      {business.images && business.images.length > 1 &&
                        business.images.slice(1).map((imageSrc, index) => (
                          <div
                            key={index}
                            // Ajusta la altura de la imagen si hay muchas para permitir el scroll
                            className={`relative overflow-hidden rounded-lg ${business.images.length > 3 ? 'h-16' : 'h-32'
                              }`}
                          >
                            <img
                              // CORRECCIÓN CLAVE: Usamos 'imageSrc' (el elemento mapeado) para la URL
                              src={`/images/businnesses/${imageSrc}`}
                              alt={`${business.name} - Galería ${index + 2}`}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ))
                      }
                    </div>

                    {/* Manejar el caso si no hay imágenes o solo hay 1 imagen (opcional) */}
                    {(!business.images || business.images.length === 0) && (
                      <div className="col-span-3 w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg rounded-lg">
                        No hay imágenes disponibles para este negocio.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="p-4">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground">{business.name}</h1>
                      {/* Se asume que business.is_sponsor existe o que business.is_vip = 1 */}
                      {(business as any).is_vip && (
                        <Badge className="border-black-500 bg-white text-black-foreground px-3 py-1 hover:bg-primary/50">
                          ⭐ VIP Sponsor
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Badge variant="outline" className="text-base px-2 py-1">
                        {business.categoria}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                        <span className="font-bold text-lg">{business?.rating}</span>
                        {/* Se asume que review_count existe en el objeto Business */}
                        <span className="text-muted-foreground ml-2">({(business as any).review_count || 0} reseñas)</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{business.address}</span>
                      </div>
                    </div>

                    <p className="text-md text-muted-foreground leading-relaxed text-justify">
                      {business.description}
                    </p>
                  </div>

                  <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-xl">Información de Precios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">{business.price}</span>
                        </div>
                        <div className="pt-3 border-t border-primary/20">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center text-muted-foreground">
                              <Receipt className="w-4 h-4 mr-2" />
                              <span>Impuestos incluidos:</span>
                            </div>
                            {/* <span className="font-semibold">${business.taxes.toLocaleString()}</span> */}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-muted-foreground">
                              <Percent className="w-4 h-4 mr-2" />
                              <span>Porcentaje de impuestos:</span>
                            </div>
                            <span className="font-semibold">{business.tax_percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Servicios y Amenidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {business.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center p-2 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors">
                            <span className="text-sm font-medium">✓ {amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Información de Contacto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <a
                          href={`tel:${business.phone}`}
                          className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent/10 transition-colors"
                        >
                          <Phone className="w-4 h-4 text-black" />
                          <span className="text-sm">{business.phone}</span>
                        </a>
                        <a
                          href={`mailto:${business.email}`}
                          className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent/10 transition-colors"
                        >
                          <Mail className="w-4 h-4 text-black" />
                          <span className="text-sm break-all">{business.email}</span>
                        </a>
                        {/* Se asume que business.website existe en el objeto Business */}
                        {
                          business?.website_url &&
                          <a
                            href={`https://${(business as any).website_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent/10 transition-colors"
                          >
                            <Globe className="w-4 h-4 text-black" />
                            <span className="text-sm">{(business as any).website_url}</span>
                          </a>
                        }
                        <div className="flex items-start gap-2 p-1">
                          <MapPin className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{business.address}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full border border-black-500 bg-back-500 text-black-700 hover:bg-primary/30"
                        onClick={openWaze}
                      >
                        <Navigation />
                        Ver Ruta en Waze
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Información Operativa
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Horario:</span>
                        {/* Se asume que business.schedule existe en el objeto Business */}
                        <span className="font-medium">{(business as any).opening_hours}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-black" />
                          <span className="text-sm text-muted-foreground">Capacidad:</span>
                        </div>
                        {/* Se asume que business.capacity existe en el objeto Business */}
                        <span className="font-medium">{(business as any).capacity}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3 px-4">
                    {
                      business.category_id === 1 &&
                      <Button
                        className="w-full border-black-500 text-black-500"
                        size="lg"
                        onClick={handleReservation}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Reservar Ahora
                      </Button>

                    }

                    
                    {/* <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleCall}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar Directamente
                    </Button> */}
                    <Button
                      variant="outline"
                      className="w-full  text-black-500 border-black-500"
                      onClick={handleEmail}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturedBusinessDetail;