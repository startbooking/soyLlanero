import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Users,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info
} from "lucide-react";
import { dataService } from "@/services/dataService";
import { useCachedData } from "@/hooks/useCachedData";
import { Experience } from "@/interface/interface";
import { useBusinessActions } from "@/hooks/useBusinessActions"; // Usando el hook que creamos

export const ExperienceDetailPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { handleNavigation } = useBusinessActions(); // Hook de navegación unificado

  const { id: experienceIdFromUrl } = useParams<{ id: string }>();

  const { data: allExperiences, isLoading } = useCachedData<Experience[]>({
    cacheKey: "featured-experiences",
    fetchFn: dataService.getExperiences,
  });

  const experience = allExperiences?.find(
    (exp) => exp.id == experienceIdFromUrl
  );
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [experienceIdFromUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-sabana border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-black uppercase tracking-tighter italic">Cargando experiencia...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">No encontrada</h1>
        <Button 
          className="bg-slate-900 text-white rounded-2xl font-black px-8 py-6 uppercase tracking-tighter h-14"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="experiences" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-28 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Botón Volver con estilo minimalista */}
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 flex items-center gap-2 text-slate-400 hover:text-sabana transition-colors font-black uppercase text-[10px] tracking-widest"
          >
            <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Volver a experiencias
          </button>

          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-5">
              
              {/* COLUMNA IZQUIERDA: IMAGEN (3/5) */}
              <div className="lg:col-span-3 relative h-[50vh] lg:h-[85vh] overflow-hidden">
                <img
                  src={`/images/experiences/${experience.image}`}
                  alt={experience.name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                
                {/* Badges sobre la imagen */}
                <div className="absolute top-8 left-8 flex gap-2">
                  <Badge className="bg-sabana text-white border-none font-black uppercase text-[10px] px-4 py-1.5 shadow-lg shadow-sabana/20">
                    {experience.category}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-none font-black uppercase text-[10px] px-4 py-1.5">
                    <Sparkles className="w-3 h-3 mr-2 inline" /> Recomendado
                  </Badge>
                </div>

                {/* Título sobre la imagen */}
                <div className="absolute bottom-12 left-12 right-12">
                  <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                    {experience.name}
                  </h1>
                  <div className="flex items-center text-white/80 font-bold italic text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-sabana" />
                    {experience.location}
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: INFO (2/5) */}
              <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col">
                
                <div className="flex-grow space-y-8">
                  {/* Breve descripción destacada */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-1 bg-sabana rounded-full" />
                      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resumen del tour</h2>
                    </div>
                    <p className="text-xl font-bold text-slate-700 leading-tight italic">
                      "{experience.short_description}"
                    </p>
                  </div>

                  {/* Grid de Información Clave */}
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem icon={Calendar} label="Fecha" value={experience.date} />
                    <InfoItem icon={Clock} label="Duración" value={experience.duration || experience.time} />
                    <InfoItem icon={Users} label="Capacidad" value={`${experience.max_people || experience.capacity} Pers.`} />
                    <InfoItem icon={ShieldCheck} label="Seguro" value="Incluido" />
                  </div>

                  <hr className="border-slate-100" />

                  {/* Descripción Larga */}
                  <div className="space-y-4">
                    <h3 className="font-black text-slate-900 uppercase tracking-tighter text-sm">Detalles de la aventura</h3>
                    <p className="text-slate-500 text-sm leading-relaxed text-justify font-medium">
                      {experience.long_description}
                    </p>
                  </div>
                </div>

                {/* Footer de la tarjeta: Precio y Acciones */}
                <div className="mt-12 border-t border-slate-100">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Precio por persona</p>
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">
                        {experience.is_free || experience.price === "0" ? "GRATIS" : `$${experience.price}`}
                      </p>
                    </div>
                    <Badge className="bg-green-50 text-green-600 border-none font-bold text-[10px] px-3 py-1 uppercase">Cupos disponibles</Badge>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-sabana hover:bg-sabana/90 text-white rounded-2xl font-black uppercase tracking-tighter h-16 text-lg shadow-xl shadow-sabana/20 transition-all hover:scale-[1.02]"
                      onClick={() => navigate('/experience-reservation', { state: { experience } })}
                    >
                      Reservar aventura
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <Button
                      variant="secondary"
                      onClick={() => handleNavigation({ name: experience.name, location: experience.location })}
                      className="w-full hover:text-slate-900 font-black uppercase tracking-widest text-[10px]"
                    >
                      <Navigation className="w-3 h-3 mr-2" />
                      Cómo llegar al punto de encuentro
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Componente auxiliar estilizado para la información
const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
    <div className="p-2 bg-white rounded-xl shadow-sm">
      <Icon className="w-4 h-4 text-sabana" />
    </div>
    <div>
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter leading-none mb-1">{label}</p>
      <p className="text-xs font-bold text-slate-700 leading-none">{value}</p>
    </div>
  </div>
);

export default ExperienceDetailPage;