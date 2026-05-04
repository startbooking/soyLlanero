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
import { MapPin, Phone, Mail, Star, ArrowLeft, Clock, Wrench, Send, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ContactService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const service = location.state?.service;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      toast.error("Por favor, completa la verificación de seguridad");
      return;
    }

    setIsSubmitting(true);
    
    // Simulación de envío exitoso
    setTimeout(() => {
      toast.success(`¡Mensaje enviado! ${service?.name} te contactará pronto.`);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsCaptchaVerified(false);
      setIsSubmitting(false);
    }, 1500);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-black text-slate-800 mb-4 tracking-tighter">SERVICIO NO ENCONTRADO</h1>
        <Button className="bg-sabana hover:bg-sabana/90 font-bold rounded-xl" onClick={() => navigate("/services")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Servicios
        </Button>
      </div>
    );
  }

  // Parseo seguro de la lista de servicios incluidos
  const includedServices = (() => {
    try {
      return typeof service.services === 'string' ? JSON.parse(service.services) : service.services;
    } catch (e) {
      return [];
    }
  })();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="services" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/services")}
            className="mb-8 hover:bg-white text-slate-500 font-bold tracking-tight"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-sabana" />
            VOLVER A SERVICIOS
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Formulario de Contacto (Izquierda - 7 columnas) */}
            <div className="lg:col-span-7">
              <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50 p-8">
                  <Badge className="w-fit mb-4 bg-sabana/10 text-sabana border-none font-bold">SOLICITUD DE INFORMACIÓN</Badge>
                  <CardTitle className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                    Contactar a {service.name}
                  </CardTitle>
                  <p className="text-slate-500 font-medium">
                    Consulta disponibilidad, precios o detalles adicionales directamente con el proveedor.
                  </p>
                </CardHeader>

                <CardContent className="p-8 bg-white">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold text-slate-700 uppercase text-[11px] tracking-widest">Nombre completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          className="rounded-xl border-slate-100 bg-slate-50/50 h-12 focus:bg-white transition-all"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold text-slate-700 uppercase text-[11px] tracking-widest">Correo electrónico *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="rounded-xl border-slate-100 bg-slate-50/50 h-12 focus:bg-white transition-all"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-bold text-slate-700 uppercase text-[11px] tracking-widest">Teléfono / Celular</Label>
                        <Input
                          id="phone"
                          name="phone"
                          className="rounded-xl border-slate-100 bg-slate-50/50 h-12"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="font-bold text-slate-700 uppercase text-[11px] tracking-widest">Asunto</Label>
                        <Input
                          id="subject"
                          name="subject"
                          className="rounded-xl border-slate-100 bg-slate-50/50 h-12"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Ej: Reserva para grupo"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-bold text-slate-700 uppercase text-[11px] tracking-widest">Mensaje *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        className="rounded-xl border-slate-100 bg-slate-50/50 min-h-[150px] focus:bg-white"
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
                      className="w-full bg-sabana hover:bg-sabana/90 text-white font-black h-14 rounded-xl shadow-lg shadow-sabana/20 transition-all active:scale-95"
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

            {/* Información del Servicio (Derecha - 5 columnas) */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
                <div className="relative h-64">
                  <img 
                    src={`/images/services/${service.image}`} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = '/placeholder-service.jpg')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-sabana border-none font-bold shadow-sm">
                    {service.category}
                  </Badge>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-black text-xl">{service.rating || "5.0"}</span>
                  </div>
                </div>
                
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase mb-2">{service.name}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-50">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-sabana" /> Servicios Incluidos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {includedServices.map((item: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-slate-50 text-slate-600 border-none font-bold text-xs py-1.5 px-3">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-50">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-sabana/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-sabana" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Ubicación</p>
                        <p className="text-slate-700 font-bold text-sm">{service.address || service.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Teléfono</p>
                        <p className="text-slate-700 font-bold text-sm">{service.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Horario</p>
                        <p className="text-slate-700 font-bold text-sm">{service.schedule}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badge de Verificación */}
              <div className="flex items-center gap-4 p-6 bg-sabana/5 border border-sabana/10 rounded-3xl">
                <ShieldCheck className="w-10 h-10 text-sabana flex-shrink-0" />
                <p className="text-xs text-slate-600 font-medium">
                  Este prestador de servicios está verificado por **Llanos Turismo** y cumple con los estándares de calidad regional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactService;