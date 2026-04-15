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

const ActivityForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("home");

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    activityName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    category: "",
    duration: "",
    groupSize: "",
    price: "",
    difficulty: "",
    requirements: "",
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
    toast.success(
      "Formulario enviado correctamente. Nos pondremos en contacto pronto."
    );
    console.log("Datos de la actividad:", formData);
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
          <h1 className="text-4xl font-bold mb-6 text-foreground">
            Registrar Actividad
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="activityName">Nombre de la Actividad *</Label>
                <Input
                  id="activityName"
                  name="activityName"
                  value={formData.activityName}
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
                <Label htmlFor="location">Ubicación *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
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
                  placeholder="Ej: Aventura, Cultural, Deportiva"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Ej: 3 horas, Día completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupSize">Tamaño del Grupo</Label>
                <Input
                  id="groupSize"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  placeholder="Ej: Min 2 - Max 15 personas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio por Persona</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Ej: $50,000 COP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Nivel de Dificultad</Label>
                <Input
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  placeholder="Ej: Fácil, Moderado, Difícil"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="requirements">Requisitos</Label>
                <Input
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Ej: Ropa cómoda, Buen estado físico"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="includes">Incluye</Label>
                <Input
                  id="includes"
                  name="includes"
                  value={formData.includes}
                  onChange={handleInputChange}
                  placeholder="Ej: Guía, Equipo, Refrigerio"
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
              <Label htmlFor="description">Descripción de la Actividad *</Label>
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

export default ActivityForm;
