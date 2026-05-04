// components/payment/PaymentError.tsx
import { AlertCircle, RefreshCw, PhoneCall, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PaymentError = ({ errorDetails }: { errorDetails?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto py-12 px-6 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      
      <h1 className="text-3xl font-black text-slate-900 mb-2">Pago Rechazado</h1>
      <p className="text-slate-500 mb-8">
        Lo sentimos, no pudimos procesar tu transacción. No se ha realizado ningún cargo y la reserva no está confirmada.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 text-left text-sm">
        <p className="font-bold text-slate-700 mb-1">¿Qué pudo pasar?</p>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Fondos insuficientes o límite excedido.</li>
          <li>La tarjeta no está habilitada para compras web.</li>
          <li>Tiempo de espera de la sesión agotado.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <Button 
          onClick={() => navigate(-1)} 
          className="bg-sabana hover:bg-sabana/90 h-12 font-bold"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Reintentar Pago
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate("/hotels")}
          className="h-12 border-slate-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Ver otros hoteles
        </Button>
      </div>

      <p className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
        <PhoneCall className="w-3 h-3" /> ¿Necesitas ayuda? Contacta a soporte
      </p>
    </div>
  );
};