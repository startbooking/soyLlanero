
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [children, setChildren] = useState("0");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    identification: "",
    specialRequests: ""
  });

  // Mock data - in real app this would come from API
  const hotel = {
    name: "Hotel Orinoco Plaza",
    location: "Centro, Villavicencio"
  };

  const room = {
    id: parseInt(roomId || "1"),
    name: "Habitación Estándar",
    price: "$150.000",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    taxes: 28500,
    taxPercentage: 19
  };

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

  const calculateTotal = () => {
    const nights = calculateNights();
    const pricePerNight = parseInt(room.price.replace(/[^\d]/g, ""));
    const subtotal = nights * pricePerNight;
    const totalTaxes = nights * room.taxes;
    return subtotal + totalTaxes;
  };

  const calculateSubtotal = () => {
    const nights = calculateNights();
    const pricePerNight = parseInt(room.price.replace(/[^\d]/g, ""));
    return nights * pricePerNight;
  };

  const calculateTotalTaxes = () => {
    const nights = calculateNights();
    return nights * room.taxes;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Error",
        description: "Por favor selecciona las fechas de check-in y check-out",
        variant: "destructive"
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.identification) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the reservation data to your backend
    console.log("Reservation data:", {
      hotel,
      room,
      checkInDate,
      checkOutDate,
      guests,
      ...formData,
      total: calculateTotal()
    });

    // Redirect to payment page
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <div className="min-h-screen bg-accent/30">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="businesses" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/hotel/${hotelId}`)}
            className="mb-6 border border-primary text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Hotel
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reservation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Reservar Habitación</CardTitle>
                  <p className="text-muted-foreground">{hotel.name} - {room.name}</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dates and Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Check-in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkInDate ? format(checkInDate, "PPP", { locale: es }) : "Seleccionar fecha"}
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
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkOutDate ? format(checkOutDate, "PPP", { locale: es }) : "Seleccionar fecha"}
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
                        <Label>Huéspedes</Label>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 huésped</SelectItem>
                            <SelectItem value="2">2 huéspedes</SelectItem>
                            <SelectItem value="3">3 huéspedes</SelectItem>
                            <SelectItem value="4">4 huéspedes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>Niños</Label>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 niños</SelectItem>
                            <SelectItem value="1">1 niño</SelectItem>
                            <SelectItem value="2">2 niños</SelectItem>
                            <SelectItem value="3">3 niños</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Guest Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Información del Huésped</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellido *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="identification">Identificación *</Label>
                          <Input
                            id="identification"
                            value={formData.identification}
                            onChange={(e) => handleInputChange("identification", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Solicitudes Especiales</Label>
                        <Textarea
                          id="specialRequests"
                          placeholder="Ej: Cama extra, habitación en piso alto, etc."
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Continuar al Pago
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen de Reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{room.name}</h4>
                      <p className="text-sm text-muted-foreground">{hotel.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {guests} huésped{guests !== "1" ? "es" : ""}{children !== "0" && `, ${children} niño${children !== "1" ? "s" : ""}`}
                      </div>
                    </div>
                  </div>

                  {checkInDate && checkOutDate && (
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Check-in:</span>
                        <span>{format(checkInDate, "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Check-out:</span>
                        <span>{format(checkOutDate, "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Noches:</span>
                        <span>{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Precio por noche:</span>
                        <span>{room.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Impuestos ({room.taxPercentage}%):</span>
                        <span>${calculateTotalTaxes().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total:</span>
                        <span>${calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}
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
