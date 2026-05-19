import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Utensils, Info, SquareMenu } from "lucide-react";

interface MenuModalProps {
  restaurantName: string;
  specialties?: string[];
  description?: string;
}

export const RestaurantMenuModal = ({ restaurantName, specialties, description }: MenuModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button className="bg-sabana rounded-xl font-bold px-6 shadow-md shadow-sabana/20 transition-all active:scale-95 ">
          Ver Menú
          <SquareMenu />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Utensils className="text-sabana w-6 h-6" />
            {restaurantName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Info className="w-3 h-3" /> Nuestra Propuesta
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {description || "Disfruta de una experiencia gastronómica única con los mejores ingredientes de la región del Meta."}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
              Platos Recomendados
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {specialties && specialties.length > 0 ? (
                specialties.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                    <Badge variant="outline" className="text-[10px] border-sabana text-sabana">Especialidad</Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Consulta nuestra carta física para conocer los platos del día.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-sabana/5 p-4 rounded-xl border border-sabana/10">
          <p className="text-[10px] text-sabana font-bold text-center uppercase tracking-tighter">
            Precios sujetos a cambios según temporada
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};