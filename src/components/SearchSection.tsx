
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, Phone, Clock, Users } from "lucide-react";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Datos de ejemplo ampliados con transporte y compras
  const allServices = [
    {
      id: 1,
      name: "Hotel Orinoco Plaza",
      description: "Hotel de lujo con vista panorámica a los llanos orientales y servicios de primera clase",
      category: "Hoteles",
      rating: 4.8,
      price: "$150.000/noche",
      phone: "+57 8 123 4567",
      schedule: "24 horas",
      capacity: "120 huéspedes",
      type: "hotel",
      isVip: true
    },
    {
      id: 2,
      name: "Restaurante Los Llanos",
      description: "Auténtica cocina llanera con los mejores cortes de carne y ambiente tradicional",
      category: "Restaurantes",
      rating: 4.6,
      price: "$$",
      phone: "+57 8 234 5678",
      schedule: "11:00 AM - 10:00 PM",
      capacity: "80 personas",
      type: "restaurant"
    },
    {
      id: 3,
      name: "Safari Fotográfico Los Ocarros",
      description: "Experiencia única de avistamiento de fauna llanera en su hábitat natural",
      category: "Experiencias",
      rating: 4.9,
      price: "$45.000",
      phone: "+57 300 123 4567",
      schedule: "6:00 AM - 6:00 PM",
      capacity: "15 personas",
      type: "experience"
    },
    {
      id: 4,
      name: "Transporte VIP Llanos",
      description: "Servicio de transporte ejecutivo y turístico con vehículos de lujo",
      category: "Transporte",
      rating: 4.5,
      price: "Desde $50.000",
      phone: "+57 311 456 7890",
      schedule: "24 horas",
      capacity: "1-15 pasajeros",
      type: "transport",
      isVip: true
    },
    {
      id: 5,
      name: "Artesanías Llaneras",
      description: "Tienda de artesanías típicas, souvenirs y productos locales de los llanos",
      category: "Compras",
      rating: 4.4,
      price: "Variable",
      phone: "+57 8 345 6789",
      schedule: "9:00 AM - 7:00 PM",
      capacity: "50 clientes",
      type: "shopping"
    },
    {
      id: 6,
      name: "Centro Comercial Llanocentro",
      description: "Principal centro comercial con tiendas, restaurantes y entretenimiento",
      category: "Compras",
      rating: 4.3,
      price: "Variable",
      phone: "+57 8 456 7890",
      schedule: "10:00 AM - 10:00 PM",
      capacity: "5000 visitantes",
      type: "shopping"
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      let results = allServices;
      
      if (searchQuery) {
        results = results.filter(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (category && category !== "all") {
        results = results.filter(service => service.category === category);
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-1">
      <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg border-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 " />
            <Input
              placeholder="¿Qué estás buscando? (hoteles, restaurantes, experiencias...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border border-black-700"
            />
          </div>

          <Select value={category} onValueChange={setCategory} >
            <SelectTrigger className="border border-black-700">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="Hoteles">Hoteles</SelectItem>
              <SelectItem value="Restaurantes">Restaurantes</SelectItem>
              <SelectItem value="Experiencias">Experiencias</SelectItem>
              <SelectItem value="Transporte">Transporte</SelectItem>
              <SelectItem value="Compras">Compras</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full mt-4 bg-white/70 hover:bg-primary/40 text-black-700 border border-black-500"
          onClick={handleSearch}
          disabled={isSearching}
        >
          <Search className="w-4 h-4 mr-2" />
          {isSearching ? "Buscando..." : "Buscar"}
        </Button>
      </Card>

      {/* Sección de Clientes VIP/Top Sponsors */}
      {/* {searchResults.length === 0 && !isSearching && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground text-center">
            ⭐ Clientes VIP - Sponsors Oficiales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allServices.filter(service => service.isVip).map((vip) => (
              <Card key={vip.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        ⭐ {vip.name}
                      </CardTitle>
                      <Badge variant="default" className="mt-2 bg-primary">
                        SPONSOR VIP
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{vip.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{vip.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {vip.phone}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {vip.schedule}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {vip.capacity}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Villavicencio
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{vip.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">Ver Detalles</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )} */}

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">
            Resultados de búsqueda ({searchResults.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <Card key={result.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-foreground group-hover:text-primary/50 transition-colors">
                        {result.name}
                      </CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {result.category}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{result.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{result.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {result.phone}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {result.schedule}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {result.capacity}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Centro
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-black">{result.price}</span>
                    <div className="flex gap-2">
                      <Button className="border border-black-500 bg-white hover:bg-primary/50 text-black-500" variant="outline" size="sm">Ver Detalles</Button>
                      <Button className="border border-black-500 bg-white hover:bg-primary/50 text-black-500" size="sm">Reservar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
