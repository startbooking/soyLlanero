import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, room, total, formData } = location.state || {};

  useEffect(() => {
    if (!total) navigate("/hotels");

    // Inyectar el script de Wompi
    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [total, navigate]);

  const openWompiWidget = () => {
    // @ts-ignore
    const checkout = new WidgetCheckout({
      currency: 'COP',
      amountInCents: total * 100, // Wompi usa centavos
      reference: `RES-${Date.now()}`,
      publicKey: 'pub_test_XXXXXXXXXXXXX', // REEMPLAZAR CON TU LLAVE PÚBLICA DE WOMPI
      redirectUrl: 'https://tu-sitio.com/confirmation', // URL de éxito
      customerData: {
        email: formData.email,
        fullName: `${formData.firstName} ${formData.lastName}`,
        phoneNumber: formData.phone,
        phoneNumberPrefix: '+57'
      }
    });

    checkout.open((result: any) => {
      const transaction = result.transaction;
      console.log('Transaction ID: ', transaction.id);
      console.log('Transaction Status: ', transaction.status);
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar currentLanguage="es" onLanguageChange={() => {}} />
      <div className="container mx-auto pt-32 max-w-lg">
        <Card className="border-t-4 border-t-green-700">
          <CardHeader>
            <CardTitle className="text-center">Finalizar Pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="bg-slate-50 p-6 rounded-xl border-dashed border-2">
              <p className="text-slate-500 text-sm uppercase font-bold tracking-widest">Total a pagar</p>
              <h2 className="text-4xl font-black text-green-900">${total?.toLocaleString()} COP</h2>
            </div>
            
            <p className="text-sm text-slate-500">
              Al hacer clic en el botón, se abrirá el portal seguro de <strong>Wompi</strong> para completar tu transacción.
            </p>

            <Button onClick={openWompiWidget} size="lg" className="w-full bg-[#3B2A82] hover:bg-[#2a1e5e] h-16">
              Pagar con Wompi
            </Button>
            
            <img src="https://wompi.com/assets/img/logo-wompi.png" alt="Wompi" className="h-8 mx-auto opacity-50" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;