
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Building2, Camera, MapPin, Phone, Mail, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CompanyInfoSection() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "Aventuras Llanos",
    description: "Operador turístico especializado en experiencias de aventura en los Llanos Orientales",
    phone: "+57 311 456 7890",
    email: "info@aventurasllanos.com",
    website: "www.aventurasllanos.com",
    address: "Carrera 40 #25-15, Villavicencio, Meta",
    category: "Aventura y Naturaleza",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  });

  const handleSave = () => {
    console.log("Guardar datos:", companyData);
    toast({
      title: "Información actualizada",
      description: "Los datos de tu empresa han sido actualizados exitosamente."
    });
    setIsEditing(false);
  };

  const handleImageUpload = (index: number) => {
    // Simular carga de imagen
    toast({
      title: "Imagen cargada",
      description: `Imagen ${index + 1} ha sido actualizada.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Información de la Empresa</h2>
          <p className="text-gray-600">Gestiona los datos y fotos de tu empresa</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Guardar Cambios
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Editar Información
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Datos Básicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Empresa</Label>
              <Input
                id="name"
                value={companyData.name}
                onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{companyData.category}</Badge>
                {isEditing && <Button size="sm" variant="outline">Cambiar</Button>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={companyData.description}
                onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Información de contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                  value={companyData.email}
                  onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Galería de fotos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Galería de Fotos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {companyData.images.map((image, index) => (
              <div key={index} className="relative">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleImageUpload(index)}
                  >
                    <Camera className="w-3 h-3 mr-1" />
                    Cambiar
                  </Button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Agregar Más Fotos
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
