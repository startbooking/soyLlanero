import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/DatePicker";
import { RoomCard } from "@/components/RoomCard";
import { dataService } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";
import { RoomData, HotelData } from "@/interface/interface";

interface AvailabilityStepProps {
  room: RoomData;
  hotel: HotelData;
  onAvailable: (data: { checkIn: Date; checkOut: Date; adults: string; children: string }) => void;
}

export const AvailabilityStep = ({ room, hotel, onAvailable }: AvailabilityStepProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [alternatives, setAlternatives] = useState<RoomData[]>([]);
  
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");

  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast({ 
        title: "Campos incompletos", 
        description: "Por favor selecciona las fechas de tu estancia.",
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    setAlternatives([]); // Limpiar alternativas previas

    try {
      const response = await dataService.checkAvailability({
        hotel_id: hotel.id,
        room_id: room.id,
        check_in: format(checkInDate, "yyyy-MM-dd"),
        check_out: format(checkOutDate, "yyyy-MM-dd"),
        adults: numAdults,
        children: numChildren
      });

      if (response.available) {
        toast({ title: "¡Habitación disponible!", description: "Procediendo al registro." });
        onAvailable({ checkIn: checkInDate, checkOut: checkOutDate, adults: numAdults, children: numChildren });
      } else {
        // Si no hay disponibilidad, buscamos otras habitaciones del hotel
        const allRooms = await dataService.getRoomTypesByHotel(hotel.id);
        const availableAlternatives = allRooms.filter(r => r.id !== room.id);
        
        setAlternatives(availableAlternatives);
        toast({ 
          variant: "destructive", 
          title: "Sin disponibilidad", 
          description: "La habitación seleccionada no está disponible, pero tenemos otras opciones." 
        });
      }
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Error de conexión", 
        description: "No pudimos verificar la disponibilidad en este momento." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-xl bg-white overflow-hidden">
      <CardHeader className="bg-slate-900 text-white">
        <CardTitle className="flex items-center gap-2 font-bold italic uppercase tracking-tighter">
          <CalendarIcon className="w-5 h-5 text-sabana" /> 1. Fechas y Huéspedes
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        <Card className="border-sabana/20 shadow-sm">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sabana font-bold">
                <CalendarIcon className="w-5 h-5" /> 1. Fechas y Huéspedes
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label className="text-slate-600">Fecha de Llegada</Label>
                <DatePicker date={checkInDate} setDate={setCheckInDate} placeholder="¿Cuándo llegas?" />
                </div>
                <div className="space-y-2">
                <Label className="text-slate-600">Fecha de Salida</Label>
                <DatePicker 
                date={checkOutDate} 
                setDate={setCheckOutDate} 
                placeholder="¿Cuándo sales?" 
                minDate={checkInDate ? new Date(new Date(checkInDate).setDate(checkInDate.getDate() + 1)) : new Date()}
                />
                </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label className="text-slate-600">Adultos</Label>
                <Select value={numAdults} onValueChange={setNumAdults}>
                <SelectTrigger className="border-sabana/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                {[...Array(parseInt(room.max_occupancy || "1"))].map((_, i) => (
                  <SelectItem key={i+1} value={(i+1).toString()}>{i+1} Adulto{i > 0 ? 's' : ''}</SelectItem>
                  ))}
                  </SelectContent>
                  </Select>
                  </div>
                  <div className="space-y-2">
                  <Label className="text-slate-600">Niños</Label>
                  <Select value={numChildren} onValueChange={setNumChildren}>
                  <SelectTrigger className="border-sabana/30"><SelectValue /></SelectTrigger>
                  <SelectContent>
                  {[0, 1, 2, 3].map(v => <SelectItem key={v} value={v.toString()}>{v} Niños</SelectItem>)}
                  </SelectContent>
                  </Select>
                  </div>
                  </div>
                  
                  {/* <Button 
                  onClick={handleCheckAvailability} 
                  className="w-full bg-sabana hover:bg-sabana/90 h-12 text-white font-bold"
                  disabled={isValidating}
                  >
                  {isValidating ? "Consultando disponibilidad..." : "Verificar Disponibilidad"}
                  </Button> */}
                  
                  {alternatives.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-dashed">
                    <h3 className="text-md font-bold text-red-600 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> No hay cupo en esas fechas, pero mira estas opciones:
                    </h3>
                    <div className="space-y-4">
                    {alternatives.map((alt) => <RoomCard key={alt.id} room={alt} hotel={hotel} />)}
                    </div>
                    </div>
                    )}
                    </CardContent>
                    </Card>

        {/* Hasta Aca llega la Funcion */}
        {/* Selección de Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-xs font-black uppercase text-slate-400">Fecha de Llegada</Label>
            <DatePicker date={checkInDate} setDate={setCheckInDate} placeholder="¿Cuándo llegas?" />
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-black uppercase text-slate-400">Fecha de Salida</Label>
            <DatePicker 
              date={checkOutDate} 
              setDate={setCheckOutDate} 
              placeholder="¿Cuándo sales?" 
              minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : new Date()}
            />
          </div>
        </div>

        {/* Huéspedes */}
        <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="space-y-3">
            <Label className="text-xs font-black uppercase text-slate-400">Adultos</Label>
            <Select value={numAdults} onValueChange={setNumAdults}>
              <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[...Array(parseInt(room.max_occupancy || "4"))].map((_, i) => (
                  <SelectItem key={i+1} value={(i+1).toString()}>{i+1} Adulto{i > 0 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-black uppercase text-slate-400">Niños</Label>
            <Select value={numChildren} onValueChange={setNumChildren}>
              <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3].map(v => <SelectItem key={v} value={v.toString()}>{v} Niños</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={checkAvailability} 
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-sabana hover:text-slate-900 h-14 text-lg font-black transition-all group"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <CheckCircle2 className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
          {loading ? "VERIFICANDO..." : "VERIFICAR DISPONIBILIDAD"}
        </Button>

        {/* Sección de Alternativas */}
        {alternatives.length > 0 && (
          <div className="mt-10 pt-8 border-t border-dashed border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
              <div>
                <h3 className="text-sm font-black text-red-900 uppercase">Sin cupo para estas fechas</h3>
                <p className="text-xs text-red-700">Pero tenemos estas otras habitaciones disponibles en {hotel.name}:</p>
              </div>
            </div>
            
            <div className="grid gap-6">
              {alternatives.map((alt) => (
                <RoomCard key={alt.id} room={alt} hotel={hotel} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};