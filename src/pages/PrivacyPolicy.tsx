
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database } from "lucide-react";

const PrivacyPolicy = () => {
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
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Política de Privacidad
              </h1>
              <p className="text-muted-foreground text-lg">
                Cómo recolectamos, usamos y protegemos su información personal
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Última actualización: 17 de junio de 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    1. Información que Recolectamos
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Información Personal:</h4>
                  <ul>
                    <li>Nombre completo y documento de identidad</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Dirección física</li>
                    <li>Preferencias de viaje y turismo</li>
                  </ul>
                  
                  <h4>Información de Uso:</h4>
                  <ul>
                    <li>Actividad en la plataforma</li>
                    <li>Historial de reservas y búsquedas</li>
                    <li>Interacciones con otros usuarios</li>
                    <li>Información del dispositivo y navegador</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Cómo Usamos su Información</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Utilizamos su información para:</p>
                  <ul>
                    <li>Proporcionar y mejorar nuestros servicios</li>
                    <li>Procesar reservas y transacciones</li>
                    <li>Comunicarnos con usted sobre su cuenta</li>
                    <li>Personalizar su experiencia en la plataforma</li>
                    <li>Enviar notificaciones sobre eventos y ofertas</li>
                    <li>Cumplir con obligaciones legales</li>
                    <li>Detectar y prevenir fraudes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Compartir Información</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Podemos compartir su información con:</p>
                  <ul>
                    <li><strong>Proveedores de servicios:</strong> Hoteles, restaurantes y operadores turísticos</li>
                    <li><strong>Procesadores de pago:</strong> Para completar transacciones</li>
                    <li><strong>Autoridades:</strong> Cuando sea requerido por ley</li>
                    <li><strong>Socios comerciales:</strong> Con su consentimiento explícito</li>
                  </ul>
                  <p>
                    <strong>No vendemos</strong> su información personal a terceros para fines comerciales.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    4. Seguridad de la Información
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Implementamos medidas de seguridad técnicas y organizacionales:</p>
                  <ul>
                    <li>Encriptación de datos en tránsito y en reposo</li>
                    <li>Autenticación de dos factores disponible</li>
                    <li>Monitoreo continuo de seguridad</li>
                    <li>Acceso restringido a información personal</li>
                    <li>Auditorías regulares de seguridad</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Sus Derechos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Conforme a la Ley 1581 de 2012 (Ley de Habeas Data), usted tiene derecho a:</p>
                  <ul>
                    <li><strong>Acceso:</strong> Conocer qué información tenemos sobre usted</li>
                    <li><strong>Rectificación:</strong> Corregir información inexacta</li>
                    <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos</li>
                    <li><strong>Portabilidad:</strong> Obtener una copia de sus datos</li>
                    <li><strong>Oposición:</strong> Objetar ciertos usos de su información</li>
                    <li><strong>Limitación:</strong> Restringir el procesamiento</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Cookies y Tecnologías Similares</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Utilizamos cookies para:</p>
                  <ul>
                    <li>Recordar sus preferencias y configuraciones</li>
                    <li>Analizar el uso de la plataforma</li>
                    <li>Personalizar contenido y anuncios</li>
                    <li>Mejorar la funcionalidad del sitio</li>
                  </ul>
                  <p>
                    Puede gestionar las cookies a través de la configuración de su navegador 
                    o mediante nuestro centro de preferencias.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Retención de Datos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Conservamos su información personal:</p>
                  <ul>
                    <li>Mientras mantenga una cuenta activa</li>
                    <li>Por el tiempo necesario para cumplir obligaciones legales</li>
                    <li>Para resolver disputas y hacer cumplir acuerdos</li>
                    <li>Hasta 5 años después del cierre de cuenta (datos financieros)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Transferencias Internacionales</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Sus datos pueden ser transferidos y procesados en países fuera de Colombia 
                    donde operan nuestros proveedores de servicios. Aseguramos que estas 
                    transferencias cumplan con las leyes de protección de datos aplicables.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Menores de Edad</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Conforme a la Ley 1098 de 2006 (Código de la Infancia y la Adolescencia), 
                    no recolectamos intencionalmente información de menores de 14 años sin 
                    el consentimiento de los padres o tutores legales.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Cambios a esta Política</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Podemos actualizar esta política periódicamente. Los cambios significativos 
                    serán notificados por correo electrónico o mediante aviso prominente en la plataforma.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    11. Contacto - Oficial de Protección de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Para consultas sobre privacidad y protección de datos:</p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Email:</strong> dpo@villavicencio-turismo.com</p>
                    <p><strong>Teléfono:</strong> +57 8 123 4567 ext. 101</p>
                    <p><strong>Dirección:</strong> Alcaldía de Villavicencio, Carrera 35 #15-30</p>
                    <p><strong>Horarios:</strong> Lunes a Viernes, 8:00 AM - 5:00 PM</p>
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

export default PrivacyPolicy;
