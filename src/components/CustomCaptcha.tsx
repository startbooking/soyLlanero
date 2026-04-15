
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Thermometer } from "lucide-react";

interface CustomCaptchaProps {
  onVerified: (verified: boolean) => void;
}

export const CustomCaptcha = ({ onVerified }: CustomCaptchaProps) => {
  const [targetPercentage, setTargetPercentage] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Generar un porcentaje aleatorio entre 20 y 80
    setTargetPercentage(Math.floor(Math.random() * 61) + 20);
  }, [attempts]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentPercentage(value);
    
    // Verificar si está dentro del rango de tolerancia (±5%)
    if (Math.abs(value - targetPercentage) <= 5) {
      setIsVerified(true);
      onVerified(true);
    } else {
      setIsVerified(false);
      onVerified(false);
    }
  };

  const resetCaptcha = () => {
    setAttempts(prev => prev + 1);
    setCurrentPercentage(0);
    setIsVerified(false);
    onVerified(false);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
      <div className="flex items-center gap-2">
        <Thermometer className="w-5 h-5" />
        <span className="text-sm font-medium">
          Verificación: Ajusta el termómetro al {targetPercentage}%
        </span>
      </div>
      
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max="100"
          value={currentPercentage}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span className={`font-medium ${isVerified ? 'text-green-600' : 'text-foreground'}`}>
            {currentPercentage}%
          </span>
          <span>100%</span>
        </div>
      </div>

      {isVerified ? (
        <div className="text-green-600 text-sm flex items-center gap-2">
          <span>✓ Verificación completada</span>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Objetivo: {targetPercentage}% (±5%)
          </span>
          <Button variant="outline" size="sm" onClick={resetCaptcha}>
            Nuevo desafío
          </Button>
        </div>
      )}
    </div>
  );
};
