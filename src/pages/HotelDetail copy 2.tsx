import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// import { RoomCard } from "@/components/RoomCard"; // Se comenta si no se define en este archivo
import { MapPin, Star, Wifi, Car, Utensils, Dumbbell, Phone, Mail, Globe, ArrowLeft, Loader2 } from "lucide-react";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { Business } from "@/interface/interface"; // Asegúrate de que esta interfaz esté disponible

// ----------------------------------------------------------------------------------
// Mock para RoomCard y datos de habitaciones si no están en la interfaz Business
// ----------------------------------------------------------------------------------

interface Room {
  id: number;
  name: string;
  price: string;
  description: string;
  capacity: number;
  image: string;
}

// Interfaz extendida para el detalle del hotel
interface HotelDetails extends Business {
    images: string[];
    price: string; // Price from
    check_in:string;
    check_out:string;
    website_url:string;
    // Otras propiedades ya están en Business (amenities, phone, email, etc.)
}

// Mock de RoomCard (Necesitas este componente para que el código compile, 
// o elimínalo si no lo vas a usar). Lo creamos como un placeholder simple.
const RoomCard = ({ room }: { room: Room }) => (
    <Card className="flex flex-col md:flex-row shadow-lg">
        <img src={`/images/businnesses/${room.image}`} alt={room.name} className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        <CardContent className="p-6 flex-grow">
            <h3 className="text-xl font-bold mb-2">{room.name}</h3>
            <p className="text-muted-foreground mb-4">{room.description}</p>
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{room.price}</span>
                <Button size="sm">Reservar</Button>
            </div>
        </CardContent>
    </Card>
);

// Mock de datos de habitaciones para el ejemplo
const mockRooms: Room[] = [
    { id: 101, name: "Habitación Estándar", price: "$ 80.000 / noche", description: "Habitación cómoda con cama doble y vista a la ciudad.", capacity: 2, image: "https://images.unsplash.com/photo-1571896349842-33c89406be0e?w=800" },
    { id: 102, name: "Suite Ejecutiva", price: "$ 150.000 / noche", description: "Amplia suite con sala de estar, ideal para viajes de negocios.", capacity: 2, image: "https://images.unsplash.com/photo-1542314831-068cd1dbf26e?w=800" },
];


// ----------------------------------------------------------------------------------
// Componente Principal HotelDetail
// ----------------------------------------------------------------------------------

