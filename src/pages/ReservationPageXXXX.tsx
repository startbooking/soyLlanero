import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { 
  CalendarIcon, CreditCard, User, AlertCircle, 
  ArrowLeft, ShieldAlert, Navigation, MapPin, 
  Mail, Clock, MessageSquare, Receipt, Loader2 
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { dataService } from "@/services/dataService";
import { ReservationDetailSidebar } from "@/components/reservation/ReservationDetailSidebar";
import { DatePicker } from "@/components/DatePicker";
import { formatCurrency } from "@/utils/formatCurrency";

// Declaración para el widget de Wompi
declare const WidgetCheckout: any;

const ReservationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toast } = useToast();

  const [room] = useState(state?.room);
  const [hotel] = useState(state?.hotel);

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [alternatives, setAlternatives] = useState([]);

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");
  
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", 
    identification: "", specialRequests: "", documentType: "", nationality: ""
  });

  useEffect(() => {
    if (!room || !hotel) navigate("/hotels");
    window.scrollTo(0, 0);
  }, [room, hotel, navigate]);

  // Cálculos de costos memorizados
  const calculations = useMemo(() => {
    if (!checkInDate || !checkOutDate || !room?.price_per_night)
      return { nights: 0, subtotal: 0, taxes: 0, total: 0 };

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    // Limpiar precio de strings a número
    console.log(room.price_per_night)
    const unitValue = parseInt(room.price_per_night.toString().replace(/[^0-9.]/g, ''), 10);
    if (isNaN(unitValue)) {
      console.error("El valor de la reserva no es un número válido");
      return 0;
    }

    /* const unitValue = typeof room.price_per_night === 'string' 
      ? parseInt(room.price_per_night.replace(/\D/g, "")) 
      : room.price_per_night; */

    const subtotal = nights * unitValue;
    const taxRate = (parseFloat(room.tax_percentage) || 19) / 100;
    const taxes = Math.round(subtotal * taxRate);
    const total = subtotal + taxes;

    return { nights, unitValue, subtotal, taxes, total };
  }, [checkInDate, checkOutDate, room]);

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast({ title: "Fechas requeridas", description: "Por favor selecciona el rango de tu estancia." });
      return;
    }

    setIsValidating(true);
    try {
      const response = await dataService.checkAvailability({
        hotel_id: hotel.id,
        room_id: room.id,
        check_in: format(checkInDate, "yyyy-MM-dd"),
        check_out: format(checkOutDate, "yyyy-MM-dd"),
        adults: numAdults,
        children: numChildren
      });

      if (response.available) {
        setStep(2);
        toast({ title: "¡Habitación disponible!", description: "Ingresa tus datos para continuar." });
      } else {
        const others = await dataService.getRoomTypesByHotel(hotel.id);
        setAlternatives(others.filter(r => r.id !== room.id));
        toast({ variant: "destructive", title: "No disponible", description: response.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No pudimos verificar la disponibilidad." });
    } finally {
      setIsValidating(false);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const montoCentavos = calculations.total * 100;
      const referencia = `RES_${Date.now()}_${hotel.id}`;

      // 1. Obtener firma desde el dataService
      const { signature } = await dataService.generatePaymentSignature(referencia, montoCentavos);

      // 2. Configurar y abrir Widget de Wompi
      const checkout = new WidgetCheckout({
        currency: 'COP',
        amountInCents: montoCentavos,
        publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
        signature: { integrity: signature },
        reference: referencia,
        redirectUrl: `${window.location.origin}/confirmation`,
        customerData: {
          email: formData.email,
          fullName: `${formData.firstName} ${formData.lastName}`,
          phoneNumber: formData.phone,
          phoneNumberPrefix: '+57'
        }
      });

      checkout.open((result: any) => {
        if (result.transaction.status === 'APPROVED') {
          // Redirigir manualmente si el widget no lo hace
          navigate('/confirmation', { state: { 
            hotel, room, ...calculations, ...formData,
            checkInDate, checkOutDate, guests: numAdults, children: numChildren 
          }});
        }
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Error de pago", description: "No se pudo iniciar la pasarela de pagos." });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => {}} />
      <Header activeSection="businesses" onSectionChange={() => {}} language="es" />
      
      <main className="pt-28 pb-12 container mx-auto px-4 max-w-7xl">
        {/* Stepper */}
        <div className="flex justify-center mb-10 gap-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 w-24 rounded-full transition-all duration-500 ${step >= s ? "bg-sabana shadow-[0_0_8px_rgba(var(--sabana-rgb),0.5)]" : "bg-slate-200"}`} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* PASO 1: DISPONIBILIDAD */}
            {step === 1 && (
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <CardHeader className="bg-sabana text-white">
                  <CardTitle className="flex items-center gap-2 font-bold italic uppercase tracking-tighter">
                    <CalendarIcon className="w-5 h-5 text-sabana" /> 1. Fechas y Huéspedes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase text-slate-400">Fecha de Llegada</Label>
                      <DatePicker date={checkInDate} setDate={setCheckInDate} placeholder="Check-in" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase text-slate-400">Fecha de Salida</Label>
                      <DatePicker
                        date={checkOutDate}
                        setDate={setCheckOutDate}
                        placeholder="Check-out"
                        minDate={checkInDate ? new Date(new Date(checkInDate).getTime() + 86400000) : new Date()}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase text-slate-400">Adultos</Label>
                      <Select value={numAdults} onValueChange={setNumAdults}>
                        <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[...Array(5)].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} Adulto{i > 0 ? 's' : ''}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase text-slate-400">Niños</Label>
                      <Select value={numChildren} onValueChange={setNumChildren}>
                        <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3].map(v => <SelectItem key={v} value={v.toString()}>{v} Niños</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckAvailability}
                    className="w-full bg-sabana hover:bg-sabana-500 hover:text-slate h-14 text-lg font-black transition-all"
                    disabled={isValidating}
                  >
                    {isValidating ? <Loader2 className="animate-spin mr-2" /> : "VERIFICAR DISPONIBILIDAD"}
                  </Button>

                  {alternatives.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-dashed space-y-4">
                      <h3 className="text-sm font-black text-red-600 uppercase flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Otras opciones disponibles
                      </h3>
                      <div className="grid gap-4">
                        {alternatives.map((alt) => <RoomCard key={alt.id} room={alt} hotel={hotel} />)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* PASO 2: DATOS DEL CLIENTE */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                  <CardHeader className="bg-sabana text-white">
                    <CardTitle className="flex items-center gap-2 font-bold italic uppercase tracking-tighter">
                      <User className="w-5 h-5 text-sabana" /> 2. Información del Huésped
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500">Nombres</Label>
                        <Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="Ej: Juan" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500">Apellidos</Label>
                        <Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Ej: Pérez" className="h-12" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500">Tipo Documento</Label>
                        <Select value={formData.documentType} onValueChange={(v) => setFormData({...formData, documentType: v})}>
                          <SelectTrigger className="h-12"><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                            <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                            <SelectItem value="PP">Pasaporte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-bold text-slate-500">Número Identificación</Label>
                        <Input value={formData.identification} onChange={(e) => setFormData({...formData, identification: e.target.value})} className="h-12" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500">Correo Electrónico</Label>
                        <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="tu@email.com" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500">Teléfono / WhatsApp</Label>
                        <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+57" className="h-12" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Requerimientos Especiales (Opcional)
                      </Label>
                      <Textarea 
                        value={formData.specialRequests} 
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} 
                        className="min-h-[100px] bg-slate-50 border-slate-100"
                        placeholder="Dietas, alergias o peticiones de llegada..."
                      />
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-slate-100">
                      <Button variant="ghost" className="flex-1 h-12 text-slate-500" onClick={() => setStep(1)}>VOLVER</Button>
                      <Button className="flex-1 h-12 bg-sabana text-white font-black hover:bg-sabana hover:text-slate" onClick={() => setStep(3)}>CONTINUAR AL RESUMEN</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Políticas y Mapa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-sky-50/50 border-sky-100">
                    <CardContent className="p-6 space-y-3 text-sm">
                      <h4 className="font-black text-sky-700 uppercase flex items-center gap-2 italic">
                        <Navigation className="w-4 h-4" /> Cómo llegar
                      </h4>
                      <p className="text-slate-600 text-xs">{hotel.address}</p>
                      <Button variant="link" className="p-0 text-sky-600 font-bold h-auto" onClick={() => window.open(`https://waze.com/ul?q=${encodeURIComponent(hotel.address)}`)}>
                        Abrir en Waze →
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50/50 border-red-100">
                    <CardContent className="p-6 space-y-3 text-sm">
                      <h4 className="font-black text-red-700 uppercase flex items-center gap-2 italic">
                        <ShieldAlert className="w-4 h-4" /> Cancelación
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed italic">
                        {hotel.cancellation_policy || "Cancelación gratuita hasta 48h antes del check-in."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* PASO 3: RESUMEN Y PAGO */}
            {step === 3 && (
              <Card className="border-none shadow-2xl bg-white overflow-hidden animate-in zoom-in-95 duration-300">
                <CardHeader className="bg-sabana p-8">
                  <CardTitle className="text-sabana italic font-black text-2xl uppercase flex items-center gap-3">
                    <Receipt className="w-7 h-7" /> Resumen de Reserva
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-8 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estancia</p>
                        <p className="text-lg font-bold text-slate-800">
                          {format(checkInDate!, "dd MMM")} - {format(checkOutDate!, "dd MMM, yyyy")}
                        </p>
                        <Badge className="bg-slate-100 text-slate-600 border-none font-bold">{calculations.nights} Noches</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Huésped Principal</p>
                        <p className="font-bold text-slate-800 uppercase">{formData.firstName} {formData.lastName}</p>
                        <p className="text-xs text-slate-500">{formData.email}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Liquidación</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 italic">Neto Alojamiento</span>
                        <span className="font-bold">{formatCurrency(calculations.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 italic">Impuestos (19%)</span>
                        <span className="font-bold">{formatCurrency(calculations.taxes)}</span>
                      </div>
                      <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                        <span className="text-lg font-black text-slate-900 uppercase">Total</span>
                        <span className="text-3xl font-black text-sabana tracking-tighter">
                          {formatCurrency(calculations.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button variant="ghost" className="h-14 px-8 text-slate-500 font-bold" onClick={() => setStep(2)}>
                      <ArrowLeft className="mr-2 w-4 h-4" /> VOLVER A DATOS
                    </Button>
                    <Button 
                      onClick={handlePayment} 
                      disabled={isProcessing}
                      className="flex-1 h-14 bg-sabana text-white font-black text-xl hover:bg-sabana hover:text-slate shadow-xl shadow-sabana/20"
                    >
                      {isProcessing ? <Loader2 className="animate-spin mr-2" /> : <CreditCard className="mr-3 w-6 h-6" />}
                      PAGAR AHORA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="lg:col-span-1">
            <ReservationDetailSidebar
              room={room}
              hotel={hotel}
              calculations={calculations}
              guests={{ adults: numAdults, children: numChildren }}
            />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;