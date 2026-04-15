import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Star, Wifi, Car, Utensils, Dumbbell, Phone, Mail, Globe, ArrowLeft, Loader2, Bed, Maximize } from "lucide-react";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { Business, RoomType } from "@/interface/interface";
import { RoomCard } from "@/components/RoomCard";


// Interfaz extendida para el detalle del hotel (Business)
interface HotelDetails extends Business {
  images: string[];
  price: string; // Price from
  check_in: string;
  check_out: string;
  website_url: string;
}

// ----------------------------------------------------------------------------------
// Componente RoomCard actualizado para RoomType
// ----------------------------------------------------------------------------------

const getRoomAmenityIcon = (amenity: string) => {
  const lowerAmenity = amenity.toLowerCase();
  if (lowerAmenity.includes("wifi")) return <Wifi className="w-4 h-4 text-muted-foreground" />;
  if (lowerAmenity.includes("cama")) return <Bed className="w-4 h-4 text-muted-foreground" />;
  return null;
};

const RoomCardNew = ({ room }: { room: RoomType }) => (
  <Card className="flex flex-col md:flex-row shadow-lg hover:shadow-xl transition-shadow duration-300">
    {/* Imagen de la Habitación */}
    <img
      // Se asume que las imágenes de las habitaciones están bajo un subdirectorio 'rooms'
      src={`/images/businnesses/rooms/${room.image}`}
      alt={room.name}
      className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
    />

    {/* Contenido de la Habitación */}
    <CardContent className="p-6 flex-grow flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-primary">{room.name}</h3>
        <p className="text-muted-foreground mb-3 line-clamp-2">{room.description}</p>

        {/* Detalles clave */}
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          <div className="flex items-center gap-1 text-foreground">
            <Bed className="w-4 h-4 text-primary" />
            <span>{room.bed_type}</span>
          </div>
          <div className="flex items-center gap-1 text-foreground">
            <Maximize className="w-4 h-4 text-primary" />
            <span>{room.room_size}</span>
          </div>
          <div className="flex items-center gap-1 text-foreground">
            <Dumbbell className="w-4 h-4 text-primary" />
            <span>Capacidad: {room.max_occupancy} pers.</span>
          </div>
        </div>

        {/* Amenities de la Habitación */}
        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((amenity, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs">
              {getRoomAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 4 && <Badge variant="outline" className="text-xs">+{room.amenities.length - 4} más</Badge>}
        </div>
      </div>

      {/* Precio y Reserva */}
      <div className="flex items-center justify-between mt-4 border-t pt-4">
        <div>
          <span className="text-sm text-muted-foreground block">Precio por noche</span>
          <span className="text-2xl font-extrabold text-primary">{room.price_per_night}</span>
          {room.has_tax && <span className="text-xs text-muted-foreground ml-2">(Impuestos: {room.tax_percentage}%)</span>}
        </div>
        <Button size="lg" disabled={!room.is_available}>
          {room.is_available ? 'Reservar Ahora' : 'No Disponible'}
        </Button>
      </div>
    </CardContent>
  </Card>
);

// ----------------------------------------------------------------------------------
// Componente Principal HotelDetail
// ----------------------------------------------------------------------------------

const HotelDetail = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotelId = id ? parseInt(id, 10) : null;

  // 1. Obtención de datos del hotel (HotelDetails)
  const { data: businessData, isLoading: isHotelLoading, error: hotelError } = useCachedData<HotelDetails>({
    cacheKey: `business-detail-${hotelId}`,
    fetchFn: () => hotelId ? dataService.getBusinessById(hotelId) : Promise.resolve(null),
    enabled: hotelId !== null,
  });

  const { data: roomTypesData, isLoading: isRoomsLoading, error: roomsError } = useCachedData<RoomType[]>({
    cacheKey: `/businesses/${hotelId}/room-types`,
    // fetchFn: () => hotelId ? dataService.getRoomTypesByBusinessId(hotelId) : Promise.resolve([]),
    fetchFn: () => hotelId ? dataService.getRoomTypesByHotel(hotelId) : Promise.resolve([]),
    enabled: hotelId !== null,
  });

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes("wifi")) return <Wifi className="w-4 h-4" />;
    if (lowerAmenity.includes("parqueadero") || lowerAmenity.includes("parking")) return <Car className="w-4 h-4" />;
    if (lowerAmenity.includes("restaurante") || lowerAmenity.includes("cocina")) return <Utensils className="w-4 h-4" />;
    if (lowerAmenity.includes("gimnasio") || lowerAmenity.includes("fitness")) return <Dumbbell className="w-4 h-4" />;
    return null;
  };

  // 3. Preparación de datos para la UI
  const hotel = useMemo(() => {
    if (!businessData) return null;

    return {
      name: businessData.name || "Hotel Desconocido",
      address: businessData.address || "Dirección no disponible",
      rating: businessData.rating ? parseFloat(businessData.rating).toFixed(1) : "N/A",
      description: businessData.description || businessData.short_description || "Descripción no disponible.",
      // Fallback para imágenes
      images: businessData.images && businessData.images.length > 0
        ? businessData.images
        : [businessData.image || "placeholder-image.jpg"],
      amenities: businessData.amenities || [],
      phone: businessData.phone || "N/A",
      email: businessData.email || "N/A",
      website: businessData.website_url,
      priceFrom: businessData.price || "Consultar precio",
      checkin: businessData.check_in || "N/A",
      checkout: businessData.check_out || "N/A",
    };
  }, [businessData]);

  // Manejo de scroll al montar/cambiar ID
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);


  const isLoading = isHotelLoading || isRoomsLoading;
  const error = hotelError || roomsError;

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
        <p className="text-lg">Cargando detalles del alojamiento y habitaciones...</p>
      </div>
    );
  }

  // console.log(hotel);

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

  // Si llegamos aquí, 'hotel' y 'roomTypesData' están llenos de datos
  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24">
        <div className="container mx-auto px-4 relative">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="absolute z-10 top-20 left-6 -translate-y-12 border border-black text-black bg-tranparent hover:bg-primary/60"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Alojamiento
          </Button>

          {/* Primera fila: Slider de imágenes e información del hotel */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pt-4">
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
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </Carousel>
            </div>

            {/* Información del hotel (Se mantiene igual) */}
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
                {/* Bloque de Servicios (Se mantiene igual) */}
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

                {/* Bloque de Contacto (Se mantiene igual) */}
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
                    hotel?.website &&
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

                {/* Bloque de Horarios (Se mantiene igual) */}
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

          {/* Segunda fila: Habitaciones desde (Se mantiene igual) */}
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

          {/* Tercera fila: Tipos de habitaciones (ACTUALIZADO para usar roomTypesData) */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Explora Nuestros Tipos de Habitaciones</h2>
            <div className="space-y-6">
              {roomTypesData && roomTypesData.length > 0 ? (
                roomTypesData.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))
              ) : (
                <p className="text-muted-foreground text-center p-8 border rounded-lg">
                  No se encontraron tipos de habitaciones disponibles para este alojamiento.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HotelDetail;