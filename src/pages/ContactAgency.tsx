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
import { MapPin, Phone, Mail, Star, ArrowLeft, Building, Send, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ContactAgency = () => {
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

  // Intentamos obtener la agencia del estado de navegación
  const agency = location.state?.agency;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
      toast.error("Por favor, completa la verificación de seguridad");
      return;
    }

    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      toast.success("¡Solicitud enviada! " + agency.name + " te contactará pronto.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsCaptchaVerified(false);
      setIsSubmitting(false);
    }, 1500);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!agency) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <Building className="w-16 h-16 text-slate-200 mb-4" />
        <h1 className="text-2xl font-black text-slate-800 mb-2">AGENCIA NO ENCONTRADA</h1>
        <p className="text-slate-500 mb-6">Lo sentimos, la información de la agencia no está disponible.</p>
        <Button 
          className="bg-sabana hover:bg-sabana/90 font-bold rounded-xl"
          onClick={() => navigate("/agencies-operators")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al listado
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="agencies-operators" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Botón Volver con estilo minimalista */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/agencies-operators")}
            className="mb-8 hover:bg-white text-slate-500 font-bold tracking-tight"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-sabana" />
            VOLVER A EXPLORAR
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Columna Izquierda: Formulario (7 columnas en desktop) */}
            <div className="lg:col-span-7">
              <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50 p-8">
                  <Badge className="w-fit mb-4 bg-sabana/10 text-sabana border-none font-bold">CONTACTO DIRECTO</Badge>
                  <CardTitle className="text-3xl font-black text-slate-900 tracking-tighter">
                    ¿Listo para tu próxima aventura?
                  </CardTitle>
                  <p className="text-slate-500 font-medium">
                    Envía tus dudas a <span className="text-sabana font-bold">{agency.name}</span> y recibe asesoría personalizada.
                  </p>
                </CardHeader>
                
                <CardContent className="p-8 bg-white">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold text-slate-700">Nombre completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          className="rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white h-12"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold text-slate-700">Correo electrónico *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white h-12"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-bold text-slate-700">Teléfono / WhatsApp</Label>
                        <Input
                          id="phone"
                          name="phone"
                          className="rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white h-12"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="font-bold text-slate-700">Asunto</Label>
                        <Input
                          id="subject"
                          name="subject"
                          className="rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white h-12"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Ej: Tour Caño Cristales"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-bold text-slate-700">¿En qué podemos ayudarte? *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        className="rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white min-h-[150px]"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <CustomCaptcha onVerified={setIsCaptchaVerified} />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sabana hover:bg-sabana/90 h-14 rounded-xl font-black text-lg shadow-lg shadow-sabana/20 transition-all active:scale-[0.98]"
                      disabled={!isCaptchaVerified || isSubmitting}
                    >
                      {isSubmitting ? (
                        <Clock className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        <Send className="w-5 h-5 mr-2" />
                      )}
                      {isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Columna Derecha: Info Card (5 columnas en desktop) */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
                <div className="relative h-72">
                  <img 
                    src={`/images/agency/${agency.image}`} 
                    alt={agency.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-bold text-lg">{agency.rating || "5.0"}</span>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
                      {agency.name}
                    </h2>
                  </div>
                </div>

                <CardContent className="p-8 space-y-8">
                  {/* Servicios */}
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sabana" /> EXPERTOS EN
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agency.services?.map((service: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-slate-50 text-slate-600 border-none font-bold text-xs py-1.5 px-3">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Info detallada */}
                  <div className="space-y-5 pt-6 border-t border-slate-50">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-sabana/10 rounded-xl">
                        <MapPin className="w-5 h-5 text-sabana" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Ubicación</p>
                        <p className="text-slate-700 font-bold text-sm">{agency.address || agency.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Phone className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">WhatsApp / Tel</p>
                        <p className="text-slate-700 font-bold text-sm">{agency.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-50 rounded-xl">
                        <Mail className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email Corporativo</p>
                        <p className="text-slate-700 font-bold text-sm truncate max-w-[220px]">{agency.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Horario */}
                  <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Horario de atención</p>
                      <p className="text-slate-600 text-xs font-bold">{agency.schedule || "Lunes a Sábado: 8am - 6pm"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Badge de Confianza Extra */}
              <div className="flex items-center gap-3 p-6 bg-sabana/5 border border-sabana/10 rounded-3xl">
                <ShieldCheck className="w-10 h-10 text-sabana" />
                <p className="text-xs text-slate-600 font-medium">
                  Esta agencia cuenta con **Registro Nacional de Turismo (RNT)** vigente y cumple con los estándares de calidad regional.
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

// Icono adicional que faltaba en los imports
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default ContactAgency;