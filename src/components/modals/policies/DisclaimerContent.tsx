export const DisclaimerContent = () => {
  return (
    <div className="space-y-6 text-muted-foreground">
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">El Clúster aclara que:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>No actúa como intermediario, operador turístico, agencia de viajes ni establecimiento de hospedaje.</li>
          <li>No realiza reservas, pagos, cobros, confirmaciones ni modificaciones de servicios turísticos.</li>
          <li>La información de hoteles, operadores, restaurantes u otros prestadores es proporcionada directamente por las empresas afiliadas.</li>
          <li>Cualquier contratación, reserva o transacción es responsabilidad exclusiva entre el usuario y el proveedor.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-3">El Clúster no se hace responsable por:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Incumplimientos de prestadores turísticos.</li>
          <li>Cancelaciones, no-show, cambios o reembolsos.</li>
          <li>Calidad, seguridad o disponibilidad de los servicios.</li>
          <li>Pérdidas, daños o perjuicios derivados de la actividad turística.</li>
        </ul>
      </section>
    </div>
  );
};