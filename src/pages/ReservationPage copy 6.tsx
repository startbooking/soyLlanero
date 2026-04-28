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
import { CalendarIcon, ArrowLeft, CreditCard, User, AlertCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [alternatives, setAlternatives] = useState([]);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", identification: "" });

  const { room, hotel } = location.state || {};

  useEffect(() => {
    if (!room || !hotel) navigate("/hotels");
  }, [room, hotel, navigate]);

  // Cálculos financieros
  const { nights, subtotal, taxes, total } = useMemo(() => {
    if (!checkInDate || !checkOutDate || !room) return { nights: 0, subtotal: 0, taxes: 0, total: 0 };
    const n = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000));
    const price = parseInt(room.price_per_night.replace(/\D/g, "")) || 0;
    const sub = n * price;
    const tax = room.has_tax === "1" ? sub * (parseFloat(room.tax_percentage) / 100) : 0;
    return { nights: n, subtotal: sub, taxes: tax, total: sub + tax };
  }, [checkInDate, checkOutDate, room]);

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) return toast({ title: "Selecciona fechas", variant: "destructive" });
    setIsValidating(true);
    try {
      const response = await dataService.checkAvailability({
        room_id: room.id,
        check_in: format(checkInDate, "yyyy-MM-dd"),
        check_out: format(checkOutDate, "yyyy-MM-dd"),
        guests: parseInt(guests)
      });

      if (response.available) {
        setStep(2);
      } else {
        const others = await dataService.getRoomTypesByHotel(hotel.id);
        setAlternatives(others.filter((r: any) => r.id !== room.id));
        toast({ title: "No disponible", description: response.message, variant: "destructive" });
      }
    } finally {
      setIsValidating(false);
    }
  };

  if (!room || !hotel) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => {}} />
      <Header activeSection="businesses" onSectionChange={() => {}} language="es" />

      <main className="pt-24 pb-12 container mx-auto px-4">
        {/* Progress Bar */}
        <div className="flex justify-center mb-8 gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 w-16 rounded-full transition-colors ${step >= s ? "bg-sabana" : "bg-slate-200"}`} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Paso 1: Fechas */}
            {step === 1 && (
              <Card className="border-sabana/30">
                <CardHeader><CardTitle className="flex items-center gap-2 text-sabana"><CalendarIcon /> 1. Selecciona fechas</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <DatePicker label="Llegada" date={checkInDate} setDate={setCheckInDate} />
                    <DatePicker label="Salida" date={checkOutDate} setDate={setCheckOutDate} minDate={checkInDate ? addDays(checkInDate, 1) : new Date()} />
                  </div>
                  <Button onClick={handleCheckAvailability} className="w-full bg-sabana hover:bg-sabana/90" disabled={isValidating}>
                    {isValidating ? "Validando..." : "Continuar"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Paso 2 y 3 omitidos para brevedad, aplica lógica similar de colores */}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 border-sabana/20">
              <img src={`/images/rooms/${room.image}`} className="w-full h-40 object-cover" alt="Habitación" />
              <CardContent className="p-4">
                <h3 className="font-bold text-sabana">{room.name}</h3>
                <p className="text-xl font-black mt-2">{room.price_per_night}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Subcomponente DatePicker optimizado
const DatePicker = ({ label, date, setDate, minDate }: any) => (
  <div className="space-y-2">
    <Label className="font-bold text-slate-700">{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start border-sabana/30">
          <CalendarIcon className="mr-2 h-4 w-4 text-sabana" />
          {date ? format(date, "PPP", { locale: es }) : "Seleccionar..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0"><Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < (minDate || new Date())} /></PopoverContent>
    </Popover>
  </div>
);

export default ReservationPage;