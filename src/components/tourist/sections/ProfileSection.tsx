
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Star,
  Heart
} from "lucide-react";

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Pedro Turista",
    email: "turista@gmail.com",
    phone: "+57 300 123 4567",
    location: "Bogotá, Colombia",
    birthDate: "1990-05-15",
    bio: "Apasionado por conocer la cultura llanera y vivir aventuras en contacto con la naturaleza.",
    interests: ["Ecoturismo", "Fotografía", "Cultura Llanera", "Aventura"]
  });

  const touristStats = {
    activitiesCompleted: 3,
    placesVisited: 8,
    averageRating: 4.7,
    favoriteCompanies: 2,
    totalSpent: "445.000",
    memberSince: "Enero 2024"
  };

  const handleSave = () => {
    // Aquí se guardarían los cambios
    setIsEditing(false);
    console.log("Guardando perfil:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aquí se restaurarían los datos originales
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mi Perfil</h2>
        <p className="text-gray-600">Información personal y preferencias turísticas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información personal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Avatar y nombre */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">PT</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold">{profileData.name}</h3>
                      <p className="text-gray-600">Turista desde {touristStats.memberSince}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Datos de contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Ubicación
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Fecha de nacimiento
                  </Label>
                  {isEditing ? (
                    <Input
                      id="birthDate"
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.birthDate}</p>
                  )}
                </div>
              </div>

              {/* Biografía */}
              <div className="space-y-2">
                <Label htmlFor="bio">Sobre mí</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700">{profileData.bio}</p>
                )}
              </div>

              {/* Intereses */}
              <div className="space-y-2">
                <Label>Intereses turísticos</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas del turista */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Mis Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{touristStats.activitiesCompleted}</div>
                <div className="text-sm text-gray-600">Actividades Completadas</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-blue-600">{touristStats.placesVisited}</div>
                  <div className="text-xs text-gray-600">Lugares Visitados</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-yellow-600">{touristStats.averageRating}</div>
                  <div className="text-xs text-gray-600">Calificación Promedio</div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total invertido:</span>
                  <span className="font-medium">${touristStats.totalSpent}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Empresas favoritas:</span>
                  <span className="font-medium">{touristStats.favoriteCompanies}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Empresas Favoritas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Meta Fishing</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs">5.0</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Llanos Adventure Tours</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs">5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
