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

const PointOfInterestForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("home");

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    placeName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    openingHours: "",
    entranceFee: "",
    accessibility: "",
    facilities: "",
    bestTimeToVisit: "",
    averageVisitTime: "",
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
    console.log("Datos del punto de interés:", formData);
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
          <h1 className="text-4xl font-bold mb-6 text-foreground">Registrar Punto de Interés</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="placeName">Nombre del Lugar *</Label>
                <Input
                  id="placeName"
                  name="placeName"
                  value={formData.placeName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Nombre de Contacto *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
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
                <Label htmlFor="address">Ubicación/Dirección *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Ej: Monumento, Parque, Museo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openingHours">Horario de Apertura</Label>
                <Input
                  id="openingHours"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleInputChange}
                  placeholder="Ej: Lun-Dom 8am-6pm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entranceFee">Costo de Entrada</Label>
                <Input
                  id="entranceFee"
                  name="entranceFee"
                  value={formData.entranceFee}
                  onChange={handleInputChange}
                  placeholder="Ej: $15,000 COP o Gratis"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessibility">Accesibilidad</Label>
                <Input
                  id="accessibility"
                  name="accessibility"
                  value={formData.accessibility}
                  onChange={handleInputChange}
                  placeholder="Ej: Acceso para sillas de ruedas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageVisitTime">Tiempo Promedio de Visita</Label>
                <Input
                  id="averageVisitTime"
                  name="averageVisitTime"
                  value={formData.averageVisitTime}
                  onChange={handleInputChange}
                  placeholder="Ej: 2 horas"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="facilities">Instalaciones y Servicios</Label>
                <Input
                  id="facilities"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleInputChange}
                  placeholder="Ej: Baños, Cafetería, Parqueadero, Tienda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bestTimeToVisit">Mejor Época para Visitar</Label>
                <Input
                  id="bestTimeToVisit"
                  name="bestTimeToVisit"
                  value={formData.bestTimeToVisit}
                  onChange={handleInputChange}
                  placeholder="Ej: Junio - Noviembre"
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
              <Label htmlFor="description">Descripción del Lugar *</Label>
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

export default PointOfInterestForm;
