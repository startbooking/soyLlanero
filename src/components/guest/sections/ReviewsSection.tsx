
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ReviewsSection() {
  const { toast } = useToast();
  const [reviews] = useState([
    {
      id: "1",
      businessName: "Hotel Los Llanos",
      businessType: "Hotel",
      location: "Villavicencio, Meta",
      rating: 5,
      date: "2024-01-10",
      title: "Excelente experiencia",
      content: "El hotel superó mis expectativas. El servicio fue impecable y las instalaciones están en perfecto estado. La vista desde la habitación es espectacular y el personal muy amable.",
      verified: true,
      helpful: 12
    },
    {
      id: "2",
      businessName: "Aventuras Llanos",
      businessType: "Tour Operador",
      location: "Meta, Colombia",
      rating: 4,
      date: "2024-01-08",
      title: "Muy buena aventura",
      content: "El tour fue increíble, pudimos ver la fauna local y los paisajes son hermosos. El guía muy conocedor de la región. Solo mejoraría el transporte.",
      verified: true,
      helpful: 8
    },
    {
      id: "3",
      businessName: "Restaurante Tradicional",
      businessType: "Restaurante",
      location: "Centro, Villavicencio",
      rating: 3,
      date: "2024-01-05",
      title: "Comida típica auténtica",
      content: "La comida está bien, auténtica de la región. El ambiente es agradable pero el servicio un poco lento.",
      verified: true,
      helpful: 3
    }
  ]);

  const [pendingReviews] = useState([
    {
      id: "4",
      businessName: "Spa Relajante",
      businessType: "Spa",
      location: "Villavicencio, Meta",
      visitDate: "2024-01-12",
      bookingId: "B001"
    }
  ]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleEditReview = (reviewId: string) => {
    console.log("Editando reseña:", reviewId);
    toast({
      title: "Función en desarrollo",
      description: "Pronto podrás editar tus reseñas."
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    console.log("Eliminando reseña:", reviewId);
    toast({
      title: "Reseña eliminada",
      description: "Tu reseña ha sido eliminada exitosamente."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mis Reseñas</h2>
        <p className="text-gray-600">Gestiona tus reseñas y calificaciones</p>
      </div>

      {/* Reseñas Pendientes */}
      {pendingReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Reseñas Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((pending) => (
                <div key={pending.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border">
                  <div>
                    <h4 className="font-medium">{pending.businessName}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Badge variant="outline">{pending.businessType}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Visitado: {pending.visitDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">
                    Escribir Reseña
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mis Reseñas */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Mis Reseñas Publicadas</h3>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{review.businessName}</h4>
                    <Badge variant="outline">{review.businessType}</Badge>
                    {review.verified && (
                      <Badge variant="secondary" className="text-green-600">
                        Verificada
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{review.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditReview(review.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium mb-2">{review.title}</h5>
                <p className="text-gray-700">{review.content}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{review.helpful} personas encontraron esta reseña útil</span>
                <span>ID: {review.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
