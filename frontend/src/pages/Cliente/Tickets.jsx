import { useState } from "react";
import toast from "react-hot-toast";

import TicketLayout from "../../components/Tickets/Layout/TicketLayout";
import useTickets from "../../components/Tickets/hooks/useTickets";
import { useAuth } from "../../context/AuthContext";

const formularioInicial = {
  asunto: "",
  descripcion: "",
  categoria: "Soporte general",
  prioridad: "Media",
};

const Tickets = () => {
  const { user } = useAuth();

  const [form, setForm] = useState(formularioInicial);

  // Controla si se muestra el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const {
    tickets,
    ticketSeleccionado,
    mensajes,
    historial,
    cargando,
    error,

    setTicketSeleccionado,
    seleccionarTicket,
    cargarTickets,
    agregarTicket,

    cargarMensajes,
    enviarMensajeTicket,
  } = useTickets({
    modoAdmin: false,
  });

  // ==========================================
  // ACTUALIZAR FORMULARIO
  // ==========================================

  const actualizarCampo = (campo, valor) => {
    setForm((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  };

  // ==========================================
  // CREAR TICKET
  // ==========================================

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    const resultado = await agregarTicket(form);

    if (!resultado) return;

    toast.success("Ticket creado y registrado correctamente");

    setForm(formularioInicial);

    // Cerramos el formulario
    setMostrarFormulario(false);

    if (resultado.ticketId) {
      await seleccionarTicket(resultado.ticketId);
    }
  };

  // ==========================================
  // CANCELAR
  // ==========================================

  const cancelarFormulario = () => {
    setForm(formularioInicial);
    setMostrarFormulario(false);
  };

  return (
    <div className="w-full min-w-0">

      {/* ==========================================
          ENCABEZADO
      ========================================== */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Mis tickets de soporte
          </h1>

          <p className="mt-2 text-slate-400">
            Crea y consulta tus solicitudes; cada conversación queda registrada.
          </p>
        </div>

        {/* BOTÓN CREAR TICKET */}

        {!mostrarFormulario && (
          <button
            type="button"
            onClick={() => setMostrarFormulario(true)}
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:bg-blue-700
              hover:shadow-blue-500/20
            "
          >
            🎫 Crear ticket
          </button>
        )}

      </div>

      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (
        <div
          className="
            mb-6
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* ==========================================
          FORMULARIO
          SOLO APARECE AL PRESIONAR CREAR TICKET
      ========================================== */}

      {mostrarFormulario && (
        <div
          className="
            mb-8
            rounded-2xl
            border
            border-slate-700
            bg-slate-800
            p-6
            shadow-lg
          "
        >

          {/* CABECERA DEL FORMULARIO */}

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-white">
                Nueva solicitud
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Describe el problema que necesitas reportar.
              </p>
            </div>

            <button
              type="button"
              onClick={cancelarFormulario}
              className="
                rounded-lg
                px-3
                py-2
                text-slate-400
                transition
                hover:bg-slate-700
                hover:text-white
              "
            >
              ✕
            </button>

          </div>

          {/* FORMULARIO */}

          <form onSubmit={handleSubmit}>

            {/* ASUNTO + CATEGORÍA */}

            <div className="grid gap-3 md:grid-cols-2">

              <input
                required
                value={form.asunto}
                onChange={(e) =>
                  actualizarCampo("asunto", e.target.value)
                }
                placeholder="Asunto"
                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  p-3
                  text-white
                  outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500
                "
              />

              <select
                value={form.categoria}
                onChange={(e) =>
                  actualizarCampo("categoria", e.target.value)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  p-3
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              >
                <option>Soporte general</option>
                <option>Conexión</option>
                <option>Facturación</option>
                <option>Instalación</option>
              </select>

            </div>

            {/* DESCRIPCIÓN */}

            <textarea
              required
              value={form.descripcion}
              onChange={(e) =>
                actualizarCampo("descripcion", e.target.value)
              }
              placeholder="Describe lo que necesitas"
              className="
                mt-3
                min-h-28
                w-full
                resize-y
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                p-3
                text-white
                outline-none
                placeholder:text-slate-400
                focus:border-blue-500
              "
            />

            {/* PRIORIDAD + BOTONES */}

            <div className="mt-4 flex flex-wrap items-center gap-3">

              <select
                value={form.prioridad}
                onChange={(e) =>
                  actualizarCampo("prioridad", e.target.value)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  p-3
                  text-white
                  outline-none
                "
              >
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>

              <button
                type="submit"
                disabled={cargando}
                className="
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {cargando ? "Creando..." : "Crear ticket"}
              </button>

              <button
                type="button"
                onClick={cancelarFormulario}
                className="
                  rounded-xl
                  border
                  border-slate-600
                  px-5
                  py-3
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-slate-700
                  hover:text-white
                "
              >
                Cancelar
              </button>

            </div>

          </form>
        </div>
      )}

      {/* ==========================================
          LISTA / CONVERSACIÓN DE TICKETS
      ========================================== */}

      <TicketLayout
        tickets={tickets}
        ticketSeleccionado={ticketSeleccionado}
        setTicketSeleccionado={setTicketSeleccionado}
        seleccionarTicket={seleccionarTicket}
        cargarTickets={cargarTickets}
        mensajes={mensajes}
        cargarMensajes={cargarMensajes}
        enviarMensajeTicket={enviarMensajeTicket}
        puedeGestionar={false}
        usuarioActual={user}
        historial={historial}
      />

    </div>
  );
};

export default Tickets;