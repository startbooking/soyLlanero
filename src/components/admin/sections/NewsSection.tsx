
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
import { MoreHorizontal, Plus, Edit, CheckCircle, Newspaper } from "lucide-react";

export function NewsSection() {
  const news = [
    {
      id: 1,
      title: "Nuevo Festival de Música Llanera",
      category: "Eventos",
      author: "Admin",
      publishDate: "2024-06-01",
      status: "Publicado",
      views: 1250
    },
    {
      id: 2,
      title: "Apertura de Nueva Ruta Turística",
      category: "Turismo",
      author: "María García",
      publishDate: "2024-06-05",
      status: "Borrador",
      views: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publicado":
        return "bg-green-100 text-green-800";
      case "Borrador":
        return "bg-yellow-100 text-yellow-800";
      case "Archivado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestión de Noticias</h2>
          <p className="text-gray-600">Administra las noticias del sistema</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Noticia
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Noticias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha de Publicación</TableHead>
                <TableHead>Vistas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.publishDate}</TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(article.status)}>
                      {article.status}
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
                          {article.status === "Publicado" ? "Archivar" : "Publicar"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Newspaper className="mr-2 h-4 w-4" />
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
