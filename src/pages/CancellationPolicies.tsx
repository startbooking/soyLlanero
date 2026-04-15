
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, RefreshCw, DollarSign, Clock } from "lucide-react";

const CancellationPolicies = () => {
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
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Políticas de Cancelación
              </h1>
              <p className="text-muted-foreground text-lg">
                Condiciones para cancelar reservas en la Plataforma Turística de Villavicencio
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Última actualización: 17 de junio de 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    1. Períodos de Cancelación
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Clasificación por Anticipación:</h4>
                  
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mb-4">
                    <h5 className="font-bold text-green-700">Cancelación Gratuita</h5>
                    <p><strong>Más de 72 horas antes:</strong> Reembolso del 100%</p>
                    <p>Sin penalizaciones ni costos administrativos</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-4">
                    <h5 className="font-bold text-yellow-700">Cancelación con Penalización Baja</h5>
                    <p><strong>48-72 horas antes:</strong> Reembolso del 80%</p>
                    <p>Retención del 20% como costo administrativo</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500 mb-4">
                    <h5 className="font-bold text-orange-700">Cancelación con Penalización Media</h5>
                    <p><strong>24-48 horas antes:</strong> Reembolso del 50%</p>
                    <p>Retención del 50% del valor total</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <h5 className="font-bold text-red-700">Cancelación con Penalización Alta</h5>
                    <p><strong>Menos de 24 horas:</strong> Reembolso del 0%</p>
                    <p>No hay derecho a reembolso</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Cancelaciones por Tipo de Servicio</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>🏨 Hoteles y Alojamientos:</h4>
                  <ul>
                    <li><strong>Estándar:</strong> Cancelación gratuita hasta 48 horas antes</li>
                    <li><strong>No reembolsable:</strong> No permite cancelaciones</li>
                    <li><strong>Flexible:</strong> Cancelación gratuita hasta 24 horas antes</li>
                    <li><strong>Super flexible:</strong> Cancelación gratuita hasta 6 horas antes</li>
                  </ul>
                  
                  <h4>🍽️ Restaurantes:</h4>
                  <ul>
                    <li><strong>Mesas regulares:</strong> Cancelación gratuita hasta 2 horas antes</li>
                    <li><strong>Eventos especiales:</strong> Cancelación gratuita hasta 48 horas antes</li>
                    <li><strong>Menús degustación:</strong> Cancelación gratuita hasta 24 horas antes</li>
                  </ul>
                  
                  <h4>🎯 Experiencias y Tours:</h4>
                  <ul>
                    <li><strong>Tours grupales:</strong> Cancelación gratuita hasta 72 horas antes</li>
                    <li><strong>Experiencias privadas:</strong> Cancelación gratuita hasta 48 horas antes</li>
                    <li><strong>Actividades de aventura:</strong> Cancelación gratuita hasta 24 horas antes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    3. Proceso de Cancelación
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Pasos para Cancelar:</h4>
                  <ol>
                    <li>Iniciar sesión en su cuenta de usuario</li>
                    <li>Ir a "Mis Reservas" en el panel de control</li>
                    <li>Seleccionar la reserva a cancelar</li>
                    <li>Hacer clic en "Cancelar Reserva"</li>
                    <li>Confirmar la cancelación y el monto de reembolso</li>
                    <li>Recibir confirmación por correo electrónico</li>
                  </ol>
                  
                  <h4>Métodos Alternativos:</h4>
                  <ul>
                    <li><strong>Teléfono:</strong> +57 8 123 4567 (24/7)</li>
                    <li><strong>WhatsApp:</strong> +57 300 123 4567</li>
                    <li><strong>Email:</strong> cancelaciones@villavicencio-turismo.com</li>
                    <li><strong>Chat en línea:</strong> Disponible en la plataforma</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    4. Reembolsos
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Tiempos de Procesamiento:</h4>
                  <ul>
                    <li><strong>Tarjetas de crédito:</strong> 5-10 días hábiles</li>
                    <li><strong>Tarjetas débito:</strong> 3-7 días hábiles</li>
                    <li><strong>Transferencias bancarias:</strong> 1-3 días hábiles</li>
                    <li><strong>Billeteras digitales:</strong> 1-2 días hábiles</li>
                    <li><strong>Efectivo:</strong> Disponible inmediatamente en oficinas</li>
                  </ul>
                  
                  <h4>Métodos de Reembolso:</h4>
                  <ul>
                    <li>Mismo método de pago utilizado originalmente</li>
                    <li>Crédito en la plataforma (con 10% adicional)</li>
                    <li>Transferencia bancaria (previa validación)</li>
                  </ul>
                  
                  <h4>Costos Administrativos:</h4>
                  <ul>
                    <li>Reembolsos a tarjetas: $5.000 COP</li>
                    <li>Transferencias bancarias: $8.000 COP</li>
                    <li>Crédito en plataforma: Sin costo</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Cancelaciones por Fuerza Mayor</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Situaciones de Fuerza Mayor:</h4>
                  <ul>
                    <li>Emergencias climáticas (huracanes, inundaciones)</li>
                    <li>Emergencias sanitarias (pandemias, brotes)</li>
                    <li>Situaciones de orden público</li>
                    <li>Terremotos o desastres naturales</li>
                    <li>Huelgas de transporte</li>
                    <li>Cierre gubernamental de fronteras</li>
                  </ul>
                  
                  <h4>Beneficios Especiales:</h4>
                  <ul>
                    <li>Reembolso del 100% sin penalizaciones</li>
                    <li>Opción de reprogramar sin costo adicional</li>
                    <li>Crédito válido por 24 meses</li>
                    <li>Asistencia personalizada para nuevas fechas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Cancelaciones por Emergencias Médicas</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Documentación Requerida:</h4>
                  <ul>
                    <li>Certificado médico oficial</li>
                    <li>Incapacidad laboral (si aplica)</li>
                    <li>Documentos del seguro médico</li>
                    <li>Declaración jurada del evento</li>
                  </ul>
                  
                  <h4>Beneficios:</h4>
                  <ul>
                    <li>Reembolso del 90-100% según el caso</li>
                    <li>Suspensión temporal de penalizaciones</li>
                    <li>Asistencia para reprogramación</li>
                    <li>Revisión caso por caso</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Cancelaciones Grupales</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Reservas de 10+ personas:</h4>
                  <ul>
                    <li>Políticas personalizadas según el grupo</li>
                    <li>Cancelación parcial permitida</li>
                    <li>Reducción de grupo hasta 48 horas antes</li>
                    <li>Coordinación directa con proveedor</li>
                  </ul>
                  
                  <h4>Eventos Corporativos:</h4>
                  <ul>
                    <li>Términos negociables según contrato</li>
                    <li>Opciones de reprogramación flexibles</li>
                    <li>Cancelación en etapas</li>
                    <li>Asistencia de cuenta dedicada</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Modificaciones vs. Cancelaciones</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Modificaciones Permitidas:</h4>
                  <ul>
                    <li>Cambio de fechas (sujeto a disponibilidad)</li>
                    <li>Cambio de número de huéspedes</li>
                    <li>Upgrade de servicios</li>
                    <li>Cambio de ubicación</li>
                  </ul>
                  
                  <h4>Cuándo Modificar en lugar de Cancelar:</h4>
                  <ul>
                    <li>Cuando hay disponibilidad en nuevas fechas</li>
                    <li>Para evitar penalizaciones por cancelación</li>
                    <li>Cuando el costo de modificación es menor</li>
                    <li>Para mantener tarifas preferenciales</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Seguros de Viaje</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Recomendaciones:</h4>
                  <ul>
                    <li>Contrate seguro de cancelación para viajes costosos</li>
                    <li>Verifique cobertura médica de emergencia</li>
                    <li>Revise exclusiones del seguro</li>
                    <li>Mantenga documentación del seguro actualizada</li>
                  </ul>
                  
                  <h4>Proveedores Recomendados:</h4>
                  <ul>
                    <li>SURA - Seguros de Viaje</li>
                    <li>Mapfre - Asistencia al Viajero</li>
                    <li>Allianz Travel - Seguro Internacional</li>
                    <li>Assist Card - Asistencia Integral</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Derechos del Consumidor</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Conforme al Estatuto del Consumidor (Ley 1480 de 2011):</p>
                  <ul>
                    <li>Derecho a información clara y veraz</li>
                    <li>Derecho a elegir libremente</li>
                    <li>Derecho a la seguridad e indemnidad</li>
                    <li>Derecho a reclamar y ser escuchado</li>
                    <li>Derecho a recibir educación en consumo</li>
                  </ul>
                  
                  <h4>Entidades de Apoyo:</h4>
                  <ul>
                    <li><strong>SIC:</strong> Superintendencia de Industria y Comercio</li>
                    <li><strong>Defensoría del Consumidor</strong></li>
                    <li><strong>Liga de Consumidores</strong></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Contacto para Cancelaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Para procesar cancelaciones:</p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Línea de Cancelaciones:</strong> +57 8 123 4567 ext. 2</p>
                    <p><strong>WhatsApp:</strong> +57 300 123 4567</p>
                    <p><strong>Email:</strong> cancelaciones@villavicencio-turismo.com</p>
                    <p><strong>Horarios:</strong> 24 horas, 7 días a la semana</p>
                    <p><strong>Tiempo promedio de respuesta:</strong> 30 minutos</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-700">Consejo:</p>
                    <p className="text-blue-600">
                      Para cancelaciones urgentes, use el chat en línea o llame directamente. 
                      El email puede tomar más tiempo en procesarse.
                    </p>
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

export default CancellationPolicies;
