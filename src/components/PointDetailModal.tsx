import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  X,
  Navigation,
  Car,
  Star,
  Info,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { PointsData } from "@/interface/interface";
import { formatCurrency } from "@/utils/formatCurrency";
import { useBusinessActions } from "@/hooks/useBusinessActions";



interface PointDetailModalProps {
  point: PointsData;
  onClose: () => void;
}

export const PointDetailModal = ({ point, onClose }: PointDetailModalProps) => {
  /* const handleNavigation = () => {
    // Si tienes latitud y longitud en PointsData, es mejor usarlas. 
    // Si no, usamos el nombre + ciudad.
    const destination = point.latitude && point.longitude
      ? `${point.latitude},${point.longitude}`
      : encodeURIComponent(point.name + " Villavicencio Meta");

    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  }; */
  const { handleNavigation, handleContact,  } = useBusinessActions();


  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">

        {/* Cabecera con Imagen */}
        <div className="relative h-80 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 bg-sabana/60 hover:bg-sabana/80 backdrop-blur-md text-white rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </Button>

          <img
            src={`images/points/${point.image}`}
            alt={point.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = '/placeholder-service.jpg')}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-8">

            {/* Parte superior */}
            <div className="flex gap-2">
              <Badge className="bg-sabana text-white border-none font-black uppercase text-[10px] px-3 py-1">
                {point.category}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur text-white border-none font-bold text-[10px] uppercase px-3 py-1">
                {point.entry_fee == 0
                  ? "Acceso Gratuito"
                  : `${formatCurrency(point.entry_fee)}`}
              </Badge>
            </div>

            {/* Parte inferior */}
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
                {point.name}
              </h1>
              <div className="flex items-center text-white/80 font-medium italic">
                <MapPin className="w-4 h-4 mr-2 text-sabana" />
                {point.address}
              </div>
            </div>

          </div>
        </div>

        {/* Contenido */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Columna Izquierda: Descripción */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-1 bg-sabana rounded-full" />
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Descripción del lugar</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-md font-medium">
                  {point.description}
                </p>
              </div>

              {/* Horarios Estilizados */}
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-sabana" />
                  <h3 className="font-black uppercase tracking-tight text-slate-800">Horarios de visita</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.isArray(point.opening_hours) ? point.opening_hours.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-slate-500 font-bold bg-white p-3 rounded-xl border border-slate-200/50">
                      <ChevronRight className="w-3 h-3 text-sabana" />
                      {item}
                    </div>
                  )) : (
                    <div className="text-sm text-slate-500 font-bold bg-white p-3 rounded-xl border border-slate-200/50">
                      {point.opening_hours}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Info Rápida y Acciones */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-200">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <Info className="w-4 h-4 text-sabana" /> Información Clave
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg shrink-0">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">Calificación</p>
                      <p className="text-sm font-bold">{point.rating || '4.8'} / 5.0 (Google Maps)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg shrink-0">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">Costo de Entrada</p>
                      <p className="text-sm font-bold">
                        {point.entry_fee == 0  ? "Sin costo" : `${formatCurrency(point.entry_fee)}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button
                    onClick={handleNavigation}
                    className="px-8 border-2 border-slate-200 bg-sabana hover:bg-sabana/100 text-slate-900 rounded-2xl font-black uppercase tracking-tighter"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Abrir en el mapa
                  </Button>

                  {/* <Button
                    variant="outline"
                    className="px-10 border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-black uppercase tracking-tighter"
                    onClick={() => window.print()} // Opcional: imprimir info
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Guardar guía
                  </Button> */}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 p-4 bg-sabana/5 rounded-2xl border border-sabana/10">
                <Car className="w-4 h-4 text-sabana" />
                <span className="text-[10px] font-black text-sabana uppercase">Parqueadero disponible</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};