
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Star, Users } from "lucide-react";

const AgenciesOperators = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const agencies = [
    {
      id: 1,
      name: "Magic The Travel",
      description: "Especialistas en tours ecológicos y aventura en los Llanos Orientales",
      category: "Agencia de Viajes",
      image: "magic.png",
      rating: 5.0,
      phone: "+310 800 7689",
      email: "magicthetravel19@gmail.com",
      location: "Hotel Estelar, Villavicencio",
      services: ["Tiquetes Aereos","Tours Ecológicos","Servicio Alojamiento", "Servicio Transporte","Paquetes Turisticos Nacionales / Internacionales"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="agencies-operators" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Agencias y Operadores</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conecta con los mejores operadores turísticos y agencias de viajes de la región
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map((agency) => (
              <Card key={agency.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`/images/agency/${agency.image}`}
                    alt={agency.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {agency.category}
                  </Badge>
                  <div className="absolute bottom-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium text-sm">{agency.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {agency.name}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {agency.location}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">{agency.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Servicios:</h4>
                    <div className="flex flex-wrap gap-1">
                      {agency.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      {agency.phone}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      {agency.email}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => navigate(`/contact-agency/${agency.id}`, { state: { agency } })}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Contactar Agencia
                  </Button>
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

export default AgenciesOperators;
