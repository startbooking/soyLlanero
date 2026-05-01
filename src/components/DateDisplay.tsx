import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "lucide-react"; // Opcional: para un toque visual

interface DateDisplayProps {
  date: string | number | Date | null | undefined;
  className?: string;
  showIcon?: boolean;
}

const DateDisplay = ({ date, className = "", showIcon = false }: DateDisplayProps) => {
  
  const formatDate = (dateValue: any) => {
    if (!dateValue) return "---";
    try {
      const d = new Date(dateValue);
      // Validar si la fecha es inválida antes de formatear
      if (isNaN(d.getTime())) return "Fecha inválida";
      
      return format(d, "dd MMM, yyyy", { locale: es });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "---";
    }
  };

  return (
    <div className={`flex items-center gap-2 text-slate-600 ${className}`}>
      {showIcon && <Calendar className="w-4 h-4 text-sabana/70" />}
      <span className="capitalize">{formatDate(date)}</span>
    </div>
  );
};

export default DateDisplay;