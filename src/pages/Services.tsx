
import { useState } from "react";
import { Wrench } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/common/ServiceCard";
import { useCachedData } from "@/hooks/useCachedData";
import { ServicesData } from "@/interface/interface";
import { dataService } from "@/services/dataService";


const Services = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const { data: featuredServices, isLoading } = useCachedData<ServicesData[]>({
    cacheKey: 'featured-services',
    fetchFn: dataService.getServices
  });

    const servicesToShow = featuredServices && featuredServices.length > 0 ? featuredServices : [];
  

  return (
    <div className="min-h-screen bg-white">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="services" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Wrench className="w-10 h-10 text-green-600" />
              Servicios Turísticos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Servicios especializados para hacer de tu experiencia en Villavicencio algo inolvidable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesToShow.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;

