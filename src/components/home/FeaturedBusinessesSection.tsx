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

  const businessesToShow = featuredBusinesses && featuredBusinesses.length > 0 ? featuredBusinesses : [];
  
  const vipBusinesses = businessesToShow.filter(
    (business) => business.is_vip === 1
  );


  const shuffledItems = useMemo(() => shuffleArray(vipBusinesses), [vipBusinesses]);
  const businessesToShowSlide = shuffleArray(shuffledItems).slice(0, 3);
  // console.log(businessesToShowSlide);


  // Refactorización: La función ahora acepta el objeto Business completo
  // y lo pasa en el estado de navegación.
  const handleViewDetails = (business: Business) => {
    navigate(`/featured-business/${business.id}`, { state: { business } });
  };

  if (isLoading) {
    return (
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {appTexts?.featured_businesses_title || 'Clientes VIP - Sponsors'}
            </h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">
              {appTexts?.featured_businesses_subtitle || 'Experiencias Excepcionaes de nuestros Socios'}
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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {appTexts?.featured_businesses_title || 'Clientes VIP - Sponsors'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {appTexts?.featured_businesses_subtitle || 'Experiencias Excepcionaes de nuestros Socios'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessesToShowSlide.map((business) => (
            <BusinessCard
              key={business.id}
              id={business.id}
              name={business.name}
              phone={business.phone}
              email={business.email}
              category={business.categoria}
              address={business.address}
              rating={business.rating}
              image={business.image}
              amenities={business.amenities}
              specialties={business.specialties}
              description={business.description}
              is_sponsor={business.is_sponsor}
              price={business.price}
              taxes={business.taxes}
              tax_percentage={business.tax_percentage}
              onViewDetails={() => handleViewDetails(business)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};