
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CustomCaptcha } from "@/components/CustomCaptcha";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppConfig } from "@/contexts/AppConfigContext";

export const Contact = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { appConfig } = useAppConfig();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      alert("Por favor completa la verificación");
      return;
    }
    console.log("Formulario enviado:", formData);
    alert("Mensaje enviado correctamente");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openWaze = () => {
    const wazeUrl = "https://waze.com/ul?q=Carrera%2035%20%2315-30%20Villavicencio%20Meta";
    window.open(wazeUrl, '_blank');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian



  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="contact" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Contáctanos
              </h1>
              <p className="text-xl text-muted-foreground">
                Estamos aquí para ayudarte con toda la información que necesites
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulario de contacto */}
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="subject"
                        placeholder="Asunto"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Textarea
                      name="message"
                      placeholder="Tu mensaje"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                    />

                    <CustomCaptcha onVerified={setIsCaptchaVerified} />

                    <Button type="submit" className="w-full" disabled={!isCaptchaVerified}>
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Información de contacto */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-muted-foreground">
                          {appConfig.company_address}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={openWaze}
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.83 12.63c0-1.21-.31-2.4-.9-3.45l-7.86 7.86c1.05.59 2.24.9 3.45.9 4.02 0 7.29-3.27 7.29-7.29v1.98h-1.98zm-7.84-7.84c-1.21 0-2.4.31-3.45.9l7.86 7.86c-.59-1.05-.9-2.24-.9-3.45 0-4.02 3.27-7.29 7.29-7.29v1.98h1.98c0-1.21-.31-2.4-.9-3.45L12.01 4.8z"/>
                          </svg>
                          Abrir en Waze
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-muted-foreground">{appConfig.company_movil}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">{appConfig.company_email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Horarios de atención</p>
                        <p className="text-muted-foreground">
                          {appConfig.horario_atencion}
                          {/* Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                          Sábados: 9:00 AM - 4:00 PM<br />
                          Domingos: Cerrado */}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ubicación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Mapa interactivo</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
