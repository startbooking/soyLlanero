
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Phone, Mail, Globe, Navigation } from "lucide-react";

interface BusinessDetailProps {
  business: {
    id: string;
    name: string;
    type: string;
    location: string;
    description: string;
    rating: number;
    category?: string;
    image: string;
    phone?: string;
    email?: string;
    website?: string;
    specialties?: string[];
  };
}

export const BusinessDetail = ({ business }: BusinessDetailProps) => {
  const handleNavigation = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      window.open(`https://waze.com/ul?q=${encodeURIComponent(business.location)}`, '_blank');
    } else {
      window.open(`https://maps.google.com?q=${encodeURIComponent(business.location)}`, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-8">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{business.name}</h1>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">{business.location}</span>
          </div>
        </div>
        <div className="absolute top-6 right-6 flex items-center bg-white/90 rounded-full px-4 py-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
          <span className="font-bold text-lg">{business.rating}</span>
        </div>
        {business.category && (
          <Badge className="absolute top-6 left-6 bg-primary text-primary-foreground text-sm px-3 py-1">
            {business.category}
          </Badge>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Acerca de {business.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {business.description}
              </p>
              
              {business.specialties && (
                <div>
                  <h3 className="font-semibold mb-3">Especialidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {business.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {business.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <a 
                      href={`tel:${business.phone}`}
                      className="text-primary hover:underline"
                    >
                      {business.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {business.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href={`mailto:${business.email}`}
                      className="text-primary hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                </div>
              )}
              
              {business.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Sitio Web</p>
                    <a 
                      href={`https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {business.website}
                    </a>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button 
                  onClick={handleNavigation} 
                  className="w-full"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Cómo llegar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
