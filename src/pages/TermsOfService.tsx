
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Users } from "lucide-react";

const TermsOfService = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  return (
    <div className="min-h-screen bg-white">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="legal" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Scale className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Términos de Uso
              </h1>
              <p className="text-muted-foreground text-lg">
                Condiciones generales para el uso de la Plataforma Turística de Villavicencio
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Última actualización: 17 de junio de 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    1. Aceptación de los Términos
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Al acceder y utilizar la Plataforma Turística de Villavicencio (en adelante "la Plataforma"), 
                    usted acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo con alguna parte 
                    de estos términos, no debe utilizar nuestros servicios.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Descripción del Servicio</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    La Plataforma es un sistema integral de gestión turística para la ciudad de Villavicencio, 
                    que conecta turistas, empresarios del sector turístico y administradores de la ciudad.
                  </p>
                  <p>Nuestros servicios incluyen:</p>
                  <ul>
                    <li>Catálogo de servicios turísticos (hoteles, restaurantes, experiencias)</li>
                    <li>Sistema de reservas y disponibilidad</li>
                    <li>Gestión de eventos turísticos</li>
                    <li>Sistema de mensajería entre usuarios</li>
                    <li>Plataforma de reseñas y calificaciones</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Registro y Cuentas de Usuario</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Para acceder a ciertas funcionalidades, debe crear una cuenta proporcionando información 
                    veraz y actualizada. Usted es responsable de mantener la confidencialidad de sus credenciales.
                  </p>
                  <p>Roles disponibles:</p>
                  <ul>
                    <li><strong>Turista:</strong> Exploración y planificación de actividades</li>
                    <li><strong>Huésped:</strong> Gestión de reservas de hospedaje</li>
                    <li><strong>Empresario:</strong> Gestión de empresa turística</li>
                    <li><strong>Operador Turístico:</strong> Gestión de servicios especializados</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Uso Aceptable</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Al utilizar la Plataforma, usted se compromete a:</p>
                  <ul>
                    <li>Proporcionar información veraz y actualizada</li>
                    <li>No utilizar la plataforma para actividades ilegales</li>
                    <li>Respetar los derechos de otros usuarios</li>
                    <li>No interferir con el funcionamiento de la plataforma</li>
                    <li>Cumplir con todas las leyes aplicables</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Responsabilidades de los Proveedores</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Los proveedores de servicios turísticos se comprometen a:</p>
                  <ul>
                    <li>Mantener información actualizada sobre sus servicios</li>
                    <li>Cumplir con los estándares de calidad prometidos</li>
                    <li>Respetar las políticas de reserva y cancelación establecidas</li>
                    <li>Contar con todas las licencias y permisos requeridos</li>
                    <li>Mantener seguros de responsabilidad civil vigentes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Limitación de Responsabilidad</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    La Plataforma actúa como intermediario entre usuarios y proveedores de servicios. 
                    No somos responsables por la calidad, seguridad o legalidad de los servicios ofrecidos 
                    por terceros.
                  </p>
                  <p>
                    El uso de la plataforma es bajo su propio riesgo. No garantizamos la disponibilidad 
                    continua del servicio ni la ausencia de errores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Propiedad Intelectual</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Todos los contenidos de la Plataforma, incluyendo textos, imágenes, logotipos y software, 
                    están protegidos por derechos de autor y otras leyes de propiedad intelectual.
                  </p>
                  <p>
                    Los usuarios mantienen los derechos sobre el contenido que publican, pero otorgan a la 
                    Plataforma una licencia para usar, mostrar y distribuir dicho contenido.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Modificaciones</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                    Los cambios serán notificados a través de la plataforma y entrarán en vigor 
                    inmediatamente después de su publicación.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Terminación</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Podemos suspender o terminar su acceso a la plataforma en caso de violación 
                    de estos términos o por cualquier otra razón que consideremos apropiada.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Ley Aplicable</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Estos términos se rigen por las leyes de la República de Colombia. 
                    Cualquier disputa será sometida a la jurisdicción de los tribunales 
                    competentes de Villavicencio, Meta.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    11. Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Para consultas sobre estos términos, contáctenos:</p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Email:</strong> legal@villavicencio-turismo.com</p>
                    <p><strong>Teléfono:</strong> +57 8 123 4567</p>
                    <p><strong>Dirección:</strong> Alcaldía de Villavicencio, Carrera 35 #15-30</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
