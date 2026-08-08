const TicketMessage = ({ mensaje, usuarioActual }) => {
  const esPropio = Number(mensaje.usuario_id) === Number(usuarioActual?.id);

  return (
    <div
      className={`flex ${
        esPropio ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[75%]
          rounded-2xl
          px-5
          py-4
          ${
            esPropio
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-slate-700 text-white rounded-bl-md"
          }
        `}
      >
        {/* ======================================
            INFORMACIÓN DEL MENSAJE
        ====================================== */}

        <div className="flex justify-between items-center gap-4 mb-2">
          <h4 className="font-semibold text-sm">
            {mensaje.usuario || "Usuario"}
          </h4>

          <span className="text-xs opacity-70">
            {mensaje.fecha ? new Date(mensaje.fecha).toLocaleString("es-CO") : ""}
          </span>
        </div>

        {/* ======================================
            CONTENIDO
        ====================================== */}

        <p className="leading-relaxed break-words">
          {mensaje.mensaje || ""}
        </p>
      </div>
    </div>
  );
};

export default TicketMessage;
