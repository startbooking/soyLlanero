import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  User,
  ShieldCheck,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ReservationSummary } from "@/components/payment/ReservationSummary";
import { PriceBreakdown } from "@/components/payment/PriceBreakdown";
import { dataService } from "@/services/dataService";

const Payment = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

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

  useEffect(() => {
    if (!location.state || !hotel || !room) {
      navigate("/", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [location.state, navigate, hotel, room]);

  if (!location.state) return null;

  /**
   * Lógica Principal de Pago con Integración a Backend PHP
   */
  const handleWompiPaymentOld = async () => {
    setIsProcessing(true);

    const dataParaDB = {
      referencia: `RES-${Date.now()}`,
      total: total, // $500.000
      hotel_id: hotel.id,
      firstName,
      lastName,
      email,
      // ... todos los campos que requiere el script SQL
    };

    const res = await fetch("/api/prepare-payment", {
      method: "POST",
      body: JSON.stringify(dataParaDB),
    });

    const result = await res.json();

    // El monto debe estar en centavos para Wompi (ej: 50000 = $500.00)
    /* const amountInCents = Math.round(total * 100);
    const reference = `RES-${Date.now()}-${identification.slice(-4)}`;

    try {
      // 1. Llamada a tu controlador WompiController.php
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/wompi/generate-signature`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referencia: reference,
            monto: amountInCents,
            moneda: "COP",
          }),
        },
      );

      const result = await response.json();

      if (result.status !== "success") throw new Error(result.message);

      const { signature, publicKey } = result.data;

      // 2. Configurar y Abrir Widget
      // @ts-ignore (WidgetCheckout viene del script externo)
      const checkout = new window.WidgetCheckout({
        currency: "COP",
        amountInCents: amountInCents,
        publicKey: publicKey,
        signature: { integrity: signature },
        reference: reference,
        customerEmail: email,
        fullName: `${firstName} ${lastName}`,
        phoneNumber: phone,
        phoneNumberPrefix: "+57",
      });

      checkout.open((res: any) => {
        const { transaction } = res;
        if (transaction.status === "APPROVED") {
          toast({
            title: "¡Pago Exitoso!",
            description: "Tu reserva ha sido confirmada.",
          });
          navigate("/confirmation-success", { state: { transaction } });
        } else {
          toast({
            variant: "destructive",
            title: "Pago no procesado",
            description: `Estado: ${transaction.status}`,
          });
        }
      });
    } catch (error: any) {
      console.error("Error en pago:", error);
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description:
          "No pudimos conectar con la pasarela de pagos. Intenta de nuevo.",
      });
    } finally {
      setIsProcessing(false);
    } */
  };

const handleWompiPayment = async () => {
  setIsProcessing(true);
  
  const payload: WompiPaymentParams = {
    referencia: `RES-${Date.now()}`,
    total,
    hotel_id: hotel.id,
    habitacion_id: room.id,
    firstName,
    lastName,
    email,
    phone,
    identification,
    checkInDate,
    checkOutDate,
    guests,
    children,
    subtotal,
    taxes
  };

  try {
    // 1. Llamada al dataService refactorizado
    const response = await dataService.prepareWompiPayment(payload);

    if (response.status === 'success') {
      const { signature, publicKey, referencia } = response.data;

      // 2. Abrir Widget con los datos del servidor
      const checkout = new (window as any).WidgetCheckout({
        currency: 'COP',
        amountInCents: Math.round(total * 100),
        publicKey: publicKey,
        signature: { integrity: signature },
        reference: referencia,
        customerEmail: email,
        fullName: `${firstName} ${lastName}`
      });

      checkout.open((res: any) => {
        if (res.transaction.status === 'APPROVED') {
          navigate("/confirmation-success", { state: { transaction: res.transaction } });
        }
      });
    }
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message || "No se pudo iniciar el pago",
    });
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <Header
        activeSection="businesses"
        onSectionChange={() => {}}
        language={currentLanguage}
      />

      <main className="pt-28 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mt-6 mb-6 text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Modificar reserva
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                  Confirmación de Pago
                </h1>
                <p className="text-slate-500 mb-8">
                  Verifica que la información de tu estancia sea correcta.
                </p>

                <ReservationSummary
                  reservationData={{
                    hotel,
                    room,
                    checkInDate,
                    checkOutDate,
                    guests,
                    children,
                  }}
                />
              </section>

              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                    Datos del Huésped
                  </span>
                </div>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <DataField
                      label="Nombre Completo"
                      value={`${firstName} ${lastName}`}
                    />
                    <DataField label="Documento" value={identification} />
                    <DataField label="Email" value={email} />
                    <DataField label="Teléfono" value={phone} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm text-blue-900 font-bold">
                    Pago 100% Seguro
                  </p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Tus datos están protegidos. La conexión con Wompi es privada
                    y encriptada bajo estándares bancarios.
                  </p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1 lg:sticky lg:top-28">
              <Card className="border-sabana shadow-xl overflow-hidden">
                <PriceBreakdown
                  subtotal={subtotal}
                  taxes={taxes}
                  total={total}
                  onPayment={handleWompiPayment}
                  isLoading={isProcessing} // Pasar el estado de carga
                />

                {/* Botón de acción principal inyectado aquí o manejado por PriceBreakdown */}
                <div className="p-6 pt-0">
                  <Button
                    onClick={handleWompiPayment}
                    disabled={isProcessing}
                    className="w-full bg-sabana hover:bg-sabana/90 h-14 text-lg font-black text-white shadow-lg transition-all"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="mr-2 w-6 h-6" /> Pagar con Wompi
                      </>
                    )}
                  </Button>
                  <p className="mt-4 text-[10px] text-center text-slate-400 leading-relaxed">
                    Al confirmar, serás redirigido a la pasarela de pagos Wompi
                    (Bancolombia).
                  </p>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DataField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1 border-l-2 border-slate-100 pl-4">
    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
      {label}
    </span>
    <p className="text-sm font-semibold text-slate-800">{value || "—"}</p>
  </div>
);

export default Payment;
