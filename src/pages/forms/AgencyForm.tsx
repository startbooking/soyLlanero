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

const AgencyForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("home");

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    agencyName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    rnt: "",
    services: "",
    destinations: "",
    experience: "",
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
    console.log("Datos de la agencia:", formData);
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
          <h1 className="text-4xl font-bold mb-6 text-foreground">Registrar Agencia de Turismo</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="agencyName">Nombre de la Agencia *</Label>
                <Input
                  id="agencyName"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Nombre del Representante Legal *</Label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
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

              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rnt">RNT (Registro Nacional de Turismo) *</Label>
                <Input
                  id="rnt"
                  name="rnt"
                  value={formData.rnt}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">Servicios Ofrecidos *</Label>
                <Input
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  placeholder="Ej: Tours, Transporte, Guías"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destinations">Destinos Principales</Label>
                <Input
                  id="destinations"
                  name="destinations"
                  value={formData.destinations}
                  onChange={handleInputChange}
                  placeholder="Ej: Caño Cristales, La Macarena"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Años de Experiencia</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleInputChange}
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
              <Label htmlFor="description">Descripción de la Agencia *</Label>
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

export default AgencyForm;
