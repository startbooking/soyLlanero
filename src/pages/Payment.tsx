import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowLeft, ShieldCheck, User, Mail, Phone, 
  Fingerprint, Calendar, MapPin, CreditCard,
  Loader2
} from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";
import { formatCurrency } from "@/utils/formatCurrency";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    formData,
    hotel,
    room,
    checkInDate,
    checkOutDate,
    guests,
    values,
  } = location.state || {};

  // Redirección de seguridad si no hay datos
  useEffect(() => {
    if (!location.state || !hotel || !room) {
      navigate("/", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [location.state, navigate, hotel, room]);

  if (!location.state) return null;

  const { firstName, lastName, email, phone, identification, documentType } = formData;
  const { adults, children } = guests;
  const { total, subtotal, taxes } = values;

  const handleWompiPayment = async () => {
    setIsProcessing(true);

    const payload = {
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

    console.log(payload);

    try {
      // 1. Obtener firma y llaves del backend
      const response = await dataService.prepareWompiPayment(payload);

      console.log(response);

      if (response.status === 'success') {
        const { signature, publicKey, referencia } = response.data;

        // console.log(signature, publicKey, referencia);

        // 2. Configurar el objeto para las páginas de respuesta
        const reservationState = {
          hotel,
          room,
          checkInDate,
          checkOutDate,
          guests: { adults, children },
          values: { total, subtotal, taxes },
          firstName,
          lastName,
          identification,
          email,
          phone,
          transactionId: referencia
        };

        // 3. Abrir Widget de Wompi
        const checkout = new (window as any).WidgetCheckout({
          currency: 'COP',
          amountInCents: Math.round(total * 100),
          publicKey,
          signature: { integrity: signature },
          reference: referencia,
          customerData: {
            email,
            fullName: `${firstName} ${lastName}`,
            phoneNumber: phone,
            phoneNumberPrefix: '+57'

          }
        });

        console.log(checkout);

        checkout.open((res: any) => {
          const { transaction } = res;

          if (transaction.status === 'APPROVED') {
            navigate("/confirmation-success", { 
              state: { ...reservationState, transactionId: transaction.id },
              replace: true 
            });
          } else {
            navigate("/payment-error", { 
              state: { 
                reservation: reservationState, 
                errorDetail: transaction.status_message || "La transacción fue rechazada." 
              },
              replace: true
            });
          }
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo conectar con la pasarela de pagos.",
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
        {/* Botón Volver */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-white text-slate-500 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Volver a datos del cliente
        </Button>

        <div className="space-y-8">
          {/* TÍTULO ANCHO TOTAL */}
          <div className="w-full bg-white py-8 px-4 rounded-2xl shadow-sm border border-slate-100 text-center">
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              Confirmar y Pagar
            </h1>
            <p className="text-slate-500 text-sm mt-1">Tu próxima experiencia en el Llano está a un solo paso</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: DETALLES (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Card de la Estancia */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-sabana/10 border-b border-sabana/20">
                  <CardTitle className="text-sabana text-xs uppercase font-black flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Detalles de tu estancia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 shrink-0">
                      <img
                        src={`/images/rooms/${room.image || 'default-room.jpg'}`}
                        alt={room.name}
                        className="w-full h-full object-cover rounded-xl shadow-inner"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-black text-xl text-slate-800">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <MapPin className="w-3 h-3" /> {hotel.address}, {hotel.city}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Check-In</p>
                          <p className="text-sm font-bold text-slate-700">{format(new Date(checkInDate), "dd MMM, yyyy", { locale: es })}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Check-Out</p>
                          <p className="text-sm font-bold text-slate-700">{format(new Date(checkOutDate), "dd MMM, yyyy", { locale: es })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Información Personal */}
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-sabana/10 py-4">
                  <CardTitle className="text-sabana text-xs uppercase font-black flex items-center gap-2">
                    <User className="w-4 h-4 text-sabana" /> Información del Titular
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem icon={<User className="w-4 h-4"/>} label="Nombre completo" value={`${firstName} ${lastName}`} />
                  <InfoItem icon={<Fingerprint className="w-4 h-4"/>} label="Documento" value={`${documentType} ${identification}`} />
                  <InfoItem icon={<Mail className="w-4 h-4"/>} label="Email" value={email} />
                  <InfoItem icon={<Phone className="w-4 h-4"/>} label="Teléfono" value={phone} />
                </CardContent>
              </Card>
            </div>

            {/* COLUMNA DERECHA: PAGO (1/3) */}
            <div className="lg:col-span-1 sticky top-28">
              <Card className="border-none shadow-xl overflow-hidden ring-1 ring-slate-200">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-tight">
                    Resumen de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Subtotal</span>
                      <span className="font-bold text-slate-800">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Impuestos</span>
                      <span className="font-bold text-slate-800">{formatCurrency(taxes)}</span>
                    </div>
                    
                    <div className="pt-4 border-t border-dashed border-slate-200">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase">Total a pagar</p>
                          <p className="text-xs text-slate-400 italic">IVA incluido</p>
                        </div>
                        <span className="text-3xl font-black text-sabana tracking-tighter">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={isProcessing}
                    className="w-full bg-sabana hover:bg-sabana/90 text-white font-black py-7 mt-4 text-lg shadow-lg shadow-sabana/20 transition-all active:scale-[0.98]"
                    onClick={handleWompiPayment}
                  >
                    {isProcessing ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Procesando...</>
                    ) : (
                      <><CreditCard className="w-5 h-5 mr-2" /> PAGAR AHORA</>
                    )}
                  </Button>

                  <p className="text-[10px] text-center text-slate-400 px-4">
                    Al hacer clic en "Pagar Ahora" aceptas nuestros términos y condiciones y políticas de privacidad.
                  </p>
                </CardContent>
              </Card>

              {/* Indicador de Seguridad Centrado debajo del pago */}
              <div className="mt-6 flex flex-col items-center p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-[11px] font-bold text-blue-900 uppercase">Transacción 100% Segura</p>
                <p className="text-[10px] text-blue-700 text-center mt-1">
                  Procesado por Wompi con cifrado SSL bancario.
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

// Componente Interno para los ítems de información
const InfoItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex gap-4 items-start">
    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sabana shrink-0 shadow-sm">
      {icon}
    </div>
    <div className="space-y-0.5">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-800 leading-tight">{value || "No especificado"}</p>
    </div>
  </div>
);

export default PaymentPage;