import { CalendarIcon, Users, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";

interface SummaryCalculations {
  nights: number;
  subtotal: number;
  taxes: number;
  total: number;
}


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
/*   const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
  }; */
  return (
    <aside className="lg:col-span-1">
      <Card className="sticky top-28 border-sabana/20 overflow-hidden shadow-lg bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Encabezado Principal */}
        <div className="bg-sabana p-4 text-white">
          <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <CalendarIcon className="w-5 h-5" /> 
            Detalle de tu Reserva
          </h3>
        </div>
        
        {/* Imagen y Badge de Habitación */}
        <div className="relative h-60">
          <img 
            src={`/images/rooms/${room.image || 'default-room.jpg'}`} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" 
            alt={room.name} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="font-bold leading-tight text-lg drop-shadow-md">{room.name}</h4>
            <p className="text-xs opacity-90 flex items-center gap-1 font-medium">
              <Info className="w-3 h-3 text-sabana" /> {hotel.name}
            </p>
          </div>
        </div>

        <CardContent className="p-6 space-y-5">
          {/* Bloque de Información de Estadia */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Huéspedes</span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <Users className="w-4 h-4 text-sabana" />
                <span>{guests.adults} Ad. {Number(guests.children) > 0 ? `/ ${guests.children} Niñ.` : ''}</span>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estadia</span>
              <p className="text-sm font-semibold text-slate-700">{calculations.nights} Noches</p>
            </div>
          </div>

          {/* Desglose Financiero */}
          <div className="space-y-2.5 py-2">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Precio base (1 noche)</span>
              <span className="font-medium text-slate-700">{formatCurrency(room.price_per_night)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal Estadia</span>
              <span className="font-medium text-slate-700">{formatCurrency(calculations.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-red-400 font-medium italic">
              <span>Impuestos gubernamentales ({room.tax_percentage || 0}%)</span>
              <span>+ {formatCurrency(calculations.taxes)}</span>
            </div>
          </div>

          {/* Total Final Destacado */}
          <div className="pt-5 border-t-2 border-sabana/10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-slate-500">TOTAL A PAGAR</span>
              <span className="text-3xl font-black text-sabana tracking-tighter">
                {formatCurrency(calculations.total)}
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 mt-4 border border-slate-100">
               <p className="text-[10px] leading-relaxed text-slate-400 text-center">
                Esta reserva incluye acceso a zonas comunes y seguros hoteleros obligatorios según normativa vigente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};