
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Footprints, Save, Plus, Trash2, MapPin, Phone, Mail, Globe } from "lucide-react";

interface FooterLink {
  id: number;
  title: string;
  url: string;
  category: string;
}

interface ManageFooterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManageFooterModal = ({ open, onOpenChange }: ManageFooterModalProps) => {
  const { toast } = useToast();
  
  const [footerConfig, setFooterConfig] = useState({
    appName: "Villavicencio",
    appSubtitle: "Turismo",
    description: "Plataforma oficial del clúster de turismo de Villavicencio. Promoviendo el turismo sostenible y las empresas locales.",
    totalCompanies: "120+",
    totalEvents: "25+",
    contactPhone: "+57 8 123 4567",
    contactEmail: "info@villavicencio-turismo.com",
    addressLine1: "Alcaldía de Villavicencio",
    addressLine2: "Carrera 35 #15-30",
    addressLine3: "Villavicencio, Meta",
    newsletterTitle: "Newsletter",
    newsletterPlaceholder: "Email",
    newsletterButton: "Suscribirse",
    copyrightYear: "2024",
    copyrightText: "Villavicencio Turismo. Todos los derechos reservados.",
    socialFacebook: "https://facebook.com/villavicencioturismo",
    socialInstagram: "https://instagram.com/villavicencioturismo",
    socialTwitter: "https://twitter.com/villaviturismo",
    socialYoutube: "https://youtube.com/@villavicencioturismo"
  });

  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([
    { id: 1, title: "Directorio de empresas", url: "#", category: "quick" },
    { id: 2, title: "Calendario de eventos", url: "#", category: "quick" },
    { id: 3, title: "Mapa interactivo", url: "#", category: "quick" },
    { id: 4, title: "Rutas turísticas", url: "#", category: "quick" },
    { id: 5, title: "Guías de viaje", url: "#", category: "quick" },
    { id: 6, title: "Registrar empresa", url: "#", category: "business" },
    { id: 7, title: "Panel de control", url: "#", category: "business" },
    { id: 8, title: "Promocionar servicios", url: "#", category: "business" },
    { id: 9, title: "Estadísticas", url: "#", category: "business" },
    { id: 10, title: "Soporte técnico", url: "#", category: "business" },
    { id: 11, title: "Términos de uso", url: "#", category: "legal" },
    { id: 12, title: "Política de privacidad", url: "#", category: "legal" },
    { id: 13, title: "Turismo sostenible", url: "#", category: "legal" }
  ]);

  const [newLink, setNewLink] = useState({ title: "", url: "", category: "quick" });

