
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5" />
            Política de Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Utilizamos cookies para mejorar tu experiencia de navegación, 
            personalizar contenido y analizar nuestro tráfico. Al continuar 
            navegando, aceptas nuestro uso de cookies.
          </p>
          <div className="flex gap-2">
            <Button onClick={acceptCookies} className="flex-1">
              Aceptar
            </Button>
            <Button variant="outline" onClick={rejectCookies} className="flex-1">
              Rechazar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
