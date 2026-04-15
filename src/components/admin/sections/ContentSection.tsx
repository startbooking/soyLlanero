
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Type, Settings } from "lucide-react";
import { ManageAppTextsModal } from "../modals/ManageAppTextsModal";
import { ManageSliderModal } from "../modals/ManageSliderModal";
import { ManageFooterModal } from "../modals/ManageFooterModal";
import { ManageCategoriesModal } from "../modals/ManageCategoriesModal";

export const ContentSection = () => {
  const [showTextsModal, setShowTextsModal] = useState(false);
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gestión de Contenido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
              onClick={() => setShowTextsModal(true)}
            >
              <Type className="w-6 h-6" />
              <span>Textos de la App</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
              onClick={() => setShowSliderModal(true)}
            >
              <Image className="w-6 h-6" />
              <span>Gestionar Slider</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
              onClick={() => setShowFooterModal(true)}
            >
              <FileText className="w-6 h-6" />
              <span>Configurar Footer</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
              onClick={() => setShowCategoriesModal(true)}
            >
              <Settings className="w-6 h-6" />
              <span>Categorías</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <ManageAppTextsModal 
        open={showTextsModal} 
        onOpenChange={setShowTextsModal} 
      />
      <ManageSliderModal 
        open={showSliderModal} 
        onOpenChange={setShowSliderModal} 
      />
      <ManageFooterModal 
        open={showFooterModal} 
        onOpenChange={setShowFooterModal} 
      />
      <ManageCategoriesModal 
        open={showCategoriesModal} 
        onOpenChange={setShowCategoriesModal} 
      />
    </>
  );
};
