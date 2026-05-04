import { useEffect, useState } from "react";
import { 
  Users, Building, Target, Award, FileText, Phone, 
  Mail, MapPin, Loader2, ShieldCheck, TrendingUp, Sparkles 
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useNavigate } from "react-router-dom";

const toSafeArray = (data: any) => {
  if (Array.isArray(data)) return data;
  if (!data) return [];
  try {
    return typeof data === "string" ? JSON.parse(data) : [data];
  } catch (e) {
    return [];
  }
};

const Institutional = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { appConfig } = useAppConfig();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="institutional" onSectionChange={() => {}} language={currentLanguage} />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          
          {/* 1. HERO SECTION DINÁMICO */}
          <section className="text-center mb-20 animate-in fade-in zoom-in duration-700">
            <Badge variant="outline" className="mb-4 border-sabana text-sabana font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
              Institucionalidad y Progreso
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              {appConfig?.app_name || "Clúster de Turismo"} 
              <span className="text-sabana"> Villavicencio</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              {appConfig?.app_description || "Impulsando el desarrollo turístico de la Puerta al Llano."}
            </p>
          </section>

          {/* 2. MISIÓN, VISIÓN Y OBJETIVOS (Cards Elevadas) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="h-2 bg-sabana w-full" />
              <CardHeader className="pt-8 text-center">
                <div className="w-16 h-16 bg-sabana/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-sabana" />
                </div>
                <CardTitle className="font-black text-2xl uppercase tracking-tighter">Misión</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-center">
                <p className="text-slate-500 leading-relaxed font-medium">
                  {appConfig?.mision}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="h-2 bg-blue-500 w-full" />
              <CardHeader className="pt-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-blue-500" />
                </div>
                <CardTitle className="font-black text-2xl uppercase tracking-tighter">Visión</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-center">
                <p className="text-slate-500 leading-relaxed font-medium">
                  {appConfig?.vision}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="h-2 bg-orange-500 w-full" />
              <CardHeader className="pt-8 text-center">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-orange-500" />
                </div>
                <CardTitle className="font-black text-2xl uppercase tracking-tighter">Objetivos</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="flex flex-col gap-3">
                  {toSafeArray(appConfig?.objetivos).map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-sabana shrink-0 mt-0.5" />
                      <p className="text-sm font-bold text-slate-600 leading-tight">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 3. LOGROS (Timeline Estilizado) */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
                Hitos y <span className="text-sabana">Logros</span>
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {toSafeArray(appConfig?.achievements).map((achievement, index) => (
                <div 
                  key={index}
                  className="relative pl-8 md:pl-0 flex flex-col md:flex-row gap-6 items-center group"
                >
                  <div className="hidden md:flex flex-1 justify-end text-right">
                    <span className="text-4xl font-black text-slate-200 group-hover:text-sabana transition-colors">
                      {achievement.year}
                    </span>
                  </div>
                  
                  <div className="hidden md:block w-px h-24 bg-slate-200 relative">
                    <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-sabana shadow-[0_0_10px_rgba(5,150,105,0.5)]" />
                  </div>

                  <Card className="flex-[3] border-none shadow-md rounded-2xl bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="md:hidden mb-2 bg-sabana">{achievement.year}</Badge>
                      <h3 className="text-xl font-black text-slate-800 mb-1 tracking-tight uppercase">
                        {achievement.title}
                      </h3>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* 4. CONTACTO (Card de Impacto) */}
          <section className="max-w-5xl mx-auto">
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative">
              {/* Decoración abstracta */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sabana/10 blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <CardContent className="p-10 md:p-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
                      ESTAMOS PARA <br /> <span className="text-sabana">SERVIRTE</span>
                    </h2>
                    <p className="text-slate-400 font-medium mb-8">
                      ¿Tienes dudas sobre el clúster o quieres ser parte de nuestra red empresarial? Nuestro equipo está listo para asesorarte.
                    </p>
                    <Button 
                      onClick={() => navigate("/contact")}
                      className="bg-sabana hover:bg-sabana/90 text-white font-black py-6 px-8 rounded-2xl shadow-xl shadow-sabana/20 transition-all active:scale-95 text-lg uppercase tracking-widest"
                    >
                      Contactar ahora
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                      <div className="w-12 h-12 bg-sabana rounded-xl flex items-center justify-center">
                        <MapPin className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-sabana uppercase tracking-widest">Dirección</p>
                        <p className="font-bold">{appConfig.company_address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Phone className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Teléfono / WhatsApp</p>
                        <p className="font-bold">{appConfig.company_phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <Clock className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Atención</p>
                        <p className="font-bold text-sm leading-tight">{appConfig.horario_atencion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Icono Clock que faltaba
const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default Institutional;