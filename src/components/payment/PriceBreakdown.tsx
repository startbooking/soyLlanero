// components/payment/PriceBreakdown.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface PriceProps {
  subtotal: number;
  taxes: number;
  total: number;
  onPayment: () => void;
}

export const PriceBreakdown = ({ subtotal, taxes, total, onPayment }: PriceProps) => (
  <Card className="h-fit">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        <CreditCard className="w-5 h-5" /> Resumen de Costos
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal habitación</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Impuestos (19%)</span>
          <span>${taxes.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-xl pt-3 border-t">
          <span>Total</span>
          <span className="text-primary">${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-accent/20 rounded-lg p-4 space-y-3">
        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Métodos aceptados</p>
        <div className="flex flex-wrap gap-2">
          {["Tarjetas", "PSE", "Nequi"].map((m) => (
            <Badge key={m} variant="secondary">{m}</Badge>
          ))}
        </div>
      </div>

      {/* <Button onClick={onPayment} className="w-full text-lg" size="lg">
        Pagar con Wompi
      </Button> */}
      <Button
        onClick={onPayment}
        className="w-full bg-sky-400 hover:bg-slate-400 text-white font-bold h-12 transition-colors duration-300 shadow-md"
      >
        <CreditCard className="mr-2 w-5 h-5" />
        Pagar con Wompi
      </Button>
    </CardContent>
  </Card>
);