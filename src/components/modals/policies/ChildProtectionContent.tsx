export const ChildProtectionContent = () => {
  return (
    <div className="space-y-6 text-muted-foreground text-justify">
      <p className="text-sm italic">(Ley 679 de 2001 – Ley 1336 de 2009 – Código de Conducta)</p>

      <p className="font-medium text-foreground text-justify">
        El Clúster declara una tolerancia cero frente a la explotación sexual comercial de niños, niñas y adolescentes (ESCNNA) en el contexto del turismo.
      </p>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">Compromisos del Clúster</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Promover campañas de prevención entre sus afiliados.</li>
          <li>Capacitar a empresarios en el cumplimiento del Código de Conducta.</li>
          <li>Reportar situaciones sospechosas a las autoridades competentes.</li>
          <li>No permitir en sus canales la promoción de actividades ilícitas.</li>
          <li>Exigir a sus aliados el cumplimiento normativo vigente.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">Canales de denuncia</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Línea 141</strong> – ICBF</li>
          <li><strong>Policía de Turismo</strong></li>
          <li><strong>Fiscalía General de la Nación</strong></li>
        </ul>
      </section>
    </div>
  );
};