import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowLeft, ShieldCheck, CreditCard, Loader2,
  User, Mail, Phone, Fingerprint, Calendar
} from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";
import { PriceBreakdown } from "@/components/payment/PriceBreakdown";
import { ReservationSummary } from "@/components/payment/ReservationSummary";

// Declaración para el objeto global de Wompi
declare const WidgetCheckout: any;

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Extracción y Validación de datos del State
  const {
    hotel,
    room,
    checkInDate,
    checkOutDate,
    total,
    formData,
    guests
  } = state || {};

  // console.log(guests)

  useEffect(() => {
    // Si el usuario llega aquí sin datos (ej. refresh), redirigir
    if (!state || !hotel || !room || !formData) {
      navigate("/", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [state, navigate, hotel, room, formData]);

  if (!state) return null;

  // 2. Lógica de Pago con Wompi
  const handleWompiPayment = async () => {
    setIsProcessing(true);

    // El monto para Wompi debe estar en centavos (Ej: $100.000 -> 10000000)
    const amountInCents = Math.round(total * 100);
    const reference = `RES-${Date.now()}-${formData.identification.slice(-4)}`;

    try {
      // Solicitar firma de integridad al backend (Seguridad obligatoria de Wompi)
      const { signature, publicKey } = await dataService.generatePaymentSignature(reference, amountInCents);

      const checkout = new WidgetCheckout({
        currency: 'COP',
        amountInCents: amountInCents,
        publicKey: publicKey || import.meta.env.VITE_WOMPI_PUBLIC_KEY,
        signature: { integrity: signature },
        reference: reference,
        customerData: {
          email: formData.email,
          fullName: `${formData.firstName} ${formData.lastName}`,
          phoneNumber: formData.phone,
          phoneNumberPrefix: '+57'
        },
        // Metadatos adicionales para tu base de datos
        extra: {
          hotelId: hotel.id,
          roomId: room.id,
          checkIn: format(checkInDate, "yyyy-MM-dd"),
          checkOut: format(checkOutDate, "yyyy-MM-dd")
        }
      });

      checkout.open((result: any) => {
        const { transaction } = result;

        if (transaction.status === 'APPROVED') {
          toast({ title: "¡Pago Exitoso!", description: "Tu reserva ha sido confirmada." });
          navigate("/confirmation-success", { state: { transaction, hotel, room, formData } });
        } else {
          toast({
            variant: "destructive",
            title: "Pago no procesado",
            description: `Estado: ${transaction.status}. Intenta con otro medio.`
          });
        }
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo iniciar la pasarela de pagos."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => { }} />
      <Header activeSection="businesses" onSectionChange={() => { }} language="es" />

      <main className="pt-28 pb-20 container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-white text-slate-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a datos
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda: Detalles del Cliente y Reserva */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">
              Confirmar y Pagar
            </h1>

            {/* Resumen de Datos Personales */}
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-900 py-4">
                <CardTitle className="text-white text-sm uppercase font-bold flex items-center gap-2">
                  <User className="w-4 h-4 text-sabana" /> Información del Titular
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={<User />} label="Nombre completo" value={`${formData.firstName} ${formData.lastName}`} />
                <InfoItem icon={<Fingerprint />} label="Identificación" value={`${formData.documentType} ${formData.identification}`} />
                <InfoItem icon={<Mail />} label="Correo electrónico" value={formData.email} />
                <InfoItem icon={<Phone />} label="Teléfono" value={formData.phone} />
              </CardContent>
            </Card>

            {/* Resumen de Estancia */}
            <Card className="border-none shadow-sm overflow-hidden">
              {/* <CardHeader className="bg-slate-100 py-4 border-b">
                <CardTitle className="text-slate-700 text-sm uppercase font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sabana" /> Detalles de la Estancia
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Hotel</p>
                    <p className="font-bold text-slate-800">{hotel.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Habitación</p>
                    <p className="font-bold text-slate-800">{room.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Check-in / Out</p>
                    <p className="font-bold text-slate-800">
                      {format(checkInDate, "dd MMM")} - {format(checkOutDate, "dd MMM, yyyy")}
                    </p>
                  </div>
                </div>
              </CardContent> */}
              <ReservationSummary
                reservationData={{
                  hotel,
                  room,
                  checkInDate,
                  checkOutDate,
                  guests,
                }}
              />
            </Card>

            {/* Seguridad */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-bold text-blue-900">Transacción Segura</p>
                <p className="text-xs text-blue-700">Tu pago se procesa a través de Wompi (Bancolombia) con cifrado SSL de grado bancario.</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Liquidación Final */}
          <aside className="lg:col-span-1">
            <Card className="border-2 border-sabana shadow-xl sticky top-28 overflow-hidden">
              <div className="bg-sabana p-4 text-center">
                <span className="text-[10px] font-black uppercase text-slate-900">Total a Pagar</span>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal Alojamiento</span>
                    <span className="font-bold text-slate-800">${(total / (1 + (parseFloat(room.tax_percentage) / 100))).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Impuestos ({room.tax_percentage}%)</span>
                    <span className="font-bold text-slate-800">${(total - (total / (1 + (parseFloat(room.tax_percentage) / 100)))).toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-dashed flex justify-between items-end">
                    <span className="text-lg font-black text-slate-900 uppercase italic">Total COP</span>
                    <span className="text-3xl font-black text-sabana tracking-tighter">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleWompiPayment}
                  disabled={isProcessing}
                  className="w-full bg-slate-900 hover:bg-sabana hover:text-slate-900 h-16 text-lg font-black transition-all shadow-lg group"
                >
                  {isProcessing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="mr-2 group-hover:scale-110 transition-transform" />
                      PAGAR AHORA
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-center text-slate-400 leading-relaxed uppercase font-medium">
                  Al hacer clic en "Pagar Ahora", serás redirigido a la pasarela segura de Wompi.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Componente auxiliar para ítems de información
const InfoItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-sabana shrink-0">
      {icon}
    </div>
    <div className="space-y-0.5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-slate-800 leading-tight">{value || "—"}</p>
    </div>
  </div>
);

export default PaymentPage;