const TicketCard = ({
  ticket,
  seleccionado,
  onClick,
}) => {

  // ======================================
  // COLORES SEGÚN ESTADO
  // ======================================

  const colorEstado = {
    Pendiente: "bg-orange-500/20 text-orange-400",
    "En proceso": "bg-blue-500/20 text-blue-400",
    Respondido: "bg-violet-500/20 text-violet-300",
    Resuelto: "bg-emerald-500/20 text-emerald-400",
    Cerrado: "bg-slate-600 text-slate-300",
  };

  // ======================================
  // INICIALES
  // ======================================

  const iniciales = (ticket.cliente || "?")
    .split(" ")
    .map((nombre) => nombre[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // ======================================
  // FECHAS
  // ======================================

  const fechaCreacion = ticket.fecha_creacion
    ? new Date(ticket.fecha_creacion).toLocaleDateString("es-CO")
    : "-";

  const fechaActualizacion = ticket.fecha_actualizacion
    ? new Date(ticket.fecha_actualizacion).toLocaleDateString("es-CO")
    : fechaCreacion;

  // ======================================
  // RESPUESTA PENDIENTE
  // ======================================

  const requiereRespuesta =
    ticket.requiere_respuesta_admin ||
    ticket.tiene_respuesta_pendiente;

  return (
    <div
  onClick={onClick}
  className={`
    relative
    px-4
    py-4
    cursor-pointer
    transition-all
    border-b
    border-slate-700/70
    border-l-4

    ${
      seleccionado
        ? "border-l-blue-500 bg-slate-700/80"
        : "border-l-transparent hover:bg-slate-800/70 hover:border-l-blue-500"
    }
  `}
>
  {/* CABECERA */}
  <div className="flex items-start justify-between gap-3">

    <div className="flex min-w-0 items-center gap-3">

      {/* AVATAR */}
      <div
        className="
          flex
          h-11
          w-11
          min-w-[44px]
          items-center
          justify-center
          rounded-full
          bg-blue-600
          text-sm
          font-bold
          text-white
        "
      >
        {iniciales}
      </div>

      {/* CLIENTE */}
      <div className="min-w-0">
        <h3 className="truncate text-sm font-bold text-white">
          #{ticket.id} · {ticket.asunto}
        </h3>

        <p className="mt-1 truncate text-xs text-slate-400">
          {ticket.cliente || "Cliente no disponible"}
        </p>
      </div>

    </div>

    {/* FECHA */}
    <span className="whitespace-nowrap text-[11px] text-slate-500">
      {fechaCreacion}
    </span>

  </div>

  {/* ESTADO / PRIORIDAD */}
  <div className="mt-3 flex items-center justify-between">

    <span
      className={`
        rounded-full
        px-3
        py-1
        text-[11px]
        font-semibold
        ${
          colorEstado[ticket.estado] ||
          "bg-slate-600 text-white"
        }
      `}
    >
      {ticket.estado || "Sin estado"}
    </span>

    <span
      className={`
        text-xs
        font-bold
        ${
          ticket.prioridad === "Alta"
            ? "text-red-400"
            : ticket.prioridad === "Media"
            ? "text-yellow-400"
            : "text-slate-400"
        }
      `}
    >
      {ticket.prioridad || "Sin prioridad"}
    </span>

  </div>

  {/* ACTUALIZACIÓN */}
  <p className="mt-2 text-[11px] text-slate-500">
    Actualizado: {fechaActualizacion}
  </p>

  {/* AVISO */}
  {(ticket.requiere_respuesta_admin ||
    ticket.tiene_respuesta_pendiente) && (
    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-cyan-300">
      <span className="h-2 w-2 rounded-full bg-cyan-400" />

      {ticket.requiere_respuesta_admin
        ? "Requiere respuesta de administración"
        : "Nueva respuesta de soporte"}
    </div>
  )}
</div>

  );
};

export default TicketCard;