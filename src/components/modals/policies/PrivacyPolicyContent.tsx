export const PrivacyPolicyContent = () => {
  return (
    <div className="space-y-6 text-muted-foreground">
      <p className="text-sm italic">Ley 1581 de 2012 – Decreto 1377 de 2013</p>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">1. Responsable del tratamiento</h3>
        <p>Clúster de Turismo de Villavicencio y el Meta.</p>
        <p>Correo oficial: info@clusterturismometa.com</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">2. Datos recolectados</h3>
        <p className="mb-2">El Clúster podrá recolectar:</p>
        <ul className="list-disc pl-6 space-y-1 mb-3">
          <li>Datos de contacto de empresas afiliadas.</li>
          <li>Información de representantes legales.</li>
          <li>Correos electrónicos, teléfonos y fotografías voluntarias.</li>
          <li>Información para procesos de formación o participación en actividades.</li>
        </ul>
        <p>No se recolectan datos sensibles salvo consentimiento explícito.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">3. Finalidades</h3>
        <p className="mb-2">Los datos se utilizarán para:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Gestión administrativa del Clúster.</li>
          <li>Comunicación institucional.</li>
          <li>Envío de información sectorial, convocatorias y formación.</li>
          <li>Promoción empresarial en directorios.</li>
          <li>Cumplimiento de obligaciones legales.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">4. Derechos del titular</h3>
        <p className="mb-2">Los titulares pueden:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Conocer, actualizar y rectificar sus datos.</li>
          <li>Solicitar prueba de autorización.</li>
          <li>Revocar la autorización y/o solicitar supresión de datos.</li>
          <li>Presentar quejas ante la SIC.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">5. Transferencia y transmisión</h3>
        <p className="text-justify">
          Los datos no serán vendidos ni cedidos a terceros, excepto cuando sea necesario para cumplir funciones del Clúster (directorio empresarial, proyectos financiados) bajo acuerdos de confidencialidad.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">6. Seguridad</h3>
        <p className="text-justify">
          El Clúster implementa medidas administrativas, tecnológicas y físicas para proteger la información.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">7. Atención de consultas</h3>
        <p className="text-justify">
          Correos y canales oficiales serán publicados en la sección de contacto.
        </p>
      </section>
    </div>
  );
};