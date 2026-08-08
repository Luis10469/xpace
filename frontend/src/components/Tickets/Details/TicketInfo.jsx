const TicketInfo = ({
  ticketSeleccionado,
}) => {

  // ======================================
  // SIN TICKET SELECCIONADO
  // ======================================

  if (!ticketSeleccionado) {
    return (
      <div
        className="
          bg-slate-800
          rounded-2xl
          border
          border-slate-700
          p-6
        "
      >
        <h2 className="text-xl font-bold mb-5">
          Información
        </h2>

        <div
          className="
            text-center
            text-slate-400
            py-10
          "
        >
          Selecciona un ticket.
        </div>
      </div>
    );
  }

  // ======================================
  // INFORMACIÓN DEL TICKET
  // ======================================

  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        border
        border-slate-700
        p-6
      "
    >
      <h2 className="text-xl font-bold mb-5">
        Información
      </h2>

      <div className="space-y-4">

        <Info
          titulo="Cliente"
          valor={ticketSeleccionado.cliente}
        />

        <Info
          titulo="Correo"
          valor={ticketSeleccionado.correo}
        />

        <Info
          titulo="Teléfono"
          valor={ticketSeleccionado.telefono}
        />

        <Info
          titulo="Plan"
          valor={ticketSeleccionado.plan}
        />

        <Info
          titulo="Zona"
          valor={ticketSeleccionado.zona}
        />

        <Info
          titulo="Asunto"
          valor={ticketSeleccionado.asunto}
        />

        <Info
          titulo="Categoría"
          valor={ticketSeleccionado.categoria}
        />

        <Info
          titulo="Estado"
          valor={ticketSeleccionado.estado}
        />

        <Info
          titulo="Prioridad"
          valor={ticketSeleccionado.prioridad}
        />

        <Info
          titulo="Técnico"
          valor={
            ticketSeleccionado.tecnico ||
            "Sin asignar"
          }
        />

        <Info
          titulo="Fecha"
          valor={
            ticketSeleccionado.fecha_creacion
              ? new Date(
                  ticketSeleccionado.fecha_creacion
                ).toLocaleString("es-CO")
              : "-"
          }
        />

        <Info
          titulo="Última actualización"
          valor={
            ticketSeleccionado.fecha_actualizacion
              ? new Date(ticketSeleccionado.fecha_actualizacion).toLocaleString("es-CO")
              : "-"
          }
        />

      </div>
    </div>
  );
};

// ======================================
// COMPONENTE INFO
// ======================================

const Info = ({
  titulo,
  valor,
}) => {
  return (
    <div>
      <p className="text-slate-400 text-sm">
        {titulo}
      </p>

      <p className="font-semibold text-white">
        {valor || "-"}
      </p>
    </div>
  );
};

export default TicketInfo;