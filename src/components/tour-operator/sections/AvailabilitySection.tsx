
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AvailabilitySlot {
  date: string;
  time: string;
  maxCapacity: number;
  currentBookings: number;
  status: 'available' | 'full' | 'blocked';
}

export function AvailabilitySection() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availabilityData, setAvailabilityData] = useState<AvailabilitySlot[]>([
    {
      date: new Date().toISOString().split('T')[0],
      time: "08:00",
      maxCapacity: 8,
      currentBookings: 3,
      status: 'available'
    },
    {
      date: new Date().toISOString().split('T')[0],
      time: "14:00",
      maxCapacity: 6,
      currentBookings: 6,
      status: 'full'
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: "08:00",
      maxCapacity: 8,
      currentBookings: 0,
      status: 'available'
    }
  ]);

  const selectedDateStr = selectedDate?.toISOString().split('T')[0];
  const daySlots = availabilityData.filter(slot => slot.date === selectedDateStr);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'full': return 'Completo';
      case 'blocked': return 'Bloqueado';
      default: return 'Desconocido';
    }
  };

  const toggleSlotStatus = (date: string, time: string) => {
    setAvailabilityData(prev => prev.map(slot => {
      if (slot.date === date && slot.time === time) {
        const newStatus = slot.status === 'blocked' ? 'available' : 'blocked';
        return { ...slot, status: newStatus };
      }
      return slot;
    }));
    
    toast({
      title: "Disponibilidad actualizada",
      description: "El estado del horario ha sido cambiado."
    });
  };

  const addNewSlot = () => {
    const newSlot: AvailabilitySlot = {
      date: selectedDateStr || '',
      time: "10:00",
      maxCapacity: 8,
      currentBookings: 0,
      status: 'available'
    };
    
    setAvailabilityData(prev => [...prev, newSlot]);
    toast({
      title: "Horario agregado",
      description: "Nuevo horario disponible creado."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Calendario de Disponibilidad</h2>
        <p className="text-gray-600">Gestiona los horarios y disponibilidad de tus servicios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Seleccionar Fecha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Horarios del día seleccionado */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Horarios - {selectedDate?.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
              <Button onClick={addNewSlot}>Agregar Horario</Button>
            </div>
          </CardHeader>
          <CardContent>
            {daySlots.length > 0 ? (
              <div className="space-y-4">
                {daySlots.map((slot, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {slot.currentBookings}/{slot.maxCapacity} personas
                          </span>
                        </div>
                        <Badge className={getStatusColor(slot.status)}>
                          {getStatusText(slot.status)}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleSlotStatus(slot.date, slot.time)}
                        >
                          {slot.status === 'blocked' ? 'Habilitar' : 'Bloquear'}
                        </Button>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                      </div>
                    </div>
                    
                    {slot.currentBookings > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">
                          <strong>Reservas actuales:</strong> {slot.currentBookings} personas
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(slot.currentBookings / slot.maxCapacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay horarios configurados para esta fecha</p>
                <Button className="mt-4" onClick={addNewSlot}>
                  Crear Primer Horario
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumen de disponibilidad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-sm text-gray-600">Días Disponibles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <p className="text-sm text-gray-600">Reservas Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <p className="text-sm text-gray-600">Horarios Completos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <p className="text-sm text-gray-600">Capacidad Total</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
