
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Edit, Key, CheckCircle, Building2 } from "lucide-react";

export function BusinessesSection() {
  const businesses = [
    {
      id: 1,
      name: "Hotel Los Llanos",
      category: "Hospedaje",
      email: "info@hotellosllanos.com",
      phone: "+57 318 123 4567",
      status: "Activo",
      verified: true,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Restaurante El Llanero",
      category: "Gastronomía",
      email: "contacto@elllanero.com",
      phone: "+57 315 987 6543",
      status: "Pendiente",
      verified: false,
      createdAt: "2024-02-10"
    },
    {
      id: 3,
      name: "Aventuras Orinoquia",
      category: "Turismo de Aventura",
      email: "info@aventurasorinquia.com",
      phone: "+57 320 456 7890",
      status: "Activo",
      verified: true,
      createdAt: "2024-03-05"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Hospedaje":
        return "bg-blue-100 text-blue-800";
      case "Gastronomía":
        return "bg-orange-100 text-orange-800";
      case "Turismo de Aventura":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Inactivo":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestión de Empresas</h2>
          <p className="text-gray-600">Administra las empresas registradas en el sistema</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Empresa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Verificación</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{business.name}</div>
                      <div className="text-sm text-gray-500">{business.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(business.category)}>
                      {business.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{business.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(business.status)}>
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {business.verified ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verificada
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">
                        Pendiente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{business.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modificar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" />
                          Cambiar Contraseña
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {business.status === "Activo" ? "Desactivar" : "Activar"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Building2 className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
