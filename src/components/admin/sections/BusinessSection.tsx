
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus, Eye, Users, MessageSquare } from "lucide-react";
import { CreateBusinessModal } from "../modals/CreateBusinessModal";
import { ViewEditBusinessModal } from "../modals/ViewEditBusinessModal";
import { MessagesModal } from "../modals/MessagesModal";

export const BusinessSection = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  // Mock business data - in real app this would come from API
  const mockBusiness = {
    id: 1,
    name: "Hotel Ejemplo",
    category: "hoteles",
    owner: "Juan Pérez",
    phone: "+57 311 456 7890",
    address: "Carrera 30 #45-67, Villavicencio",
    description: "Hotel moderno en el centro de la ciudad",
    status: "Activo",
    rating: 4.5,
    date: "2024-01-15"
  };

  const handleViewBusiness = () => {
    setSelectedBusiness(mockBusiness);
    setModalMode('view');
    setShowViewModal(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Gestión de Empresas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-6 h-6" />
              <span>Crear Empresa</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
              onClick={handleViewBusiness}
            >
              <Eye className="w-6 h-6" />
              <span>Ver/Editar Empresas</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
              onClick={() => setShowMessagesModal(true)}
            >
              <MessageSquare className="w-6 h-6" />
              <span>Mensajes Clientes</span>
              <span className="text-xs text-red-500">3 nuevos</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-2"
            >
              <Users className="w-6 h-6" />
              <span>Estadísticas</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateBusinessModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
      <ViewEditBusinessModal 
        open={showViewModal} 
        onOpenChange={setShowViewModal}
        business={selectedBusiness}
        mode={modalMode}
      />
      <MessagesModal 
        open={showMessagesModal} 
        onOpenChange={setShowMessagesModal} 
      />
    </>
  );
};
