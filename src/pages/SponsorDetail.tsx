
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { HotelDetail } from "@/components/HotelDetail";
import { BusinessDetail } from "@/components/BusinessDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SponsorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [sponsor, setSponsor] = useState<any>(null);

  // Mock data - en producción vendría de la base de datos
  const mockSponsors = [
    {
      id: "1",
      name: "Hotel Plaza Mayor",
      type: "hotel",
      location: "Centro, Villavicencio",
      description: "Hotel boutique en el corazón de la ciudad con todas las comodidades modernas",
      rating: 4.8,
      price: "Desde $150.000/noche",
      amenities: ["Wifi", "Parking", "Restaurante", "Piscina", "Aire Acondicionado"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      phone: "+57 8 123 4567",
      email: "reservas@hotelplazamayor.com",
      website: "www.hotelplazamayor.com"
    },
    {
      id: "2", 
      name: "Restaurante El Llano",
      type: "restaurant",
      location: "Av. 40, Villavicencio",
      description: "Auténtica gastronomía llanera en un ambiente tradicional",
      rating: 4.6,
      category: "Gastronomía",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      phone: "+57 8 234 5678",
      email: "info@elllano.com",
      website: "www.restauranteelllano.com",
      specialties: ["Mamona", "Casabe", "Chicha", "Arepa de Maíz"]
    }
  ];

  useEffect(() => {
    const foundSponsor = mockSponsors.find(s => s.id === id);
    setSponsor(foundSponsor);
  }, [id]);

  if (!sponsor) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <Header activeSection="" onSectionChange={() => {}} language={currentLanguage} />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Sponsor no encontrado</h1>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          {sponsor.type === "hotel" ? (
            <HotelDetail hotel={sponsor} onClose={() => navigate(-1)} />
          ) : (
            <BusinessDetail business={sponsor} />
          )}
        </div>
      </main>
    </div>
  );
};

export default SponsorDetail;
