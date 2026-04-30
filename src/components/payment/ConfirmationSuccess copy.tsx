import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Home, Calendar, MapPin, CreditCard } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Header } from "../Header";

const ConfirmationSuccess = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const location = useLocation();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<any>(null);


  useEffect(() => {
    // Recuperamos la data de la transacción enviada desde Payment.tsx
    if (location.state?.transaction) {
      setTransaction(location.state.transaction);
    } else {
      // Si alguien intenta entrar a esta URL sin haber pagado, lo mandamos al inicio
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  if (!transaction) return null;

  console.log(transaction)


  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => {}} />
       <Header activeSection="businesses" onSectionChange={() => { }} language={currentLanguage} />
      
      <main className="pt-32 pb-20 container max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            ¡Reserva Confirmada!
          </h1>
          <p className="text-slate-500 mt-2">
            Hemos enviado el comprobante a tu correo electrónico.
          </p>
        </div>

        <Card className="border-none shadow-2xl overflow-hidden mb-8">
          <div className="bg-sabana p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sabana-foreground/80 text-xs font-bold uppercase tracking-widest">
                  Referencia de Pago
                </p>
                <p className="text-2xl font-mono font-bold">{transaction.reference}</p>
              </div>
              <div className="text-right">
                <p className="text-sabana-foreground/80 text-xs font-bold uppercase tracking-widest">
                  ID Transacción
                </p>
                <p className="text-lg font-semibold">{transaction.id}</p>
              </div>
            </div>
          </div>

          <CardContent className="p-8 space-y-8">
            {/* Detalles de la Estancia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 rounded-lg h-fit">
                  <MapPin className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Hotel</p>
                  <p className="font-bold text-slate-800">Sactel Sabana Hotel</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 rounded-lg h-fit">
                  <Calendar className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Estado del Pago</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Desglose de Pago */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Método de pago</span>
                <span className="font-semibold text-slate-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> 
                  {transaction.payment_method_type || "Tarjeta / PSE"}
                </span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4 border-t">
                <span className="text-slate-900">Total Pagado</span>
                <span className="text-sabana">
                  ${(transaction.amountInCents / 100).toLocaleString('es-CO')} COP
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-12 font-bold border-slate-200"
            onClick={() => window.print()}
          >
            <Download className="mr-2 w-4 h-4" /> Descargar PDF
          </Button>
          <Button 
            className="h-12 font-bold bg-slate-900 text-white hover:bg-slate-800"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 w-4 h-4" /> Ir al Inicio
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationSuccess;