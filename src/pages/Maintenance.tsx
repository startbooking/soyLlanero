import { useAppConfig } from "@/contexts/AppConfigContext";
import { Construction, Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Maintenance = () => {
  const { appConfig } = useAppConfig();

  console.log(appConfig)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-2xl border-border/50">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative bg-primary/10 p-6 rounded-full">
                <Construction className="w-16 h-16 md:w-20 md:h-20 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          {/* Logo */}
          {appConfig?.app_logo_url && (
            <div className="flex justify-center">
              <img 
                src={`images/${appConfig.app_logo_url}`} 
                alt={appConfig.app_name || "Logo"} 
                className="h-16 md:h-20 object-contain"
              />
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Estamos en Mantenimiento
            </h1>
            <p className="text-lg text-muted-foreground">
              {appConfig?.app_name || "Nuestro sitio"} se encuentra temporalmente fuera de servicio
            </p>
          </div>

          {/* Message */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Volveremos pronto</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Estamos realizando mejoras y actualizaciones importantes para ofrecerte 
              una mejor experiencia. Nuestro equipo está trabajando arduamente para 
              volver a estar en línea lo antes posible.
            </p>
          </div>

          {/* Contact Info */}
          {(appConfig?.email || appConfig?.phone) && (
            <div className="space-y-3 pt-4">
              <p className="text-sm font-medium text-foreground">
                Si necesitas asistencia inmediata:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {appConfig.email && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.location.href = `mailto:${appConfig.email}`}
                  >
                    <Mail className="w-4 h-4" />
                    {appConfig.email}
                  </Button>
                )}
                {appConfig.phone && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.location.href = `tel:${appConfig.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                    {appConfig.phone}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Footer Note */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Gracias por tu paciencia y comprensión
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Maintenance;
