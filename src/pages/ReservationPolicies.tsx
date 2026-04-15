
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, AlertCircle } from "lucide-react";

const ReservationPolicies = () => {
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
                <Calendar className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Políticas de Reserva
              </h1>
              <p className="text-muted-foreground text-lg">
                Condiciones generales para reservas en la Plataforma Turística de Villavicencio
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Última actualización: 17 de junio de 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    1. Proceso de Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Confirmación de Reserva:</h4>
                  <ul>
                    <li>Las reservas se confirman automáticamente al completar el pago</li>
                    <li>Recibirá un código de reserva único por correo electrónico</li>
                    <li>La confirmación incluye detalles completos del servicio reservado</li>
                    <li>Los vouchers digitales están disponibles en su panel de usuario</li>
                  </ul>
                  
                  <h4>Información Requerida:</h4>
                  <ul>
                    <li>Datos personales completos del titular de la reserva</li>
                    <li>Información de acompañantes (cuando aplique)</li>
                    <li>Datos de contacto válidos (teléfono y correo electrónico)</li>
                    <li>Requerimientos especiales o necesidades particulares</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    2. Métodos de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Opciones de Pago Disponibles:</h4>
                  <ul>
                    <li>Tarjetas de crédito (Visa, MasterCard, American Express)</li>
                    <li>Tarjetas débito (PSE - Pagos Seguros en Línea)</li>
                    <li>Transferencias bancarias</li>
                    <li>Pagos en efectivo (en puntos autorizados)</li>
                    <li>Billeteras digitales (Nequi, Daviplata)</li>
                  </ul>
                  
                  <h4>Condiciones de Pago:</h4>
                  <ul>
                    <li>Pago inmediato: Para reservas con menos de 48 horas de anticipación</li>
                    <li>Pago parcial: 50% al reservar, 50% restante 24 horas antes del servicio</li>
                    <li>Pago diferido: Disponible para reservas grupales (mínimo 10 personas)</li>
                    <li>Descuentos por pronto pago: Hasta 10% para pagos completos anticipados</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    3. Tiempos de Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Anticipación Mínima:</h4>
                  <ul>
                    <li><strong>Hoteles:</strong> 2 horas (sujeto a disponibilidad)</li>
                    <li><strong>Restaurantes:</strong> 30 minutos a 24 horas según el establecimiento</li>
                    <li><strong>Experiencias:</strong> 24 horas mínimo</li>
                    <li><strong>Tours grupales:</strong> 48 horas mínimo</li>
                    <li><strong>Eventos especiales:</strong> 7 días mínimo</li>
                  </ul>
                  
                  <h4>Anticipación Recomendada:</h4>
                  <ul>
                    <li>Temporada alta: 15-30 días de anticipación</li>
                    <li>Fines de semana largos: 7-15 días</li>
                    <li>Días regulares: 3-7 días</li>
                    <li>Servicios premium: 7-21 días</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Disponibilidad y Confirmación</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Verificación de Disponibilidad:</h4>
                  <ul>
                    <li>El sistema actualiza disponibilidad en tiempo real</li>
                    <li>Reservas sujetas a confirmación final del proveedor</li>
                    <li>En caso de no disponibilidad, se ofrecen alternativas similares</li>
                    <li>Reembolso completo si no hay alternativas satisfactorias</li>
                  </ul>
                  
                  <h4>Cambios de Último Momento:</h4>
                  <ul>
                    <li>Los proveedores pueden modificar servicios por fuerza mayor</li>
                    <li>Notificación inmediata al cliente</li>
                    <li>Opciones: reembolso completo o servicio alternativo equivalente</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Modificaciones de Reserva</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Cambios Permitidos:</h4>
                  <ul>
                    <li>Fechas (sujeto a disponibilidad y políticas del proveedor)</li>
                    <li>Número de huéspedes (dentro de la capacidad del servicio)</li>
                    <li>Tipo de habitación o servicio (con diferencia de precio)</li>
                    <li>Requerimientos especiales</li>
                  </ul>
                  
                  <h4>Costos de Modificación:</h4>
                  <ul>
                    <li>Hasta 72 horas antes: Sin costo</li>
                    <li>48-72 horas antes: $15.000 COP por modificación</li>
                    <li>24-48 horas antes: $30.000 COP por modificación</li>
                    <li>Menos de 24 horas: 50% del valor de la reserva</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. No-Shows (No Presentación)</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Definición:</h4>
                  <p>
                    Se considera "No-Show" cuando el cliente no se presenta al servicio 
                    reservado sin cancelar previamente.
                  </p>
                  
                  <h4>Consecuencias:</h4>
                  <ul>
                    <li>Pérdida del 100% del pago realizado</li>
                    <li>No hay derecho a reembolso</li>
                    <li>Posible restricción para futuras reservas</li>
                  </ul>
                  
                  <h4>Excepciones:</h4>
                  <ul>
                    <li>Emergencias médicas documentadas</li>
                    <li>Fuerza mayor comprobada</li>
                    <li>Problemas de transporte documentados</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Servicios Especiales</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Reservas Grupales (10+ personas):</h4>
                  <ul>
                    <li>Cotización personalizada</li>
                    <li>Descuentos por volumen</li>
                    <li>Condiciones especiales de pago</li>
                    <li>Coordinador dedicado</li>
                  </ul>
                  
                  <h4>Eventos Corporativos:</h4>
                  <ul>
                    <li>Planificación personalizada</li>
                    <li>Servicios adicionales incluidos</li>
                    <li>Facturación empresarial</li>
                    <li>Soporte técnico especializado</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Responsabilidades del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <ul>
                    <li>Llegar puntualmente a los servicios reservados</li>
                    <li>Portar documentos de identificación válidos</li>
                    <li>Informar sobre requerimientos especiales al reservar</li>
                    <li>Cumplir con las normas del establecimiento</li>
                    <li>Notificar cambios o cancelaciones oportunamente</li>
                    <li>Verificar la información de contacto proporcionada</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Garantías de Calidad</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Nuestros Compromisos:</h4>
                  <ul>
                    <li>Servicios conforme a la descripción publicada</li>
                    <li>Precios transparentes sin cargos ocultos</li>
                    <li>Atención al cliente 24/7</li>
                    <li>Resolución de quejas en máximo 48 horas</li>
                  </ul>
                  
                  <h4>En Caso de Insatisfacción:</h4>
                  <ul>
                    <li>Evaluación inmediata de la queja</li>
                    <li>Compensación cuando proceda</li>
                    <li>Mejoras en el servicio para futuras experiencias</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <AlertCircle className="w-5 h-5" />
                    10. Consideraciones Especiales COVID-19
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-orange-800">
                  <ul>
                    <li>Cumplimiento de protocolos de bioseguridad</li>
                    <li>Posibles cambios en capacidades y servicios</li>
                    <li>Flexibilidad en cancelaciones por motivos de salud</li>
                    <li>Verificación de requisitos sanitarios</li>
                    <li>Adaptación a regulaciones gubernamentales vigentes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Resolución de Conflictos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Proceso de Mediación:</h4>
                  <ol>
                    <li>Contacto directo con el proveedor del servicio</li>
                    <li>Escalamiento a nuestro equipo de atención al cliente</li>
                    <li>Mediación a través de la plataforma</li>
                    <li>Arbitraje por tercero independiente (si es necesario)</li>
                  </ol>
                  
                  <h4>Tiempos de Respuesta:</h4>
                  <ul>
                    <li>Quejas urgentes: 2 horas</li>
                    <li>Quejas generales: 24 horas</li>
                    <li>Resolución final: Máximo 5 días hábiles</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Contacto y Soporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Para consultas sobre reservas:</p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Línea de Reservas:</strong> +57 8 123 4567</p>
                    <p><strong>WhatsApp:</strong> +57 300 123 4567</p>
                    <p><strong>Email:</strong> reservas@villavicencio-turismo.com</p>
                    <p><strong>Chat en línea:</strong> Disponible 24/7 en la plataforma</p>
                    <p><strong>Horarios:</strong> Lunes a Domingo, 6:00 AM - 10:00 PM</p>
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

export default ReservationPolicies;
