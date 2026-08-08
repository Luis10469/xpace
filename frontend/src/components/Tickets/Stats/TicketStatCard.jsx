const TicketStatCard = ({
  titulo,
  valor,
  icono,
  color,
  borde,
}) => {
  return (
    <div
      className={`
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        p-5
        transition-all
        duration-200
        ${borde || ""}
      `}
    >
      {/* ======================================
          ENCABEZADO
      ====================================== */}

      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm font-medium">
          {titulo}
        </span>

        <span className="text-xl">
          {icono}
        </span>
      </div>

      {/* ======================================
          VALOR
      ====================================== */}

      <div
        className={`
          mt-3
          text-3xl
          font-bold
          ${color || ""}
        `}
      >
        {valor}
      </div>
    </div>
  );
};

export default TicketStatCard;