import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Printer, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReservationSummaryCard } from "@/components/payment/ReservationSummaryCard";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Header } from "../Header";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateReservationEmail } from "@/services/emailTemplates";

const ConfirmationSuccess = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [isSending, setIsSending] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!state) {
    navigate("/");
    return null;
  }

  const handleSendEmail = async () => {
    setIsSending(true);
    const emailHtml = generateReservationEmail(state);
    try {
    // Ejemplo de envío a un servicio como Resend o EmailJS
    /* 
    await resend.emails.send({
      from: 'Reservas <recepcion@tuhotel.com>',
      to: state.formData.email,
      subject: `Reserva Confirmada - ${state.hotel.name}`,
      html: emailHtml,
    }); 
    */

    toast({ title: "¡Correo Enviado!", description: "Revisa tu bandeja de entrada." });
  } catch (error) {
    console.error(error);
  } finally {
    setIsSending(false);
  }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar currentLanguage="es" onLanguageChange={() => {}} />
      <Header activeSection="contact" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-28 pb-20 container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8 print:hidden">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900">¡Pago Exitoso!</h1>
          <p className="text-slate-500 mt-2">Tu reserva ha sido confirmada satisfactoriamente.</p>
        </div>

        <ReservationSummaryCard data={state} />

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Button variant="outline" onClick={() => window.print()} className="py-6 border-slate-300">
            <Printer className="w-4 h-4 mr-2" /> Imprimir Comprobante
          </Button>
          <Button 
            variant="secondary"
            onClick={handleSendEmail}
            disabled={isSending}
            className="h-12 font-semibold"
          >
            <Mail className="w-4 h-4 mr-2" /> 
            {isSending ? "Enviando..." : "Reenviar Correo"}
          </Button>
          <Button onClick={() => navigate("/")} className="bg-sabana hover:bg-sabana/90 py-6 font-bold">
            <Home className="w-4 h-4 mr-2" /> Volver al Inicio
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmationSuccess;