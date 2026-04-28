import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { CalendarIcon, ArrowLeft, CreditCard, User, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Datos iniciales
  const [room, setRoom] = useState(location.state?.room);
  const [hotel, setHotel] = useState(location.state?.hotel);


  // Control de Pasos: 1: Disponibilidad, 2: Datos, 3: Resumen
  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [alternatives, setAlternatives] = useState([]);

  // Formulario
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");


  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", identification: "", specialRequests: ""
  });

  useEffect(() => {
    if (!room || !hotel) navigate("/hotels");
    window.scrollTo(0, 0);
  }, [room, hotel, navigate]);

  useEffect(() => {
    if (checkInDate) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);

      // Si no hay fecha de salida o la salida es menor o igual a la llegada
      if (!checkOutDate || checkOutDate <= checkInDate) {
        setCheckOutDate(nextDay);
      }
    }
  }, [checkInDate]);

  // Calculamos la fecha mínima de salida (Llegada + 1)
  const minCheckOutDate = useMemo(() => {
    if (!checkInDate) return new Date();
    const date = new Date(checkInDate);
    date.setDate(date.getDate() + 1);
    return date;
  }, [checkInDate]);


  // Cálculos Financieros
  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkInDate, checkOutDate]);

  const parsePrice = (p: string) => parseInt(p.replace(/[^\d]/g, "")) || 0;
  const subtotal = nights * parsePrice(room?.price_per_night || "0");
  const taxes = room?.has_tax === "1" ? subtotal * (parseFloat(room.tax_percentage) / 100) : 0;
  const total = subtotal + taxes;

  // PASO 1: Validar Disponibilidad
  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate || nights === 0) {
      toast({ title: "Fechas inválidas", description: "Selecciona un rango de fechas válido.", variant: "destructive" });
      return;
    }

    setIsValidating(true);
    try {
      // Simulación de validación (Reemplazar con tu endpoint real)
      const isAvailable = await dataService.checkRoomAvailability(room.id, checkInDate, checkOutDate);

      if (isAvailable) {
        setStep(2);
      } else {
        toast({ title: "Habitación ocupada", description: "Buscando otras opciones para ti...", variant: "default" });
        const others = await dataService.getRoomTypesByHotel(hotel.id);
        setAlternatives(others.filter((r: any) => r.id !== room.id));
      }
    } catch (e) {
      toast({ title: "Error", description: "No pudimos verificar la disponibilidad.", variant: "destructive" });
    } finally {
      setIsValidating(false);
    }
  };

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast({ title: "Atención", description: "Selecciona fechas de entrada y salida." });
      return;
    }

    const totalGuests = parseInt(numAdults) + parseInt(numChildren);
    setIsValidating(true);

    try {
      // Llamada al nuevo endpoint
      const response = await dataService.checkAvailability({
        room_id: room.id,
        check_in: format(checkInDate, "yyyy-MM-dd"),
        check_out: format(checkOutDate, "yyyy-MM-dd"),
        guests: totalGuests
      });

      if (response.available) {
        setStep(2); // Avanza a datos del cliente
        toast({ title: "¡Disponible!", description: "Puedes proceder con tu reserva." });
      } else {
        // Buscar alternativas si no hay cupo
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


  const DatePicker = ({
    date,
    setDate,
    placeholder,
    minDate,
    disabledDates
  }: {
    date?: Date,
    setDate: (d?: Date) => void,
    placeholder: string,
    minDate?: Date, // Nueva prop para fecha mínima
    disabledDates?: (d: Date) => boolean
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal border-[#D9E4C5] ${!date && "text-muted-foreground"}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-green-700" />
          {date ? format(date, "PPP", { locale: es }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          // Deshabilita cualquier fecha anterior a minDate o hoy
          disabled={disabledDates || ((d) => d < (minDate || new Date()))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );



  const handlePayment = () => {
    navigate("/payment", {
      state: { hotel, room, checkInDate, checkOutDate, guests, total, formData }
    });
  };

  if (!room || !hotel) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => { }} />
      <Header activeSection="businesses" onSectionChange={() => { }} language="es" />

      <main className="pt-24 pb-12 container mx-auto px-4">
        {/* Indicador de Pasos */}
        <div className="flex justify-center mb-8 gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 w-16 rounded-full ${step >= s ? "bg-green-700" : "bg-slate-200"}`} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            {/* PASO 1: CALENDARIO */}
            {step === 1 && (
              <Card className="border-[#D9E4C5]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="text-green-700" /> 1. Selecciona tus fechas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Fecha de Llegada */}
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">Llegada</Label>
                      <DatePicker
                        date={checkInDate}
                        setDate={setCheckInDate}
                        placeholder="Fecha de ingreso"
                        minDate={new Date()} // No puede ser antes de hoy
                      />
                    </div>

                    {/* Fecha de Salida */}
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">Salida</Label>
                      <DatePicker
                        date={checkOutDate}
                        setDate={setCheckOutDate}
                        placeholder="Fecha de salida"
                        // La fecha mínima permitida es Siempre Llegada + 1
                        minDate={minCheckOutDate}
                      />
                    </div>

                    {/* Selectores de personas (se mantienen igual) */}
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">Adultos</Label>
                      <Select value={numAdults} onValueChange={setNumAdults}>
                        <SelectTrigger className="border-[#D9E4C5]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(parseInt(room.max_occupancy || "1"))].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} Adulto{(i > 0) ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">Niños</Label>
                      <Select value={numChildren} onValueChange={setNumChildren}>
                        <SelectTrigger className="border-[#D9E4C5]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 Niños</SelectItem>
                          <SelectItem value="1">1 Niño</SelectItem>
                          <SelectItem value="2">2 Niños</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckAvailability}
                    className="w-full bg-green-700 hover:bg-green-800 h-12"
                    disabled={isValidating}
                  >
                    {isValidating ? "Verificando..." : "Verificar ahora"}
                  </Button>


                  {alternatives.length > 0 && (
                    <div className="mt-8 pt-8 border-t">
                      <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                        <AlertCircle /> No hay disponibilidad en la fecha elegida para esta habitación.
                      </h3>
                      <p className="mb-6 text-slate-600">Otras habitaciones disponibles en {hotel.name}:</p>
                      <div className="space-y-4">
                        {alternatives.map((alt) => (
                          <RoomCard key={alt.id} room={alt} hotel={hotel} />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* PASO 2: DATOS */}
            {step === 2 && (
              <Card className="border-[#D9E4C5]">
                <CardHeader><CardTitle className="flex items-center gap-2"><User className="text-green-700" /> 2. Información del Huésped</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Nombre</Label><Input onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Apellido</Label><Input onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} /></div>
                  </div>
                  <div className="space-y-2"><Label>Correo</Label><Input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                  <div className="space-y-2">
                    <Label>Adultos</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[...Array(parseInt(room.max_occupancy))].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} Persona(s)</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button variant="ghost" onClick={() => setStep(1)}>Atrás</Button>
                    <Button className="flex-1 bg-green-700" onClick={() => setStep(3)}>Continuar al Resumen</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PASO 3: RESUMEN FINAL */}
            {step === 3 && (
              <Card className="border-green-700 border-2 shadow-xl">
                <CardHeader className="bg-[#F7F9F2]"><CardTitle>3. Confirmar y Pagar</CardTitle></CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-8 text-sm">
                    <div>
                      <h4 className="font-bold uppercase text-xs text-slate-400 mb-2">Estancia</h4>
                      <p><strong>Desde:</strong> {format(checkInDate!, "dd/MM/yyyy")}</p>
                      <p><strong>Hasta:</strong> {format(checkOutDate!, "dd/MM/yyyy")}</p>
                      <p><strong>Noches:</strong> {nights}</p>
                    </div>
                    <div>
                      <h4 className="font-bold uppercase text-xs text-slate-400 mb-2">Huésped</h4>
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>ID: {formData.identification}</p>
                      <p>{guests} Adultos</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg space-y-2 border">
                    <div className="flex justify-between text-sm"><span>Valor por noche:</span><span>{room.price_per_night}</span></div>
                    <div className="flex justify-between text-sm"><span>Subtotal ({nights} noches):</span><span>${subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm text-slate-500"><span>Impuestos ({room.tax_percentage}%):</span><span>${taxes.toLocaleString()}</span></div>
                    <div className="flex justify-between font-black text-xl border-t pt-2 text-green-900"><span>TOTAL:</span><span>${total.toLocaleString()}</span></div>
                  </div>

                  <Button onClick={handlePayment} className="w-full bg-green-800 h-14 text-lg">
                    <CreditCard className="mr-2" /> Pagar con Wompi
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Resumen rápido siempre visible */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 border-[#D9E4C5]">
              <img src={`/images/rooms/${room.image}`} className="w-full h-32 object-cover rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900">{room.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{hotel.name}</p>
                <div className="text-sm space-y-1">
                  <p className="flex justify-between"><span>Precio/Noche:</span> <strong>{room.price_per_night}</strong></p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;