import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalendarIcon, ArrowLeft, Users, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const ReservationPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Recibimos los objetos del estado de navegación
  const room = location.state?.room;
  const hotel = location.state?.hotel;

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [children, setChildren] = useState("0");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    identification: "",
    specialRequests: ""
  });

  // Redirección de seguridad si no hay datos en el state
  useEffect(() => {
    if (!room || !hotel) {
      navigate("/hotels");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [room, hotel, navigate]);

  if (!room || !hotel) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  // Limpieza de precio para cálculos (quita símbolos y puntos)
  const parsePrice = (price: string) => {
    return parseInt(price.replace(/[^\d]/g, "")) || 0;
  };

  const calculateSubtotal = () => {
    const nights = calculateNights();
    return nights * parsePrice(room.price_per_night);
  };

  const calculateTotalTaxes = () => {
    if (room.has_tax === "0") return 0;
    const subtotal = calculateSubtotal();
    const taxRate = parseFloat(room.tax_percentage) / 100;
    return subtotal * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalTaxes();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkInDate || !checkOutDate) {
      toast({ title: "Error", description: "Selecciona las fechas de estancia", variant: "destructive" });
      return;
    }

    navigate(`/payment`, {
      state: {
        hotel,
        room,
        checkInDate,
        checkOutDate,
        guests,
        children,
        ...formData,
        subtotal: calculateSubtotal(),
        taxes: calculateTotalTaxes(),
        total: calculateTotal()
      }
    });
  };

  return (
    <div className="min-h-screen bg-accent/30">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6 border-green-700 text-green-800 hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-[#D9E4C5]">
                <CardHeader className="bg-[#F7F9F2] rounded-t-lg border-b border-[#D9E4C5]">
                  <CardTitle className="text-2xl text-green-900">Detalles de la Reserva</CardTitle>
                  <p className="text-green-700 font-medium">{hotel.name} — {room.name}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Check-in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left border-[#D9E4C5]">
                              <CalendarIcon className="mr-2 h-4 w-4 text-green-700" />
                              {checkInDate ? format(checkInDate, "PPP", { locale: es }) : "Fecha llegada"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkInDate}
                              onSelect={setCheckInDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>Check-out</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left border-[#D9E4C5]">
                              <CalendarIcon className="mr-2 h-4 w-4 text-green-700" />
                              {checkOutDate ? format(checkOutDate, "PPP", { locale: es }) : "Fecha salida"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkOutDate}
                              onSelect={setCheckOutDate}
                              disabled={(date) => date < (checkInDate || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>Adultos</Label>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger className="border-[#D9E4C5]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(parseInt(room.max_occupancy))].map((_, i) => (
                              <SelectItem key={i+1} value={(i+1).toString()}>{i+1} Adulto{i > 0 ? 's' : ''}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-semibold text-slate-800">Datos de contacto</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombres *</Label>
                          <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellidos *</Label>
                          <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="identification">Cédula / Pasaporte *</Label>
                          <Input id="identification" value={formData.identification} onChange={(e) => handleInputChange("identification", e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo electrónico *</Label>
                          <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="phone">Celular *</Label>
                          <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" size="lg">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Continuar al Pago
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-[#D9E4C5] shadow-md">
                <CardHeader className="bg-[#F7F9F2] rounded-t-lg border-b border-[#D9E4C5]">
                  <CardTitle className="text-lg">Resumen</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex gap-3">
                    <img src={`/images/rooms/${room.image || 'noimage.jpg'}`} className="w-24 h-24 object-cover rounded-md border" />
                    <div>
                      <p className="font-bold text-green-900">{room.name}</p>
                      <p className="text-xs text-muted-foreground">{hotel.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm pt-4 border-t border-dashed">
                    <div className="flex justify-between">
                      <span>Noches:</span>
                      <span className="font-medium">{calculateNights()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 italic">
                      <span>Impuestos ({room.tax_percentage}%):</span>
                      <span>${calculateTotalTaxes().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl pt-4 border-t text-green-900">
                      <span>Total:</span>
                      <span>${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;