
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileText, Calendar, User } from "lucide-react";

interface ViewEditNewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news: any;
  mode: 'view' | 'edit';
}

export const ViewEditNewsModal = ({ open, onOpenChange, news, mode }: ViewEditNewsModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
    date: "",
    status: ""
  });

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || "",
        category: news.category || "",
        content: news.content || "",
        author: news.author || "",
        date: news.date || "",
        status: news.status || ""
      });
    }
  }, [news]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') {
      console.log("Actualizar noticia:", formData);
      toast({
        title: "Noticia actualizada",
        description: "La noticia ha sido actualizada exitosamente."
      });
      onOpenChange(false);
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {mode === 'view' ? 'Ver Noticia' : 'Editar Noticia'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'view' ? 'Información de la noticia' : 'Modificar la información de la noticia'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              readOnly={isReadOnly}
              className={isReadOnly ? "bg-gray-100" : ""}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              {isReadOnly ? (
                <Input
                  value={formData.category}
                  readOnly
                  className="bg-gray-100"
                />
              ) : (
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="turismo">Turismo</SelectItem>
                    <SelectItem value="eventos">Eventos</SelectItem>
                    <SelectItem value="cultura">Cultura</SelectItem>
                    <SelectItem value="sostenibilidad">Sostenibilidad</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="author"
                  className={`pl-10 ${isReadOnly ? "bg-gray-100" : ""}`}
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {isReadOnly && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      className="pl-10 bg-gray-100"
                      value={formData.date}
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Input
                    id="status"
                    value={formData.status}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              readOnly={isReadOnly}
              className={isReadOnly ? "bg-gray-100" : ""}
              rows={6}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {mode === 'view' ? 'Cerrar' : 'Cancelar'}
            </Button>
            {mode === 'edit' && (
              <Button type="submit" variant="warning">
                Actualizar Noticia
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
