
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Globe, TreePine } from "lucide-react";

const SustainableTourism = () => {
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
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Turismo Sostenible
              </h1>
              <p className="text-muted-foreground text-lg">
                Nuestro compromiso con un turismo responsable y sostenible en Villavicencio
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    Nuestra Visión de Sostenibilidad
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    En la Plataforma Turística de Villavicencio, creemos que el turismo debe ser una 
                    fuerza positiva para el desarrollo económico, la conservación ambiental y el 
                    bienestar social de nuestras comunidades.
                  </p>
                  <p>
                    Promovemos un modelo de turismo que respete los ecosistemas de los llanos orientales, 
                    preserve nuestra cultura llanera y genere beneficios equitativos para todos los actores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-green-600" />
                    Sostenibilidad Ambiental
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Conservación de Ecosistemas:</h4>
                  <ul>
                    <li>Protección de la biodiversidad de los llanos orientales</li>
                    <li>Conservación de humedales y ríos</li>
                    <li>Preservación de corredores biológicos</li>
                    <li>Promoción de avistamiento responsable de fauna</li>
                  </ul>
                  
                  <h4>Gestión Responsable de Recursos:</h4>
                  <ul>
                    <li>Uso eficiente del agua en establecimientos turísticos</li>
                    <li>Gestión integral de residuos sólidos</li>
                    <li>Promoción de energías renovables</li>
                    <li>Reducción de la huella de carbono</li>
                  </ul>
                  
                  <h4>Educación Ambiental:</h4>
                  <ul>
                    <li>Programas de sensibilización para turistas</li>
                    <li>Capacitación en prácticas sostenibles para proveedores</li>
                    <li>Interpretación ambiental en actividades turísticas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Sostenibilidad Social y Cultural
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Preservación Cultural:</h4>
                  <ul>
                    <li>Promoción de la cultura llanera auténtica</li>
                    <li>Apoyo a artesanos y músicos locales</li>
                    <li>Preservación de tradiciones gastronómicas</li>
                    <li>Protección de sitios de valor histórico</li>
                  </ul>
                  
                  <h4>Inclusión Social:</h4>
                  <ul>
                    <li>Participación equitativa de comunidades locales</li>
                    <li>Empleo digno y capacitación para residentes</li>
                    <li>Respeto por los derechos de las comunidades indígenas</li>
                    <li>Turismo accesible para personas con discapacidad</li>
                  </ul>
                  
                  <h4>Desarrollo Comunitario:</h4>
                  <ul>
                    <li>Fortalecimiento de organizaciones locales</li>
                    <li>Apoyo a emprendimientos comunitarios</li>
                    <li>Mejoramiento de infraestructura social</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sostenibilidad Económica</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Economía Local:</h4>
                  <ul>
                    <li>Priorización de proveedores locales</li>
                    <li>Promoción de productos regionales</li>
                    <li>Desarrollo de cadenas de valor turísticas</li>
                    <li>Apoyo a la agricultura familiar</li>
                  </ul>
                  
                  <h4>Comercio Justo:</h4>
                  <ul>
                    <li>Precios justos para productos y servicios locales</li>
                    <li>Transparencia en las transacciones</li>
                    <li>Eliminación de intermediarios innecesarios</li>
                  </ul>
                  
                  <h4>Innovación y Competitividad:</h4>
                  <ul>
                    <li>Incorporación de tecnologías sostenibles</li>
                    <li>Mejora continua de la calidad de servicios</li>
                    <li>Diversificación de la oferta turística</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificaciones y Estándares</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Promovemos que nuestros afiliados obtengan:</p>
                  <ul>
                    <li><strong>Norma Técnica Sectorial NTS-TS 002:</strong> Alojamientos y hospedajes</li>
                    <li><strong>Norma Técnica Sectorial NTS-TS 003:</strong> Agencias de viajes</li>
                    <li><strong>Certificación en Turismo Sostenible (CTS):</strong> Del Instituto Costarricense de Turismo</li>
                    <li><strong>Sello Ambiental Colombiano:</strong> Para productos y servicios sostenibles</li>
                    <li><strong>Certificación Rainforest Alliance:</strong> Para actividades en áreas naturales</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compromisos de los Proveedores</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Los proveedores afiliados a nuestra plataforma se comprometen a:</p>
                  <ul>
                    <li>Implementar prácticas de gestión ambiental</li>
                    <li>Contratar y capacitar personal local</li>
                    <li>Comprar productos y servicios de origen local</li>
                    <li>Respetar la cultura y tradiciones locales</li>
                    <li>Brindar información sobre sostenibilidad a los visitantes</li>
                    <li>Reportar indicadores de sostenibilidad</li>
                    <li>Participar en programas de mejora continua</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guía para Turistas Responsables</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h4>Antes del Viaje:</h4>
                  <ul>
                    <li>Infórmese sobre la cultura y normas locales</li>
                    <li>Elija proveedores con certificaciones sostenibles</li>
                    <li>Planifique actividades de bajo impacto ambiental</li>
                  </ul>
                  
                  <h4>Durante el Viaje:</h4>
                  <ul>
                    <li>Respete la fauna y flora local</li>
                    <li>Use agua y energía de manera responsable</li>
                    <li>Compre productos locales y artesanías auténticas</li>
                    <li>Respete las costumbres y tradiciones</li>
                    <li>No deje rastro en áreas naturales</li>
                  </ul>
                  
                  <h4>Después del Viaje:</h4>
                  <ul>
                    <li>Comparta su experiencia de turismo sostenible</li>
                    <li>Proporcione retroalimentación constructiva</li>
                    <li>Apoye iniciativas de conservación locales</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Objetivos de Desarrollo Sostenible (ODS)</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Nuestras acciones contribuyen directamente a:</p>
                  <ul>
                    <li><strong>ODS 1:</strong> Fin de la pobreza - Generación de empleo e ingresos</li>
                    <li><strong>ODS 8:</strong> Trabajo decente y crecimiento económico</li>
                    <li><strong>ODS 11:</strong> Ciudades y comunidades sostenibles</li>
                    <li><strong>ODS 12:</strong> Producción y consumo responsables</li>
                    <li><strong>ODS 14:</strong> Vida submarina - Conservación de ecosistemas acuáticos</li>
                    <li><strong>ODS 15:</strong> Vida de ecosistemas terrestres</li>
                    <li><strong>ODS 17:</strong> Alianzas para lograr los objetivos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monitoreo y Evaluación</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Implementamos un sistema de seguimiento que incluye:</p>
                  <ul>
                    <li>Indicadores ambientales (consumo de agua, energía, residuos)</li>
                    <li>Indicadores sociales (empleo local, capacitación, satisfacción)</li>
                    <li>Indicadores económicos (derrama económica, distribución de beneficios)</li>
                    <li>Reportes anuales de sostenibilidad</li>
                    <li>Auditorías externas periódicas</li>
                    <li>Mejora continua basada en resultados</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contacto - Oficina de Turismo Sostenible</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Para más información sobre nuestras iniciativas de sostenibilidad:</p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Email:</strong> sostenibilidad@villavicencio-turismo.com</p>
                    <p><strong>Teléfono:</strong> +57 8 123 4567 ext. 200</p>
                    <p><strong>Dirección:</strong> Alcaldía de Villavicencio, Carrera 35 #15-30</p>
                    <p><strong>Coordinadora:</strong> María González, Especialista en Turismo Sostenible</p>
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

export default SustainableTourism;
