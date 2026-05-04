import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Users, BedDouble } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatCurrency } from "@/utils/formatCurrency";

export const ReservationSummaryCard = ({ data }: any) => {
  return (
    <Card className="border-none shadow-lg overflow-hidden bg-white">
      <div className="bg-sabana/10 p-4 text-sabana flex justify-between items-center">
        <h3 className="text-sm font-bold uppercase">Detalles de la Reserva</h3>
        <span className="text-[10px] bg-white/20 px-2 py-1 rounded">ID: {data.transactionId}</span>
      </div>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
              src={data?.image?.startsWith('http') ? data.image : `/images/rooms/${data?.image}`}
              alt={data?.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-sabana" />
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400">Hotel</p>
              <p className="font-bold text-slate-800">{data.hotel?.name}</p>
              <p className="text-xs text-slate-500">{data.hotel?.address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <BedDouble className="w-5 h-5 text-sabana" />
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400">Habitación</p>
              <p className="font-bold text-slate-800">{data.room?.name}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-b border-slate-50 py-4">
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400">Check-In</p>
            <p className="text-sm font-bold">{format(new Date(data.checkInDate), "dd MMM, yyyy", { locale: es })}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400">Check-Out</p>
            <p className="text-sm font-bold">{format(new Date(data.checkOutDate), "dd MMM, yyyy", { locale: es })}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400">Huéspedes</p>
            <p className="text-sm font-bold">{data.guests.adults} Ad. {data.guests.children > 0 ? `+ ${data.guests.children} Ni.` : ''}</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
          <span className="text-slate-600 font-bold">Total Pagado:</span>
          <span className="text-2xl font-black text-sabana">{formatCurrency(data.values.total)}</span>
        </div>
      </CardContent>
    </Card>
  );
};