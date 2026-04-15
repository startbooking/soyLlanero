import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { cn } from "@/lib/utils";

const ExperienceReservation = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const experience = location.state?.experience;

  // console.log(experience);

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    identification: "",
    specialRequests: ""
  });

  if (!experience) {
    return (
      <div className="min-h-screen bg-accent/30">
        <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <Header activeSection="experiences" onSectionChange={() => {}} language={currentLanguage} />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-8">
            <p>Experiencia no encontrada</p>
            <Button onClick={() => navigate('/experiences')}>Volver a Experiencias</Button>
          </div>
        </main>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const pricePerPerson = parseInt(experience.price);
    console.log(pricePerPerson)
    console.log(adults)
    const totalPeople = parseInt(adults) // + parseInt(children);
    return pricePerPerson * totalPeople;
  };

  const isFormValid = () => {
    return (
      selectedDate &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.identification
    );
  };

  const generateWompiLink = () => {
    const total = calculateTotal();
    const amountInCents = total * 100; // Wompi requiere el monto en centavos
    const reference = `EXP-${experience.id}-${Date.now()}`;
    
    // Clave pública de prueba de Wompi
    const publicKey = "pub_test_G6lKLmJeLt9vsWWp41FlfYzckYvBZmDe";
    
    const wompiUrl = `https://checkout.wompi.co/p/?public-key=${publicKey}&currency=COP&amount-in-cents=${amountInCents}&reference=${reference}`;
    
    return wompiUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Error",
        description: "Por favor selecciona la fecha de la experiencia",
        variant: "destructive"
      });
      return;
    }

    if (!isFormValid()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    // Guardar datos de reserva en consola (en producción iría a backend)
    console.log("Reservation data:", {
      experience,
      selectedDate,
      adults,
      children,
      ...formData,
      total: calculateTotal()
    });

    // Abrir link de pago de Wompi
    const wompiLink = generateWompiLink();
    window.open(wompiLink, '_blank');
    
    toast({
      title: "Redirigiendo al pago",
      description: "Se ha abierto la página de pago de Wompi en una nueva ventana"
    });
  };

  return (
    <div className="min-h-screen bg-accent/30">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="experiences" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/experiences')}
            className="mb-6 border border-black-200 text-black bg-tranparent hover:bg-primary/60 hover:border-primary/70 "
            
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Experiencias
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reservation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Reservar Experiencia</CardTitle>
                  <p className="text-muted-foreground">{experience.name}</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date and Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Fecha de la Experiencia *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>Adultos *</Label>
                        <Select value={adults} onValueChange={setAdults}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(experience.max_people)].map((_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1)}>
                                {i + 1} adulto{i !== 0 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* <div className="space-y-2">
                        <Label>Niños</Label>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(Math.max(1, (experience.maxPeople - adults)))].map((_, i) => (
                              <SelectItem key={i} value={String(i)}>
                                {i} niño{i !== 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div> */}
                    </div>

                    {/* Guest Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Información del Solicitante</h3>
                      
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
                          placeholder="Ej: Requerimientos alimenticios, necesidades especiales, etc."
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={!isFormValid()}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Ir a Pagar con Wompi
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
                      src={`/images/experiences/${experience.image}`} 
                      alt={experience.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{experience.name}</h4>
                      <p className="text-sm text-muted-foreground">{experience.location}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {adults} adulto{adults !== "1" ? "s" : ""}{children !== "0" && `, ${children} niño${children !== "1" ? "s" : ""}`}
                      </div>
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Fecha:</span>
                        <span>{format(selectedDate, "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Duración:</span>
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Precio por persona:</span>
                        <span>{experience.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Adultos:</span>
                        <span>{adults} x {experience.price}</span>
                      </div>
                      {children !== "0" && (
                        <div className="flex justify-between text-sm">
                          <span>Niños:</span>
                          <span>{children} x {experience.price}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total:</span>
                        <span>${calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {experience.includes && experience.includes.length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Incluye:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {experience.includes.map((item: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
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

export default ExperienceReservation;