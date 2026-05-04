import { useEffect, useState } from "react";
import { Wrench, Loader2, Sparkles, ShieldCheck, Headphones, Zap } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/common/ServiceCard";
import { useCachedData } from "@/hooks/useCachedData";
import { ServicesData } from "@/interface/interface";
import { dataService } from "@/services/dataService";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const { data: featuredServices, isLoading } = useCachedData<ServicesData[]>({
    cacheKey: 'featured-services',
    fetchFn: dataService.getServices
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-sabana" />
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest animate-pulse">
          Cargando servicios exclusivos...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="services" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Cabecera Estilo Premium */}
          <header className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-sabana text-sabana font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
              Experiencia Completa
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter flex items-center justify-center gap-4">
              Servicios <span className="text-sabana">Turísticos</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Todo lo que necesitas para tu viaje: desde guías expertos hasta transporte premium y asistencia 24/7 en el Meta.
            </p>
          </header>

          {/* Sección de Beneficios Rápidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: ShieldCheck, label: "Seguros de Viaje", color: "text-blue-500" },
              { icon: Headphones, label: "Asistencia 24/7", color: "text-purple-500" },
              { icon: Sparkles, label: "Guías Certificados", color: "text-yellow-500" },
              { icon: Zap, label: "Reserva Inmediata", color: "text-sabana" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-2">
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Grid de Servicios */}
          {featuredServices && featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {featuredServices.map((service) => (
                <div key={service.id} className="group">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 max-w-4xl mx-auto">
              <Wrench className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-xl">
                Próximamente nuevos servicios turísticos.
              </p>
              <p className="text-slate-300 text-sm mt-2">Estamos curando las mejores experiencias para ti.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;