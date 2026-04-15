import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building2, Upload, Save, Globe, MapPin, Phone, Mail } from "lucide-react";

interface ManageCompanyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManageCompanyModal = ({ open, onOpenChange }: ManageCompanyModalProps) => {
  const { toast } = useToast();
  
  const [companyData, setCompanyData] = useState({
    name: "Villavicencio Turismo",
    slogan: "La puerta de entrada a los Llanos Orientales",
    description: "Plataforma oficial del clúster de turismo de Villavicencio. Promovemos el turismo sostenible y las empresas locales de la región.",
    logo: "/uploads/logo.png",
    favicon: "/favicon.ico",
    mission: "Promover el desarrollo turístico sostenible de Villavicencio y la región de los Llanos Orientales.",
    vision: "Ser la plataforma líder en la promoción turística de los Llanos Orientales.",
    phone: "+57 8 123 4567",
    email: "info@villavicencioturismo.com",
    address: "Carrera 35 #15-30, Villavicencio, Meta",
    website: "https://villavicencioturismo.com",
    whatsapp: "+57 300 123 4567",
    facebook: "https://facebook.com/villavicencioturismo",
    instagram: "https://instagram.com/villavicencioturismo",
    twitter: "https://twitter.com/villaviturismo",
    youtube: "https://youtube.com/@villavicencioturismo",
    linkedin: "https://linkedin.com/company/villavicencioturismo"
  });

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (type: 'logo' | 'favicon') => {
    // Placeholder para subida de archivos
    toast({
      title: "Función en desarrollo",
      description: `La subida de ${type} estará disponible próximamente.`
    });
  };

  const handleSave = () => {
    console.log("Guardar datos de la empresa:", companyData);
    toast({
      title: "Datos guardados",
      description: "La información de la empresa ha sido actualizada exitosamente."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Configurar Datos de la Empresa
          </DialogTitle>
          <DialogDescription>
            Gestiona la información general de la empresa y redes sociales
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
            <TabsTrigger value="social">Redes Sociales</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input
                  id="companyName"
                  value={companyData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slogan">Slogan</Label>
                <Input
                  id="slogan"
                  value={companyData.slogan}
                  onChange={(e) => handleInputChange('slogan', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={companyData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mission">Misión</Label>
                <Textarea
                  id="mission"
                  value={companyData.mission}
                  onChange={(e) => handleInputChange('mission', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision">Visión</Label>
                <Textarea
                  id="vision"
                  value={companyData.vision}
                  onChange={(e) => handleInputChange('vision', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Teléfono Principal
                </Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={companyData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Principal
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Sitio Web
                </Label>
                <Input
                  id="website"
                  value={companyData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="w-4 h-4 inline mr-2" />
                Dirección
              </Label>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={companyData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={companyData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={companyData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={companyData.youtube}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/@..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={companyData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Logo Principal</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {companyData.logo ? (
                    <img src={companyData.logo} alt="Logo" className="max-h-20 mx-auto mb-2" />
                  ) : (
                    <div className="text-gray-400">Sin logo</div>
                  )}
                  <Button variant="outline" onClick={() => handleLogoUpload('logo')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Logo
                  </Button>
                </div>
                <Input
                  placeholder="URL del logo"
                  value={companyData.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Favicon</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {companyData.favicon ? (
                    <img src={companyData.favicon} alt="Favicon" className="max-h-8 mx-auto mb-2" />
                  ) : (
                    <div className="text-gray-400">Sin favicon</div>
                  )}
                  <Button variant="outline" onClick={() => handleLogoUpload('favicon')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Favicon
                  </Button>
                </div>
                <Input
                  placeholder="URL del favicon"
                  value={companyData.favicon}
                  onChange={(e) => handleInputChange('favicon', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="success">
            <Save className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};