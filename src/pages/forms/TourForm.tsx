import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CustomCaptcha } from "@/components/CustomCaptcha";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";

const TourForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("home");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    tourName: "",
    operatorName: "",
    email: "",
    phone: "",
    destinations: "",
    duration: "",
    groupSize: "",
    price: "",
    schedule: "",
    transportation: "",
    meals: "",
    includes: "",
    description: "",
    website: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      toast.error("Por favor completa la verificación de seguridad");
      return;
    }
    toast.success("Formulario enviado correctamente. Nos pondremos en contacto pronto.");
    console.log("Datos del tour:", formData);
    setTimeout(() => navigate("/"), 2000);
  };

useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection={activeSection} onSectionChange={setActiveSection} language="es" />      
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Registrar Tour</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tourName">Nombre del Tour *</Label>
                <Input
                  id="tourName"
                  name="tourName"
                  value={formData.tourName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatorName">Nombre del Operador *</Label>
                <Input
                  id="operatorName"
                  name="operatorName"
                  value={formData.operatorName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="destinations">Destinos que Incluye *</Label>
                <Input
                  id="destinations"
                  name="destinations"
                  value={formData.destinations}
                  onChange={handleInputChange}
                  placeholder="Ej: Caño Cristales, La Macarena, Bioparque"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración *</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Ej: 3 días / 2 noches"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupSize">Tamaño del Grupo</Label>
                <Input
                  id="groupSize"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  placeholder="Ej: Min 4 - Max 20 personas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio por Persona</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Ej: $850,000 COP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Horario de Salida</Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="Ej: Viernes 6:00 AM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportation">Transporte</Label>
                <Input
                  id="transportation"
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleInputChange}
                  placeholder="Ej: Bus de turismo con AC"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meals">Alimentación</Label>
                <Input
                  id="meals"
                  name="meals"
                  value={formData.meals}
                  onChange={handleInputChange}
                  placeholder="Ej: 3 comidas diarias"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="includes">Incluye</Label>
                <Input
                  id="includes"
                  name="includes"
                  value={formData.includes}
                  onChange={handleInputChange}
                  placeholder="Ej: Alojamiento, Comidas, Guía, Entradas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción del Tour *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>

            <CustomCaptcha onVerified={setIsCaptchaVerified} />

            <Button
              type="submit"
              className="w-full"
              disabled={!isCaptchaVerified}
            >
              Enviar Solicitud
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TourForm;
