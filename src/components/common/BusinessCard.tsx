import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Eye, Percent, Receipt, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WordCountDisplay from "@/utils/WordCountDisplay";
import { Business } from "@/interface/interface";
import { formatCurrency } from "@/utils/formatCurrency";

interface BusinessCardProps {
  business: Business; // Recibe el registro completo
  onViewDetails?: (id: number) => void;
}

export const BusinessCard = ({ business, onViewDetails }: BusinessCardProps) => {
  const navigate = useNavigate();

  // Desestructuración del objeto business para limpieza
  const {
    id,
    name,
    categoria,
    address,
    rating,
    image,
    description,
    is_vip,
    price,
    taxes,
    tax_percentage,
  } = business;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      // Lógica de navegación basada en si es VIP/Sponsor
      const path = is_vip === 1 ? `/sponsor/${id}` : `/hotel/${id}`;
      navigate(path, { state: { hotel: business } });
    }
  };

  const taxPercentage = business?.tax_percentage || 0; // Default 0% si no viene del back
  const calculatedTaxes = (business.price * taxPercentage)/100;

  const DISPLAY_LIMIT = 20;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-slate-200 bg-white">
      {/* Contenedor de Imagen */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image?.startsWith('http') ? image : `/images/businnesses/${image}`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => (e.currentTarget.src = '/placeholder-hotel.jpg')}
        />

        {/* Overlays decorativos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

        {/* Etiqueta de Categoría */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-slate-800 backdrop-blur-md border-none hover:bg-white">
            {categoria || 'Hospedaje'}
          </Badge>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-md text-white rounded-full px-3 py-1 border border-white/20">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
          <span className="font-bold text-xs">{rating || '5.0'}</span>
        </div>

        {/* Badge VIP / Sponsor */}
        {is_vip === 1 && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-sabana text-slate-900 border-none flex items-center gap-1 shadow-lg">
              <ShieldCheck className="w-3 h-3" />
              VIP SPONSOR
            </Badge>
          </div>
        )}
      </div>

      {/* Contenido de Texto */}
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-sabana transition-colors line-clamp-1">
          {name}
        </CardTitle>
        <div className="flex items-center text-slate-500">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-sky-500" />
          <span className="text-xs font-medium truncate">{address}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-slate-600 leading-relaxed italic">
          <WordCountDisplay
            text={description}
            wordLimit={DISPLAY_LIMIT}
          />
        </div>

        {/* Sección de Precio (Sanitizada) */}
        {price && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:border-sabana/30 transition-colors">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Precio desde</p>
                <p className="text-2xl font-black text-slate-800 tracking-tighter">
                  {formatCurrency(price)}
                </p>
              </div>

              {/* <div className="text-right">
                <div className="flex items-center justify-end text-[10px] font-bold text-slate-500 uppercase">
                  <Receipt className="w-3 h-3 mr-1 text-slate-400" />
                  IVA: {formatCurrency(taxes || 0)}
                </div>
                <div className="flex items-center justify-end text-[10px] font-bold text-sky-600">
                  <Percent className="w-3 h-3 mr-1" />
                  Tasa: {tax_percentage}
                </div>
              </div> */}
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center justify-end text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Receipt className="w-3 h-3 mr-1 text-slate-400" />
                  Impuestos ({taxPercentage}%)
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {formatCurrency(calculatedTaxes)}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          className="w-full bg-sabana text-white hover:bg-slate-900 hover:text-slate-100/50 transition-all duration-300 font-bold h-11"
          onClick={handleViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver Disponibilidad
        </Button>
      </CardContent>
    </Card>
  );
};