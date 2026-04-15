
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { UserMenu } from "@/components/dashboard/UserMenu";

export function TouristHeader() {
  return (
    <div className="bg-white border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Turista</h1>
            <p className="text-gray-600">Gestiona tus actividades turísticas</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              3 Notificaciones
            </Button>
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
