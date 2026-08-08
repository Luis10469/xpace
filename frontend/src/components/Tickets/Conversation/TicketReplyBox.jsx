import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const TicketReplyBox = ({
  ticketSeleccionado,
  enviarMensajeTicket,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const cerrado = ticketSeleccionado?.estado === "Cerrado";

  // ======================================
  // ENVIAR MENSAJE
  // ======================================

  const enviar = async () => {
    if (!mensaje.trim() || cerrado) return;
    if (!ticketSeleccionado) return;
    if (!enviarMensajeTicket) return;

    try {
      setEnviando(true);

      const resultado = await enviarMensajeTicket(
        ticketSeleccionado.id,
        mensaje.trim()
      );

      if (resultado) {
        setMensaje("");
      }
    } catch (error) {
      console.error(
        "Error al enviar mensaje:",
        error
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="border-t border-slate-700 p-4">

      <div className="flex gap-3">

        {/* ======================================
            ADJUNTAR ARCHIVO
        ====================================== */}

        <button
          type="button"
          disabled={enviando || cerrado}
          className="
            p-3
            rounded-xl
            bg-slate-700
            hover:bg-slate-600
            transition
            disabled:opacity-50
          "
        >
          <Paperclip size={20} />
        </button>

        {/* ======================================
            CAMPO DE MENSAJE
        ====================================== */}

        <input
          type="text"
          value={mensaje}
          disabled={enviando || cerrado}
          onChange={(e) =>
            setMensaje(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              enviar();
            }
          }}
          placeholder={cerrado ? "Este ticket está cerrado" : "Escribe una respuesta..."}
          className="
            flex-1
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            px-4
            outline-none
            focus:border-blue-500
            disabled:opacity-50
          "
        />

        {/* ======================================
            ENVIAR
        ====================================== */}

        <button
          type="button"
          onClick={enviar}
          disabled={
            enviando || cerrado ||
            !mensaje.trim()
          }
          className="
            bg-blue-600
            hover:bg-blue-700
            rounded-xl
            px-5
            transition
            disabled:opacity-50
          "
        >
          {enviando ? (
            "..."
          ) : (
            <Send size={20} />
          )}
        </button>

      </div>
    </div>
  );
};

export default TicketReplyBox;
