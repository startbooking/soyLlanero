
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Phone, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BusinessDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [minRating, setMinRating] = useState("0");

  const categories = [
    { id: "all", name: "Todas las categorías" },
    { id: "hotels", name: "Hoteles" },
    { id: "restaurants", name: "Restaurantes" },
    { id: "adventure", name: "Aventura" },
    { id: "culture", name: "Cultura" },
    { id: "transport", name: "Transporte" },
    { id: "shopping", name: "Compras" }
  ];

  const cities = [
    { id: "all", name: "Todas las ciudades" },
    { id: "villavicencio", name: "Villavicencio" },
    { id: "acacias", name: "Acacías" },
    { id: "granada", name: "Granada" },
    { id: "puerto_lopez", name: "Puerto López" }
  ];

  const businesses = [
    {
      id: 1,
      name: "Hotel Orinoco Plaza",
      category: "hotels",
      categoryLabel: "Hotel",
      description: "Hotel de lujo en el centro de Villavicencio con vista panorámica a los llanos orientales.",
      location: "Carrera 30 #15-45, Centro",
      city: "villavicencio",
      phone: "+57 8 123 4567",
      rating: 4.8,
      reviewCount: 156,
      priceRange: "$$$",
      image: "/placeholder.svg",
      amenities: ["WiFi gratuito", "Piscina", "Spa", "Restaurante"],
      isVerified: true,
      isFeatured: true
    },
    {
      id: 2,
      name: "Restaurante Los Llanos",
      category: "restaurants",
      categoryLabel: "Restaurante",
      description: "Auténtica cocina llanera con los mejores cortes de carne y platos típicos de la región.",
      location: "Calle 37 #28-15",
      city: "villavicencio",
      phone: "+57 8 234 5678",
      rating: 4.6,
      reviewCount: 89,
      priceRange: "$$",
      image: "/placeholder.svg",
      amenities: ["Música en vivo", "Terraza", "Bar"],
      isVerified: true,
      isFeatured: false
    },
    {
      id: 3,
      name: "Llanos Adventure Tours",
      category: "adventure",
      categoryLabel: "Aventura",
      description: "Agencia especializada en turismo de aventura y ecoturismo en los llanos orientales.",
      location: "Carrera 33 #20-30",
      city: "villavicencio",
      phone: "+57 300 345 6789",
      rating: 4.9,
      reviewCount: 203,
      priceRange: "$$",
      image: "/placeholder.svg",
      amenities: ["Guías certificados", "Equipo incluido", "Transporte"],
      isVerified: true,
      isFeatured: true
    },
    {
      id: 4,
      name: "Hotel Casa Blanca",
      category: "hotels",
      categoryLabel: "Hotel",
      description: "Hotel boutique con arquitectura colonial y servicios modernos en zona tranquila.",
      location: "Carrera 25 #18-20",
      city: "acacias",
      phone: "+57 8 345 6789",
      rating: 4.4,
      reviewCount: 67,
      priceRange: "$$",
      image: "/placeholder.svg",
      amenities: ["Jardín", "WiFi", "Desayuno incluido"],
      isVerified: false,
      isFeatured: false
    },
    {
      id: 5,
      name: "Asadero El Hato",
      category: "restaurants",
      categoryLabel: "Restaurante",
      description: "Especialistas en carne asada a la llanera y platos tradicionales de la región.",
      location: "Avenida 40 #22-15",
      city: "granada",
      phone: "+57 8 456 7890",
      rating: 4.3,
      reviewCount: 124,
      priceRange: "$",
      image: "/placeholder.svg",
      amenities: ["Parqueadero", "Aire acondicionado", "Delivery"],
      isVerified: true,
      isFeatured: false
    },
    {
      id: 6,
      name: "Museo del Llano",
      category: "culture",
      categoryLabel: "Cultura",
      description: "Espacio cultural dedicado a preservar y mostrar la historia y tradiciones llaneras.",
      location: "Calle 39 #30-05",
      city: "puerto_lopez",
      phone: "+57 8 567 8901",
      rating: 4.7,
      reviewCount: 45,
      priceRange: "$",
      image: "/placeholder.svg",
      amenities: ["Guías especializados", "Tienda de souvenirs", "Cafetería"],
      isVerified: true,
      isFeatured: true
    }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory;
    const matchesCity = selectedCity === "all" || business.city === selectedCity;
    const matchesRating = business.rating >= parseFloat(minRating);
    
    return matchesSearch && matchesCategory && matchesCity && matchesRating;
  });

  const handleViewDetails = (businessId: number) => {
    navigate(`/business/${businessId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Directorio de Empresas</h1>
        <p className="text-muted-foreground text-lg">
          Descubre las mejores empresas turísticas de Villavicencio y los Llanos Orientales
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Filtros de búsqueda</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Barra de búsqueda */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtro por categoría */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro por ciudad */}
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro por calificación */}
          <Select value={minRating} onValueChange={setMinRating}>
            <SelectTrigger>
              <SelectValue placeholder="Calificación mínima" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Todas las calificaciones</SelectItem>
              <SelectItem value="3">3+ estrellas</SelectItem>
              <SelectItem value="4">4+ estrellas</SelectItem>
              <SelectItem value="4.5">4.5+ estrellas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          Mostrando {filteredBusinesses.length} de {businesses.length} empresas
        </p>
      </div>

      {/* Grid de tarjetas de empresas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No se encontraron empresas</h3>
            <p className="text-muted-foreground">
              Intenta cambiar los filtros o el término de búsqueda
            </p>
          </div>
        ) : (
          filteredBusinesses.map((business) => (
            <Card key={business.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {business.categoryLabel}
                    </Badge>
                    {business.isFeatured && (
                      <Badge className="bg-orange-500 text-white">
                        Destacado
                      </Badge>
                    )}
                  </div>
                  
                  {business.isVerified && (
                    <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                      Verificado
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {business.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium text-sm">{business.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">
                            ({business.reviewCount})
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">{business.priceRange}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-2 mb-3">
                    {business.description}
                  </CardDescription>

                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{business.location}</span>
                  </div>

                  {/* Amenidades */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {business.amenities.slice(0, 2).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {business.amenities.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{business.amenities.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => window.open(`tel:${business.phone}`, '_self')}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Contactar
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => handleViewDetails(business.id)}
                    >
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Paginación - se puede implementar más adelante */}
      {filteredBusinesses.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              Anterior
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
