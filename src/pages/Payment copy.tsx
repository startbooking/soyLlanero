import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, CreditCard, Calendar, Users, MapPin } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const reservationData = location.state;

  if (!reservationData) {
    navigate("/");
    return null;
  }

  const {
    hotel,
    room,
    checkInDate,
    checkOutDate,
    guests,
    children,
    firstName,
    lastName,
    email,
    phone,
    identification,
    subtotal,
    taxes,
    total
  } = reservationData;

  const handleWompiPayment = () => {
    // Aquí se integraría con Wompi
    toast({
      title: "Redirigiendo a Wompi",
      description: "Te estamos redirigiendo a la plataforma de pago segura de Wompi",
    });
    
    // Simular redirección a Wompi
    console.log("Procesando pago con Wompi:", {
      amount: total,
      customerData: { firstName, lastName, email, phone, identification },
      reservationData
    });
  };

  return (
    <div className="min-h-screen bg-accent/30">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Resumen de Pago
            </h1>
            <p className="text-muted-foreground">
              Confirma los detalles de tu reserva y procede al pago
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resumen de la Reserva */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Detalles de la Reserva
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hotel y Habitación */}
                <div className="flex gap-4">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <p className="text-muted-foreground">{room.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {hotel.location}
                    </div>
                  </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium">Check-in</p>
                    <p className="text-muted-foreground">
                      {format(new Date(checkInDate), "dd 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Check-out</p>
                    <p className="text-muted-foreground">
                      {format(new Date(checkOutDate), "dd 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>
                </div>

                {/* Huéspedes */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">
                      {guests} huésped{guests !== "1" ? "es" : ""}
                      {children !== "0" && `, ${children} niño${children !== "1" ? "s" : ""}`}
                    </span>
                  </div>
                </div>

                {/* Información del Huésped */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Información del Huésped Principal</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Nombre:</strong> {firstName} {lastName}</p>
                    <p><strong>Identificación:</strong> {identification}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Teléfono:</strong> {phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumen de Costos y Pago */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Resumen de Costos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Desglose de Costos */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal habitación</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos (19%)</span>
                    <span>${taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t">
                    <span>Total a Pagar</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Información de Pago */}
                <div className="bg-accent/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Pago Seguro</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tu pago será procesado de forma segura a través de Wompi, 
                    una plataforma de pagos confiable y certificada.
                  </p>
                  
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">💳 Tarjetas de Crédito/Débito</Badge>
                    <Badge variant="outline" className="mr-2">🏦 PSE</Badge>
                    <Badge variant="outline">📱 Nequi</Badge>
                  </div>
                </div>

                {/* Botón de Pago */}
                <Button 
                  onClick={handleWompiPayment}
                  className="w-full" 
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pagar con Wompi
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Al hacer clic en "Pagar con Wompi", aceptas nuestros términos y condiciones 
                  y política de privacidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;