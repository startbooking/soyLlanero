import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Home, Star } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAppConfig } from "@/contexts/AppConfigContext";

export const Footer = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/admin");
  const { appConfig, footerConfig } = useAppConfig();

  if (isDashboardRoute) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-accent/5 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la app */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-llanos rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">
                  {appConfig?.app_name?.[0] || "V"}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">
                  {appConfig?.app_name || "Cluster de Turismo"}
                </h3>
                {/* <p className="text-xs text-muted-foreground">
                  de Villavicencio y el Meta Turismo
                </p> */}
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-justify">
              {footerConfig?.company_description ||
                "Plataforma  oficial del clúster de turismo de Villavicencio. Promoviendo el turismo sostenible y las empresas locales."}
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                120+ Empresas
              </Badge>
              <Badge variant="secondary" className="text-xs">
                25+ Eventos
              </Badge>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Enlaces rápidos</h4>
            <div className="space-y-2">
              {(() => {
                const quickLinks = Array.isArray(footerConfig?.quick_links)
                  ? footerConfig.quick_links
                  : typeof footerConfig?.quick_links === "string"
                  ? JSON.parse(footerConfig.quick_links || "[]")
                  : [
                      "Directorio de empresas",
                      "Calendario de eventos",
                      "Mapa interactivo",
                      "Rutas turísticas",
                      "Guías de viaje",
                    ];

                return quickLinks.map((link: string, index: number) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                ));
              })()}
            </div>
          </div>

          {/* Para empresas */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Para empresas</h4>
            <div className="space-y-2">
              {(() => {
                const businessLinks = Array.isArray(
                  footerConfig?.business_links
                )
                  ? footerConfig.business_links
                  : typeof footerConfig?.business_links === "string"
                  ? JSON.parse(footerConfig.business_links || "[]")
                  : [
                      "Registrar empresa",
                      "Panel de control",
                      "Promocionar servicios",
                      "Estadísticas",
                      "Soporte técnico",
                    ];

                return businessLinks.map((link: string, index: number) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                ));
              })()}
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
                    "Alcaldía de Villavicencio\nCarrera 35 #15-30\nVillavicencio, Meta"
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
                  {appConfig?.company_movil ||
                    "+57 8 123 4567"}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {appConfig?.company_email ||
                  "info@villavicencio-turismo.com"}
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

        {/* Línea divisoria y copyright */}
        {/* <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {footerConfig?.copyright_text || '© 2024 Villavicencio Turismo. Todos los derechos reservados.'}
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">
                Términos de uso
              </Link>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Política de privacidad
              </Link>
              <Link to="/sustainable-tourism" className="hover:text-primary transition-colors">
                Turismo sostenible
              </Link>
              <Link to="/child-protection" className="hover:text-primary transition-colors">
                Protección infantil
              </Link>
              <Link to="/reservation-policies" className="hover:text-primary transition-colors">
                Políticas de reserva
              </Link>
              <Link to="/cancellation-policies" className="hover:text-primary transition-colors">
                Cancelaciones
              </Link>
              <Link to="/habeas-data" className="hover:text-primary transition-colors">
                Habeas Data
              </Link>
            </div>
          </div>
        </div> */}

        {/* <div className="bg-primary/20 backdrop-blur-md text-black-700 px-1 md:px-4 text-xs fixed  top-0 left-0 right-0 z-50 hover:bg-green/20"> */}
      </div>
      <div className="bg-primary/20 backdrop-blur-md border-t border-border mt-1 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025{" "}
            <a
              className="text-brown font-bold"
              target="_blank"
              href="https://sactel.cloud"
            >
              SACTel Cloud
            </a>
            . Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Términos de uso
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Turismo sostenible
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
