import { format } from "date-fns";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ReservationSummary = ({ data, onPay }: any) => (
  <Card className="border-sabana border-2 shadow-xl animate-in zoom-in-95">
    <CardHeader className="bg-sabana/5">
      <CardTitle className="text-sabana flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5" /> 3. Confirmar y Pagar
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-6 space-y-6">
      <div className="grid grid-cols-2 gap-8 text-sm border-b pb-6">
        <div className="space-y-2">
          <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Estancia</h4>
          <p><strong>Check-in:</strong> {format(data.checkInDate, "dd/MM/yyyy")}</p>
          <p><strong>Check-out:</strong> {format(data.checkOutDate, "dd/MM/yyyy")}</p>
          <p><strong>Noches:</strong> {data.totals.nights}</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Huésped</h4>
          <p><strong>Nombre:</strong> {data.formData.firstName} {data.formData.lastName}</p>
          <p><strong>Email:</strong> {data.formData.email}</p>
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal stancia</span>
          <span>${data.totals.subtotal?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-500">
          <span>Impuestos y cargos</span>
          <span>${data.totals.taxes?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-2xl font-black text-sabana border-t pt-3">
          <span>TOTAL</span>
          <span>${data.totals.total?.toLocaleString()}</span>
        </div>
      </div>

      <Button onClick={onPay} className="w-full bg-sabana hover:bg-sabana/90 h-16 text-xl font-black text-white shadow-lg">
        <CreditCard className="mr-3 w-6 h-6" /> Pagar con Wompi
      </Button>
    </CardContent>
  </Card>
);