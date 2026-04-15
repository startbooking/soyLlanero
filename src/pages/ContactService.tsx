import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CustomCaptcha } from "@/components/CustomCaptcha";
import { MapPin, Phone, Mail, Star, ArrowLeft, Clock, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ContactService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const service = location.state?.service;


  /* const services = [
    {
      id: 1,
      name: "Transporte VIP Llanos",
      location: "Villavicencio",
      description: "Servicio de transporte ejecutivo y turístico con vehículos de lujo y conductores profesionales.",
      rating: 4.5,
      price: "Desde $50.000",
      phone: "+57 311 456 7890",
      whatsapp: "+57 311 456 7890",
      email: "info@transportevipllanos.com",
      address: "Carrera 40 #25-30, Villavicencio",
      schedule: "24 horas",
      capacity: "1-15 pasajeros",
      category: "Transporte",
      services: ["Traslados aeropuerto", "Tours personalizados", "Transporte empresarial", "Eventos especiales"],
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2"
    },
    {
      id: 2,
      name: "Guías Turísticos Certificados",
      location: "Toda la región",
      description: "Servicio de guías turísticos especializados en cultura llanera, ecoturismo y aventura.",
      rating: 4.8,
      price: "$80.000/día",
      phone: "+57 320 123 4567",
      whatsapp: "+57 320 123 4567",
      email: "guias@llanosturismo.com",
      address: "Disponible en toda la región",
      schedule: "6:00 AM - 8:00 PM",
      capacity: "1-20 personas",
      category: "Guías Turísticos",
      services: ["Tours culturales", "Ecoturismo", "Aventura", "Fotografía"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  ];
 */
  // const service = location.state?.service || services.find(s => s.id === Number(id));

  // console.log(service)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
      toast.error("Por favor, completa la verificación de seguridad");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }

    console.log("Enviando mensaje a:", service?.name, "con datos:", formData);
    toast.success("Mensaje enviado correctamente. El servicio se pondrá en contacto contigo pronto.");
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setIsCaptchaVerified(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);
  

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <Header activeSection="services" onSectionChange={() => {}} language={currentLanguage} />
        <main className="pt-24 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Servicio no encontrado</h1>
            <Button onClick={() => navigate("/services")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Servicios
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="services" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/services")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Servicios
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario de Contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contactar a {service.name}</CardTitle>
                <p className="text-muted-foreground">
                  Completa el formulario y nos pondremos en contacto contigo
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+57 XXX XXX XXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Motivo de tu consulta"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe tu consulta o solicitud..."
                      rows={5}
                      required
                    />
                  </div>

                  <CustomCaptcha onVerified={setIsCaptchaVerified} />

                  <Button 
                    type="submit" 
                    className="w-full bg-black-500 text-black border border-black-700 hover:bg-green-300"
                    disabled={!isCaptchaVerified}
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Información del Servicio */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={`/images/services/${service.image}`} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-white-500 text-white border border-black-500 rounded-md">
                    {service.category}
                  </Badge>
                  <div className="absolute bottom-4 right-4 flex items-center bg-white/90 rounded-md px-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-bold text-sm">{service.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Wrench className="w-4 h-4 mr-2" />
                      Servicios Incluidos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {JSON.parse(service.services).map((item, index) => (
                        <Badge key={index} variant="primary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-black-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Ubicación</p>
                        <p className="text-muted-foreground text-sm">{service.address}</p>
                        <p className="text-muted-foreground text-sm">{service.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 text-black-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-muted-foreground text-sm">{service.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 text-black-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Correo electrónico</p>
                        <p className="text-muted-foreground text-sm">{service.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 text-black-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Horario</p>
                        <p className="text-muted-foreground text-sm">{service.schedule}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 text-black-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Horario</p>
                        <p className="text-muted-foreground text-sm">{service.schedule}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Horario de atención</h4>
                    <p className="text-muted-foreground text-sm">{service.schedule}</p>
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

export default ContactService;
