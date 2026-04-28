import { CalendarIcon, Users, Receipt, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SidebarProps {
  room: any;
  hotel: any;
  calculations: {
    nights: number;
    unitValue: number;
    subtotal: number;
    taxes: number;
    total: number;
  };
  guests: {
    adults: string | number;
    children: string | number;
  };
}

export const ReservationDetailSidebar = ({ 
  room, 
  hotel, 
  calculations, 
  guests 
}: SidebarProps) => {
  
  // Helper para formatear moneda con 2 decimales
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <aside className="lg:col-span-1">
      <Card className="sticky top-28 border-sabana/30 overflow-hidden shadow-xl bg-white">
        <CardHeader className="bg-sabana p-4 text-white">
          <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Receipt className="w-4 h-4" /> Detalle de Liquidación
          </CardTitle>
        </CardHeader>

        <div className="relative h-32 bg-slate-100">
          <img 
            src={`/images/rooms/${room.image}`} 
            className="w-full h-full object-cover" 
            alt={room.name} 
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
            <h4 className="text-white font-bold text-lg leading-tight">{room.name}</h4>
            <p className="text-white/80 text-xs">{hotel.name}</p>
          </div>
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Info de Estancia */}
          <div className="flex justify-between items-center py-2 border-b border-slate-50">
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Huéspedes</p>
              <p className="text-sm font-semibold">{guests.adults} Ad. {Number(guests.children) > 0 ? `/ ${guests.children} Niñ.` : ''}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Estancia</p>
              <p className="text-sm font-semibold">{calculations.nights} Noches</p>
            </div>
          </div>

          {/* Desglose de Tarifas */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Valor unitario / noche</span>
              <span className="font-medium text-slate-700">
                {formatCurrency(calculations.unitValue)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">
                Subtotal ({calculations.nights} {calculations.nights === 1 ? 'noche' : 'noches'})
              </span>
              <span className="font-medium text-slate-700">
                {formatCurrency(calculations.subtotal)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                <span className="text-slate-500">Impuestos</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">
                  {room.tax_percentage}%
                </span>
              </div>
              <span className="font-medium text-red-500">
                + {formatCurrency(calculations.taxes)}
              </span>
            </div>
          </div>

          {/* TOTAL FINAL */}
          <div className="mt-6 pt-4 border-t-2 border-sabana/20">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[12px] font-black text-sabana uppercase">Total Reserva</p>
                <p className="text-[10px] text-slate-400">IVA incluido si aplica</p>
              </div>
              <span className="text-2xl font-black text-sabana tracking-tighter">
                {formatCurrency(calculations.total)}
              </span>
            </div>
          </div>

          <div className="bg-sabana/5 p-3 rounded-lg flex items-start gap-2 mt-4">
            <Info className="w-4 h-4 text-sabana shrink-0 mt-0.5" />
            <p className="text-[12px] text-sabana/90 leading-relaxed italic">
              Tarifa garantizada para las fechas seleccionadas. No incluye consumos adicionales ni propinas.
            </p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};