  const handleConfigChange = (field: string, value: string) => {
    setFooterConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      const link: FooterLink = {
        id: Date.now(),
        ...newLink
      };
      setFooterLinks(prev => [...prev, link]);
      setNewLink({ title: "", url: "", category: "quick" });
      toast({
        title: "Enlace agregado",
        description: "El enlace ha sido agregado al footer."
      });
    }
  };

  const handleDeleteLink = (id: number) => {
    setFooterLinks(prev => prev.filter(link => link.id !== id));
    toast({
      title: "Enlace eliminado",
      description: "El enlace ha sido eliminado del footer."
    });
  };

  const handleSave = () => {
    console.log("Guardar configuración del footer:", { footerConfig, footerLinks });
    toast({
      title: "Footer actualizado",
      description: "La configuración del footer ha sido guardada exitosamente."
    });
    onOpenChange(false);
  };

  const getLinksByCategory = (category: string) => {
    return footerLinks.filter(link => link.category === category);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Footprints className="w-5 h-5" />
            Configurar Footer de la App
          </DialogTitle>
          <DialogDescription>
            Gestiona toda la información y enlaces que aparecen en el pie de página
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
            <TabsTrigger value="links">Enlaces</TabsTrigger>
            <TabsTrigger value="social">Redes Sociales</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Nombre de la App</Label>
                <Input
                  id="appName"
                  value={footerConfig.appName}
                  onChange={(e) => handleConfigChange('appName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appSubtitle">Subtítulo</Label>
                <Input
                  id="appSubtitle"
                  value={footerConfig.appSubtitle}
                  onChange={(e) => handleConfigChange('appSubtitle', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalCompanies">Total de Empresas</Label>
                <Input
                  id="totalCompanies"
                  value={footerConfig.totalCompanies}
                  onChange={(e) => handleConfigChange('totalCompanies', e.target.value)}
                  placeholder="120+"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalEvents">Total de Eventos</Label>
                <Input
                  id="totalEvents"
                  value={footerConfig.totalEvents}
                  onChange={(e) => handleConfigChange('totalEvents', e.target.value)}
                  placeholder="25+"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={footerConfig.description}
                onChange={(e) => handleConfigChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Teléfono de Contacto
                  </Label>
                  <Input
                    id="contactPhone"
                    value={footerConfig.contactPhone}
                    onChange={(e) => handleConfigChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email de Contacto
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={footerConfig.contactEmail}
                    onChange={(e) => handleConfigChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Dirección
                </Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Línea 1"
                    value={footerConfig.addressLine1}
                    onChange={(e) => handleConfigChange('addressLine1', e.target.value)}
                  />
                  <Input
                    placeholder="Línea 2"
                    value={footerConfig.addressLine2}
                    onChange={(e) => handleConfigChange('addressLine2', e.target.value)}
                  />
                  <Input
                    placeholder="Línea 3"
                    value={footerConfig.addressLine3}
                    onChange={(e) => handleConfigChange('addressLine3', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newsletterTitle">Título Newsletter</Label>
                  <Input
                    id="newsletterTitle"
                    value={footerConfig.newsletterTitle}
                    onChange={(e) => handleConfigChange('newsletterTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsletterPlaceholder">Placeholder Email</Label>
                  <Input
                    id="newsletterPlaceholder"
                    value={footerConfig.newsletterPlaceholder}
                    onChange={(e) => handleConfigChange('newsletterPlaceholder', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsletterButton">Texto del Botón</Label>
                  <Input
                    id="newsletterButton"
                    value={footerConfig.newsletterButton}
                    onChange={(e) => handleConfigChange('newsletterButton', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="links" className="space-y-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-white">
                <h4 className="font-medium mb-3">Agregar Nuevo Enlace</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <Input
                    placeholder="Título del enlace"
                    value={newLink.title}
                    onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                  />
                  <Input
                    placeholder="URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                  />
                  <select
                    value={newLink.category}
                    onChange={(e) => setNewLink({...newLink, category: e.target.value})}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="quick">Enlaces Rápidos</option>
                    <option value="business">Para Empresas</option>
                    <option value="legal">Legal</option>
                  </select>
                  <Button onClick={handleAddLink} variant="success">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Enlaces Rápidos</h4>
                  <div className="space-y-2">
                    {getLinksByCategory('quick').map(link => (
                      <div key={link.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">{link.title}</span>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(link.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Para Empresas</h4>
                  <div className="space-y-2">
                    {getLinksByCategory('business').map(link => (
                      <div key={link.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">{link.title}</span>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(link.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Legal</h4>
                  <div className="space-y-2">
                    {getLinksByCategory('legal').map(link => (
                      <div key={link.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">{link.title}</span>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(link.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="socialFacebook">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Facebook
                </Label>
                <Input
                  id="socialFacebook"
                  value={footerConfig.socialFacebook}
                  onChange={(e) => handleConfigChange('socialFacebook', e.target.value)}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialInstagram">Instagram</Label>
                <Input
                  id="socialInstagram"
                  value={footerConfig.socialInstagram}
                  onChange={(e) => handleConfigChange('socialInstagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialTwitter">Twitter</Label>
                <Input
                  id="socialTwitter"
                  value={footerConfig.socialTwitter}
                  onChange={(e) => handleConfigChange('socialTwitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialYoutube">YouTube</Label>
                <Input
                  id="socialYoutube"
                  value={footerConfig.socialYoutube}
                  onChange={(e) => handleConfigChange('socialYoutube', e.target.value)}
                  placeholder="https://youtube.com/@..."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="copyrightYear">Año del Copyright</Label>
                <Input
                  id="copyrightYear"
                  value={footerConfig.copyrightYear}
                  onChange={(e) => handleConfigChange('copyrightYear', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="copyrightText">Texto del Copyright</Label>
                <Input
                  id="copyrightText"
                  value={footerConfig.copyrightText}
                  onChange={(e) => handleConfigChange('copyrightText', e.target.value)}
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
