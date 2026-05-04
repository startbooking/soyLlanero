import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Phone, Mail, Users, Loader2, Globe, ShieldCheck } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCachedData } from "@/hooks/useCachedData";
import { Business } from "@/interface/interface";
import { dataService } from "@/services/dataService";

const AgenciesOperators = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");

  // 1. Carga de datos optimizada con Cache
  const { data: allBusinesses, isLoading } = useCachedData<Business[]>({
    cacheKey: 'all-businesses',
    fetchFn: dataService.getBusinesses
  });

  // 2. Filtro estricto: Categoría 3 (Agencias/Operadores)
  const agencyList = useMemo(() => {
    return allBusinesses?.filter(b => b.category_id === 3) || [];
  }, [allBusinesses]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-sabana" />
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest animate-pulse">
          Conectando con expertos locales...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="agencies-operators" onSectionChange={() => { }} language={currentLanguage} />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Cabecera optimizada */}
          <header className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-sabana text-sabana font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
              Expertos en el Territorio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              Agencias y <span className="text-sabana">Operadores</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Planifica tu viaje con profesionales certificados. Encuentra paquetes a medida, tours ecológicos y asistencia personalizada.
            </p>
          </header>

          {agencyList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {agencyList.map((agency) => (
                <Card key={agency.id} className="group hover:shadow-2xl transition-all duration-500 border-none shadow-sm overflow-hidden rounded-2xl bg-white flex flex-col">
                  {/* Imagen y Badges */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={`/images/agency/${agency.image}`}
                      alt={agency.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                       <Badge className="bg-white/90 backdrop-blur text-sabana border-none font-bold shadow-sm">
                         RNT {agency.rnt || 'Certificado'}
                       </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center bg-sabana text-white rounded-full px-3 py-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <span className="text-xs font-black">{agency.rating || '5.0'}</span>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-sabana transition-colors">
                      {agency.name}
                    </CardTitle>
                    <div className="flex items-center text-slate-400 text-sm font-medium mt-1">
                      <MapPin className="w-4 h-4 mr-1 text-sabana" />
                      {agency.address || agency.city || "Meta, Colombia"}
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {agency.description}
                    </p>

                    {/* Servicios destacados en Pills */}
                    <div className="mb-6 flex-grow">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Portafolio
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {agency.services?.slice(0, 4).map((service, index) => (
                          <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-600 border-none text-[10px] font-bold">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Footer de la Card con Información de Contacto */}
                    <div className="pt-4 border-t border-slate-50 space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                         <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-sabana" /> {agency.phone}</span>
                         <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-blue-500" /> Verificado</span>
                      </div>
                      
                      <Button
                        className="w-full bg-sabana hover:bg-sabana/90 text-white font-black py-6 rounded-xl shadow-md shadow-sabana/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                        onClick={() => navigate(`/contact-agency/${agency.id}`, { state: { agency } })}
                      >
                        <Users className="w-5 h-5" />
                        CONTACTAR AGENCIA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 max-w-4xl mx-auto">
              <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-xl">
                No se encontraron agencias disponibles.
              </p>
              <p className="text-slate-300 text-sm mt-2">Estamos ampliando nuestra red de operadores turísticos.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgenciesOperators;