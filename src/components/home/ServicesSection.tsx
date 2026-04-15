
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Clock, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { ServiceCard } from "../common/ServiceCard";

interface Service {
  id: string;
  name: string;
  category: string;
  schedule: string;
  rating: number;
  price: string;
  phone: string;
  image: string;
  description: string;
  isVip?: boolean;
}

interface ServicesSectionProps {
  language: string;
}

export const ServicesSection = ({ language }: ServicesSectionProps) => {
  const navigate = useNavigate();

  const { data: featuredServices, isLoading } = useCachedData<Service[]>({
    cacheKey: 'featured-services',
    fetchFn: dataService.getServices
  });

  const serviceToShow = featuredServices && featuredServices.length > 0 ? featuredServices : [];
  const serviceToShowSlide = serviceToShow.slice(0,3)

  const handleViewDetails = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Servicios Turísticos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Servicios especializados para hacer de tu experiencia en Villavicencio algo inolvidable
            </p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Servicios Turísticos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Servicios especializados para hacer de tu experiencia en Villavicencio algo inolvidable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceToShowSlide?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-black-500 text-black-600 hover:bg-green-400"
            onClick={() => navigate('/services')}
          >
            Ver Todos los Servicios
          </Button>
        </div>
      </div>
    </section>
  );
};
