
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

export function TourOperatorHeader() {
  return (
    <div className="bg-white border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel Operador Turístico</h1>
            <p className="text-gray-600">Gestiona tu empresa y servicios turísticos</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              5 Nuevos
            </Button>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
