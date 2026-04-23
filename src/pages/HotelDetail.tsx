import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { dataService } from "@/services/dataService";

const HotelDetail = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [error, setError] = useState(null);
  const hotel = location.state?.hotel;

  // console.log(hotel);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wifi":
        return <Wifi className="w-4 h-4" />;
      case "Parking":
        return <Car className="w-4 h-4" />;
      case "Restaurante":
        return <Utensils className="w-4 h-4" />;
      case "Gimnasio":
        return <Dumbbell className="w-4 h-4" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const loadRooms = async () => {
      if (!id) return;
      try {
        setLoadingRooms(true);
        // Usamos la función del dataService que ya maneja los headers y la URL base
        const data = await dataService.getRoomTypesByHotel(id);
        setRooms(data);
      } catch (err) {
        console.error("Error al cargar habitaciones:", err);
        setError("No se pudieron cargar las habitaciones disponibles.");
      } finally {
        setLoadingRooms(false);
      }
    };

    loadRooms();
  }, [id]);


  console.log(rooms)

  useEffect(() => {
    // Desplaza al usuario al inicio (x: 0, y: 0)
    window.scrollTo(0, 0);
  }, []); // El array vacío asegura que solo ocurra al montar el componente

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <Header
        activeSection="businesses"
        onSectionChange={() => { }}
        language={currentLanguage}
      />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => navigate("/hotels")}
            className="mb-6 fixed top-36 left-10 z-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Hoteles
          </Button>

          {/* Primera fila: Slider de imágenes e información del hotel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Slider de imágenes */}
            <div className="w-full">
              <Carousel className="w-full">
                <CarouselContent>
                  {hotel?.images && hotel.images.length > 0 ? (
                    hotel.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-96 rounded-lg overflow-hidden">
                          <img
                            src={`/images/businnesses/${image}`}
                            alt={`${hotel.name} - Imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                        <p className="text-gray-500">
                          No hay imágenes disponibles
                        </p>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious className="w-12 h-12 mx-16" />
                <CarouselNext className="w-12 h-12 mx-16" />
              </Carousel>
            </div>

            {/* Información del hotel */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">
                  {hotel.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>
                  <div className="flex items-center bg-white border rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-gray-600 fill-current mr-1" />
                    <span className="font-medium text-black">
                      {hotel.rating}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {hotel.long_description}
                </p>
                <p className="text-muted-foreground text-md leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-black">Servicios</h3>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1 text-black border-gray-300"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-black">{hotel.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-black">{hotel.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-black">{hotel.website_url}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-black">{hotel.address}</span>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-black">Check-in:</span>
                      <div className="text-black">{hotel.check_in}</div>
                    </div>
                    <div>
                      <span className="font-medium text-black">Check-out:</span>
                      <div className="text-black">{hotel.check_out}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda fila: Habitaciones desde */}
          <div className="mb-8">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-black mb-2">
                    Habitaciones desde
                  </h2>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {hotel.price}
                  </div>
                  <p className="text-muted-foreground">por noche</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tercera fila: Tipos de habitaciones */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">
              Tipos de Habitaciones
            </h2>
            <div className="space-y-6">
              {hotel?.rooms && hotel.rooms.length > 0 ? (
                hotel.rooms.map((room, index) => (
                  <RoomCard key={room.id} room={room} />
                ))
              ) : (
                <div className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">
                    No hay Habitaciones disponibles
                  </p>
                </div>
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
