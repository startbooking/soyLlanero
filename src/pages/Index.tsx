
import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { BusinessDirectory } from "@/components/BusinessDirectory";
import { EventsCalendar } from "@/components/EventsCalendar";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { HomeContent } from "@/components/home/HomeContent";
import { useTranslations } from "@/utils/translations";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();
  const t = useTranslations(currentLanguage);

  const handleSectionChange = (section: string) => {
    if (section === "contact") {
      navigate("/contact");
    } else if (section === "news") {
      navigate("/news");
    } else if (section === "institutional") {
      navigate("/institutional");
    } else {
      setActiveSection(section);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "businesses":
        return <BusinessDirectory />;
      case "events":
        return <EventsCalendar />;
      case "map":
        return <InteractiveMap />;
      case "experiences":
        return (
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t.sections.experiences}</h2>
            <p className="text-center text-muted-foreground">{t.sections.inDevelopment}</p>
          </div>
        );
      case "services":
        return (
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t.sections.services}</h2>
            <p className="text-center text-muted-foreground">{t.sections.inDevelopment}</p>
          </div>
        );
      default:
        return <HomeContent language={currentLanguage} />;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  return (
    <div className="min-h-screen bg-white">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} language={currentLanguage} />
      <main className="pt-24">
        {renderSection()}
      </main>
      {activeSection === "home" && <Footer />}
      <CookieConsent />
      
    </div>
  );
};

export default Index;
