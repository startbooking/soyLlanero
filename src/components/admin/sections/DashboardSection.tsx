
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp,
  Bell
} from "lucide-react";

export function DashboardSection() {
  // Stats data
  const stats = [
    {
      title: "Total Empresas",
      value: "156",
      change: "+8 este mes",
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Ventas del Día",
      value: "$2,450",
      change: "+12% vs ayer",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Ventas del Mes",
      value: "$45,230",
      change: "+23% vs mes anterior",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Ventas del Año",
      value: "$432,800",
      change: "+18% vs año anterior",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Estadísticas generales de la aplicación</p>
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

      {/* Alert Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Alertas y Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-sm">Tienes 3 mensajes nuevos de clientes sin leer</span>
              </div>
              <Button size="sm" variant="outline">Ver Mensajes</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-sm">2 empresas pendientes de verificación</span>
              </div>
              <Button size="sm" variant="outline">Revisar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
