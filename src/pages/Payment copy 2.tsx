import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Importamos los nuevos componentes
import { ReservationSummary } from "@/components/payment/ReservationSummary";
import { PriceBreakdown } from "@/components/payment/PriceBreakdown";
import { Card, CardContent } from "@/components/ui/card";

const Payment = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const reservationData = location.state;

  // Efecto para redirigir si no hay datos (evita renderizado flash)
  useEffect(() => {
    if (!reservationData) {
      navigate("/", { replace: true });
    }
  }, [reservationData, navigate]);

  if (!reservationData) return null;

  const handleWompiPayment = () => {
    toast({
      title: "Redirigiendo a Wompi",
      description: "Conectando con la pasarela segura...",
    });
    
    // Simulación de lógica de checkout
    console.log("Payload para Wompi:", reservationData);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 hover:bg-white border-sabana">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver atrás
          </Button>

          <header className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Finaliza tu reserva</h1>
            <p className="text-muted-foreground mt-2 text-lg">Revisa los detalles antes de proceder al pago seguro.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Izquierda: Detalles e Info del Cliente */}
            <div className="lg:col-span-2 space-y-6">
              <ReservationSummary reservationData={reservationData} />
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4 font-semibold border-b pb-2">
                    <User className="w-4 h-4 text-primary" />
                    Información del Cliente
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm">
                    <p><span className="text-muted-foreground">Nombre:</span> {reservationData.firstName} {reservationData.lastName}</p>
                    <p><span className="text-muted-foreground">ID:</span> {reservationData.identification}</p>
                    <p><span className="text-muted-foreground">Email:</span> {reservationData.email}</p>
                    <p><span className="text-muted-foreground">Teléfono:</span> {reservationData.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna Derecha: Pago (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <PriceBreakdown 
                  subtotal={reservationData.subtotal}
                  taxes={reservationData.taxes}
                  total={reservationData.total}
                  onPayment={handleWompiPayment}
                />
                <p className="text-[10px] text-center mt-4 text-muted-foreground px-4">
                  Al completar el pago, confirmas que has leído y aceptas las políticas de cancelación del hotel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;