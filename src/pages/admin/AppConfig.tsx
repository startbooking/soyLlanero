
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft, Upload, Eye } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AppConfig = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [config, setConfig] = useState({
    appName: "Villavicencio Turismo",
    email: "info@villavicencio-turismo.com",
    phone: "+57 8 123 4567",
    whatsapp: "+57 300 123 4567",
    address: "Carrera 35 #15-30, Villavicencio, Meta",
    slogan: "Descubre la magia de los Llanos",
    description: "Plataforma oficial del clúster de turismo de Villavicencio",
    facebook: "https://facebook.com/villavicencioturismo",
    instagram: "https://instagram.com/villavicencioturismo",
    twitter: "https://twitter.com/villaviturismo",
    youtube: "https://youtube.com/@villavicencioturismo",
    website: "https://villavicencio-turismo.com",
    logo: "",
    favicon: "",
    primaryColor: "#22c55e",
    secondaryColor: "#f97316"
  });

  const handleInputChange = (field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar la configuración
    console.log("Guardando configuración:", config);
    toast({
      title: "Configuración guardada",
      description: "Los cambios se han aplicado correctamente.",
    });
  };

  const handleLogoUpload = (type: 'logo' | 'favicon') => {
    // Aquí iría la lógica para subir archivos
    console.log(`Subir ${type}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="admin" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Configuración de la Aplicación</h1>
                <p className="text-muted-foreground">Gestiona la información general de la aplicación</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Vista Previa
              </Button>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información General */}
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appName">Nombre de la Aplicación</Label>
                  <Input
                    id="appName"
                    value={config.appName}
                    onChange={(e) => handleInputChange('appName', e.target.value)}
                    placeholder="Nombre de la aplicación"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slogan">Slogan</Label>
                  <Input
                    id="slogan"
                    value={config.slogan}
                    onChange={(e) => handleInputChange('slogan', e.target.value)}
                    placeholder="Slogan de la aplicación"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={config.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descripción de la aplicación"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input
                    id="website"
                    value={config.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://ejemplo.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Información de Contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={config.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={config.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+57 8 123 4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={config.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Textarea
                    id="address"
                    value={config.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Dirección completa"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Redes Sociales */}
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={config.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={config.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={config.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    value={config.youtube}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                    placeholder="https://youtube.com/@..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Apariencia */}
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo de la Aplicación</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleLogoUpload('logo')}
                      className="flex-1"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Logo
                    </Button>
                    {config.logo && (
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleLogoUpload('favicon')}
                      className="flex-1"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Favicon
                    </Button>
                    {config.favicon && (
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Color Primario</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#22c55e"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Color Secundario</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={config.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      placeholder="#f97316"
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppConfig;
