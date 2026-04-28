import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, Phone, Clock, Users, Sparkles } from "lucide-react";

// --- Constantes de Categorías ---
const CATEGORIES = ["Hoteles", "Restaurantes", "Experiencias", "Transporte", "Compras"];

// --- Sub-componente: BusinessCard ---
const BusinessCard = ({ business, isVip, onView }: { business: any, isVip?: boolean, onView: (b: any) => void }) => (
  <Card className={`group hover:shadow-xl transition-all duration-300 border-2 ${
    isVip ? "border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5" : "border-transparent"
  }`}>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors flex items-center gap-2">
            {isVip && <Sparkles className="w-4 h-4 text-primary fill-current" />}
            {business.name}
          </CardTitle>
          <Badge variant={isVip ? "default" : "outline"} className={isVip ? "bg-primary animate-pulse" : ""}>
            {isVip ? "SPONSOR VIP" : business.category}
          </Badge>
        </div>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="ml-1 text-xs font-bold">{business.rating}</span>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{business.description}</p>
      
      <div className="grid grid-cols-2 gap-3 text-xs mb-5 text-slate-600">
        <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-primary" /> {business.phone}</div>
        <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary" /> {business.schedule}</div>
        <div className="flex items-center gap-1.5"><Users className="w-3 h-3 text-primary" /> {business.capacity}</div>
        <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-primary" /> Villavicencio</div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <span className="text-lg font-black text-primary">{business.price}</span>
        <Button 
          size="sm" 
          onClick={() => onView(business)}
          className={isVip ? "bg-primary hover:bg-primary/90" : "border-primary text-primary hover:bg-primary/10"}
          variant={isVip ? "default" : "outline"}
        >
          Ver Detalles
        </Button>
      </div>
    </CardContent>
  </Card>
);

// --- Componente Principal ---
export const SearchSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  // Datos centralizados (En un escenario real, esto vendría de una API o Props)
  const allServices = [
    { id: 1, name: "Hotel Orinoco Plaza", description: "Hotel de lujo con vista panorámica...", category: "Hoteles", rating: 4.8, price: "$150.000", phone: "+57 8 123", schedule: "24h", capacity: "120", isVip: true },
    { id: 2, name: "Restaurante Los Llanos", description: "Auténtica cocina llanera...", category: "Restaurantes", rating: 4.6, price: "$$", phone: "+57 8 234", schedule: "11am-10pm", capacity: "80" },
    { id: 3, name: "Safari Los Ocarros", description: "Avistamiento de fauna...", category: "Experiencias", rating: 4.9, price: "$45.000", phone: "+57 300", schedule: "6am-6pm", capacity: "15" },
    { id: 4, name: "Transporte VIP Llanos", description: "Vehículos de lujo...", category: "Transporte", rating: 4.5, price: "$50.000", phone: "+57 311", schedule: "24h", capacity: "15", isVip: true },
    { id: 5, name: "Artesanías Llaneras", description: "Productos locales...", category: "Compras", rating: 4.4, price: "Var.", phone: "+57 8 345", schedule: "9am-7pm", capacity: "50" },
  ];

  const vipServices = useMemo(() => allServices.filter(s => s.isVip), []);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulación de delay de red
    setTimeout(() => {
      const filtered = allServices.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             s.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = category === "all" || s.category === category;
        return matchesQuery && matchesCat;
      });
      setResults(filtered);
      setIsSearching(false);
    }, 600);
  };

  const navigateToDetails = (business: any) => {
    navigate(`/hotel/${business.id}`, { state: { hotel: business } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8 pb-12">
      {/* Barra de Búsqueda */}
      <Card className="p-4 bg-white/80 backdrop-blur-md shadow-xl border-slate-100 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="relative md:col-span-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="¿Qué buscas? (hoteles, comida, tours...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-slate-200 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 bg-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="md:col-span-3 h-12 text-md font-bold shadow-lg shadow-primary/20 bg-sabana"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? "Buscando..." : "Explorar Ahora"}
          </Button>
        </div>
      </Card>

      {/* Contenido Dinámico */}
      {/* <div className="min-h-[400px]"> */}
      <div>
        {/* Caso A: No se ha buscado nada -> Mostrar VIPs */}
        {/* {!results && (
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="h-px bg-slate-200 flex-1" />
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Sparkles className="text-primary w-5 h-5" /> Sponsors Recomendados
              </h3>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vipServices.map(vip => (
                <BusinessCard key={vip.id} business={vip} isVip onView={navigateToDetails} />
              ))}
            </div>
          </div>
        )} */}

        {/* Caso B: Resultados de Búsqueda */}
        {results && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-2xl font-bold">Resultados ({results.length})</h3>
              <Button variant="ghost" size="sm" onClick={() => setResults(null)}>Limpiar filtros</Button>
            </div>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(item => (
                  <BusinessCard key={item.id} business={item} isVip={item.isVip} onView={navigateToDetails} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-lg">No encontramos resultados para tu búsqueda. Intenta con otros términos.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};