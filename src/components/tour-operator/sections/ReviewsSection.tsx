
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, MessageSquare, Reply, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  hasResponse: boolean;
  response?: string;
  verified: boolean;
}

export function ReviewsSection() {
  const { toast } = useToast();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      customerName: "Ana García",
      rating: 5,
      comment: "Excelente experiencia! El tour fue increíble y el guía muy profesional. Sin duda volveré.",
      service: "Tour Básico",
      date: "2024-06-10",
      hasResponse: false,
      verified: true
    },
    {
      id: 2,
      customerName: "Carlos López",
      rating: 4,
      comment: "Muy buena experiencia, aunque el transporte llegó un poco tarde. El resto fue perfecto.",
      service: "Aventura Completa",
      date: "2024-06-08",
      hasResponse: true,
      response: "Gracias por tu comentario Carlos. Hemos mejorado nuestros tiempos de transporte.",
      verified: true
    },
    {
      id: 3,
      customerName: "María Rodríguez",
      rating: 2,
      comment: "El tour no cumplió con las expectativas. Faltó organización y algunos servicios prometidos.",
      service: "Safari Nocturno",
      date: "2024-06-05",
      hasResponse: false,
      verified: true
    },
    {
      id: 4,
      customerName: "Pedro Martínez",
      rating: 5,
      comment: "¡Espectacular! Una experiencia única en los Llanos. Muy recomendado para familias.",
      service: "Tour Básico",
      date: "2024-06-03",
      hasResponse: true,
      response: "¡Muchas gracias Pedro! Nos alegra que hayas disfrutado con tu familia.",
      verified: true
    }
  ]);

  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const handleResponse = () => {
    if (selectedReview) {
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, hasResponse: true, response: responseText }
          : review
      ));
      
      toast({
        title: "Respuesta enviada",
        description: "Tu respuesta ha sido publicada exitosamente."
      });
      
      setResponseText("");
      setShowResponseModal(false);
      setSelectedReview(null);
    }
  };

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Reseñas y Calificaciones</h2>
        <p className="text-gray-600">Gestiona las reseñas de tus clientes y responde a sus comentarios</p>
      </div>

      {/* Resumen de calificaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calificación General</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), "lg")}
            <p className="text-sm text-gray-600 mt-2">
              Basado en {reviews.length} reseñas
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm">{item.rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filterRating === null ? "default" : "outline"}
                onClick={() => setFilterRating(null)}
              >
                Todas
              </Button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  size="sm"
                  variant={filterRating === rating ? "default" : "outline"}
                  onClick={() => setFilterRating(rating)}
                >
                  {rating} ⭐
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{review.customerName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{review.service}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">Verificado</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                  {!review.hasResponse && (
                    <Button
                      size="sm"
                      className="ml-2"
                      onClick={() => {
                        setSelectedReview(review);
                        setShowResponseModal(true);
                      }}
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      Responder
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              {review.hasResponse && review.response && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Respuesta del operador:</span>
                  </div>
                  <p className="text-green-700">{review.response}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de respuesta */}
      <Dialog open={showResponseModal} onOpenChange={setShowResponseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Responder a la reseña</DialogTitle>
            <DialogDescription>
              Respondiendo a {selectedReview?.customerName} - {selectedReview?.rating} ⭐
            </DialogDescription>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Comentario original:</p>
                <p className="italic">"{selectedReview.comment}"</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tu respuesta:</label>
                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Escribe tu respuesta profesional..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowResponseModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleResponse}>
                  <Reply className="w-4 h-4 mr-2" />
                  Publicar Respuesta
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
