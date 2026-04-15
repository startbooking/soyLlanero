
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Navigation, Phone, Clock } from "lucide-react";

export const InteractiveMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: "Hotel Orinoco Plaza",
      category: "Hoteles",
      rating: 4.8,
      address: "Carrera 30 #15-45, Centro",
      phone: "+57 8 123 4567",
      lat: 4.1420,
      lng: -73.6266,
      isVip: true
    },
    {
      id: 2,
      name: "Restaurante Los Llanos",
      category: "Restaurantes",
      rating: 4.6,
      address: "Calle 37 #28-15",
      phone: "+57 8 234 5678",
      lat: 4.1530,
      lng: -73.6350
    },
    {
      id: 3,
      name: "Bioparque Los Ocarros",
      category: "Naturaleza",
      rating: 4.9,
      address: "Km 7 Vía Puerto López",
      phone: "+57 8 345 6789",
      lat: 4.0800,
      lng: -73.5500
    },
    {
      id: 4,
      name: "Transporte VIP Llanos",
      category: "Transporte",
      rating: 4.5,
      address: "Calle 40 #25-30",
      phone: "+57 311 456 7890",
      lat: 4.1480,
      lng: -73.6300,
      isVip: true
    }
  ];

  const handleSearch = () => {
    // Lógica de búsqueda
    console.log("Buscando:", searchQuery);
  };

  const openInMaps = (location: any) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Mapa Interactivo</h2>
        <p className="text-lg text-muted-foreground">
          Explora todos los destinos y servicios turísticos de Villavicencio
        </p>
      </div>

      {/* Barra de búsqueda en la parte superior */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar lugares, empresas, servicios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mapa principal */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Mapa Interactivo</h3>
                <p className="text-muted-foreground">
                  Aquí se mostraría el mapa interactivo con todos los puntos de interés
                </p>
                <Button className="mt-4" onClick={() => openInMaps(locations[0])}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Abrir en Google Maps
                </Button>
              </div>
            </div>
            
            {/* Marcadores simulados */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer z-10 ${
                  location.isVip ? 'bg-primary' : 'bg-accent'
                }`}
                style={{
                  top: `${20 + index * 15}%`,
                  left: `${20 + index * 20}%`,
                }}
                onClick={() => setSelectedLocation(location)}
                title={location.name}
              />
            ))}
          </Card>
        </div>

        {/* Lista de ubicaciones */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Ubicaciones</h3>
          
          {/* Clientes VIP primero */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-primary">⭐ Clientes VIP</h4>
            {locations.filter(loc => loc.isVip).map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{location.name}</h4>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm ml-1">{location.rating}</span>
                    </div>
                  </div>
                  <Badge variant="default" className="mb-2 bg-primary">
                    {location.category}
                  </Badge>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {location.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {location.phone}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={() => openInMaps(location)}>
                      Ver Ruta
                    </Button>
                    <Button size="sm" variant="outline">
                      Más Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resto de ubicaciones */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-foreground">Otros Servicios</h4>
            {locations.filter(loc => !loc.isVip).map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{location.name}</h4>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm ml-1">{location.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {location.category}
                  </Badge>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {location.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {location.phone}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => openInMaps(location)}>
                      Ver Ruta
                    </Button>
                    <Button size="sm" variant="outline">
                      Más Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
