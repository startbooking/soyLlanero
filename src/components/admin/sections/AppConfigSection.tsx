
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Settings, Footprints, Sliders, Building2, FileText, Palette, Book, FileSpreadsheet } from "lucide-react";
import { ManageFooterModal } from "@/components/admin/modals/ManageFooterModal";
import { ManageSliderModal } from "@/components/admin/modals/ManageSliderModal";
import { ManageCompanyModal } from "@/components/admin/modals/ManageCompanyModal";
import { ManageAppTextsModal } from "@/components/admin/modals/ManageAppTextsModal";

export function AppConfigSection() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [footerModalOpen, setFooterModalOpen] = useState(false);
  const [sliderModalOpen, setSliderModalOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [textsModalOpen, setTextsModalOpen] = useState(false);

  const configSections = [
    {
      title: "Datos de la Empresa",
      description: "Información general, contacto, misión, visión y redes sociales",
      icon: Building2,
      color: "text-blue-600",
      action: () => setCompanyModalOpen(true)
    },
    {
      title: "Configuración del Footer",
      description: "Enlaces, información de contacto y datos legales del pie de página",
      icon: Footprints,
      color: "text-green-600",
      action: () => setFooterModalOpen(true)
    },
    {
      title: "Slider Principal",
      description: "Imágenes y contenido del carrusel de la página principal",
      icon: Sliders,
      color: "text-purple-600",
      action: () => setSliderModalOpen(true)
    },
    {
      title: "Textos de la Aplicación",
      description: "Títulos, descripciones y contenido de texto de la app",
      icon: FileText,
      color: "text-orange-600",
      action: () => setTextsModalOpen(true)
    },
    {
      title: "Configuración Visual",
      description: "Colores, tipografías y elementos visuales de la marca",
      icon: Palette,
      color: "text-pink-600",
      action: () => toast({
        title: "Próximamente",
        description: "Esta funcionalidad estará disponible en una próxima actualización."
      })
    },
    {
      title: "Configuración General",
      description: "Ajustes generales de la aplicación y SEO",
      icon: Settings,
      color: "text-gray-600",
      action: () => toast({
        title: "Próximamente",
        description: "Esta funcionalidad estará disponible en una próxima actualización."
      })
    }
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Configuración de la Aplicación</h2>
            <p className="text-gray-600">Gestiona todos los aspectos configurables de la plataforma turística</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/configuration-manual')}
            >
              <Book className="w-4 h-4 mr-2" />
              Manual Completo
            </Button>
            <Button
              variant="default"
              onClick={() => navigate('/admin/configuration-manual')}
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Plantillas XLS
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configSections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gray-100 ${section.color}`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                    <Button 
                      onClick={section.action}
                      className="w-full"
                      variant="outline"
                    >
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modales */}
      <ManageFooterModal 
        open={footerModalOpen} 
        onOpenChange={setFooterModalOpen} 
      />
      <ManageSliderModal 
        open={sliderModalOpen} 
        onOpenChange={setSliderModalOpen} 
      />
      <ManageCompanyModal 
        open={companyModalOpen} 
        onOpenChange={setCompanyModalOpen} 
      />
      <ManageAppTextsModal 
        open={textsModalOpen} 
        onOpenChange={setTextsModalOpen} 
      />
    </>
  );
}
