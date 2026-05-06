import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, ArrowRight, Sparkles, Compass, PartyPopper } from "lucide-react";
import { useTranslations } from "@/utils/translations";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  language: string;
}

export const HeroSection = ({ language }: HeroSectionProps) => {
  const t = useTranslations(language);
  const { appTexts, appConfig, appStats } = useAppConfig();
  const navigate = useNavigate();

  const features = [
    {
      icon: Compass,
      title: t.hero.features.location.title,
      description: t.hero.features.location.description,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Star,
      title: t.hero.features.experiences.title,
      description: t.hero.features.experiences.description,
      color: "text-yellow-500",
      bg: "bg-yellow-50"
    },
    {
      icon: PartyPopper,
      title: t.hero.features.events.title,
      description: t.hero.features.events.description,
      color: "text-sabana",
      bg: "bg-sabana/10"
    },
  ];

  return (
    <div className="relative">
      {/* SECCIÓN HERO PRINCIPAL */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Fondo con gradiente y textura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sabana/20 via-white to-slate-50" />
        
        {/* Decoración de fondo (Círculos difusos) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sabana/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            
            {/* Badge Premium */}
            <div className="flex justify-center animate-fade-in">
              <Badge className="bg-white shadow-xl shadow-slate-200 border-none text-slate-900 px-6 py-2 rounded-full flex items-center gap-2 group cursor-default">
                <Sparkles className="w-4 h-4 text-sabana animate-pulse" />
                <span className="font-black uppercase tracking-widest text-[10px]">{t.hero.badge}</span>
              </Badge>
            </div>

            {/* Título Monumental */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
                {appTexts?.hero_title || t.hero.welcome}
                <br />
                <span className="text-sabana italic">{appConfig?.app_name || "SACTEL"}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                {appTexts?.hero_subtitle || t.hero.subtitle}
              </p>
            </div>

            {/* Estadísticas en Capsulas */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-12 py-8 animate-fade-in">
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">{appStats?.activeBusinesses || "120"}+</span>
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-400">{t.hero.stats.businesses}</span>
              </div>
              <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">{appStats?.activeEvents || "25"}+</span>
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-400">{t.hero.stats.events}</span>
              </div>
              <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <span className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">
                    {Number(appStats?.averageBusinnesses ?? 4.9).toFixed(1)}
                  </span>
                </div>
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-400">{t.hero.stats.rating}</span>
              </div>
            </div>

            {/* Botones de Acción de Gran Tamaño */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                variant="default"
                size="lg"
                className="h-16 px-10 hover:bg-sabana/80 text-white rounded-2xl font-black uppercase tracking-tighter text-sm transition-all hover:scale-105 shadow-2xl shadow-slate-200"
                onClick={() => navigate("/points-of-interest")}
              >
                <MapPin className="w-5 h-5 mr-2 text-white" />
                Explorar Destinos
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="h-16 px-10 border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-black uppercase tracking-tighter text-sm transition-all hover:scale-105"
                onClick={() => navigate("/events")}
              >
                <Calendar className="w-5 h-5 mr-2 text-slate" />
                Agenda de Eventos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS (TARJETAS) */}
      <section className="container mx-auto px-4 mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-[2.5rem] bg-white border-none shadow-xl shadow-slate-200/50 transition-all duration-500 hover:translate-y-[-10px]"
            >
              <div className={`w-16 h-16 mb-6 ${feature.bg} rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tighter group-hover:text-sabana transition-colors">
                {feature.title}
              </h3> 
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
              <div className="pt-6">
                 <div className="w-10 h-1 bg-slate-100 group-hover:w-full group-hover:bg-sabana transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};