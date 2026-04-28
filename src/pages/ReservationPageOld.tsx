import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";

// Layout & Components
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StepIndicator } from "@/components/reservation/StepIndicator";
import { DateGuestForm } from "@/components/reservation/DateGuestForm";
import { GuestInfoForm } from "@/components/reservation/GuestInfoForm";
import { ReservationSummary } from "@/components/reservation/ReservationSummary";
import { SidebarSummary } from "@/components/reservation/SidebarSummary";

const ReservationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estados
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(state?.checkIn);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(state?.checkOut);
  
  const room = state?.room;
  const hotel = state?.hotel;

  // Lógica de Negocio (Calculos)
  const totals = useMemo(() => {
    if (!checkInDate || !checkOutDate || !room) return { nights: 0, total: 0 };
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (86400000));
    const price = parseInt(room.price_per_night.replace(/\D/g, ""));
    return { nights, total: nights * price };
  }, [checkInDate, checkOutDate, room]);

  // Handlers
  const handleAvailability = async () => {
    setLoading(true);
    try {
      const res = await dataService.checkAvailability({
        room_id: room.id,
        check_in: checkInDate?.toISOString() || "",
        check_out: checkOutDate?.toISOString() || "",
        guests: 1 // Dinámico según UI
      });
      if (res.available) setStep(2);
      else toast({ title: "No disponible", variant: "destructive" });
    } catch (e) {
      toast({ title: "Error de conexión", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!room || !hotel) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <Header activeSection="businesses" />

      <main className="pt-28 pb-12 container mx-auto px-4">
        <StepIndicator currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <DateGuestForm 
                dates={{ checkIn: checkInDate, setCheckIn: setCheckInDate, checkOut: checkOutDate, setCheckOut: setCheckOutDate }}
                onCheck={handleAvailability}
                loading={loading}
              />
            )}
            
            {step === 2 && (
              <GuestInfoForm 
                onBack={() => setStep(1)} 
                onNext={() => setStep(3)} 
              />
            )}

            {step === 3 && (
              <ReservationSummary 
                data={{ checkInDate, checkOutDate, totals, room }}
                onPay={() => console.log("Pagar")}
              />
            )}
          </div>

          <aside>
            <SidebarSummary room={room} hotel={hotel} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;