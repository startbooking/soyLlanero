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
import { MapPin, Phone, Mail, Star, ArrowLeft, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";



const ContactAgency = () => {
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

  const agency = location.state?.agency;

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

    // Aquí iría la lógica para enviar el mensaje
    toast.success("Mensaje enviado correctamente. La agencia se pondrá en contacto contigo pronto.");
    
    // Limpiar formulario
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
  

  if (!agency) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <Header activeSection="agencies-operators" onSectionChange={() => {}} language={currentLanguage} />
        <main className="pt-24 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Agencia no encontrada</h1>
            <Button className="bg-tranparent text-black border border-black hover:bg-primary/50" onClick={() => navigate("/agencies-operators")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              
              Volver a Agencias
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
      <Header activeSection="agencies-operators" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/agencies-operators")}
            className="mb-6 bg-tranparent text-black border border-black hover:bg-primary/50 hover:border-primary/70"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Agencias
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario de Contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contactar a {agency.name}</CardTitle>
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
                    className="w-full"
                    disabled={!isCaptchaVerified}
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Información de la Agencia */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={`/images/agency/${agency.image}`} 
                    alt={agency.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {agency.category}
                  </Badge>
                  <div className="absolute bottom-4 right-4 flex items-center bg-white/90 rounded-full px-3 py-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span className="font-bold">{agency.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{agency.name}</CardTitle>
                  <p className="text-muted-foreground">{agency.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      Servicios
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agency.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-muted-foreground text-sm">{agency.address}</p>
                        <p className="text-muted-foreground text-sm">{agency.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-muted-foreground text-sm">{agency.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Correo electrónico</p>
                        <p className="text-muted-foreground text-sm">{agency.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Horario de atención</h4>
                    <p className="text-muted-foreground text-sm">{agency.schedule}</p>
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

export default ContactAgency;