const HotelDetail = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  // El 'id' se recibe como string, pero la API puede esperar un número
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotelId = id ? parseInt(id, 10) : null;

  // 1. Obtención de datos del hotel
  // Nota: dataService.getBusinessById debe ser una función existente en tu dataService
  const { data: businessData, isLoading, error } = useCachedData<HotelDetails>({
    cacheKey: `business-detail-${hotelId}`,
    // Se usa una función que obtiene un negocio por ID. Se asume que existe.
    fetchFn: () => hotelId ? dataService.getBusinessById(hotelId) : Promise.resolve(null),
    enabled: hotelId !== null, // Solo ejecutar si tenemos un ID
  });

  // 2. Mapeo de íconos de amenities
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes("wifi")) return <Wifi className="w-4 h-4" />;
    if (lowerAmenity.includes("parqueadero") || lowerAmenity.includes("parking")) return <Car className="w-4 h-4" />;
    if (lowerAmenity.includes("restaurante") || lowerAmenity.includes("cocina")) return <Utensils className="w-4 h-4" />;
    if (lowerAmenity.includes("gimnasio") || lowerAmenity.includes("dumbbell")) return <Dumbbell className="w-4 h-4" />;
    return null;
  };

  // 3. Preparación de datos para la UI
  const hotel = useMemo(() => {
    if (!businessData) return null;
    console.log(businessData)

    // Asumimos que los datos de la API son un objeto Business/HotelDetails
    return {
      name: businessData.name || "Hotel Desconocido",
      address: businessData.address || "Dirección no disponible",
      rating: businessData.rating ? parseFloat(businessData.rating).toFixed(1) : "N/A",
      description: businessData.description || businessData.short_description || "Descripción no disponible.",
      // La propiedad 'images' en la API podría ser un array de strings (URL)
      images: businessData.images && businessData.images.length > 0 
                ? businessData.images 
                : [businessData.image || "placeholder-image.jpg"], // Fallback
      amenities: businessData.amenities || [],
      phone: businessData.phone || "N/A",
      email: businessData.email || "N/A",
      website: businessData.website_url,
      priceFrom: businessData.price || "Consultar precio", // Usar el campo price
      // Estos datos (checkin/checkout) no están en el modelo Business, se usan mock o se asume su existencia:
      checkin: businessData.check_in, 
      checkout: businessData.check_out,
      // rooms: mockRooms, // Usar mock data ya que no está en la API de Business
      rooms: dataService.getRoomTypesByHotel(businessData.id)
    };
  }, [businessData]);

  // Manejo de scroll al montar/cambiar ID
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]); 


  if (!hotelId) {
    return (
      <div className="min-h-screen pt-40 container mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Error: ID de hotel no proporcionado.</h1>
        <Button onClick={() => navigate("/hotels")} className="mt-4">Volver a Hoteles</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-40 flex flex-col justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg">Cargando detalles del alojamiento...</p>
      </div>
    );
  }

  if (error || !hotel) {
     console.error("Error al cargar detalles del hotel:", error);
    return (
      <div className="min-h-screen pt-40 container mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">
          No se pudo encontrar el alojamiento con ID: {id}
        </h1>
        <Button onClick={() => navigate("/hotels")} className="mt-4">Volver a Hoteles</Button>
      </div>
    );
  }
  
  // Si llegamos aquí, 'hotel' está lleno de datos
  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 relative">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} // Volver a la página anterior
            className="relative top-3 z-50 left-1 top-[3rem]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Alojamiento 
          </Button>

          {/* Primera fila: Slider de imágenes e información del hotel */}
          <div className="grid w-full grid-cols-2 gap-8 mb-12">
            {/* Slider de imágenes */}
            <div className="w-full">
              <Carousel className="w-full">
                <CarouselContent>
                  {hotel.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                        <img 
                          src={`/images/businnesses/${image}`} 
                          alt={`${hotel.name} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1"/>
                <CarouselNext className="right-1"/>
              </Carousel>
            </div>

            {/* Información del hotel */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-extrabold text-foreground mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    <span className="text-sm">{hotel.address}</span>
                  </div>
                  <div className="flex items-center bg-yellow-500/20 text-yellow-800 rounded-full px-3 py-1 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-foreground/80 text-md leading-relaxed">{hotel.description}</p>
              </div>

              <div className="space-y-4">
                {/* Bloque de Servicios */}
                <div>
                  <h3 className="font-bold mb-3 text-lg border-b pb-1">Servicios y Comodidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 text-sm bg-primary/10 text-primary hover:bg-primary/20">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bloque de Contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm p-4 border rounded-lg bg-card shadow-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href={`tel:${hotel.phone}`} className="hover:underline truncate">{hotel.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href={`mailto:${hotel.email}`} className="hover:underline truncate">{hotel.email}</a>
                  </div>
                  {
                    hotel?.website  && 
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary shrink-0" />
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{hotel.website !== 'N/A' ? 'Sitio Web' : 'N/A'}</a>
                    </div>
                  }
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{hotel.address}</span>
                  </div>
                </div>

                {/* Bloque de Horarios */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                    <div>
                      <span className="text-foreground block mb-1">Check-in:</span>
                      <div className="text-lg font-bold text-primary">{hotel.checkin}</div>
                    </div>
                    <div>
                      <span className="text-foreground block mb-1">Check-out:</span>
                      <div className="text-lg font-bold text-primary">{hotel.checkout}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda fila: Habitaciones desde */}
          <div className="mb-12">
            <Card className="bg-primary/70 text-primary-foreground border-primary/70 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">Habitaciones desde</h2>
                  <div className="text-5xl font-extrabold mb-1">{hotel.priceFrom}</div>
                  <p className="text-primary-foreground/90">Precio promedio por noche (sujeto a disponibilidad)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tercera fila: Tipos de habitaciones */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Explora Nuestros Tipos de Habitaciones</h2>
            <div className="space-y-6 grid grid-col-1 md:grid-col-2 ">
              {hotel.rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;