import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, ShieldCheck } from "lucide-react";

export const SidebarSummary = ({ room, hotel }: any) => (
  <Card className="sticky top-28 border-sabana/20 overflow-hidden shadow-md hidden lg:block">
    <div className="relative h-44">
      <img 
        src={`/images/rooms/${room.image || 'default.jpg'}`} 
        className="w-full h-full object-cover" 
        alt={room.name} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Seleccionado</p>
        <h3 className="font-bold text-lg leading-tight">{room.name}</h3>
      </div>
    </div>
    <CardContent className="p-5 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-sabana" />
          <span>{hotel.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users className="w-4 h-4 text-sabana" />
          <span>Máx. {room.max_occupancy} huéspedes</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-dashed">
        <div className="flex justify-between items-center text-sabana font-bold">
          <span className="text-xs uppercase">Precio por noche</span>
          <span className="text-xl">{room.price_per_night}</span>
        </div>
      </div>

      <div className="bg-sabana/5 p-3 rounded-lg flex items-center gap-2 text-[11px] text-sabana-700 font-medium">
        <ShieldCheck className="w-4 h-4" />
        Reserva protegida por Sabana App
      </div>
    </CardContent>
  </Card>
);