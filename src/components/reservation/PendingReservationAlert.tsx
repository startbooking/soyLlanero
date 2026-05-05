import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BellRing, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePendingReservation } from "@/hooks/usePendingReservation";

export const PendingReservationAlert = () => {
  const [reservation, setReservation] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { getReservation, clearReservation } = usePendingReservation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = getReservation();
    
    if (saved) {
      // VALIDACIÓN DE 12 HORAS
      // Asumimos que el objeto guardado tiene una propiedad 'createdAt'
      // Si no existe, puedes guardarla al momento de crear la reserva
      const createdAt = new Date(saved.savedAt).getTime();
      const now = new Date().getTime();
      const twentyFourHours = 12 * 60 * 60 * 1000; // milisegundos

      if (createdAt && (now - createdAt > twentyFourHours)) {
        // Si pasaron más de 24 horas, limpiamos y no mostramos nada
        // console.log("Reserva expirada (más de 24h), eliminando...");
        clearReservation();
        setReservation(null);
      } else {
        setReservation(saved);
      }
    }
  }, [getReservation, clearReservation]);

  // Rutas donde NO se debe mostrar la alerta
  const hideInPaths = ["/payment", "/confirmation-success", "/admin"];
  const shouldHide = !reservation || 
                     !isVisible || 
                     hideInPaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-lg">
      <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Icono con animación sutil */}
        <div className="w-12 h-12 bg-sabana/20 rounded-2xl flex items-center justify-center shrink-0">
          <BellRing className="w-6 h-6 text-sabana animate-bounce-slow" />
        </div>
        
        <div className="flex-grow">
          <p className="text-[10px] font-black text-sabana uppercase tracking-[0.2em] mb-1">
            Reserva pendiente
          </p>
          <h4 className="text-sm font-bold text-slate-100 line-clamp-1 leading-none">
            {reservation.hotel?.name || "Tu experiencia"}
          </h4>
          <p className="text-[11px] text-slate-400 font-medium italic">
            {reservation.room?.name || "Continúa donde lo dejaste"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            size="sm" 
            className="bg-sabana hover:bg-sabana/90 text-white font-black uppercase text-[10px] tracking-widest h-10 px-4 rounded-xl shadow-lg shadow-sabana/20 transition-all active:scale-95"
            onClick={() => navigate("/payment", { state: reservation })}
          >
            Pagar <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
            title="Descartar"
          >
            <X className="w-4 h-4 text-slate-500 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};