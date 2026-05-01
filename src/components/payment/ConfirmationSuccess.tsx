import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  CheckCircle2, Printer, Home, Mail, 
  Calendar, Users, MapPin, ShieldAlert, FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatCurrency } from "@/utils/formatCurrency";

const ConfirmationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transactionDate] = useState(new Date());
  
  const { 
    hotel, room, checkInDate, checkOutDate, 
    guests, children, subtotal, taxes, total, 
    firstName, lastName, identification, email 
  } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      const timeout = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timeout);
    }
    window.scrollTo(0, 0);
  }, [location.state, navigate]);

  /* const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP', 
      minimumFractionDigits: 2
    }).format(val || 0); */

  if (!location.state) return (
    <div className="h-screen flex items-center justify-center">
      <p className="animate-pulse">Cargando confirmación...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">
      {/* Ocultar en impresión */}
      <div className="print:hidden">
        <TopBar currentLanguage="es" onLanguageChange={() => {}} />
      </div>
      
      <main className="pt-28 pb-20 container max-w-4xl mx-auto px-4">
        
        {/* Banner de Éxito - Ocultar en impresión */}
        <div className="text-center mb-10 print:hidden">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900">¡Pago Exitoso!</h1>
          <p className="text-slate-500 mt-2">Tu reserva en {hotel?.name} está confirmada.</p>
        </div>

        {/* TARJETA PRINCIPAL / DOCUMENTO DE IMPRESIÓN */}
        <Card className="border-none shadow-2xl print:shadow-none print:border print:border-slate-200 overflow-hidden bg-white">
          
          {/* Cabecera de Impresión (Solo visible al imprimir) */}
          <div className="hidden print:flex justify-between items-start p-8 border-b-2 border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-sky-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-black text-slate-800 tracking-tighter">SABANA HOTELS</span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Comprobante Oficial de Reserva</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase">Fecha de Transacción</p>
              <p className="text-sm font-bold text-slate-700">{format(transactionDate, "PPPpp", { locale: es })}</p>
            </div>
          </div>

          <CardContent className="p-8 space-y-8">
            
            {/* Bloque 1: Datos del Huésped e Información General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-sky-600 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Información del Cliente
                </h3>
                <div className="text-sm space-y-1 text-slate-700">
                  <p><strong>Huésped:</strong> {firstName} {lastName}</p>
                  <p><strong>Identificación:</strong> {identification}</p>
                  <p><strong>Email:</strong> {email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-black text-sky-600 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Ubicación
                </h3>
                <div className="text-sm space-y-1 text-slate-700">
                  <p className="font-bold text-lg">{hotel?.name}</p>
                  <p className="text-slate-500">{hotel?.address}</p>
                </div>
              </div>
            </div>

            {/* Bloque 2: Detalles de Estancia */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 print:bg-transparent">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Llegada (Check-in)</p>
                <p className="text-sm font-bold">{checkInDate ? format(new Date(checkInDate), "dd MMM, yyyy", { locale: es }) : '---'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Salida (Check-out)</p>
                <p className="text-sm font-bold">{checkOutDate ? format(new Date(checkOutDate), "dd MMM, yyyy", { locale: es }) : '---'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Habitación</p>
                <p className="text-sm font-bold truncate">{room?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Huéspedes</p>
                <p className="text-sm font-bold">{guests} Adultos {parseInt(children) > 0 ? `+ ${children} Niños` : ''}</p>
              </div>
            </div>

            {/* Bloque 3: Liquidación Financiera */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-sky-600 uppercase tracking-widest">Resumen Financiero</h3>
              <div className="border rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 print:bg-slate-100 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 font-bold">Concepto</th>
                      <th className="px-6 py-3 font-bold text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-700">
                    <tr>
                      <td className="px-6 py-4 italic">Valor Neto Alojamiento</td>
                      <td className="px-6 py-4 text-right font-medium">{formatCurrency(subtotal)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 italic">Impuestos y Tasas (19%)</td>
                      <td className="px-6 py-4 text-right font-medium">{formatCurrency(taxes)}</td>
                    </tr>
                    <tr className="bg-sky-50/50 print:bg-transparent">
                      <td className="px-6 py-4 font-black text-sky-700 text-lg uppercase">Total Pagado</td>
                      <td className="px-6 py-4 text-right font-black text-sky-700 text-2xl">{formatCurrency(total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bloque 4: Políticas de Cancelación */}
            <div className="p-6 bg-red-50/50 rounded-xl border border-red-100 space-y-3 print:bg-transparent">
              <h4 className="text-xs font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Políticas de Cancelación
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-600 italic">
                {hotel?.cancellation_policy || "Este establecimiento permite cancelaciones gratuitas hasta 48 horas antes de la llegada. Después de este periodo, se cobrará la primera noche como penalidad. En caso de No-Show, se cobrará el 100% de la reserva."}
              </p>
            </div>

          </CardContent>

          {/* Pie de página del recibo (Solo impresión) */}
          <div className="hidden print:block p-8 pt-0 text-[9px] text-slate-400 text-center italic">
            Este es un documento generado automáticamente por Sabana Hotels. El pago fue procesado a través de la pasarela segura Wompi.
          </div>
        </Card>

        {/* Acciones (Ocultar en impresión) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 print:hidden">
          <Button variant="outline" size="lg" onClick={() => window.print()} className="border-slate-300">
            <Printer className="w-4 h-4 mr-2" /> Imprimir Recibo
          </Button>
          <Button 
            variant="default" 
            size="lg" 
            onClick={() => navigate("/")} 
            className="bg-sky-500 hover:bg-sky-600"
          >
            <Home className="w-4 h-4 mr-2" /> Volver al Inicio
          </Button>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ConfirmationSuccess;