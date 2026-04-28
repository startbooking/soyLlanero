import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  setDate: (date?: Date) => void;
  placeholder: string;
  minDate?: Date;
}

export const DatePicker = ({ 
  date, setDate, placeholder, minDate 
}: { 
  date?: Date, setDate: (d?: Date) => void, placeholder: string, minDate?: Date 
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={`w-full justify-start text-left font-normal border-sabana/30 ${!date && "text-muted-foreground"}`}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-sabana" />
        {date ? format(date, "PPP", { locale: es }) : <span>{placeholder}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(d) => d < (minDate || new Date())}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);