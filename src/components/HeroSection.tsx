import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, ArrowRight } from "lucide-react";
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
      icon: MapPin,
      title: t.hero.features.location.title,
      description: t.hero.features.location.description,
    },
    {
      icon: Star,
      title: t.hero.features.experiences.title,
      description: t.hero.features.experiences.description,
    },
    {
      icon: Calendar,
      title: t.hero.features.events.title,
      description: t.hero.features.events.description,
    },
  ];

  // console.log(appStats)

  return (
    <>
      <section className="relative min-h-[80vh] py-10 flex items-center justify-center overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-sabana/50 via-background to-accent/50" />

        {/* Patrones decorativos */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-sabana rounded-full animate-pulse" />
          <div className="absolute bottom-40 right-32 w-24 h-24 border-2 border-accent rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-secondary rounded-full animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge de bienvenida */}
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm animate-fade-in text-black-700"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {t.hero.badge}
            </Badge>

            {/* Título principal */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              {appTexts?.hero_title || t.hero.welcome}{" "}
            </h1>
            <span className="text-xl md:text-2xl lg:text-3xl  bg-gradient-to-r from-sabana via-accent to-secondary bg-clip-text text-black-700">
              {appConfig?.app_name || "Plataforma Turismo SACTel"}
            </span>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-muted-foreground m-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              {appTexts?.hero_subtitle || t.hero.subtitle}
            </p>

            {/* Estadísticas destacadas */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in">
              <div className="text-center">
                <div className="text-3xl font-bold text-text-black-700">
                  {appStats?.activeBusinesses}+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.hero.stats.businesses}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-text-black-700">
                  {appStats?.activeEvents} +
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.hero.stats.events}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-3xl font-bold text-text-black-700">
                    {/* {Number(appStats?.averageBusinnesses).toFixed(2)} */}
                    {Number(appStats?.averageBusinnesses ?? 5).toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.hero.stats.rating}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-sabana/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-black/20 to-accent/20 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-sabana" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-sabana transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Elementos flotantes decorativos */}
        <div className="absolute bottom-10 left-10 w-6 h-6 bg-sabana/20 rounded-full animate-pulse float-animation" />
        <div
          className="absolute top-32 right-16 w-4 h-4 bg-accent/30 rounded-full animate-pulse float-animation"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 right-1/4 w-8 h-8 bg-secondary/20 rounded-full animate-pulse float-animation"
          style={{ animationDelay: "2s" }}
        />
      </section>
      {/* Botones de acceso rápido */}

      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-sabana hover:bg-sabana/50 text-black-500 border border-black-400"
            onClick={() => navigate("/points-of-interest")}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Explorar Destinos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-sabana hover:bg-sabana/50 text-black-500 border border-black-400"
            onClick={() => navigate("/events")}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Ver Eventos
          </Button>
        </div>
      </section>
    </>
  );
};
