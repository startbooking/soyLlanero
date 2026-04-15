
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Languages, Save } from "lucide-react";

interface ManageAppTextsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManageAppTextsModal = ({ open, onOpenChange }: ManageAppTextsModalProps) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [texts, setTexts] = useState({
    es: {
      appTitle: "Villavicencio Turismo",
      appSlogan: "Descubre la magia de los Llanos",
      homeWelcome: "Bienvenido a Villavicencio",
      homeDescription: "Explora los mejores destinos turísticos de los Llanos Orientales",
      menuHotels: "Hoteles",
      menuRestaurants: "Restaurantes",
      menuExperiences: "Experiencias",
      menuEvents: "Eventos",
      menuServices: "Servicios",
      buttonExplore: "Explorar",
      buttonContact: "Contactar",
      footerCopyright: "Todos los derechos reservados",
      footerDescription: "Plataforma oficial del clúster de turismo de Villavicencio"
    },
    en: {
      appTitle: "Villavicencio Tourism",
      appSlogan: "Discover the magic of the Plains",
      homeWelcome: "Welcome to Villavicencio",
      homeDescription: "Explore the best tourist destinations in the Eastern Plains",
      menuHotels: "Hotels",
      menuRestaurants: "Restaurants",
      menuExperiences: "Experiences",
      menuEvents: "Events",
      menuServices: "Services",
      buttonExplore: "Explore",
      buttonContact: "Contact",
      footerCopyright: "All rights reserved",
      footerDescription: "Official platform of the Villavicencio tourism cluster"
    }
  });

  const handleTextChange = (key: string, value: string) => {
    setTexts(prev => ({
      ...prev,
      [selectedLanguage]: {
        ...prev[selectedLanguage],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    console.log("Guardar textos:", texts);
    toast({
      title: "Textos actualizados",
      description: "Los textos de la aplicación han sido actualizados exitosamente."
    });
    onOpenChange(false);
  };

  const currentTexts = texts[selectedLanguage as keyof typeof texts];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Gestionar Textos de la App
          </DialogTitle>
          <DialogDescription>
            Configura todos los textos y traducciones de la aplicación
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="language">Idioma:</Label>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="navigation">Navegación</TabsTrigger>
              <TabsTrigger value="buttons">Botones</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appTitle">Título de la App</Label>
                  <Input
                    id="appTitle"
                    value={currentTexts.appTitle}
                    onChange={(e) => handleTextChange('appTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appSlogan">Slogan</Label>
                  <Input
                    id="appSlogan"
                    value={currentTexts.appSlogan}
                    onChange={(e) => handleTextChange('appSlogan', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homeWelcome">Mensaje de Bienvenida</Label>
                  <Input
                    id="homeWelcome"
                    value={currentTexts.homeWelcome}
                    onChange={(e) => handleTextChange('homeWelcome', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homeDescription">Descripción del Home</Label>
                  <Textarea
                    id="homeDescription"
                    value={currentTexts.homeDescription}
                    onChange={(e) => handleTextChange('homeDescription', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="navigation" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="menuHotels">Menú - Hoteles</Label>
                  <Input
                    id="menuHotels"
                    value={currentTexts.menuHotels}
                    onChange={(e) => handleTextChange('menuHotels', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="menuRestaurants">Menú - Restaurantes</Label>
                  <Input
                    id="menuRestaurants"
                    value={currentTexts.menuRestaurants}
                    onChange={(e) => handleTextChange('menuRestaurants', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="menuExperiences">Menú - Experiencias</Label>
                  <Input
                    id="menuExperiences"
                    value={currentTexts.menuExperiences}
                    onChange={(e) => handleTextChange('menuExperiences', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="menuEvents">Menú - Eventos</Label>
                  <Input
                    id="menuEvents"
                    value={currentTexts.menuEvents}
                    onChange={(e) => handleTextChange('menuEvents', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="menuServices">Menú - Servicios</Label>
                  <Input
                    id="menuServices"
                    value={currentTexts.menuServices}
                    onChange={(e) => handleTextChange('menuServices', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="buttons" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonExplore">Botón Explorar</Label>
                  <Input
                    id="buttonExplore"
                    value={currentTexts.buttonExplore}
                    onChange={(e) => handleTextChange('buttonExplore', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonContact">Botón Contactar</Label>
                  <Input
                    id="buttonContact"
                    value={currentTexts.buttonContact}
                    onChange={(e) => handleTextChange('buttonContact', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="footer" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="footerDescription">Descripción del Footer</Label>
                  <Textarea
                    id="footerDescription"
                    value={currentTexts.footerDescription}
                    onChange={(e) => handleTextChange('footerDescription', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerCopyright">Copyright</Label>
                  <Input
                    id="footerCopyright"
                    value={currentTexts.footerCopyright}
                    onChange={(e) => handleTextChange('footerCopyright', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} variant="success">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
