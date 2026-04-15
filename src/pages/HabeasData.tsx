
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, User, Lock, FileText } from "lucide-react";

const HabeasData = () => {
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
                <Database className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Ley de Habeas Data
              </h1>
              <p className="text-muted-foreground text-lg">
                Política de Tratamiento de Datos Personales - Ley 1581 de 2012
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Última actualización: 17 de junio de 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    1. Identificación del Responsable
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4>Responsable del Tratamiento:</h4>
                    <p><strong>Razón Social:</strong> Clúster de Turismo de Villavicencio</p>
                    <p><strong>NIT:</strong> 900.123.456-7</p>
                    <p><strong>Dirección:</strong> Carrera 35 #15-30, Villavicencio, Meta</p>
                    <p><strong>Teléfono:</strong> +57 8 123 4567</p>
                    <p><strong>Email:</strong> dpo@villavicencio-turismo.com</p>
                    <p><strong>Página Web:</strong> www.villavicencio-turismo.com</p>
                  </div>
                  
                  <h4>Oficial de Protección de Datos (DPO):</h4>
                  <p><strong>Nombre:</strong> Dr. Carlos Mendoza Ruiz</p>
                  <p><strong>Email:</strong> dpo@villavicencio-turismo.com</p>
                  <p><strong>Teléfono:</strong> +57 8 123 4567 ext. 101</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Finalidad del Tratamiento</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Los datos personales son recolectados y tratados para las siguientes finalidades:</p>
                  
                  <h4>Finalidades Principales:</h4>
                  <ul>
                    <li>Gestión de la relación contractual con usuarios y proveedores</li>
                    <li>Prestación de servicios turísticos y reservas</li>
                    <li>Atención al cliente y soporte técnico</li>
                    <li>Procesamiento de pagos y facturación</li>
                    <li>Comunicaciones relacionadas con los servicios</li>
                  </ul>
                  
                  <h4>Finalidades Secundarias:</h4>
                  <ul>
                    <li>Envío de información promocional y marketing</li>
                    <li>Análisis estadísticos y estudios de mercado</li>
                    <li>Mejora de servicios y experiencia del usuario</li>
                    <li>Cumplimiento de obligaciones legales</li>
                    <li>Prevención de fraudes y seguridad</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Tipos de Datos Recolectados</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Datos de Identificación:</h4>
                  <ul>
                    <li>Nombres y apellidos completos</li>
                    <li>Número de documento de identidad</li>
                    <li>Fecha y lugar de nacimiento</li>
                    <li>Nacionalidad</li>
                    <li>Fotografía (cuando sea requerida)</li>
                  </ul>
                  
                  <h4>Datos de Contacto:</h4>
                  <ul>
                    <li>Dirección de residencia</li>
                    <li>Números de teléfono</li>
                    <li>Correo electrónico</li>
                    <li>Redes sociales (opcional)</li>
                  </ul>
                  
                  <h4>Datos Económicos y Financieros:</h4>
                  <ul>
                    <li>Información de tarjetas de crédito/débito</li>
                    <li>Historial de transacciones</li>
                    <li>Información laboral y de ingresos (cuando sea relevante)</li>
                  </ul>
                  
                  <h4>Datos de Navegación:</h4>
                  <ul>
                    <li>Dirección IP</li>
                    <li>Cookies y tecnologías similares</li>
                    <li>Historial de navegación en la plataforma</li>
                    <li>Preferencias de usuario</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    4. Derechos de los Titulares
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Como titular de datos personales, usted tiene los siguientes derechos:</p>
                  
                  <h4>Derecho de Acceso:</h4>
                  <ul>
                    <li>Conocer, actualizar y rectificar sus datos personales</li>
                    <li>Solicitar información sobre el uso dado a sus datos</li>
                    <li>Obtener copia de los datos que reposan en nuestras bases</li>
                  </ul>
                  
                  <h4>Derecho de Rectificación:</h4>
                  <ul>
                    <li>Solicitar la corrección de datos inexactos o incompletos</li>
                    <li>Actualizar información desactualizada</li>
                    <li>Completar datos faltantes</li>
                  </ul>
                  
                  <h4>Derecho de Cancelación:</h4>
                  <ul>
                    <li>Solicitar la supresión de sus datos cuando sea procedente</li>
                    <li>Eliminación de datos cuando no se requieran para la finalidad</li>
                    <li>Borrado de información cuando haya terminado la relación contractual</li>
                  </ul>
                  
                  <h4>Derecho de Oposición:</h4>
                  <ul>
                    <li>Oponerse al tratamiento de sus datos en casos específicos</li>
                    <li>Revocar la autorización previamente otorgada</li>
                    <li>Solicitar el cese del tratamiento para fines comerciales</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Procedimiento para Ejercer Derechos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Pasos para Presentar una Solicitud:</h4>
                  <ol>
                    <li>Dirigir comunicación escrita al Oficial de Protección de Datos</li>
                    <li>Incluir identificación completa del titular</li>
                    <li>Describir claramente el derecho que desea ejercer</li>
                    <li>Proporcionar documentos que sustenten la solicitud</li>
                    <li>Indicar dirección física o electrónica para notificaciones</li>
                  </ol>
                  
                  <h4>Canales de Atención:</h4>
                  <ul>
                    <li><strong>Email:</strong> dpo@villavicencio-turismo.com</li>
                    <li><strong>Correo físico:</strong> Carrera 35 #15-30, Villavicencio, Meta</li>
                    <li><strong>Formulario web:</strong> Disponible en nuestra página</li>
                    <li><strong>Presencial:</strong> Oficinas principales (con cita previa)</li>
                  </ul>
                  
                  <h4>Tiempos de Respuesta:</h4>
                  <ul>
                    <li><strong>Consultas:</strong> Máximo 10 días hábiles</li>
                    <li><strong>Reclamos:</strong> Máximo 15 días hábiles</li>
                    <li><strong>Casos complejos:</strong> Hasta 30 días hábiles</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Medidas de Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Medidas Técnicas:</h4>
                  <ul>
                    <li>Encriptación de datos en tránsito y en reposo</li>
                    <li>Firewalls y sistemas de detección de intrusos</li>
                    <li>Copias de seguridad regulares</li>
                    <li>Actualizaciones de seguridad constantes</li>
                    <li>Monitoreo 24/7 de la infraestructura</li>
                  </ul>
                  
                  <h4>Medidas Administrativas:</h4>
                  <ul>
                    <li>Control de acceso basado en roles</li>
                    <li>Capacitación regular del personal</li>
                    <li>Políticas internas de seguridad</li>
                    <li>Auditorías periódicas</li>
                    <li>Protocolos de respuesta a incidentes</li>
                  </ul>
                  
                  <h4>Medidas Físicas:</h4>
                  <ul>
                    <li>Centros de datos seguros</li>
                    <li>Control de acceso físico</li>
                    <li>Sistemas de videovigilancia</li>
                    <li>Destrucción segura de documentos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Tratamiento de Datos de Menores</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    El tratamiento de datos de menores de edad se realiza conforme al 
                    Código de la Infancia y la Adolescencia (Ley 1098 de 2006):
                  </p>
                  
                  <h4>Requisitos Especiales:</h4>
                  <ul>
                    <li>Autorización previa de padres o tutores legales</li>
                    <li>Verificación de la capacidad legal del autorizante</li>
                    <li>Limitación en las finalidades del tratamiento</li>
                    <li>Medidas especiales de protección</li>
                    <li>Revisión periódica de la necesidad del tratamiento</li>
                  </ul>
                  
                  <h4>Prohibiciones:</h4>
                  <ul>
                    <li>Recolección de datos sin autorización parental</li>
                    <li>Uso de datos para perfilado comercial</li>
                    <li>Transferencia a terceros sin autorización</li>
                    <li>Conservación innecesaria de los datos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Transferencias y Transmisiones</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Transferencias Nacionales:</h4>
                  <p>Podemos transferir datos a terceros en Colombia para:</p>
                  <ul>
                    <li>Prestación de servicios turísticos</li>
                    <li>Procesamiento de pagos</li>
                    <li>Servicios de hosting y almacenamiento</li>
                    <li>Análisis de datos y marketing</li>
                  </ul>
                  
                  <h4>Transferencias Internacionales:</h4>
                  <p>Las transferencias internacionales solo se realizan:</p>
                  <ul>
                    <li>Con su consentimiento expreso</li>
                    <li>A países con nivel adecuado de protección</li>
                    <li>Con garantías contractuales apropiadas</li>
                    <li>Para cumplir obligaciones contractuales</li>
                  </ul>
                  
                  <h4>Terceros Autorizados:</h4>
                  <ul>
                    <li>Procesadores de pago (PSE, tarjetas de crédito)</li>
                    <li>Proveedores de servicios en la nube</li>
                    <li>Agencias de marketing digital</li>
                    <li>Sistemas de análisis web</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Conservación de Datos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Criterios de Conservación:</h4>
                  <ul>
                    <li>Duración de la relación contractual</li>
                    <li>Cumplimiento de obligaciones legales</li>
                    <li>Necesidad para la finalidad del tratamiento</li>
                    <li>Prescripción de acciones legales</li>
                  </ul>
                  
                  <h4>Períodos Específicos:</h4>
                  <ul>
                    <li><strong>Datos contractuales:</strong> 10 años después del término del contrato</li>
                    <li><strong>Datos financieros:</strong> 5 años para efectos tributarios</li>
                    <li><strong>Datos de marketing:</strong> 2 años sin actividad del usuario</li>
                    <li><strong>Logs del sistema:</strong> 1 año para seguridad</li>
                    <li><strong>Datos de menores:</strong> Hasta que cumplan mayoría de edad + 2 años</li>
                  </ul>
                  
                  <h4>Eliminación Segura:</h4>
                  <ul>
                    <li>Borrado físico de dispositivos de almacenamiento</li>
                    <li>Destrucción de documentos físicos</li>
                    <li>Certificación de eliminación de terceros</li>
                    <li>Registro de actividades de eliminación</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Violaciones de Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Protocolo de Respuesta:</h4>
                  <ol>
                    <li>Detección e identificación del incidente</li>
                    <li>Contención y evaluación del daño</li>
                    <li>Investigación de las causas</li>
                    <li>Notificación a las autoridades (SIC)</li>
                    <li>Comunicación a los titulares afectados</li>
                    <li>Implementación de medidas correctivas</li>
                  </ol>
                  
                  <h4>Notificación a Titulares:</h4>
                  <p>En caso de violación que pueda afectar sus derechos, le notificaremos:</p>
                  <ul>
                    <li>Dentro de las 72 horas siguientes al conocimiento del incidente</li>
                    <li>Describiendo la naturaleza de la violación</li>
                    <li>Indicando las medidas adoptadas</li>
                    <li>Proporcionando recomendaciones de protección</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    11. Autorización para el Tratamiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-bold">Declaración de Autorización:</h4>
                    <p>
                      "Al utilizar los servicios de la Plataforma Turística de Villavicencio, 
                      autorizo de manera libre, voluntaria, previa, explícita e informada al 
                      Clúster de Turismo de Villavicencio para tratar mis datos personales 
                      conforme a la presente política y para las finalidades aquí descritas."
                    </p>
                  </div>
                  
                  <h4>Mecanismos de Autorización:</h4>
                  <ul>
                    <li>Aceptación de términos y condiciones</li>
                    <li>Formularios web con casillas de verificación</li>
                    <li>Firmas digitales en contratos</li>
                    <li>Confirmación por correo electrónico</li>
                  </ul>
                  
                  <h4>Revocación de la Autorización:</h4>
                  <p>
                    Puede revocar su autorización en cualquier momento dirigiéndose al 
                    Oficial de Protección de Datos. La revocación no afectará los 
                    tratamientos realizados con anterioridad.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Actualizaciones de la Política</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    Esta política puede ser actualizada periódicamente para reflejar 
                    cambios en nuestras prácticas o en la legislación aplicable.
                  </p>
                  
                  <h4>Notificación de Cambios:</h4>
                  <ul>
                    <li>Publicación en el sitio web con 10 días de anticipación</li>
                    <li>Notificación por correo electrónico a usuarios registrados</li>
                    <li>Aviso prominente en la plataforma</li>
                    <li>Opción de descarga de versiones anteriores</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>13. Contacto y Quejas</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4>Oficial de Protección de Datos:</h4>
                  <div className="mt-4 space-y-2">
                    <p><strong>Nombre:</strong> Dr. Carlos Mendoza Ruiz</p>
                    <p><strong>Email:</strong> dpo@villavicencio-turismo.com</p>
                    <p><strong>Teléfono:</strong> +57 8 123 4567 ext. 101</p>
                    <p><strong>Dirección:</strong> Carrera 35 #15-30, Villavicencio, Meta</p>
                    <p><strong>Horarios:</strong> Lunes a Viernes, 8:00 AM - 5:00 PM</p>
                  </div>
                  
                  <h4>Autoridad de Control:</h4>
                  <div className="mt-4 space-y-2">
                    <p><strong>Superintendencia de Industria y Comercio (SIC)</strong></p>
                    <p><strong>Línea gratuita:</strong> 01 8000 910 165</p>
                    <p><strong>Página web:</strong> www.sic.gov.co</p>
                    <p><strong>Email:</strong> contactenos@sic.gov.co</p>
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

export default HabeasData;
