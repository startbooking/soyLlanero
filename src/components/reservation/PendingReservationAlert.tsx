// components/reservation/PendingReservationAlert.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellRing, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePendingReservation } from "@/hooks/usePendingReservation";
import { useLocation } from "react-router-dom"; // Importa useLocation

export const PendingReservationAlert = () => {
  const [reservation, setReservation] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { getReservation, clearReservation } = usePendingReservation();
  const navigate = useNavigate();
  const location = useLocation(); // Obtener ruta actual

  useEffect(() => {
    const saved = getReservation();
    if (saved) setReservation(saved);
  }, [getReservation]);

  if (!reservation || !isVisible || location.pathname === "/payment" || location.pathname === "/confirmation-success") {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg">
      <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-12 h-12 bg-sabana/20 rounded-xl flex items-center justify-center shrink-0">
          <BellRing className="w-6 h-6 text-sabana" />
        </div>
        
        <div className="flex-grow">
          <p className="text-xs font-bold text-sabana uppercase tracking-wider">Reserva pendiente</p>
          <p className="text-sm font-medium text-slate-200 line-clamp-1">
            {reservation.hotel?.name} • {reservation.room?.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="bg-sabana hover:bg-sabana/90 text-white font-bold h-9"
            onClick={() => navigate("/payment", { state: reservation })}
          >
            Continuar <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};