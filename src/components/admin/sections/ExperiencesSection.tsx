
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
import { MoreHorizontal, Plus, Edit, CheckCircle, Star } from "lucide-react";

export function ExperiencesSection() {
  const experiences = [
    {
      id: 1,
      title: "Safari en los Llanos",
      category: "Aventura",
      price: "$150.000",
      duration: "1 día",
      status: "Activo",
      rating: 4.8,
      provider: "Aventuras Orinoquia"
    },
    {
      id: 2,
      title: "Tour Gastronómico",
      category: "Gastronomía",
      price: "$80.000",
      duration: "4 horas",
      status: "Pendiente",
      rating: 4.5,
      provider: "Sabores Llaneros"
    }
  ];

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
          <h2 className="text-3xl font-bold text-gray-900">Gestión de Experiencias</h2>
          <p className="text-gray-600">Administra las experiencias del sistema</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Experiencia
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Experiencias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Experiencia</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell className="font-medium">{experience.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{experience.category}</Badge>
                  </TableCell>
                  <TableCell>{experience.price}</TableCell>
                  <TableCell>{experience.duration}</TableCell>
                  <TableCell>{experience.provider}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{experience.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(experience.status)}>
                      {experience.status}
                    </Badge>
                  </TableCell>
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
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {experience.status === "Activo" ? "Desactivar" : "Activar"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
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
