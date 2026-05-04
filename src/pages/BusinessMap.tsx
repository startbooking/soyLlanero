import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Phone, Star, Navigation, 
  Store, Search, Filter, Utensils, Bed, Mountain 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dataService } from "@/services/dataService";

// Configuración de iconos personalizados
const createCustomIcon = (color: string) => L.divIcon({
  className: "custom-icon",
  html: `<div style="background-color: ${color};" class="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Componente para centrar el mapa suavemente cuando se selecciona un negocio
const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], 16);
  }, [lat, lng, map]);
  return null;
};

const BusinessMap = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedLocation, setFocusedLocation] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const data = await dataService.getBusinesses();
      const validData = data.filter(b => b.latitude && b.longitude);
      setBusinesses(validData);
      setFilteredBusinesses(validData);
    };
    fetchBusinesses();
  }, []);

  // Lógica de filtrado
  useEffect(() => {
    let result = businesses;
    if (selectedCategory !== "Todos") {
      result = result.filter(b => b.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredBusinesses(result);
  }, [selectedCategory, searchQuery, businesses]);

  const categories = ["Todos", "Restaurante", "Hotel", "Experiencia", "Agencia"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="map" onSectionChange={() => {}} language={currentLanguage} />

      <main className="pt-24 flex-grow flex flex-col md:flex-row h-screen">
        
        {/* PANEL IZQUIERDO: Buscador y Lista */}
        <div className="w-full md:w-80 lg:w-96 bg-white border-r flex flex-col z-10 shadow-xl">
          <div className="p-6 border-b space-y-4">
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
              Explora el <span className="text-sabana">Meta</span>
            </h1>
            
            {/* Input de Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Buscar por nombre..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sabana/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Chips de Categoría */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                    ? "bg-sabana text-white shadow-md shadow-sabana/20" 
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Resultados */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {filteredBusinesses.map(b => (
              <Card 
                key={b.id} 
                className="p-3 border-none shadow-sm hover:shadow-md transition-all cursor-pointer group rounded-2xl"
                onClick={() => setFocusedLocation({ lat: parseFloat(b.latitude), lng: parseFloat(b.longitude) })}
              >
                <div className="flex gap-3">
                  <img 
                    src={`/images/businnesses/${b.image}`} 
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                    onError={(e) => (e.currentTarget.src = '/placeholder-service.jpg')}
                  />
                  <div className="flex flex-col justify-between py-1 overflow-hidden">
                    <div>
                      <h3 className="font-black text-slate-800 text-sm uppercase truncate group-hover:text-sabana transition-colors">
                        {b.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                        <MapPin className="w-3 h-3 text-sabana" /> {b.address}
                      </div>
                    </div>
                    <Badge className="w-fit text-[9px] bg-slate-200 text-slate-600 hover:bg-slate-200 border-none px-2 py-0">
                      {b.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* PANEL DERECHO: El Mapa */}
        <div className="flex-grow relative">
          <MapContainer 
            center={[4.142, -73.626]} 
            zoom={13} 
            zoomControl={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Estilo más limpio (CartoDB)
            />
            
            <ZoomControl position="bottomright" />
            {focusedLocation && <RecenterMap lat={focusedLocation.lat} lng={focusedLocation.lng} />}

            {filteredBusinesses.map((b) => (
              <Marker 
                key={b.id} 
                position={[parseFloat(b.latitude), parseFloat(b.longitude)]}
                icon={createCustomIcon(b.category === 'Hotel' ? '#3b82f6' : '#059669')}
              >
                <Popup className="custom-popup">
                   {/* ... (Mismo contenido del Popup anterior) ... */}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessMap;