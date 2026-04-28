import { CalendarIcon, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../DatePicker";
import { RoomCard } from "@/components/RoomCard";

interface DateGuestFormProps {
  checkIn: Date | undefined;
  setCheckIn: (d?: Date) => void;
  checkOut: Date | undefined;
  setCheckOut: (d?: Date) => void;
  numAdults: string;
  setNumAdults: (v: string) => void;
  numChildren: string;
  setNumChildren: (v: string) => void;
  maxOccupancy: string | number;
  onCheck: () => void;
  loading: boolean;
  alternatives?: any[];
  hotel?: any;
}

export const DateGuestForm = ({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  numAdults,
  setNumAdults,
  numChildren,
  setNumChildren,
  maxOccupancy,
  onCheck,
  loading,
  alternatives = [],
  hotel
}: DateGuestFormProps) => {
  
  const occupancyLimit = parseInt(String(maxOccupancy)) || 1;

  return (
    <div className="space-y-6">
      <Card className="border-sabana/20 shadow-sm animate-in fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sabana font-bold">
            <CalendarIcon className="w-5 h-5" /> 1. Fechas y Huéspedes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SECCIÓN DE FECHAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Llegada</Label>
              <DatePicker
                date={checkIn}
                setDate={setCheckIn}
                placeholder="¿Cuándo llegas?"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Salida</Label>
              <DatePicker
                date={checkOut}
                setDate={setCheckOut}
                placeholder="¿Cuándo sales?"
                minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
              />
            </div>
          </div>
          {/* SECCIÓN DE HUÉSPEDES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Adultos</Label>
              <Select value={numAdults} onValueChange={setNumAdults}>
                <SelectTrigger className="border-sabana/30 focus:ring-sabana">
                  <SelectValue placeholder="Adultos" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: occupancyLimit }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} {i === 0 ? "Adulto" : "Adultos"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Niños</Label>
              <Select value={numChildren} onValueChange={setNumChildren}>
                <SelectTrigger className="border-sabana/30 focus:ring-sabana">
                  <SelectValue placeholder="Niños" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3].map((v) => (
                    <SelectItem key={v} value={v.toString()}>
                      {v} {v === 1 ? "Niño" : "Niños"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={onCheck}
            disabled={loading || !checkIn || !checkOut}
            className="w-full bg-sabana hover:bg-sabana/90 h-12 text-white font-bold transition-all shadow-md"
          >
            {loading ? "Verificando disponibilidad..." : "Verificar ahora"}
          </Button>

          {/* ALTERNATIVAS */}
          {alternatives.length > 0 && (
            <div className="mt-8 pt-8 border-t border-dashed border-slate-200">
              <h3 className="text-md font-bold text-red-600 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> 
                Lo sentimos, no hay disponibilidad de Habitaciones. Mira estas opciones:
              </h3>
              <div className="space-y-4">
                {alternatives.map((alt) => (
                  <RoomCard key={alt.id} room={alt} hotel={hotel} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};