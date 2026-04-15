
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, Star } from "lucide-react";

export function BookingsSection() {
  const [bookings] = useState([
    {
      id: "1",
      type: "Hotel",
      name: "Hotel Los Llanos",
      location: "Villavicencio, Meta",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      guests: 2,
      status: "confirmed",
      total: 450000,
      image: "/placeholder.svg"
    },
    {
      id: "2",
      type: "Tour",
      name: "Aventura en los Llanos",
      location: "Meta, Colombia",
      date: "2024-01-20",
      duration: "1 día",
      guests: 4,
      status: "pending",
      total: 320000,
      image: "/placeholder.svg"
    },
    {
      id: "3",
      type: "Restaurant",
      name: "Restaurante Tradicional",
      location: "Centro, Villavicencio",
      date: "2024-01-22",
      time: "19:00",
      guests: 6,
      status: "completed",
      total: 180000,
      image: "/placeholder.svg"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mis Reservas</h2>
        <p className="text-gray-600">Gestiona todas tus reservas de servicios turísticos</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={booking.image}
                        alt={booking.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{booking.name}</h3>
                          <Badge variant="outline">{booking.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {booking.checkIn && booking.checkOut
                                ? `${booking.checkIn} - ${booking.checkOut}`
                                : booking.date}
                            </span>
                          </div>
                          {booking.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.time}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{booking.guests} huéspedes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusText(booking.status)}
                      </Badge>
                      <div className="mt-2 text-lg font-semibold">
                        ${booking.total.toLocaleString()}
                      </div>
                      <div className="mt-3 space-x-2">
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                        {booking.status === "completed" && (
                          <Button size="sm" variant="outline">
                            <Star className="w-4 h-4 mr-1" />
                            Calificar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tienes reservas próximas</p>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="text-center py-8">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tienes reservas completadas</p>
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tienes reservas canceladas</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
