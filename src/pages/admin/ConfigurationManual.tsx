import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, 
  ArrowLeft, 
  Download, 
  Building, 
  MapPin, 
  Calendar,
  Image,
  FileSpreadsheet,
  Settings,
  Upload,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ConfigurationManual = () => {
  const navigate = useNavigate();

  const downloadTemplate = (type: string) => {
    toast.info(`Descargando plantilla de ${type}...`);
    // Aquí se implementará la descarga de plantillas
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Book className="w-6 h-6" />
              Manual de Configuración de la Aplicación
            </CardTitle>
            <p className="text-muted-foreground">
              Guía completa para configurar y administrar el contenido de la plataforma turística
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="general">Configuración General</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="import">Importar Datos</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
          </TabsList>

          {/* Configuración General */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Datos de la Compañía
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">1. Información Básica</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Nombre de la empresa</li>
                    <li>NIT o identificación fiscal</li>
                    <li>Descripción de la compañía</li>
                    <li>Dirección completa</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    2. Datos de Contacto
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Teléfono principal</li>
                    <li>WhatsApp (con código de país, ej: +57 300 1234567)</li>
                    <li>Email de contacto</li>
                    <li>Horarios de atención</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    3. Redes Sociales
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Facebook: URL completa del perfil</li>
                    <li>Instagram: URL completa del perfil</li>
                    <li>Twitter: URL completa del perfil</li>
                    <li>YouTube: URL del canal</li>
                    <li>TikTok: URL del perfil</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    4. Branding y Logos
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Logo principal (PNG transparente, 512x512px mínimo)</li>
                    <li>Logo secundario (opcional)</li>
                    <li>Favicon (32x32px)</li>
                    <li>Formatos aceptados: PNG, SVG, JPG</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Configuración del Slider Principal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Especificaciones de Imágenes</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Resolución recomendada: 1920x1080px (Full HD)</li>
                    <li>Formato: JPG, PNG, WebP</li>
                    <li>Peso máximo: 2MB por imagen</li>
                    <li>Mínimo 3 imágenes, máximo 10</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Contenido de cada Slide</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Título principal (máx. 60 caracteres)</li>
                    <li>Subtítulo (máx. 100 caracteres)</li>
                    <li>Texto del botón (opcional)</li>
                    <li>URL de destino del botón (opcional)</li>
                    <li>Orden de aparición</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Configuración del Footer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Secciones del Footer</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Enlaces rápidos (hasta 8 enlaces)</li>
                    <li>Información de contacto</li>
                    <li>Enlaces legales (Políticas, Términos)</li>
                    <li>Certificaciones y sellos</li>
                    <li>Copyright y derechos reservados</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenido */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Gestión de Hoteles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Información Requerida</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Nombre del hotel</li>
                    <li>Categoría (1-5 estrellas)</li>
                    <li>Dirección completa</li>
                    <li>Coordenadas GPS (latitud, longitud)</li>
                    <li>Teléfono y WhatsApp</li>
                    <li>Email de contacto</li>
                    <li>Descripción (mín. 200 caracteres)</li>
                    <li>Servicios y amenidades</li>
                    <li>Políticas (check-in, check-out, cancelación)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Imágenes</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Mínimo 5 fotos del hotel</li>
                    <li>Resolución: 1200x800px mínimo</li>
                    <li>Incluir: fachada, habitaciones, áreas comunes, servicios</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Habitaciones</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Nombre/tipo de habitación</li>
                    <li>Capacidad (número de personas)</li>
                    <li>Descripción y amenidades</li>
                    <li>Precio por noche (en COP)</li>
                    <li>Imágenes (mínimo 3 por habitación)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Gestión de Restaurantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Información Requerida</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Nombre del restaurante</li>
                    <li>Tipo de cocina (tradicional, internacional, etc.)</li>
                    <li>Dirección y coordenadas GPS</li>
                    <li>Horarios de atención</li>
                    <li>Rango de precios</li>
                    <li>Capacidad</li>
                    <li>Servicios (delivery, reservas, etc.)</li>
                    <li>Menú destacado</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Actividades y Tours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Información Requerida</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Nombre de la actividad/tour</li>
                    <li>Categoría (aventura, cultural, ecológica, etc.)</li>
                    <li>Duración (horas/días)</li>
                    <li>Nivel de dificultad</li>
                    <li>Edad mínima requerida</li>
                    <li>Punto de encuentro</li>
                    <li>Qué incluye</li>
                    <li>Qué no incluye</li>
                    <li>Recomendaciones</li>
                    <li>Precio por persona</li>
                    <li>Disponibilidad (días de la semana)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Agencias y Operadores Turísticos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Información Requerida</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Nombre de la agencia</li>
                    <li>Registro Nacional de Turismo (RNT)</li>
                    <li>Licencia de operación</li>
                    <li>Especialidad (tours, transporte, etc.)</li>
                    <li>Servicios ofrecidos</li>
                    <li>Cobertura geográfica</li>
                    <li>Información de contacto completa</li>
                    <li>Certificaciones y afiliaciones</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Importar Datos */}
          <TabsContent value="import" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Importación Masiva de Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">Proceso de Importación</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                    <li>Descarga la plantilla correspondiente al tipo de dato</li>
                    <li>Completa todos los campos requeridos (marcados con *)</li>
                    <li>Verifica que los datos estén en el formato correcto</li>
                    <li>Guarda el archivo en formato Excel (.xlsx) o CSV</li>
                    <li>Sube el archivo desde el panel de administración</li>
                    <li>Revisa el reporte de validación</li>
                    <li>Confirma la importación si no hay errores</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-destructive">⚠️ Importante</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>No modifiques los nombres de las columnas</li>
                    <li>Respeta el formato de fechas: DD/MM/YYYY</li>
                    <li>Coordenadas GPS en formato decimal: -4.1533, -73.6346</li>
                    <li>URLs deben incluir https://</li>
                    <li>Precios sin símbolos, solo números</li>
                    <li>Los teléfonos deben incluir código de país: +57</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Validaciones Automáticas</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Campos requeridos completos</li>
                    <li>Formato de email válido</li>
                    <li>Formato de teléfono válido</li>
                    <li>Coordenadas GPS dentro del rango válido</li>
                    <li>URLs accesibles</li>
                    <li>Categorías existentes en el sistema</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plantillas */}
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  Plantillas de Importación
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Descarga las plantillas Excel para importar datos masivamente
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="w-5 h-5 text-blue-500" />
                        Hoteles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Plantilla para importar información de hoteles, habitaciones y servicios.
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Incluye:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Información general del hotel</li>
                          <li>Datos de contacto</li>
                          <li>Habitaciones y tarifas</li>
                          <li>Servicios y amenidades</li>
                        </ul>
                      </div>
                      <Button 
                        onClick={() => downloadTemplate('hoteles')}
                        className="w-full"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Plantilla
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-500" />
                        Restaurantes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Plantilla para importar restaurantes y establecimientos gastronómicos.
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Incluye:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Información del restaurante</li>
                          <li>Tipo de cocina</li>
                          <li>Horarios y ubicación</li>
                          <li>Rango de precios</li>
                        </ul>
                      </div>
                      <Button 
                        onClick={() => downloadTemplate('restaurantes')}
                        className="w-full"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Plantilla
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-500" />
                        Actividades y Tours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Plantilla para importar actividades, tours y experiencias turísticas.
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Incluye:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Detalles de la actividad</li>
                          <li>Duración y dificultad</li>
                          <li>Precios e inclusiones</li>
                          <li>Disponibilidad</li>
                        </ul>
                      </div>
                      <Button 
                        onClick={() => downloadTemplate('actividades')}
                        className="w-full"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Plantilla
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="w-5 h-5 text-purple-500" />
                        Agencias Turísticas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Plantilla para importar agencias de viajes y operadores turísticos.
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Incluye:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Información de la agencia</li>
                          <li>Registro RNT</li>
                          <li>Servicios ofrecidos</li>
                          <li>Certificaciones</li>
                        </ul>
                      </div>
                      <Button 
                        onClick={() => downloadTemplate('agencias')}
                        className="w-full"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Plantilla
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        Puntos de Interés
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Plantilla para importar lugares turísticos y puntos de interés.
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Incluye:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Nombre y descripción</li>
                          <li>Ubicación y acceso</li>
                          <li>Horarios y tarifas</li>
                          <li>Características</li>
                        </ul>
                      </div>
                      <Button 
                        onClick={() => downloadTemplate('puntos-interes')}
                        className="w-full"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Plantilla
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Settings className="w-5 h-5 text-teal-500" />
                        Otros Servicios
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Plantilla para importar servicios complementarios (transporte, guías, etc.).
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Incluye:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Información del servicio</li>
                          <li>Proveedor</li>
                          <li>Tarifas y condiciones</li>
                          <li>Disponibilidad</li>
                        </ul>
                      </div>
                      <Button 
                        onClick={() => downloadTemplate('servicios')}
                        className="w-full"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Plantilla
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formato de las Plantillas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Estructura General</h4>
                    <p className="text-muted-foreground mb-2">
                      Todas las plantillas incluyen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Hoja de instrucciones con ejemplos</li>
                      <li>Hoja de datos principal con campos obligatorios marcados con *</li>
                      <li>Hoja de validaciones y listas desplegables</li>
                      <li>Ejemplos de registros correctamente llenados</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Formatos de Datos</h4>
                    <div className="space-y-2 text-muted-foreground ml-4">
                      <p><strong>Fechas:</strong> DD/MM/YYYY (ej: 25/12/2024)</p>
                      <p><strong>Horas:</strong> HH:MM formato 24h (ej: 14:30)</p>
                      <p><strong>Coordenadas:</strong> Decimal (ej: -4.1533, -73.6346)</p>
                      <p><strong>Precios:</strong> Solo números sin símbolos (ej: 150000)</p>
                      <p><strong>Teléfonos:</strong> Con código de país (ej: +57 300 1234567)</p>
                      <p><strong>URLs:</strong> Completas con protocolo (ej: https://ejemplo.com)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Información de Soporte */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Soporte y Ayuda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Soporte Técnico</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email: soporte@villavicencio.com</p>
                  <p>WhatsApp: +57 8 123 4567</p>
                  <p>Horario: Lun - Vie, 8:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Capacitación</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email: capacitacion@villavicencio.com</p>
                  <p>Sesiones personalizadas disponibles</p>
                  <p>Videos tutoriales en línea</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recursos Adicionales</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Video Tutoriales
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Base de Conocimientos
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigurationManual;
