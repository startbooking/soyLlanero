import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, CreditCard, User, AlertCircle, ArrowLeft, Users, ShieldAlert, Navigation, MapPin, Mail, Clock, MessageSquare, Badge, Receipt } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { dataService } from "@/services/dataService";
import { ReservationDetailSidebar } from "@/components/reservation/ReservationDetailSidebar";
import { DatePicker } from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";

const ReservationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toast } = useToast();

  const [room] = useState(state?.room);
  const [hotel] = useState(state?.hotel);

  // console.log(room)


  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [alternatives, setAlternatives] = useState([]);

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", identification: "", specialRequests: "", documentType: "", nationality: ""
  });

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  // Redirección si no hay datos
  useEffect(() => {
    if (!room || !hotel) navigate("/hotels");
    window.scrollTo(0, 0);
  }, [room, hotel, navigate]);

  // Sincronización de fechas: Salida debe ser al menos 1 día después de entrada
  useEffect(() => {
    if (checkInDate && (!checkOutDate || checkOutDate <= checkInDate)) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  }, [checkInDate]);

  const handleWazeClick = () => {
    const url = `https://waze.com/ul?q=${encodeURIComponent(hotel.address)}`;
    window.open(url, '_blank');
  };


  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast({ title: "Atención", description: "Selecciona fechas de entrada y salida." });
      return;
    }

    setIsValidating(true);
    const totalGuests = parseInt(numAdults) + parseInt(numChildren);

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
        toast({ title: "¡Disponible!", description: "Puedes proceder con tu reserva." });
      } else {
        const others = await dataService.getRoomTypesByHotel(hotel.id);
        setAlternatives(others.filter(r => r.id !== room.id && parseInt(r.max_occupancy) >= totalGuests));
        toast({ variant: "destructive", title: "No disponible", description: response.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Ocurrió un problema al consultar." });
    } finally {
      setIsValidating(false);
    }
  };

  const handlePayment = async () => {
  const montoCentavos = 5000000; // $50.000 COP
  const referencia = `REF_${Math.floor(Math.random() * 1000000)}`;

  // 1. Pedir la firma a tu backend
  const response = await fetch('tu-api.com/generate-signature', {
    method: 'POST',
    body: JSON.stringify({ referencia, monto: montoCentavos })
  });
  const { signature } = await response.json();

  // 2. Abrir el Widget
  const checkout = new WidgetCheckout({
    currency: 'COP',
    amountInCents: montoCentavos,
    publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
    signature: { integrity: signature }, // Firma generada en el paso 1
    reference: referencia,
    redirectUrl: 'https://tu-app.com/confirmacion', // Opcional
  });

  checkout.open((result) => {
    const { transaction } = result;
    if (transaction.status === 'APPROVED') {
       // Actualizar UI, pero NO confiar solo en esto para tu DB
       console.log("¡Pago exitoso!");
    }
  });
};

  const unitValue = useMemo(() => {
    if (!room?.price_per_night) return 0;
    // Elimina cualquier cosa que no sea un número
    console.log(room.price_per_night)
    const cleanValue = parseInt(room.price_per_night.toString().replace(/[^0-9.]/g, ''), 10);
    if (isNaN(cleanValue)) {
      console.error("El valor de la reserva no es un número válido");
      return 0;
    }
    return cleanValue;
  }, [room]);


  const calculations = useMemo(() => {
    if (!checkInDate || !checkOutDate || !room?.price_per_night)
      return { nights: 0, subtotal: 0, taxes: 0, total: 0 };

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Limpieza robusta del precio (quita $, puntos, espacios)
    const rawPrice = room.price_per_night.toString().replace(/[^\d]/g, "");

    // 4. Operaciones matemáticas puras
    const subtotal = nights * unitValue;
    const taxPercentage = parseFloat(room.tax_percentage) || 0;
    const taxes = Math.round(subtotal * (taxPercentage / 100));
    const total = subtotal + taxes;


    return { nights, unitValue, subtotal, taxes, total };
  }, [checkInDate, checkOutDate, room]);

  if (!room || !hotel) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => { }} />
      <Header activeSection="businesses" onSectionChange={() => { }} language="es" />
      <main className="pt-28 pb-12 container mx-auto px-4">
        {/* Step Indicator */}
        <div className="flex justify-center mb-10 gap-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 w-20 rounded-full transition-colors duration-500 ${step >= s ? "bg-sabana" : "bg-slate-200"}`} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* PASO 1: DISPONIBILIDAD */}
            {step === 1 && (
              <Card className="border-sabana/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sabana font-bold">
                    <CalendarIcon className="w-5 h-5" /> 1. Fechas y Huéspedes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-600">Fecha de Llegada</Label>
                      <DatePicker date={checkInDate} setDate={setCheckInDate} placeholder="¿Cuándo llegas?" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-600">Fecha de Salida</Label>
                      <DatePicker
                        date={checkOutDate}
                        setDate={setCheckOutDate}
                        placeholder="¿Cuándo sales?"
                        minDate={checkInDate ? new Date(new Date(checkInDate).setDate(checkInDate.getDate() + 1)) : new Date()}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-600">Adultos</Label>
                      <Select value={numAdults} onValueChange={setNumAdults}>
                        <SelectTrigger className="border-sabana/30"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[...Array(parseInt(room.max_occupancy || "1"))].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} Adulto{i > 0 ? 's' : ''}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-600">Niños</Label>
                      <Select value={numChildren} onValueChange={setNumChildren}>
                        <SelectTrigger className="border-sabana/30"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3].map(v => <SelectItem key={v} value={v.toString()}>{v} Niños</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckAvailability}
                    className="w-full bg-sabana hover:bg-sabana/90 h-12 text-white font-bold"
                    disabled={isValidating}
                  >
                    {isValidating ? "Consultando disponibilidad..." : "Verificar Disponibilidad"}
                  </Button>

                  {alternatives.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-dashed">
                      <h3 className="text-md font-bold text-red-600 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> No hay cupo en esas fechas, pero mira estas opciones:
                      </h3>
                      <div className="space-y-4">
                        {alternatives.map((alt) => <RoomCard key={alt.id} room={alt} hotel={hotel} />)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* PASO 2: DATOS DEL CLIENTE */}
            {step === 2 && (
              <Card className="border-sabana/20 shadow-sm animate-in fade-in slide-in-from-right-4">
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-sabana/20 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sabana font-bold">
                        <User className="w-5 h-5" /> 2. Información del Huésped
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                      {/* Fila: Nombre y Apellido */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-600">Nombre</Label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Ej: Carlos"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-600">Apellido</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Ej: Restrepo"
                          />
                        </div>
                      </div>

                      {/* Fila: Documentación */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-600">Tipo de Documento</Label>
                          <Select
                            value={formData.documentType}
                            onValueChange={(v) => setFormData({ ...formData, documentType: v })}
                          >
                            <SelectTrigger className="border-sabana/30">
                              <SelectValue placeholder="Seleccione..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                              <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                              <SelectItem value="PP">Pasaporte</SelectItem>
                              <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-600">N° Identificación</Label>
                          <Input
                            value={formData.identification}
                            onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
                            placeholder="Documento"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-600">Nacionalidad</Label>
                          <Input
                            value={formData.nationality}
                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                            placeholder="Ej: Colombiano"
                          />
                        </div>
                      </div>

                      {/* Fila: Contacto */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-600">Correo Electrónico</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="ejemplo@correo.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-600">Teléfono / WhatsApp</Label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+57 300..."
                          />
                        </div>
                      </div>

                      {/* Requerimientos Especiales */}
                      <div className="space-y-2">
                        <Label className="text-slate-600 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" /> Requerimientos Especiales
                        </Label>
                        <Textarea
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          placeholder="¿Alguna dieta especial, alergia o petición para tu llegada?"
                          className="resize-none h-24 border-sabana/30"
                        />
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <Button variant="outline" className="flex-1 border-sabana" onClick={() => setStep(1)}>Volver</Button>
                        <Button className="flex-1 bg-sabana text-white font-bold" onClick={() => setStep(3)}>Revisar Resumen</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Información del Hotel y Políticas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Datos del Hotel */}
                    <Card className="border-slate-200 bg-slate-50/50">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="font-bold text-sabana text-sm flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> Ubicación y Contacto
                        </h4>
                        <div className="space-y-1.5 text-xs text-slate-600">
                          <p className="font-bold text-slate-800">{hotel.name}</p>
                          <p>{hotel.address}</p>
                          <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {hotel.email}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="flex items-center gap-1 font-medium"><Clock className="w-3 h-3" /> Check-in: {hotel.check_in || '15:00'}</p>
                            <p className="flex items-center gap-1 font-medium"><Clock className="w-3 h-3" /> Check-out: {hotel.check_out || '11:00'}</p>
                          </div>
                        </div>
                        <Button
                          onClick={handleWazeClick}
                          variant="secondary"
                          className="w-full mt-2 bg-[#33ccff] hover:bg-[#2db8e6] text-white text-xs h-9"
                        >
                          <Navigation className="w-4 h-4 mr-2" /> Cómo llegar con Waze
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Políticas de Cancelación */}
                    <Card className="border-red-100 bg-red-50/30">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="font-bold text-red-600 text-sm flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4" /> Políticas de Cancelación
                        </h4>
                        <p className="text-[11px] leading-relaxed text-slate-600 italic">
                          {hotel.cancellation_policy || "Este establecimiento permite cancelaciones gratuitas hasta 48 horas antes de la llegada. Después de este periodo, se cobrará la primera noche como penalidad."}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Card>
            )}

            {/* PASO 3: RESUMEN Y PAGO */}
            {step === 3 && (
              <Card className="border-sabana border-2 shadow-xl animate-in zoom-in-95 overflow-hidden">
                <CardHeader className="bg-sabana/5 border-b border-sabana/10">
                  <CardTitle className="text-sabana flex items-center gap-2">
                    <Receipt className="w-5 h-5" /> Revisión Final de tu Reserva
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  {/* Resumen de Datos en Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm border-b pb-6">
                    {/* Columna 1: Estancia */}
                    <div className="space-y-2">
                      <p className="uppercase text-[10px] font-black text-slate-400 tracking-wider">Estancia</p>
                      <div className="text-slate-700 space-y-1">
                        <p className="flex justify-between md:block"><strong>Check-in:</strong> {checkInDate ? format(checkInDate, "dd/MM/yyyy") : "---"}</p>
                        <p className="flex justify-between md:block"><strong>Check-out:</strong> {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "---"}</p>
                        <p className="text-sabana font-bold">{calculations.nights} {calculations.nights === 1 ? 'Noche' : 'Noches'}</p>
                      </div>
                    </div>

                    {/* Columna 2: Titular */}
                    <div className="space-y-2">
                      <p className="uppercase text-[10px] font-black text-slate-400 tracking-wider">Titular y Huéspedes</p>
                      <div className="text-slate-700 space-y-1">
                        <p className="truncate"><strong>Nombre:</strong> {formData.firstName} {formData.lastName}</p>
                        <p><strong>Doc:</strong> {formData.documentType} {formData.identification}</p>
                        <p><strong>Huéspedes:</strong> {numAdults} Ad. {parseInt(numChildren) > 0 ? `+ ${numChildren} Niñ.` : ''}</p>
                      </div>
                    </div>

                    {/* Columna 3: Requerimientos Especiales (NUEVO) */}
                    <div className="space-y-2">
                      <p className="uppercase text-[10px] font-black text-slate-400 tracking-wider">Peticiones Especiales</p>
                      <div className="text-slate-600 italic text-xs bg-slate-50 p-2 rounded border border-slate-100 min-h-[60px]">
                        {formData.specialRequests ? (
                          <p>"{formData.specialRequests}"</p>
                        ) : (
                          <p className="text-slate-400">Sin requerimientos adicionales indicados.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desglose Económico Refactorizado */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal por alojamiento</span>
                      <span className="font-semibold">{formatCurrency(calculations.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span className="flex items-center gap-1">Impuestos y cargos gubernamentales <Badge variant="outline" className="text-[9px] py-0 h-4">19%</Badge></span>
                      <span className="font-semibold">+ {formatCurrency(calculations.taxes)}</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-300 pt-4 mt-2">
                      <div>
                        <span className="text-xl font-black text-sabana block">TOTAL A PAGAR</span>
                        <span className="text-[10px] text-slate-400 uppercase">Valores en Pesos Colombianos (COP)</span>
                      </div>
                      <span className="text-3xl font-black text-sabana tracking-tighter">
                        {formatCurrency(calculations.total)}
                      </span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                    <Button
                      variant="ghost"
                      className="text-slate-500 hover:text-sabana"
                      onClick={() => setStep(2)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Editar mis datos
                    </Button>

                    <Button
                      onClick={handlePayment}
                      size="lg"
                      className="w-full sm:w-auto bg-sabana hover:bg-sabana/90 font-black text-white shadow-xl shadow-sabana/20 px-8"
                    >
                      <CreditCard className="mr-2 w-5 h-5" />
                      PROCEDER AL PAGO SEGURO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Mini Resumen */}
          <aside className="lg:col-span-1">
            <ReservationDetailSidebar
              room={room}
              hotel={hotel}
              calculations={calculations}
              guests={{
                adults: numAdults,
                children: numChildren
              }}
            />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;