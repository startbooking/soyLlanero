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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm h-20 flex items-center"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo: Siempre visible */}
            <LogoSection onHomeClick={() => handleNavigation({ id: "home", route: "/" })} />

            {/* Navegación Central: Visible solo en Desktop (lg) */}
            {!isDashboardRoute && (
              <div className="">
                <NavigationItems
                  navigationItems={navigationItems}
                  activeSection={activeSection}
                  onNavigation={handleNavigation}
                />
              </div>
            )}

            {/* Acciones de Usuario y Menú Móvil */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Botón Experiencias: Solo Desktop para evitar saturación */}
              {/* {!isDashboardRoute && (
                <Button
                  variant="ghost"
                  onClick={() => navigate('/unique-experiences')}
                  className="hidden xl:flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-slate-600 hover:text-sabana transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-sabana animate-pulse" />
                  Experiencias
                </Button>
              )} */}

              {/* Autenticación / Dashboard */}
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="hidden sm:flex h-10 px-6 rounded-xl bg-white text-slate font-black uppercase text-[10px] tracking-widest hover:bg-sabana/20 transition-all"
                  onClick={() => setShowAuthModal(true)}
                >
                  <LogIn className="w-3.5 h-3.5 mr-2 text-slate" />
                  Ingresar
                </Button>
              )}

              {/* Gatillo del Menú Móvil: Visible en < lg */}
              {/* <div className="lg:hidden">
                <MobileMenu
                  navigationItems={navigationItems}
                  activeSection={activeSection}
                  onNavigation={handleNavigation}
                  onUniqueExperiencesClick={() => navigate('/unique-experiences')}
                  onAdminClick={() => navigate('/admin/dashboard')}
                />
              </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Botón flotante de WhatsApp: No se muestra en el panel admin */}
      {!isDashboardRoute && <WhatsAppButton />}

      {/* Modal Global de Autenticación */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};