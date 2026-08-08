import { useEffect } from "react";

import TicketFilters from "./TicketFilters";
import TicketCard from "./TicketCard";

const TicketList = ({
  tickets = [],
  loading = false,
  ticketSeleccionado,
  setTicketSeleccionado,
  seleccionarTicket,
  cargarTickets,
}) => {

  // ======================================
  // SELECCIONAR PRIMER TICKET
  // ======================================

  useEffect(() => {
    if (!ticketSeleccionado && tickets.length > 0) {
      const primerTicket = tickets[0];

      if (seleccionarTicket) {
        seleccionarTicket(primerTicket.id);
      } else {
        setTicketSeleccionado(primerTicket);
      }
    }
  }, [
    tickets,
    ticketSeleccionado,
    seleccionarTicket,
    setTicketSeleccionado,
  ]);

  // ======================================
  // APLICAR FILTROS
  // ======================================

  const aplicarFiltros = async (filtros = {}) => {
    if (!cargarTickets) return;

    try {
      await cargarTickets(filtros);
    } catch (error) {
      console.error(
        "Error al aplicar filtros:",
        error
      );
    }
  };

  // ======================================
  // SELECCIONAR TICKET
  // ======================================

  const seleccionarTicketActual = async (ticket) => {
    if (!ticket) return;

    try {
      if (seleccionarTicket) {
        await seleccionarTicket(ticket.id);
        return;
      }

      setTicketSeleccionado(ticket);

    } catch (error) {

      console.error(
        "Error al seleccionar ticket:",
        error
      );

      setTicketSeleccionado(ticket);
    }
  };

  // ======================================
  // RENDER
  // ======================================

  return (
  <div className="flex h-full min-h-0 flex-col">

    {/* ======================================
        FILTROS
    ====================================== */}
    <div className="shrink-0 p-4">
      <TicketFilters
        aplicarFiltros={aplicarFiltros}
      />
    </div>

    {/* ======================================
        LISTADO DE TICKETS
        ESTE ES EL SCROLL
    ====================================== */}
    <div
      className="
        flex-1
        min-h-0
        overflow-y-auto
        overflow-x-hidden
        divide-y
        divide-slate-700
        scrollbar-thin
        scrollbar-thumb-slate-600
        scrollbar-track-transparent
      "
    >
      {loading ? (

        <div className="p-8 text-center text-slate-400">
          Cargando tickets...
        </div>

      ) : tickets.length > 0 ? (

        tickets.map((ticket) => (

          <TicketCard
            key={ticket.id}
            ticket={ticket}
            seleccionado={
              ticketSeleccionado?.id === ticket.id
            }
            onClick={() =>
              seleccionarTicketActual(ticket)
            }
          />

        ))

      ) : (

        <div className="p-8 text-center text-slate-400">
          No hay tickets registrados.
        </div>

      )}
    </div>

  </div>
);
};

export default TicketList;