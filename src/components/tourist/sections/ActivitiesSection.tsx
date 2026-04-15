
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Star,
  Camera,
  Download
} from "lucide-react";

export function ActivitiesSection() {
  const activities = [
    {
      id: 1,
      name: "Tour por los Llanos Orientales",
      location: "Villavicencio - Meta",
      date: "2024-01-15",
      time: "8:00 AM - 6:00 PM",
      status: "completada",
      rating: 5,
      price: "$120.000",
      company: "Llanos Adventure Tours",
      description: "Experiencia increíble conociendo la cultura llanera",
      images: 12
    },
    {
      id: 2,
      name: "Avistamiento de Aves",
      location: "Reserva Natural La Macarena",
      date: "2024-02-20",
      time: "6:00 AM - 12:00 PM",
      status: "completada",
      rating: 4,
      price: "$80.000",
      company: "EcoTours Meta",
      description: "Observación de más de 50 especies de aves",
      images: 8
    },
    {
      id: 3,
      name: "Cabalgata Llanera",
      location: "Hacienda El Refugio",
      date: "2024-03-10",
      time: "2:00 PM - 6:00 PM",
      status: "pendiente",
      rating: null,
      price: "$95.000",
      company: "Cabalgatas del Llano",
      description: "Actividad programada para el próximo mes",
      images: 0
    },
    {
      id: 4,
      name: "Pesca Deportiva",
      location: "Río Meta",
      date: "2024-01-28",
      time: "5:00 AM - 2:00 PM",
      status: "completada",
      rating: 5,
      price: "$150.000",
      company: "Meta Fishing",
      description: "Día completo de pesca deportiva con guía especializado",
      images: 15
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completada":
        return <Badge className="bg-green-500 text-white">Completada</Badge>;
      case "pendiente":
        return <Badge className="bg-yellow-500 text-white">Pendiente</Badge>;
      case "cancelada":
        return <Badge className="bg-red-500 text-white">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mis Actividades Turísticas</h2>
        <p className="text-gray-600">Historial de experiencias y actividades realizadas</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-sm text-gray-600">Total Actividades</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">Completadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.7</div>
            <div className="text-sm text-gray-600">Calificación Promedio</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de actividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{activity.name}</CardTitle>
                {getStatusBadge(activity.status)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {activity.location}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  {activity.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  {activity.time}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-600">{activity.price}</span>
                <span className="text-sm text-gray-600">{activity.company}</span>
              </div>
              
              <p className="text-sm text-gray-700">{activity.description}</p>
              
              {activity.rating && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Mi calificación:</span>
                  {renderStars(activity.rating)}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  {activity.images > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Camera className="w-4 h-4 mr-1" />
                      {activity.images} fotos
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {activity.status === "completada" && (
                    <>
                      <Button size="sm" variant="outline">
                        <Camera className="w-4 h-4 mr-1" />
                        Ver Fotos
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Certificado
                      </Button>
                    </>
                  )}
                  {activity.status === "pendiente" && (
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
