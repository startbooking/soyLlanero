
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Lock, Phone, MapPin, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    role: "turista"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const userRoles = [
    { id: "turista", name: "Turista", description: "Usuario visitante" },
    { id: "huesped", name: "Huésped/Cliente", description: "Cliente de servicios turísticos" },
    { id: "empresario", name: "Empresario", description: "Propietario de negocio turístico" },
    { id: "usuario-empresario", name: "Usuario Empresario", description: "Empleado de empresa turística" },
    { id: "usuario-administrador", name: "Usuario Administrador", description: "Administrador con permisos limitados" },
    { id: "administrador", name: "Administrador", description: "Acceso completo a la plataforma" }
  ];

  // Datos de ejemplo para demostración
  const sampleUsers = [
    {
      email: "admin@villavicencio.com",
      password: "admin123",
      name: "Carlos Administrador",
      role: "administrador"
    },
    {
      email: "user.admin@villavicencio.com",
      password: "useradmin123",
      name: "María Usuario Admin",
      role: "usuario-administrador"
    },
    {
      email: "empresario@hotel.com",
      password: "empresario123",
      name: "Juan Empresario",
      role: "empresario"
    },
    {
      email: "empleado@restaurant.com",
      password: "empleado123",
      name: "Ana Empleada",
      role: "usuario-empresario"
    },
    {
      email: "turista@gmail.com",
      password: "turista123",
      name: "Pedro Turista",
      role: "turista"
    },
    {
      email: "cliente@hotel.com",
      password: "cliente123",
      name: "Laura Cliente",
      role: "huesped"
    }
  ];

  const handleLogin = async () => {
    setIsLoading(true);
    // console.log(loginData.email, loginData.password)
    const success = await login(loginData.email, loginData.password);
    // console.log(success)
    setIsLoading(false);
    
    if (success) {
      onClose();
      // Redirect based on role
      const user = sampleUsers.find(u => u.email === loginData.email);
      if (user) {
        switch (user.role) {
          case "administrador":
          case "usuario-administrador":
            navigate("/admin/dashboard");
            break;
          case "empresario":
            navigate("/business-owner/dashboard");
            break;
          case "turista":
            navigate("/tourist/dashboard");
            break;
          case "huesped":
            navigate("/guest/dashboard");
            break;
          default:
            navigate("/");
        }
      }
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleRegister = () => {
    console.log("Nuevo usuario registrado:", registerData);
    alert(`Usuario ${registerData.name} registrado exitosamente como ${registerData.role}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Iniciar Sesión
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            {/* <TabsTrigger value="register">Registrarse</TabsTrigger> */}
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
              </div>

              <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </div>

            {/* <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Usuarios de prueba:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {sampleUsers.map((user, index) => (
                  <div key={index} className="text-xs p-2 bg-muted rounded border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{user.email}</span>
                      <Badge variant="outline" className="text-xs">
                        {userRoles.find(r => r.id === user.role)?.name}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">Contraseña: {user.password}</div>
                  </div>
                ))}
              </div>
            </div> */}
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Tu nombre completo"
                    className="pl-10"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reg-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reg-password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+57 300 123 4567"
                    className="pl-10"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Ciudad, País"
                    className="pl-10"
                    value={registerData.location}
                    onChange={(e) => setRegisterData({...registerData, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label>Tipo de Usuario</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {userRoles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        registerData.role === role.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setRegisterData({...registerData, role: role.id})}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                        {registerData.role === role.id && (
                          <div className="w-4 h-4 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleRegister} className="w-full">
                Registrarse
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
