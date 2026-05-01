import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowLeft, ShieldCheck, CreditCard, Loader2,
  User, Mail, Phone, Fingerprint, Calendar,
  MapPin
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
import { formatCurrency } from "@/utils/formatCurrency";

// Declaración para el objeto global de Wompi
declare const WidgetCheckout: any;

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();


  console.log(location)

  const {
    formData,
    hotel,
    room,
    checkInDate,
    checkOutDate,
    guests,
    values,
  } = location.state || {};

  /*  useEffect(() => {
     // Si el usuario llega aquí sin datos (ej. refresh), redirigir
     if (!state || !hotel || !room || !formData) {
       navigate("/", { replace: true });
     }
     window.scrollTo(0, 0);
   }, [state, navigate, hotel, room, formData]);
 
   if (!state) return null; */

  useEffect(() => {
    if (!location.state || !hotel || !room) {
      navigate("/", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [location.state, navigate, hotel, room]);

  if (!location.state) return null;

  const { firstName, lastName, email, phone, identification } = formData
  const { adults, children } = guests;
  const { total, subtotal, taxes } = values;

  // 2. Lógica de Pago con Wompi
  const handleWompiPaymentOld = async () => {
    setIsProcessing(true);

    // El monto para Wompi debe estar en centavos (Ej: $100.000 -> 10000000)
    const amountInCents = Math.round(total * 100);
    const reference = `RES-${Date.now()}-${formData.identification.slice(-4)}`;
    console.log(amountInCents);

    try {
      // Solicitar firma de integridad al backend (Seguridad obligatoria de Wompi)
      const { signature, publicKey } = await dataService.prepareWompiPayment(reference, amountInCents);
      // const { signature, publicKey } = await dataService.generatePaymentSignature(reference, amountInCents);

      console.log(signature)
      console.log(publicKey)

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
      adults,
      children,
      subtotal,
      taxes
    };

    console.log(payload)

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

        <div className="space-y-8">
          {/* TÍTULO: Ocupa el ancho total (100%) */}
          <div className="w-full bg-white py-6 px-4 rounded-xl shadow-sm border border-slate-100 text-center">
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Confirmar y Pagar
            </h1>
            <p className="text-slate-500 text-sm">Verifica los datos de tu reserva antes de finalizar</p>
          </div>

          {/* CONTENEDOR PRINCIPAL: Grid de 3 columnas en LG */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* COLUMNA IZQUIERDA: Detalles de la Reserva (Ocupa 2/3) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Resumen de Estancia */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-sabana border-b">
                  <CardTitle className="text-slate-700 text-sm uppercase font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-success" /> Detalles de la Estancia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={`/images/rooms/${room.image || 'default-room.jpg'}`}
                      alt={room.name}
                      className="w-60 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <p className="text-muted-foreground">{room.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {hotel.address}
                      </div>
                      <div className="space-y-1 mt-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Habitación</p>
                        <p className="font-bold text-slate-800">{room.name}</p>
                      </div>
                      <div className="space-y-1 mt-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Check-in / Out</p>
                        <p className="font-bold text-slate-800">
                          {format(checkInDate, "dd MMM")} - {format(checkOutDate, "dd MMM, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-8">
                    {/* <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Hotel</p>
                      <p className="font-bold text-slate-800">{hotel.name}</p>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Resumen de Datos Personales */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-sabana py-4">
                  <CardTitle className="text-slate-700 text-sm uppercase font-bold flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-700" /> Información del Titular
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem icon={<User />} label="Nombre completo" value={`${formData.firstName} ${formData.lastName}`} />
                  <InfoItem icon={<Fingerprint />} label="Identificación" value={`${formData.documentType} ${formData.identification}`} />
                  <InfoItem icon={<Mail />} label="Correo electrónico" value={formData.email} />
                  <InfoItem icon={<Phone />} label="Teléfono" value={formData.phone} />
                </CardContent>
              </Card>

              {/* Seguridad */}

            </div>

            {/* COLUMNA DERECHA: Detalle del Pago (Ocupa 1/3) */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-none shadow-lg overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-slate-800 text-lg font-black uppercase">Resumen del Pago</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal Alojamiento</span>
                      <span className="font-bold text-slate-800">{formatCurrency(total / (1 + (parseFloat(room.tax_percentage) / 100)))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Impuestos ({room.tax_percentage}%)</span>
                      <span className="font-bold text-slate-800">{formatCurrency(total - (total / (1 + (parseFloat(room.tax_percentage) / 100))))}</span>
                    </div>
                    <div className="pt-4 border-t border-dashed flex justify-between items-end">
                      <span className="text-lg font-black text-slate-900 uppercase italic">Total COP</span>
                      <span className="text-3xl font-black text-sabana tracking-tighter">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-sabana hover:bg-sabana/90 text-white font-bold py-6 mt-4"
                    onClick={handleWompiPayment}
                  >
                    PAGAR AHORA
                  </Button>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
        <div className="w-full bg-blue-50 py-8 px-4 rounded-xl shadow-sm border border-blue-100 mt-10 flex flex-col items-center justify-center text-center">
          <ShieldCheck className="w-10 h-10 text-blue-600 mb-3" />
          <div className="space-y-1">
            <p className="text-base font-bold text-blue-900">Transacción Segura</p>
            <p className="text-xs text-blue-700 max-w-lx mx-auto">
              Tu pago se procesa a través de Wompi con cifrado SSL de grado bancario.
            </p>
          </div>
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