import TicketList from "../Sidebar/TicketList";
import TicketConversation from "../Conversation/TicketConversation";
import TicketInfo from "../Details/TicketInfo";
import TicketActions from "../Details/TicketActions";
import TicketHistory from "../Details/TicketHistory";

const TicketLayout = ({
  tickets = [],
  ticketSeleccionado,
  setTicketSeleccionado,
  seleccionarTicket,
  cargarTickets,

  mensajes = [],
  cargarMensajes,
  enviarMensajeTicket,

  tecnicos = [],
  editarTicket,
  puedeGestionar = true,
  usuarioActual,
  historial = [],
}) => {
  return (
    <div
      className="
        w-full
        h-[calc(100vh-180px)]
        min-h-[650px]
        grid
        grid-cols-12
        gap-4
        overflow-hidden
      "
    >

      {/* =====================================================
          1. LISTA DE TICKETS
      ===================================================== */}

      <section
        className="
          col-span-12
          lg:col-span-3
          min-w-0
          min-h-0
          h-full
          overflow-hidden
        "
      >
        <div
          className="
            h-full
            min-h-0
            overflow-hidden
            rounded-xl
            border
            border-slate-700
            bg-slate-900/70
          "
        >
          <TicketList
            tickets={tickets}
            ticketSeleccionado={ticketSeleccionado}
            setTicketSeleccionado={setTicketSeleccionado}
            seleccionarTicket={seleccionarTicket}
            cargarTickets={cargarTickets}
          />
        </div>
      </section>


      {/* =====================================================
          2. CONVERSACIÓN
          OCUPA TODO EL ALTO DEL CENTRO
      ===================================================== */}

      <section
        className="
          col-span-12
          lg:col-span-6
          min-w-0
          min-h-0
          h-full
          overflow-hidden
        "
      >
        <div
          className="
            w-full
            h-full
            min-h-0
            overflow-hidden
            rounded-xl
            border
            border-slate-700
            bg-slate-900/70
          "
        >
          <TicketConversation
            ticketSeleccionado={ticketSeleccionado}
            mensajes={mensajes}
            cargarMensajes={cargarMensajes}
            enviarMensajeTicket={enviarMensajeTicket}
            usuarioActual={usuarioActual}
          />
        </div>
      </section>


      {/* =====================================================
          3. COLUMNA DERECHA
          
          INFORMACIÓN
          ─────────────────
          REGISTRO | GESTIÓN
      ===================================================== */}

      <aside
        className="
          col-span-12
          lg:col-span-3
          min-w-0
          min-h-0
          h-full
          grid
          grid-rows-[minmax(0,1fr)_minmax(0,0.75fr)]
          gap-4
          overflow-hidden
        "
      >

        {/* =================================================
            INFORMACIÓN
        ================================================= */}

        <div
          className="
            min-w-0
            min-h-0
            h-full
            overflow-y-auto
            overflow-x-hidden
            rounded-xl
            border
            border-slate-700
            bg-slate-900/70
            scrollbar-thin
            scrollbar-thumb-slate-600
            scrollbar-track-transparent
          "
        >
          <TicketInfo
            ticketSeleccionado={ticketSeleccionado}
          />
        </div>


        {/* =================================================
            REGISTRO + GESTIÓN
        ================================================= */}

       <div
          className={`
            min-w-0
            min-h-0
            h-full
            grid
            ${puedeGestionar ? "grid-cols-2" : "grid-cols-1"}
            gap-4
            overflow-hidden
          `}
          >

          {/* ================= REGISTRO ================= */}

          <div
            className="
              min-w-0
              min-h-0
              h-full
              overflow-hidden
            "
          >
            {ticketSeleccionado && (
              <div className="h-full min-h-0 overflow-hidden">
                <TicketHistory
                  historial={historial}
                />
              </div>
            )}
          </div>


          {/* ================= GESTIÓN ================= */}

          <div
            className="
              min-w-0
              min-h-0
              h-full
              overflow-hidden
            "
          >
            {puedeGestionar && (
              <div className="h-full min-h-0 overflow-hidden">
                <TicketActions
                  ticketSeleccionado={ticketSeleccionado}
                  tecnicos={tecnicos}
                  editarTicket={editarTicket}
                />
              </div>
            )}
          </div>

        </div>

      </aside>

    </div>
  );
};

export default TicketLayout;