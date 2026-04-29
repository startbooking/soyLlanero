import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, User, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sub-componentes
import { ReservationSummary } from "@/components/payment/ReservationSummary";
import { PriceBreakdown } from "@/components/payment/PriceBreakdown";

const WOMPI_CONFIG = {
  publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
  integrityKey: import.meta.env.VITE_WOMPI_INTEGRITY_KEY,
};

const handlePayment = () => {
  // Ejemplo de inicialización del Widget de Wompi
  const checkout = new WidgetCheckout({
    currency: 'COP',
    amountInCents: 5000000, // Ejemplo: $50.000
    publicKey: WOMPI_CONFIG.publicKey,
    signature: { integrity: WOMPI_CONFIG.integrityKey }, // Si usas firma de integridad
    reference: `REF-${Date.now()}`,
  });

  checkout.open((result) => {
    const transaction = result.transaction;
    console.log('Estado de la transacción:', transaction.status);
  });
};

const Payment = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Extraemos toda la data del estado de navegación
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
    total,
  } = location.state || {};

  // Redirección de seguridad si faltan datos críticos
  useEffect(() => {
    if (!location.state || !hotel || !room) {
      navigate("/", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [location.state, navigate, hotel, room]);

  if (!location.state) return null;

  const handleWompiPayment = () => {
    toast({
      title: "Redirigiendo a Wompi",
      description: "Estás entrando a un entorno de pago seguro.",
    });

    // Aquí iría la lógica de integración con el SDK de Wompi
    console.log("Iniciando transacción:", {
      referencia: `RES-${Date.now()}`,
      monto: total,
      cliente: { firstName, email, phone }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />

      <main className="pt-28 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          <Button 
            onClick={() => navigate(-1)} 
            className="mt-6 mb-6 bg-sabana border-sabana hover:bg-white text-slate-600 "
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Modificar reserva
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Columna principal (Izquierda) */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                  Confirmación de Pago
                </h1>
                <p className="text-slate-500 mb-8">
                  Verifica que la información de tu estancia sea correcta.
                </p>
                
                {/* Resumen visual de la habitación y hotel */}
                <ReservationSummary 
                  reservationData={{ hotel, room, checkInDate, checkOutDate, guests, children }} 
                />
              </section>

              {/* Card de Información del Cliente */}
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6 font-bold text-slate-800 border-b pb-3">
                    <User className="w-5 h-5 text-primary" />
                    Datos del Huésped Principal
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <DataField label="Nombre Completo" value={`${firstName} ${lastName}`} />
                    <DataField label="Documento" value={identification} />
                    <DataField label="Email" value={email} />
                    <DataField label="Teléfono" value={phone} />
                  </div>
                </CardContent>
              </Card>

              {/* Aviso de Seguridad */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-blue-800 font-medium">
                  Tu información está protegida. La transacción se realizará bajo protocolos de encriptación SSL.
                </p>
              </div>
            </div>

            {/* Sidebar de Pago (Derecha - Sticky) */}
            <aside className="lg:col-span-1 lg:sticky lg:top-28">
              <PriceBreakdown 
                subtotal={subtotal}
                taxes={taxes}
                total={total}
                onPayment={handleWompiPayment}
              />
              <div className="mt-6 text-center">
                <p className="text-[11px] text-slate-400 px-4 leading-relaxed">
                  Al hacer clic en el botón, serás redirigido a la pasarela de pagos Wompi. 
                  Aceptas nuestros <strong>Términos y Condiciones</strong>.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Componente auxiliar interno para organizar la info
const DataField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
      {label}
    </span>
    <p className="text-sm font-semibold text-slate-700">{value || "No proporcionado"}</p>
  </div>
);

export default Payment;