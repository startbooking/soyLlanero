import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, MessageCircle, Phone, Mail, FileQuestion, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { TopBar } from "@/components/TopBar";

const supportCategories = [
  { value: "technical", label: "Problemas técnicos" },
  { value: "account", label: "Mi cuenta" },
  { value: "billing", label: "Facturación y pagos" },
  { value: "promotion", label: "Promoción y visibilidad" },
  { value: "general", label: "Consulta general" }
];

const faqItems = [
  {
    question: "¿Cómo puedo actualizar la información de mi empresa?",
    answer: "Accede a tu panel de control y selecciona 'Editar perfil' para actualizar toda tu información."
  },
  {
    question: "¿Cuánto tiempo tarda en aprobarse mi registro?",
    answer: "El proceso de verificación toma entre 24 y 48 horas hábiles."
  },
  {
    question: "¿Cómo puedo destacar mi empresa?",
    answer: "Desde tu panel de control puedes activar opciones de promoción premium."
  },
  {
    question: "¿Puedo agregar más fotos a mi perfil?",
    answer: "Sí, puedes subir hasta 10 imágenes desde la sección de galería en tu panel."
  }
];

const BusinessSupport = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { toast } = useToast();
  const { appConfig } = useAppConfig();
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto."
    });
    setFormData({ name: "", email: "", category: "", message: "" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian


  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection={activeSection} onSectionChange={setActiveSection} language="es" />
      
      <main className="pt-32 pb-16">
      {/* <main className="container mx-auto px-4 py-12"> */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Soporte Técnico</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Consulta las preguntas frecuentes o envíanos un mensaje.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulario de contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Envíanos un mensaje
              </CardTitle>
              <CardDescription>
                Completa el formulario y te responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Información de contacto y FAQ */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Contacto directo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{appConfig?.company_movil || '+57  123 4567'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span>{appConfig?.company_email || 'soporte@sactel.cloud'}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-primary" />
                  Preguntas frecuentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <h4 className="font-medium text-foreground mb-1">{item.question}</h4>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessSupport;