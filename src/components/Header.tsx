
import { useState } from "react";
import { useTranslations } from "@/utils/translations";
import { AuthModal } from "./AuthModal";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoSection } from "./header/LogoSection";
import { NavigationItems, createNavigationItems } from "./header/NavigationItems";
import { MobileNavigation } from "./header/MobileNavigation";
import { UserActions } from "./header/UserActions";
import { MobileMenu } from "./header/MobileMenu";
import { WhatsAppButton } from "./header/WhatsAppButton";
import { UserMenu } from "./dashboard/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

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
  const { isAuthenticated, user } = useAuth();

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

  const handleHomeClick = () => {
    handleNavigation({ id: "home", route: "/" });
  };

  const handleAdminClick = () => {
    navigate('/admin/dashboard');
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleUniqueExperiencesClick = () => {
    navigate('/unique-experiences');
  };

  // Don't show main navigation in dashboard routes
  const showMainNavigation = !isDashboardRoute;

  return (
    <>
      <header className="fixed top-8 left-0 right-0 z-40 header-bg-green bg-white/70 border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <LogoSection onHomeClick={handleHomeClick} />

            {showMainNavigation && (
              <>
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-2">
                  <NavigationItems
                    navigationItems={navigationItems}
                    activeSection={activeSection}
                    onNavigation={handleNavigation}
                  />
                </nav>

                {/* Mobile/Tablet Navigation */}
                <MobileNavigation
                  navigationItems={navigationItems}
                  activeSection={activeSection}
                  onNavigation={handleNavigation}
                />
              </>
            )}

            {/* User Actions */}
            {isDashboardRoute && isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2">
                {!isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary/20"
                    onClick={handleLoginClick}
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Iniciar Sesión</span>
                  </Button>
                )}

                {isAuthenticated && <UserMenu />}

                {/* Mobile Menu */}
                <MobileMenu
                  navigationItems={navigationItems}
                  activeSection={activeSection}
                  onNavigation={handleNavigation}
                  onUniqueExperiencesClick={handleUniqueExperiencesClick}
                  onAdminClick={handleAdminClick}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {!isDashboardRoute && <WhatsAppButton />}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};
