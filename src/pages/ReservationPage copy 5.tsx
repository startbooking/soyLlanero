import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, CreditCard, User, AlertCircle, ArrowLeft, Users } from "lucide-react";

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

// --- Sub-componente: Selector de Fecha ---
const DatePicker = ({ 
  date, setDate, placeholder, minDate 
}: { 
  date?: Date, setDate: (d?: Date) => void, placeholder: string, minDate?: Date 
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={`w-full justify-start text-left font-normal border-sabana/30 ${!date && "text-muted-foreground"}`}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-sabana" />
        {date ? format(date, "PPP", { locale: es }) : <span>{placeholder}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(d) => d < (minDate || new Date())}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

const ReservationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toast } = useToast();

  const [room] = useState(state?.room);
  const [hotel] = useState(state?.hotel);

  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [alternatives, setAlternatives] = useState([]);

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", identification: "", specialRequests: ""
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

  // Cálculos Financieros
  const calculations = useMemo(() => {
    if (!checkInDate || !checkOutDate) return { nights: 0, subtotal: 0, taxes: 0, total: 0 };
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const price = parseInt(room?.price_per_night?.replace(/[^\d]/g, "")) || 0;
    const subtotal = nights * price;
    const taxes = room?.has_tax === "1" ? subtotal * (parseFloat(room.tax_percentage) / 100) : 0;
    
    return { nights, subtotal, taxes, total: subtotal + taxes };
  }, [checkInDate, checkOutDate, room]);

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast({ title: "Atención", description: "Selecciona fechas de entrada y salida." });
      return;
    }

    setIsValidating(true);
    const totalGuests = parseInt(numAdults) + parseInt(numChildren);

    try {
      const response = await dataService.checkAvailability({
        room_id: room.id,
        check_in: format(checkInDate, "yyyy-MM-dd"),
        check_out: format(checkOutDate, "yyyy-MM-dd"),
        guests: totalGuests
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

  const handlePayment = () => {
    navigate("/payment", {
      state: { 
        hotel, room, checkInDate, checkOutDate, 
        total: calculations.total, formData,
        guests: { adults: numAdults, children: numChildren }
      }
    });
  };

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
                            <SelectItem key={i+1} value={(i+1).toString()}>{i+1} Adulto{i > 0 ? 's' : ''}</SelectItem>
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sabana font-bold">
                    <User className="w-5 h-5" /> 2. Datos de Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre</Label>
                      <Input placeholder="Ej: Juan" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Apellido</Label>
                      <Input placeholder="Ej: Pérez" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="juan@correo.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input placeholder="300 123 4567" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Volver</Button>
                    <Button className="flex-1 bg-sabana text-white font-bold" onClick={() => setStep(3)}>Revisar Resumen</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PASO 3: RESUMEN Y PAGO */}
            {step === 3 && (
              <Card className="border-sabana border-2 shadow-xl animate-in zoom-in-95">
                <CardHeader className="bg-sabana/5">
                  <CardTitle className="text-sabana">Revisión Final</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6 text-sm text-slate-600">
                    <div className="space-y-1">
                      <p className="uppercase text-[10px] font-bold text-slate-400">Estancia</p>
                      <p><strong>Check-in:</strong> {format(checkInDate!, "dd/MM/yyyy")}</p>
                      <p><strong>Check-out:</strong> {format(checkOutDate!, "dd/MM/yyyy")}</p>
                      <p><strong>Noches:</strong> {calculations.nights}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="uppercase text-[10px] font-bold text-slate-400">Titular</p>
                      <p><strong>Nombre:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Huéspedes:</strong> {numAdults} Ad. {numChildren} Niñ.</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({calculations.nights} noches)</span>
                      <span className="font-medium">${calculations.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Impuestos y cargos</span>
                      <span>${calculations.taxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xl font-black text-sabana border-t pt-3">
                      <span>TOTAL</span>
                      <span>${calculations.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button onClick={handlePayment} className="w-full bg-sabana hover:bg-sabana/90 h-14 text-lg font-black text-white shadow-lg">
                      <CreditCard className="mr-2 w-5 h-5" /> Pagar con Wompi
                    </Button>
                    <Button variant="link" className="text-slate-400" onClick={() => setStep(2)}>Editar mis datos</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Mini Resumen */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-28 border-sabana/10 overflow-hidden shadow-md">
              <div className="relative h-40">
                <img src={`/images/rooms/${room.image}`} className="w-full h-full object-cover" alt={room.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold leading-tight">{room.name}</h3>
                  <p className="text-xs opacity-80">{hotel.name}</p>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    <span>Capacidad: {room.max_occupancy} personas</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t pt-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Tarifa/Noche</span>
                    <span className="text-lg font-bold text-sabana">{room.price_per_night}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;