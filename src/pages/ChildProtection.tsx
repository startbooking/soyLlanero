
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, AlertTriangle, Phone } from "lucide-react";

const ChildProtection = () => {
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
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Ley de Protección de la Infancia y Adolescencia
              </h1>
              <p className="text-muted-foreground text-lg">
                Prevención del turismo sexual con menores de edad - Ley 1336 de 2009
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                En cumplimiento del Código de la Infancia y la Adolescencia (Ley 1098 de 2006)
              </p>
            </div>

            <div className="space-y-8">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    Aviso Importante
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-red-800">
                  <p className="font-semibold text-lg mb-2">
                    ¡STOP! EXPLOTACIÓN SEXUAL COMERCIAL DE NIÑOS, NIÑAS Y ADOLESCENTES
                  </p>
                  <p>
                    La explotación sexual comercial de menores de edad es un DELITO y será 
                    denunciado y castigado conforme a la ley. El turismo sexual con menores 
                    de edad es penalizado en Colombia hasta con 20 años de prisión.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Marco Legal
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Este compromiso se basa en:</p>
                  <ul>
                    <li><strong>Ley 1098 de 2006:</strong> Código de la Infancia y la Adolescencia</li>
                    <li><strong>Ley 1336 de 2009:</strong> Contra la explotación sexual comercial de menores</li>
                    <li><strong>Ley 679 de 2001:</strong> Prevención del turismo sexual con menores</li>
                    <li><strong>Ley 1329 de 2009:</strong> Contra la trata de personas</li>
                    <li><strong>Convención de los Derechos del Niño de la ONU</strong></li>
                    <li><strong>Protocolo de Palermo</strong> contra la trata de personas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nuestro Compromiso</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>
                    La Plataforma Turística de Villavicencio y todos sus proveedores afiliados 
                    se comprometen firmemente a:
                  </p>
                  <ul>
                    <li>Prevenir y combatir la explotación sexual comercial de niños, niñas y adolescentes</li>
                    <li>No promover, facilitar o encubrir actividades de turismo sexual</li>
                    <li>Denunciar cualquier situación sospechosa ante las autoridades competentes</li>
                    <li>Capacitar a nuestro personal en la identificación y prevención de estas situaciones</li>
                    <li>Colaborar con las autoridades en investigaciones relacionadas</li>
                    <li>Promover el turismo responsable y ético</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsabilidades de los Proveedores</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Todos los proveedores turísticos afiliados deben:</p>
                  <ul>
                    <li>Exhibir visible el aviso contra la explotación sexual de menores</li>
                    <li>Capacitar a su personal en prevención y detección</li>
                    <li>Implementar políticas internas de protección infantil</li>
                    <li>Verificar la edad de huéspedes menores de edad</li>
                    <li>Reportar situaciones sospechosas inmediatamente</li>
                    <li>No permitir el ingreso de menores sin acompañamiento de adultos responsables</li>
                    <li>Mantener registros detallados de huéspedes</li>
                    <li>Colaborar con inspecciones y verificaciones</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsabilidades de los Turistas</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Los usuarios de nuestra plataforma se comprometen a:</p>
                  <ul>
                    <li>Denunciar cualquier situación de explotación sexual de menores</li>
                    <li>No participar, promover o facilitar estas actividades</li>
                    <li>Respetar los derechos de los niños, niñas y adolescentes</li>
                    <li>Colaborar con las autoridades cuando sea requerido</li>
                    <li>Promover un turismo ético y responsable</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Señales de Alerta
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Esté atento a estas situaciones que pueden indicar explotación:</p>
                  <ul>
                    <li>Adultos acompañados de menores que no parecen ser familiares</li>
                    <li>Menores que muestran signos de maltrato o miedo</li>
                    <li>Adultos que pagan por servicios para menores de manera sospechosa</li>
                    <li>Menores que aparentan estar bajo control o coerción</li>
                    <li>Actividades nocturnas inusuales con menores</li>
                    <li>Menores en lugares inapropiados para su edad</li>
                    <li>Comportamientos sexualizados inapropiados en menores</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sanciones</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Las sanciones por explotación sexual de menores incluyen:</p>
                  <ul>
                    <li><strong>Prisión:</strong> Entre 14 y 20 años</li>
                    <li><strong>Multa:</strong> Entre 67 y 1.500 salarios mínimos</li>
                    <li><strong>Inhabilitación:</strong> Para ejercer funciones públicas</li>
                    <li><strong>Prohibición:</strong> De acercarse a menores de edad</li>
                    <li><strong>Cierre:</strong> Del establecimiento comercial</li>
                    <li><strong>Cancelación:</strong> De licencias y permisos</li>
                  </ul>
                  <p className="font-semibold text-red-600 mt-4">
                    Estas sanciones aplican tanto para nacionales como extranjeros.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Programa de Capacitación</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Implementamos capacitaciones periódicas que incluyen:</p>
                  <ul>
                    <li>Reconocimiento de señales de alerta</li>
                    <li>Protocolos de reporte y denuncia</li>
                    <li>Marco legal vigente</li>
                    <li>Derechos de los niños, niñas y adolescentes</li>
                    <li>Turismo ético y responsable</li>
                    <li>Casos de estudio y mejores prácticas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alianzas Estratégicas</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p>Trabajamos en conjunto con:</p>
                  <ul>
                    <li><strong>ICBF:</strong> Instituto Colombiano de Bienestar Familiar</li>
                    <li><strong>Policía Nacional:</strong> Grupos especializados</li>
                    <li><strong>Fiscalía General:</strong> Unidad de delitos contra menores</li>
                    <li><strong>Fundación Renacer:</strong> Prevención de explotación sexual</li>
                    <li><strong>UNICEF Colombia</strong></li>
                    <li><strong>Ministerio de Comercio, Industria y Turismo</strong></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Phone className="w-5 h-5" />
                    ¿Cómo Denunciar?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-800">
                  <p className="font-semibold mb-4">Si conoce o sospecha de explotación sexual de menores:</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-semibold">Línea Nacional Contra la Trata:</p>
                      <p className="text-lg text-blue-600">01 8000 522 020</p>
                      <p className="text-sm">24 horas, gratuita</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-semibold">Policía Nacional:</p>
                      <p className="text-lg text-blue-600">123</p>
                      <p className="text-sm">Línea de emergencia</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-semibold">ICBF:</p>
                      <p className="text-lg text-blue-600">141</p>
                      <p className="text-sm">Línea de protección a la infancia</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-semibold">Te Protejo:</p>
                      <p className="text-lg text-blue-600">www.teprotejo.org</p>
                      <p className="text-sm">Portal web para denuncias</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-semibold">Nuestra Plataforma:</p>
                      <p className="text-lg text-blue-600">denuncia@villavicencio-turismo.com</p>
                      <p className="text-sm">+57 8 123 4567 ext. 911</p>
                    </div>
                  </div>
                  
                  <p className="mt-4 font-semibold">
                    Su denuncia puede salvar vidas. ¡ACTÚE!
                  </p>
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

export default ChildProtection;
