
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Newspaper, Calendar, Users } from "lucide-react";
import { useTranslations } from "@/utils/translations";
import { useNavigate } from "react-router-dom";
import AffiliationPresentation from "@/pages/AffiliationPresentation";

interface AffiliationSectionProps {
  language: string;
}

export const AffiliationSection = ({ language }: AffiliationSectionProps) => {
  const t = useTranslations(language);
  const navigate = useNavigate();

  const affiliationOptions = [
    {
      icon: Building2,
      title: language === "en" 
        ? "Become a Tourism Provider"
        : language === "fr"
        ? "Devenir Fournisseur Touristique"
        : "Afiliarse como Proveedor Turístico",
      description: language === "en"
        ? "Join our network of hotels, restaurants, and tourism services. Increase your visibility and reach more customers."
        : language === "fr"
        ? "Rejoignez notre réseau d'hôtels, restaurants et services touristiques. Augmentez votre visibilité et atteignez plus de clients."
        : "Únete a nuestra red de hoteles, restaurantes y servicios turísticos. Aumenta tu visibilidad y llega a más clientes.",
      buttonText: language === "en"
        ? "Join Now"
        : language === "fr"
        ? "Rejoindre Maintenant"
        : "Afiliarme Ahora",
      action: () => navigate("/afiliacion")
    },
    {
      icon: Newspaper,
      title: language === "en"
        ? "Publish News"
        : language === "fr"
        ? "Publier des Nouvelles"
        : "Publicar Noticia",
      description: language === "en"
        ? "Share relevant news about tourism in Villavicencio. Keep the community informed about important updates."
        : language === "fr"
        ? "Partagez des nouvelles pertinentes sur le tourisme à Villavicencio. Tenez la communauté informée des mises à jour importantes."
        : "Comparte noticias relevantes sobre el turismo en Villavicencio. Mantén a la comunidad informada sobre actualizaciones importantes.",
      buttonText: language === "en"
        ? "Publish News"
        : language === "fr"
        ? "Publier"
        : "Publicar Noticia",
      action: () => navigate("/contact")
    },
    {
      icon: Calendar,
      title: language === "en"
        ? "Publish Event"
        : language === "fr"
        ? "Publier un Événement"
        : "Publicar Evento",
      description: language === "en"
        ? "Promote your tourism events and activities. Reach a wider audience and increase participation."
        : language === "fr"
        ? "Promouvez vos événements et activités touristiques. Atteignez un public plus large et augmentez la participation."
        : "Promociona tus eventos y actividades turísticas. Llega a una audiencia más amplia y aumenta la participación.",
      buttonText: language === "en"
        ? "Publish Event"
        : language === "fr"
        ? "Publier"
        : "Publicar Evento",
      action: () => navigate("/contact")
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {language === "en"
            ? "Join Our Tourism Community"
            : language === "fr"
            ? "Rejoignez Notre Communauté Touristique"
            : "Únete a Nuestra Comunidad Turística"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Be part of the growth of tourism in Villavicencio. Affiliate as a provider or share relevant content with our community."
            : language === "fr"
            ? "Faites partie de la croissance du tourisme à Villavicencio. Affiliez-vous en tant que fournisseur ou partagez du contenu pertinent avec notre communauté."
            : "Sé parte del crecimiento del turismo en Villavicencio. Afíliate como proveedor o comparte contenido relevante con nuestra comunidad."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {affiliationOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-black/20 transition-colors">
                  <IconComponent className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-foreground group-hover:text-black transition-colors">
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6">
                  {option.description}
                </CardDescription>
                <Button 
                  onClick={option.action}
                  className="w-full border border-black-500 text-black-500 bg-black/500 hover:bg-primary/50 transition-colors"
                >
                  {option.buttonText}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm border">
          <Users className="w-5 h-5 text-black mr-2" />
          <span className="text-sm text-muted-foreground">
            {language === "en"
              ? "Join over 200+ tourism providers in Villavicencio"
              : language === "fr"
              ? "Rejoignez plus de 200+ fournisseurs touristiques à Villavicencio"
              : "Únete a más de 200+ proveedores turísticos en Villavicencio"}
          </span>
        </div>
      </div>
      {/* <AffiliationPresentation language={language}/> */}
    </section>
  );
};
