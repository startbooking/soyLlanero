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

const OtherServiceForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("home");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    providerName: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    coverage: "",
    availability: "",
    price: "",
    specialFeatures: "",
    certifications: "",
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
    console.log("Datos del servicio:", formData);
    setTimeout(() => navigate("/"), 2000);
  };

useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <Header
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        language="es"
      />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Registrar Otro Servicio</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Nombre del Servicio *</Label>
                <Input
                  id="serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="providerName">Nombre del Proveedor *</Label>
                <Input
                  id="providerName"
                  name="providerName"
                  value={formData.providerName}
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
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Tipo de Servicio *</Label>
                <Input
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  placeholder="Ej: Transporte, Guía, Fotografía"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverage">Cobertura / Área de Servicio</Label>
                <Input
                  id="coverage"
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleInputChange}
                  placeholder="Ej: Villavicencio y alrededores"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Disponibilidad</Label>
                <Input
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  placeholder="Ej: 24/7, Lun-Vie 8am-6pm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precios / Tarifas</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Ej: Desde $50,000 COP"
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="specialFeatures">Características Especiales</Label>
                <Input
                  id="specialFeatures"
                  name="specialFeatures"
                  value={formData.specialFeatures}
                  onChange={handleInputChange}
                  placeholder="Ej: Equipos especializados, Personal bilingüe"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="certifications">Certificaciones / Licencias</Label>
                <Input
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="Ej: Licencia de turismo, Certificación ambiental"
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
              <Label htmlFor="description">Descripción del Servicio *</Label>
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

export default OtherServiceForm;
