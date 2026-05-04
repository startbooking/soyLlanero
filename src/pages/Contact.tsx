import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  MessageSquare, Navigation, ExternalLink 
} from "lucide-react";
import { CustomCaptcha } from "@/components/CustomCaptcha";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export const Contact = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { appConfig } = useAppConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error("Por favor completa la verificación de seguridad");
      return;
    }

    setIsSubmitting(true);
    // Simulación de envío
    setTimeout(() => {
      console.log("Formulario enviado:", formData);
      toast.success("¡Mensaje enviado correctamente! Nos contactaremos pronto.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsCaptchaVerified(false);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openWaze = () => {
    const address = encodeURIComponent(appConfig.company_address);
    window.open(`https://waze.com/ul?q=${address}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="contact" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Cabecera de Página */}
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Badge className="mb-4 bg-sabana/10 text-sabana border-none font-bold px-4 py-1 uppercase tracking-widest text-[10px]">
                Atención al Ciudadano
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                ¿CÓMO PODEMOS <span className="text-sabana">AYUDARTE?</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                Estamos aquí para resolver tus dudas sobre el turismo en nuestra región y apoyarte en lo que necesites.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Columna Izquierda: Formulario (7 columnas) */}
              <div className="lg:col-span-7">
                <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
                  <CardHeader className="p-8 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sabana/10 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-sabana" />
                      </div>
                      <CardTitle className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
                        Envíanos un mensaje
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Nombre completo</Label>
                          <Input
                            name="name"
                            className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                            placeholder="Ej: Juan Pérez"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Correo electrónico</Label>
                          <Input
                            name="email"
                            type="email"
                            className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                            placeholder="juan@ejemplo.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Teléfono</Label>
                          <Input
                            name="phone"
                            className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                            placeholder="+57 3..."
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Asunto</Label>
                          <Input
                            name="subject"
                            className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                            placeholder="Motivo de tu consulta"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Tu mensaje</Label>
                        <Textarea
                          name="message"
                          className="rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all min-h-[150px]"
                          placeholder="Escribe aquí tu solicitud detallada..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <CustomCaptcha onVerified={setIsCaptchaVerified} />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-14 bg-sabana hover:bg-sabana/90 text-white font-black rounded-xl shadow-lg shadow-sabana/20 transition-all active:scale-[0.98]" 
                        disabled={!isCaptchaVerified || isSubmitting}
                      >
                        {isSubmitting ? "ENVIANDO..." : (
                          <span className="flex items-center gap-2">
                            <Send className="w-5 h-5" /> ENVIAR MENSAJE
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Columna Derecha: Info y Mapa (5 columnas) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Información de contacto */}
                <Card className="border-none shadow-xl rounded-3xl bg-slate-900 text-white overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black uppercase tracking-tighter text-sabana">
                      Datos de Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-sabana/20 transition-colors">
                        <MapPin className="w-6 h-6 text-sabana" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dirección Física</p>
                        <p className="font-bold leading-tight mt-1">{appConfig.company_address}</p>
                        <Button 
                          variant="link" 
                          className="h-auto p-0 text-sabana font-bold text-xs mt-2 hover:no-underline"
                          onClick={openWaze}
                        >
                          <Navigation className="w-3 h-3 mr-1" /> Cómo llegar con Waze
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                        <Phone className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teléfono / WhatsApp</p>
                        <p className="font-bold mt-1">{appConfig.company_movil}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
                        <Mail className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Correo Electrónico</p>
                        <p className="font-bold mt-1 text-sm md:text-base break-all">{appConfig.company_email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                        <Clock className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Horarios de Atención</p>
                        <p className="font-bold mt-1 leading-tight text-sm">
                          {appConfig.horario_atencion}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mapa Interactivo */}
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white h-[350px]">
                  <iframe
                    title="Ubicación Clúster Villavicencio"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.255956037415!2d-73.633!3d4.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2ddf16c1110b%3A0x6a19f9a46328325a!2sVillavicencio%2C%20Meta!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
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