import { useState } from "react";

const estados = [
  "Pendiente",
  "En proceso",
  "Respondido",
  "Resuelto",
  "Cerrado",
];

const TicketActions = ({
  ticketSeleccionado,
  tecnicos = [],
  editarTicket,
}) => {
  const [loading, setLoading] = useState(false);

  if (!ticketSeleccionado) {
    return (
      <section
        className="
          h-[260px]
          rounded-2xl
          border
          border-slate-700
          bg-slate-800
          p-4
        "
      >
        <h2 className="mb-4 text-lg font-bold text-white">
          Gestión del ticket
        </h2>

        <p className="text-center text-sm text-slate-400">
          Selecciona un ticket.
        </p>
      </section>
    );
  }

  const actualizar = async (cambios) => {
    if (!editarTicket) return;

    setLoading(true);

    try {
      await editarTicket(ticketSeleccionado.id, {
        estado: ticketSeleccionado.estado,
        prioridad: ticketSeleccionado.prioridad,
        tecnico_id: ticketSeleccionado.tecnico_id,
        ...cambios,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        h-[260px]
        rounded-2xl
        border
        border-slate-700
        bg-slate-800
        p-4
      "
    >

      <h2 className="mb-4 text-lg font-bold text-white">
        Gestión del ticket
      </h2>

      {/* ESTADO */}
      <label className="mb-2 block text-xs text-slate-400">
        Estado
      </label>

      <select
        disabled={loading}
        value={ticketSeleccionado.estado || ""}
        onChange={(e) =>
          actualizar({
            estado: e.target.value,
          })
        }
        className="
          mb-4
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-sm
          text-white
          outline-none
          focus:border-blue-500
        "
      >
        {estados.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>


      {/* PRIORIDAD */}
      <label className="mb-2 block text-xs text-slate-400">
        Prioridad
      </label>

      <select
        disabled={loading}
        value={ticketSeleccionado.prioridad || ""}
        onChange={(e) =>
          actualizar({
            prioridad: e.target.value,
          })
        }
        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-sm
          text-white
          outline-none
          focus:border-blue-500
        "
      >
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>


      {/* TÉCNICO */}
      {tecnicos.length > 0 && (
        <>
          <label className="mb-2 mt-4 block text-xs text-slate-400">
            Técnico
          </label>

          <select
            disabled={loading}
            value={ticketSeleccionado.tecnico_id || ""}
            onChange={(e) =>
              actualizar({
                tecnico_id: e.target.value
                  ? Number(e.target.value)
                  : null,
              })
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-3
              text-sm
              text-white
              outline-none
              focus:border-blue-500
            "
          >
            <option value="">
              Sin asignar
            </option>

            {tecnicos.map((tecnico) => (
              <option
                key={tecnico.id}
                value={tecnico.id}
              >
                {tecnico.nombre}
              </option>
            ))}
          </select>
        </>
      )}

    </section>
  );
};

export default TicketActions;