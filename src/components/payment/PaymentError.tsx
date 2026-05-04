import { useLocation, useNavigate } from "react-router-dom";
import { ShieldAlert, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReservationSummaryCard } from "@/components/payment/ReservationSummaryCard";
import { TopBar } from "@/components/TopBar";

const PaymentError = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { reservation, errorDetail } = state;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => {}} />
      <main className="pt-28 pb-20 container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Pago Rechazado</h1>
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl inline-block">
            <p className="text-red-700 font-medium">Motivo: {errorDetail}</p>
          </div>
        </div>

        <ReservationSummaryCard data={reservation} />

        <div className="mt-8 space-y-4">
          <Button 
            onClick={() => navigate(-1)} 
            className="w-full bg-slate-900 hover:bg-slate-800 py-7 text-lg font-bold"
          >
            <RefreshCw className="w-5 h-5 mr-2" /> Intentar con otro medio de pago
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            className="w-full text-slate-400"
          >
            Cancelar y volver al inicio
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PaymentError;