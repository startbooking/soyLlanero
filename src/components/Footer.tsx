import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Home, Star } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { PolicyModal } from "@/components/modals/PolicyModal";
import { TermsOfUseContent } from "@/components/modals/policies/TermsOfUseContent";
import { PrivacyPolicyContent } from "@/components/modals/policies/PrivacyPolicyContent";
import { ChildProtectionContent } from "@/components/modals/policies/ChildProtectionContent";
import { FaunaFloraContent } from "@/components/modals/policies/FaunaFloraContent";
import { SustainableTourismContent } from "@/components/modals/policies/SustainableTourismContent";
import { DisclaimerContent } from "@/components/modals/policies/DisclaimerContent";
import { useState } from "react";
import { LogoSection } from "./header/LogoSection";
import { AuthModal } from "./AuthModal";

type PolicyType =
  | "terms"
  | "privacy"
  | "childProtection"
  | "faunaFlora"
  | "sustainable"
  | "disclaimer"
  | null;

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardRoute = location.pathname.startsWith("/admin");
  const { appConfig, footerConfig } = useAppConfig();
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isDashboardRoute) {
    return null;
  }

  const handleNavigation = (item: any) => {
    navigate("/");
  };

  const handleHomeClick = () => {
    handleNavigation({ id: "home", route: "/" });
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const policies = [
    {
      key: "terms" as PolicyType,
      label: "Términos de uso",
      title: "Términos de Uso del Sitio Web y Servicios del Clúster",
    },
    {
      key: "privacy" as PolicyType,
      label: "Política de privacidad",
      title: "Política de Privacidad y Tratamiento de Datos Personales",
    },
    {
      key: "sustainable" as PolicyType,
      label: "Turismo sostenible",
      title: "Declaración de Turismo Sostenible",
    },
    {
      key: "childProtection" as PolicyType,
      label: "Protección infantil",
      title: "Política de Protección de Niños, Niñas y Adolescentes en Turismo",
    },
    {
      key: "faunaFlora" as PolicyType,
      label: "Fauna y flora",
      title: "Política de Conservación de Fauna y Flora",
    },
    {
      key: "disclaimer" as PolicyType,
      label: "Exoneración de responsabilidad",
      title:
        "Exoneración de Responsabilidad Frente a Reservas y Servicios Turísticos",
    },
  ];

  const renderPolicyContent = () => {
    switch (activePolicy) {
      case "terms":
        return <TermsOfUseContent />;
      case "privacy":
        return <PrivacyPolicyContent />;
      case "childProtection":
        return <ChildProtectionContent />;
      case "faunaFlora":
        return <FaunaFloraContent />;
      case "sustainable":
        return <SustainableTourismContent />;
      case "disclaimer":
        return <DisclaimerContent />;
      default:
        return null;
    }
  };

  const getActiveTitle = () => {
    return policies.find((p) => p.key === activePolicy)?.title || "";
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-primary/5 to-accent/5 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Información de la app */}
            <div className="space-y-4">
              <LogoSection onHomeClick={handleHomeClick} />
              <p className="text-sm text-muted-foreground text-justify">
                {footerConfig?.company_description ||
                  "Plataforma  oficial del clúster de turismo de Villavicencio. Promoviendo el turismo sostenible y las empresas locales."}
              </p>
              <div className="flex gap-2">
                <Badge variant="sabana" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  120+ Empresas
                </Badge>
                <Badge variant="sabana" className="text-xs">
                  25+ Eventos
                </Badge>
              </div>
            </div>
            {/* Políticas de datos */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                Políticas de Datos
              </h4>
              <div className="space-y-2">
                {policies.map((policy) => (
                  <button
                    key={policy.key}
                    onClick={() => setActivePolicy(policy.key)}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {policy.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Para empresas */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Para empresas</h4>
              <div className="space-y-2">
                <Link
                  to="/afiliacion"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Registrar empresa
                </Link>
                {/* <Link to="/business-owner/dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Panel de control
                </Link>
                 */}
                {/* <Link to="/login" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Panel de control
                </Link> */}
                <Link
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors" // Clases mejoradas
                  // La función handleLoginClick debería manejar internamente la lógica de:
                  // 1. Mostrar el modal
                  // 2. Opcionalmente, prevenir la navegación predeterminada si el Link tiene un "to" o "href"
                  onClick={handleLoginClick}
                >
                  {/* <LogIn className="w-4 h-4" /> */}
                  <span className="hidden sm:inline">Panel de control</span>
                </Link>
                <Link
                  to="/business/promote"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Promocionar servicios
                </Link>
                <Link
                  to="/business/statistics"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Estadísticas
                </Link>
                <Link
                  to="/business/support"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Soporte técnico
                </Link>
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    {(
                      appConfig?.company_address ||
                      ""
                    )
                      .split("\n")
                      .map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {appConfig?.company_movil || "+57 0 123 4567"}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {appConfig?.company_email || "info@sactel.cloud"}
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-2">
                <h5 className="font-medium text-foreground text-sm">
                  Newsletter
                </h5>
                <div className="flex gap-2">
                  <Input placeholder="Email" className="h-8 text-xs" />
                  <Button size="sm" className="h-8 px-3 text-xs">
                    Suscribirse
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary/20 backdrop-blur-md border-t border-border mt-1 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <a
                className="text-brown font-bold"
                target="_blank"
                href="https://sactel.cloud"
              >
                © SACTel Cloud
              </a>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a
                target="_blank"
                href="https://sactel.cloud"
                className="hover:text-primary transition-colors"
              >
                2025 Todos los derechos reservados.
              </a>
            </div>
          </div>
        </div>
      </footer>
      <PolicyModal
        open={activePolicy !== null}
        onOpenChange={(open) => !open && setActivePolicy(null)}
        title={getActiveTitle()}
      >
        {renderPolicyContent()}
      </PolicyModal>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};
