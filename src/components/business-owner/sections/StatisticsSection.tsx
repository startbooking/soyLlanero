
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Star, 
  TrendingUp,
  MessageSquare,
  Calendar
} from "lucide-react";

export function StatisticsSection() {
  const stats = [
    {
      title: "Mensajes del Mes",
      value: "24",
      change: "+15% vs mes anterior",
      icon: MessageSquare,
      color: "text-blue-600"
    },
    {
      title: "Consultas",
      value: "18",
      change: "+8 este mes",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Calificación Promedio",
      value: "4.5",
      change: "+0.3 vs mes anterior",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Reservas",
      value: "12",
      change: "+20% vs mes anterior",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Estadísticas</h2>
        <p className="text-gray-600">Rendimiento de tu empresa</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumen de mensajes por tipo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Resumen de Mensajes por Tipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Consultas generales</span>
              <span className="text-blue-600 font-bold">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Reservas</span>
              <span className="text-green-600 font-bold">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">Reseñas</span>
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium">Quejas</span>
              <span className="text-red-600 font-bold">1</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
