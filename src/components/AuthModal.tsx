import { useState } from "react";
// IMPORTANTE: Importar todo desde tu carpeta de UI local
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, Phone, MapPin, LogIn, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Mapeo de rutas por rol para evitar el Switch gigante
  const ROLE_ROUTES: Record<string, string> = {
    "administrador": "/admin/dashboard",
    "usuario-administrador": "/admin/dashboard",
    "empresario": "/business-owner/dashboard",
    "turista": "/tourist/dashboard",
    "huesped": "/guest/dashboard",
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(loginData.email, loginData.password);
      
      if (user) {
        onClose();
        // Redirección optimizada usando el objeto de mapeo
        const targetRoute = ROLE_ROUTES[user.role] || "/";
        navigate(targetRoute);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <LogIn className="w-5 h-5 text-primary" />
            Acceso a la Plataforma
          </DialogTitle>
          <DialogDescription>
            Inicia sesión para gestionar tus rutas y reservas.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full mt-4">
          {/* Si vas a habilitar registro pronto, descomenta TabsList */}
          {/* <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registro</TabsTrigger>
          </TabsList> */}

          <TabsContent value="login" className="space-y-4 pt-2">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <button className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
                  />
                </div>
              </div>

              <Button 
                onClick={handleLogin} 
                className="w-full mt-2" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Cargando...
                  </span>
                ) : "Iniciar Sesión"}
              </Button>
            </div>
          </TabsContent>
          
          {/* El contenido de Register se mantiene igual pero asegúrate de 
              usar prev en los setters: setRegisterData(prev => ({...prev, field: value})) */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};