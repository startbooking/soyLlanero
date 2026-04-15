export const FaunaFloraContent = () => {
  return (
    <div className="space-y-6 text-muted-foreground">
      <p className="text-sm italic text-justify">
        En cumplimiento del marco ambiental colombiano y las buenas prácticas de turismo sostenible:
      </p>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">Compromisos institucionales</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fomentar el respeto y conservación de ecosistemas del Meta y la Orinoquía.</li>
          <li>Promover actividades turísticas que no involucren extracción, tráfico o manipulación inadecuada de fauna silvestre.</li>
          <li>Sensibilizar a empresas afiliadas sobre prácticas responsables.</li>
          <li>Rechazar actividades que dañen ecosistemas, especies protegidas o áreas naturales.</li>
          <li>Apoyar iniciativas de restauración, investigación y educación ambiental.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">Lineamientos para afiliados</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>No permitir compra, venta o exhibición ilegal de fauna/flora.</li>
          <li>Cumplir permisos ambientales aplicables.</li>
          <li>Implementar manejo adecuado de residuos y recursos naturales.</li>
        </ul>
      </section>
    </div>
  );
};