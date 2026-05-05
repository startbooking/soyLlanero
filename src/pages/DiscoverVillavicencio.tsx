import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Hotel, 
  UtensilsCrossed, 
  Mountain, 
  Palette, 
  ChevronRight, 
  Compass,
  Map
} from "lucide-react";

const DiscoverVillavicencio = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  /* const categories = [
    {
      id: "hotels",
      title: "Hospedaje",
      subtitle: "Descanso & Confort",
      description: "Desde hoteles boutique en el centro hasta resorts campestres con el mejor clima llanero.",
      icon: Hotel,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      count: "25+ Sitios",
      route: "/discover/hotels"
    },
    {
      id: "restaurants",
      title: "Gastronomía",
      subtitle: "Sabores de Nuestra Tierra",
      description: "La ruta de la carne a la perra, la mamona y propuestas internacionales de alto nivel.",
      icon: UtensilsCrossed,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      count: "50+ Restaurantes",
      route: "/discover/restaurants"
    },
    {
      id: "adventure",
      title: "Aventura",
      subtitle: "Naturaleza Indómita",
      description: "Senderismo, avistamiento de aves y deportes extremos en la puerta de los llanos.",
      icon: Mountain,
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
      count: "15+ Experiencias",
      route: "/discover/adventure"
    },
    {
      id: "culture",
      title: "Cultura",
      subtitle: "Legado & Tradición",
      description: "Sumérgete en el mundo del joropo, el coleo y las raíces de nuestra identidad llanera.",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b",
      count: "20+ Atractivos",
      route: "/discover/culture"
    }
  ]; */

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="discover" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-28 pb-20 flex-grow">
        {/* Hero Section con estilo "Split" */}
        <div className="container mx-auto px-4 mb-20">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            {/* Elemento decorativo */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20" 
                className="w-full h-full object-cover" 
                alt="background"
              />
            </div>
            
            <div className="relative z-10 max-w-3xl">
              <Badge className="bg-sabana text-white border-none font-black px-4 py-1.5 uppercase tracking-widest text-[10px] mb-6">
                <Compass className="w-3 h-3 mr-2 inline" /> Explorar Territorio
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                Tu viaje comienza <br /><span className="text-sabana italic">Aquí mismo</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl">
                Villavicencio no es solo un destino, es la puerta a un mundo de leyendas, atardeceres infinitos y sabores inolvidables.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Categorías</h2>
              <p className="text-slate-500 font-bold italic">¿Qué buscas hoy?</p>
            </div>
            <div className="h-1 w-20 bg-sabana rounded-full hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={category.id}
                  className="group relative bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col h-full hover:translate-y-[-8px] transition-all duration-500"
                >
                  {/* Media Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    
                    {/* Badge de contador */}
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">
                        {category.count}
                      </span>
                    </div>

                    <div className="absolute bottom-8 left-8">
                      <div className="p-3 bg-sabana rounded-2xl w-fit mb-4 shadow-lg shadow-sabana/30">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sabana text-[10px] font-black uppercase tracking-widest mb-1 italic">
                        {category.subtitle}
                      </p>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-10 flex flex-col flex-grow">
                    <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-grow">
                      {category.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline"
                        className="h-14 rounded-2xl border-2 border-slate-100 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 text-slate-400"
                        onClick={() => navigate('/map')}
                      >
                        <Map className="w-4 h-4 mr-2" />
                        Mapa
                      </Button>
                      
                      <Button 
                        className="h-14 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-200 transition-all"
                        onClick={() => navigate(category.route)}
                      >
                        Explorar
                        <ChevronRight className="w-4 h-4 ml-2 text-sabana" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiscoverVillavicencio;