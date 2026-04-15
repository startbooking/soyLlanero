import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomCaptcha } from "@/components/CustomCaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Globe, 
  Smartphone, 
  Shield, 
  Zap, 
  BarChart3,
  Check,
  Sparkles
} from "lucide-react";

export default function AffiliationPresentation() {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("inicio");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    description: "",
    website: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBusinessTypeChange = (value: string) => {
    setSelectedBusinessType(value);
    setFormData({ ...formData, businessType: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
      toast.error("Por favor completa la verificación de seguridad");
      return;
    }

    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone || !formData.businessType) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    // Redirigir al formulario específico según el tipo de negocio
    const formRoutes: { [key: string]: string } = {
      "restaurant": "/forms/restaurant",
      "hotel": "/forms/accommodation",
      "agency": "/forms/agency",
      "activity": "/forms/activity",
      "tour": "/forms/tour",
      "event": "/forms/event",
      "poi": "/forms/point-of-interest",
      "service": "/forms/other-service"
    };

    toast.success("¡Gracias por tu interés! Te redirigimos al formulario de registro.");
    
    if (formRoutes[formData.businessType]) {
      setTimeout(() => {
        navigate(formRoutes[formData.businessType]);
      }, 1500);
    }
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Aumenta tu Visibilidad",
      description: "Llega a miles de turistas y visitantes que buscan servicios como el tuyo"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestión de Clientes",
      description: "Herramientas integradas para gestionar reservas, mensajes y reseñas"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análisis y Estadísticas",
      description: "Accede a métricas detalladas sobre el rendimiento de tu negocio"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Alcance Global",
      description: "Plataforma multiidioma que conecta con turistas de todo el mundo"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Multiplataforma",
      description: "Accesible desde cualquier dispositivo: web, móvil y tablet"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguridad Garantizada",
      description: "Protección de datos y transacciones con tecnología de última generación"
    }
  ];

  const techFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "React + TypeScript",
      description: "Interfaz moderna y rápida con las últimas tecnologías web"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Diseño Responsivo",
      description: "Experiencia óptima en todos los dispositivos"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Seguridad Avanzada",
      description: "Encriptación y protección de datos de nivel empresarial"
    }
  ];


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">


    {/* <div className="min-h-screen flex flex-col bg-background"> */}
      <TopBar 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <Header 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        language={currentLanguage}
      />

      <main className="pt-24 flex-grow">
        {/* Hero Section */}
        <section className="relative p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Únete a la Revolución del Turismo Digital
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Potencia tu negocio turístico con la plataforma más completa y tecnológicamente avanzada de Villavicencio
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Registrar mi Negocio
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById('benefits-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Beneficios
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits-section" className="py-20 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué unirse a nuestra plataforma?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubre las ventajas que te ofrecemos para hacer crecer tu negocio turístico
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tecnología de Punta</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Construida con las herramientas más modernas y eficientes del mercado
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {techFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 text-secondary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <Building2 className="w-24 h-24 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Plataforma Escalable y Confiable</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Infraestructura en la nube con alta disponibilidad 99.9%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Actualizaciones automáticas sin interrupciones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Soporte técnico dedicado para todos los asociados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Integración con sistemas de pago y reservas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Registration Form Section */}
        <section id="form-section" className="py-20 px-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comienza Hoy Mismo</h2>
              <p className="text-lg text-muted-foreground">
                Completa el formulario de pre-registro y te contactaremos para activar tu cuenta
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Formulario de Pre-Inscripción</CardTitle>
                <CardDescription>
                  Proporciona la información básica de tu negocio. Después te dirigiremos al formulario completo según tu tipo de servicio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nombre del Negocio *</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Ej: Hotel Paraíso"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nombre del Contacto *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contacto@negocio.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+57 300 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Tipo de Negocio *</Label>
                    <Select value={selectedBusinessType} onValueChange={handleBusinessTypeChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de negocio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurante</SelectItem>
                        <SelectItem value="hotel">Alojamiento / Hotel</SelectItem>
                        <SelectItem value="agency">Agencia de Viajes</SelectItem>
                        <SelectItem value="activity">Actividad Turística</SelectItem>
                        <SelectItem value="tour">Tour Operador</SelectItem>
                        <SelectItem value="event">Organizador de Eventos</SelectItem>
                        <SelectItem value="poi">Punto de Interés</SelectItem>
                        <SelectItem value="service">Otro Servicio Turístico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web (opcional)</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://www.tunegocio.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción Breve *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos brevemente sobre tu negocio y servicios"
                      rows={4}
                      required
                    />
                  </div>

                  <CustomCaptcha onVerified={setIsCaptchaVerified} />

                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6"
                    disabled={!isCaptchaVerified}
                  >
                    Continuar al Formulario Completo
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Al continuar, serás dirigido al formulario de registro específico para tu tipo de negocio
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para impulsar tu negocio turístico?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Únete a los cientos de negocios que ya confían en nuestra plataforma
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-12"
              onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Registrarme Ahora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
