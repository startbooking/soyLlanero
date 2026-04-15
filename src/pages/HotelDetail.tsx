
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { MapPin, Star, Wifi, Car, Utensils, Dumbbell, Phone, Mail, Globe, ArrowLeft } from "lucide-react";

const HotelDetail = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const hotel = location.state?.hotel;

  console.log(hotel)

  // Mock hotel data - in real app this would come from API
  /* const hotel = {
    id: 1,
    name: "Hotel Orinoco Plaza",
    location: "Centro, Villavicencio",
    description: "Hotel de lujo con vista panorámica a los llanos orientales. Ubicado en el corazón de la ciudad, ofrece la combinación perfecta entre elegancia moderna y hospitalidad tradicional llanera.",
    rating: 4.8,
    priceFrom: "$150.000",
    amenities: ["Wifi", "Parking", "Restaurante", "Gimnasio", "Piscina", "Spa", "Business Center"],
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    ],
    phone: "+57 8 123 4567",
    email: "reservas@orinoco.com",
    website: "www.hotelorinoco.com",
    address: "Carrera 30 #45-67, Centro",
    checkin: "3:00 PM",
    checkout: "12:00 PM",
    rooms: [
      {
        id: 1,
        name: "Habitación Estándar",
        price: "$150.000",
        capacity: 2,
        amenities: ["Wifi", "TV", "Aire Acondicionado", "Minibar"],
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
        ],
        available: true
      },
      {
        id: 2,
        name: "Habitación Ejecutiva",
        price: "$200.000",
        capacity: 2,
        amenities: ["Wifi", "TV", "Aire Acondicionado", "Minibar", "Escritorio", "Vista ciudad"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
          "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
          "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
        ],
        available: true
      },
      {
        id: 3,
        name: "Suite Junior",
        price: "$300.000",
        capacity: 4,
        amenities: ["Wifi", "TV", "Aire Acondicionado", "Minibar", "Sala de estar", "Vista panorámica"],
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
          "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        ],
        available: true
      },
      {
        id: 4,
        name: "Suite Presidencial",
        price: "$500.000",
        capacity: 6,
        amenities: ["Wifi", "TV", "Aire Acondicionado", "Minibar", "Jacuzzi", "Terraza privada"],
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
        ],
        available: false
      }
    ]
  }; */

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wifi": return <Wifi className="w-4 h-4" />;
      case "Parking": return <Car className="w-4 h-4" />;
      case "Restaurante": return <Utensils className="w-4 h-4" />;
      case "Gimnasio": return <Dumbbell className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/hotels")}
            className="mb-6"
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
                  {hotel.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-96 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${hotel.name} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Información del hotel */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>
                  <div className="flex items-center bg-white border rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-gray-600 fill-current mr-1" />
                    <span className="font-medium text-black">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">{hotel.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-black">Servicios</h3>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 text-black border-gray-300">
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
                    <span className="text-black">{hotel.website}</span>
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
                      <div className="text-black">{hotel.checkin}</div>
                    </div>
                    <div>
                      <span className="font-medium text-black">Check-out:</span>
                      <div className="text-black">{hotel.checkout}</div>
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
                  <h2 className="text-2xl font-bold text-black mb-2">Habitaciones desde</h2>
                  <div className="text-4xl font-bold text-primary mb-2">{hotel.priceFrom}</div>
                  <p className="text-muted-foreground">por noche</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tercera fila: Tipos de habitaciones */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Tipos de Habitaciones</h2>
            <div className="space-y-6">
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
