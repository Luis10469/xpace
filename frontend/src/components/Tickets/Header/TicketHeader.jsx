const TicketHeader = ({ titulo = "Gestión de Tickets", descripcion = "Administra solicitudes, conversaciones y soporte técnico." }) => {
  return (
    <div className="mb-6">
      {/* ======================================
          ENCABEZADO
      ====================================== */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {titulo}
          </h1>

          <p className="text-slate-400 mt-1">
            {descripcion}
          </p>
        </div>

        {/* ======================================
            ESTADO
        ====================================== */}

        <div
          className="
            hidden
            md:flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-slate-800
            border
            border-slate-700
            text-sm
            text-slate-300
          "
        >
          <span className="w-2 h-2 rounded-full bg-green-500" />

          Sistema activo
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
