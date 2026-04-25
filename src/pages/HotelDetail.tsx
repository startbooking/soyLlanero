import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
  MapPin, Star, Wifi, Car, Utensils, Dumbbell, 
  Phone, Mail, Globe, ArrowLeft, Clock 
} from "lucide-react";
import { dataService } from "@/services/dataService";

const HotelDetail = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  
  // Obtenemos el objeto hotel que viene desde la navegación (lista de hoteles)
  const hotel = location.state?.hotel;

  // Mapeo mejorado de iconos con normalización de texto
  const getAmenityIcon = (amenity: string) => {
    const a = amenity.toLowerCase();
    if (a.includes("wifi")) return <Wifi className="w-4 h-4" />;
    if (a.includes("park") || a.includes("estacionamiento")) return <Car className="w-4 h-4" />;
    if (a.includes("restaurante")) return <Utensils className="w-4 h-4" />;
    if (a.includes("gym") || a.includes("gimnasio")) return <Dumbbell className="w-4 h-4" />;
    return null;
  };

  useEffect(() => {
    const loadRooms = async () => {
      if (!id) return;
      try {
        setLoadingRooms(true);
        const data = await dataService.getRoomTypesByHotel(id);
        setRooms(data);
      } catch (err) {
        console.error("Error al cargar habitaciones:", err);
      } finally {
        setLoadingRooms(false);
      }
    };

    loadRooms();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Redirección de seguridad si se accede directamente sin estado
  if (!hotel) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Button onClick={() => navigate("/hotels")}>Regresar a Hoteles</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-16 py-8">
          
          <Button
            variant="outline"
            onClick={() => navigate("/hotels")}
            className="mb-8 border-[#D9E4C5] text-green-800 hover:bg-[#D9E4C5] transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Hoteles
          </Button>

          {/* Información Principal del Hotel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            
            {/* Galería de Imágenes */}
            <div className="w-full">
              <Carousel className="w-full shadow-lg rounded-2xl overflow-hidden">
                <CarouselContent>
                  {hotel?.images?.length > 0 ? (
                    hotel.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-[400px]">
                          <img
                            src={`/images/businnesses/${image}`}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="h-[400px] flex items-center justify-center bg-slate-100">
                        <p className="text-slate-400 italic">No hay fotos disponibles</p>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            {/* Detalles Técnicos y Contacto */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">{hotel.name}</h1>
                  <Badge className="bg-green-100 text-green-800 border-green-200 gap-1">
                    <Star className="w-3 h-3 fill-current" /> {hotel.rating}
                  </Badge>
                </div>
                
                <div className="flex items-center text-green-700 font-medium mb-4 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hotel.location}
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">{hotel.long_description || hotel.description}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-bold text-slate-800">Servicios Incluidos</h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities?.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#F7F9F2] text-green-900 border-[#D9E4C5] px-3 py-1 flex gap-2">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-green-700" /> {hotel.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-green-700" /> {hotel.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-green-700" />
                    <span>In: {hotel.check_in} | Out: {hotel.check_out}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-green-700" /> {hotel.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Habitaciones Disponibles */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-slate-900">Habitaciones Disponibles</h2>
              <div className="bg-white border-[#D9E4C5] border-2 px-4 py-2 rounded-full">
                <span className="text-sm text-slate-500 mr-2">Desde</span>
                <span className="text-xl font-black text-green-800">{hotel.price}</span>
              </div>
            </div>

            <div className="space-y-8">
              {loadingRooms ? (
                <div className="text-center py-20 animate-pulse">Cargando habitaciones...</div>
              ) : rooms.length > 0 ? (
                rooms.map((room) => (
                  // PASO DE DATOS: Enviamos tanto 'room' como 'hotel'
                  <RoomCard key={room.id} room={room} hotel={hotel} />
                ))
              ) : (
                <Card className="p-20 text-center bg-slate-50 border-dashed border-2">
                  <p className="text-slate-400">Lo sentimos, no hay habitaciones disponibles por el momento.</p>
                </Card>
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