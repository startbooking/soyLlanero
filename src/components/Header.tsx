import { useState } from "react";
import { useTranslations } from "@/utils/translations";
import { AuthModal } from "./AuthModal";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoSection } from "./header/LogoSection";
import { NavigationItems, createNavigationItems } from "./header/NavigationItems";
import { MobileMenu } from "./header/MobileMenu";
import { WhatsAppButton } from "./header/WhatsAppButton";
import { UserMenu } from "./dashboard/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAuthAction } from "./header/UserAuthAction";

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  language: string;
}

export const Header = ({ activeSection, onSectionChange, language }: HeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslations(language);
  const { isAuthenticated } = useAuth();

  const navigationItems = createNavigationItems(t);
  const isDashboardRoute = location.pathname.startsWith('/admin');

  const handleNavigation = (item: any) => {
    if (item.route === "/") {
      navigate("/");
      onSectionChange(item.id);
    } else {
      navigate(item.route);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-8 md:top-6 left-0 right-0",
          "bg-slate-800 md:bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm h-20 flex items-center z-[100]"
        )}
      >
        <div className="container mx-auto px-4 ">
          <div className="flex items-center justify-between gap-4">

            {/* Logo: Siempre visible */}
            <LogoSection onHomeClick={() => handleNavigation({ id: "home", route: "/" })} />

            {/* Navegación Central: Visible solo en Desktop (lg) */}
            {!isDashboardRoute && (
              <>
                <div className="">
                  <NavigationItems
                    navigationItems={navigationItems}
                    activeSection={activeSection}
                    onNavigation={handleNavigation}
                  />
                </div>
                {/* Gatillo del Menú Móvil: Visible en < lg */}
                <div className="lg:hidden bg-white rounded-md">
                  <MobileMenu
                    navigationItems={navigationItems}
                    activeSection={activeSection}
                    onNavigation={handleNavigation}
                    onUniqueExperiencesClick={() => navigate('/unique-experiences')}
                    onAdminClick={() => navigate('/admin/dashboard')}
                  />
                </div>
              </>
            )}
            {/* Acciones de Usuario y Menú Móvil */}
          </div>
        </div>
      </header>

      {/* Botón flotante de WhatsApp: No se muestra en el panel admin */}
      {!isDashboardRoute && <WhatsAppButton />}
    </>
  );
};