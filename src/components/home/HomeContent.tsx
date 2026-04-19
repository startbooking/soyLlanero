
import { ImageSlider } from "@/components/ImageSlider";
import { SearchSection } from "@/components/SearchSection";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "./CategoriesSection";
import { FeaturedBusinessesSection } from "./FeaturedBusinessesSection";
import { UpcomingEventsSection } from "./UpcomingEventsSection";
import { ExperiencesSection } from "./ExperiencesSection";
import { ServicesSection } from "./ServicesSection";
import { AffiliationSection } from "./AffiliationSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";

interface HomeContentProps {
  language: string;
}

export const HomeContent = ({ language }: HomeContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Slider de imágenes */}
      <section className="container mx-auto p-1">
        <ImageSlider />
      </section>

      {/* Sección de búsqueda */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <SearchSection />
      </section>

      {/* Sección hero */}
      <HeroSection language={language} />

      {/* Sección de categorías destacadas */}
      <CategoriesSection language={language} />

      {/* Sección de empresas destacadas */}
      <FeaturedBusinessesSection language={language} />

      {/* Sección de experiencias */}
      <ExperiencesSection language={language} />

      {/* Sección de servicios */}
      {/* <ServicesSection language={language} /> */}

      {/* Sección de próximos eventos */}
      <UpcomingEventsSection language={language} />

      {/* Sección de afiliación */}
      <AffiliationSection language={language} />

    </div>
  );
};
