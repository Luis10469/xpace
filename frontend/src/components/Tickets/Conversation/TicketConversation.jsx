import TicketMessage from "./TicketMessage";
import TicketReplyBox from "./TicketReplyBox";

const TicketConversation = ({
  ticketSeleccionado,
  mensajes = [],
  cargarMensajes,
  enviarMensajeTicket,
  usuarioActual,
}) => {

  // ======================================
  // SIN TICKET SELECCIONADO
  // ======================================

  if (!ticketSeleccionado) {
    return (
      <section
        className="
          flex
          min-h-[650px]
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-700
          bg-slate-800
          p-8
        "
      >
        <p className="text-center text-sm text-slate-400">
          Selecciona un ticket para comenzar.
        </p>
      </section>
    );
  }

  // ======================================
  // CONVERSACIÓN
  // ======================================

  return (
    <section
      className="
        flex
        h-[650px]
        min-h-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-700
        bg-slate-800
      "
    >

      {/* ======================================
          ENCABEZADO
      ====================================== */}

      <div className="shrink-0 border-b border-slate-700 px-5 py-4">

        <div className="flex items-center justify-between gap-3">

          <div className="min-w-0">

            <h2 className="text-lg font-bold text-white">
              Conversación
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Ticket #{ticketSeleccionado.id}
            </p>

            <p
              className="
                mt-1
                truncate
                text-sm
                text-slate-300
              "
              title={ticketSeleccionado.asunto}
            >
              {ticketSeleccionado.asunto}
            </p>

          </div>

          {/* ESTADO */}

          <span
            className="
              shrink-0
              rounded-full
              bg-slate-700
              px-3
              py-1
              text-[10px]
              font-semibold
              text-slate-300
            "
          >
            {ticketSeleccionado.estado || "Sin estado"}
          </span>

        </div>

      </div>

      {/* ======================================
          MENSAJES
      ====================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          px-5
          py-4
          scrollbar-thin
        "
      >

        {mensajes.length > 0 ? (

          <div className="space-y-3">

            {mensajes.map((mensaje) => (
              <TicketMessage
                key={mensaje.id}
                mensaje={mensaje}
                usuarioActual={usuarioActual}
              />
            ))}

          </div>

        ) : (

          <div className="flex h-full items-center justify-center">

            <p className="text-center text-sm text-slate-500">
              Este ticket aún no tiene mensajes.
            </p>

          </div>

        )}

      </div>

      {/* ======================================
          RESPUESTA
      ====================================== */}

      <div className="shrink-0 border-t border-slate-700 p-4">

        <TicketReplyBox
          ticketSeleccionado={ticketSeleccionado}
          enviarMensajeTicket={enviarMensajeTicket}
          cargarMensajes={cargarMensajes}
        />

      </div>

    </section>
  );
};

export default TicketConversation;