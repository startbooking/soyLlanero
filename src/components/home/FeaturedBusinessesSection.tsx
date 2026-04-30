import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { BusinessCard } from "@/components/common/BusinessCard";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { Business } from "@/interface/interface";
import { shuffleArray } from '@/utils/arrayUtils';
import { useMemo } from "react";

interface FeaturedBusinessesSectionProps {
  language: string;
}

export const FeaturedBusinessesSection = ({ language }: FeaturedBusinessesSectionProps) => {
  const navigate = useNavigate();
  const { appTexts } = useAppConfig();

  const { data: featuredBusinesses, isLoading } = useCachedData<Business[]>({
    cacheKey: 'featured-businesses',
    fetchFn: dataService.getBusinesses
  });

  // Memorizamos la lógica de filtrado y aleatoriedad para evitar cálculos en cada render
  const businessesToShowSlide = useMemo(() => {
    if (!featuredBusinesses || featuredBusinesses.length === 0) return [];
    
    const vipBusinesses = featuredBusinesses.filter(
      (business) => business.is_vip === 1
    );

    // Mezclamos y tomamos los primeros 3
    return shuffleArray([...vipBusinesses]).slice(0, 3);
  }, [featuredBusinesses]);

  const handleViewDetails = (business: Business) => {
    navigate(`/hotel/${business.id}`, { state: { hotel: business } });
  };

  if (isLoading) {
    return (
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground animate-pulse">Cargando experiencias...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            {appTexts?.featured_businesses_title || 'Clientes VIP - Sponsors'}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {appTexts?.featured_businesses_subtitle || 'Experiencias Excepcionales de nuestros Socios'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessesToShowSlide.map((business) => (
            <BusinessCard
              key={business.id}
              business={business} // Enviamos el registro completo
              onViewDetails={() => handleViewDetails(business)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};