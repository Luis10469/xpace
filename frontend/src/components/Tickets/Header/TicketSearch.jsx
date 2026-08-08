import { Search } from "lucide-react";

const TicketSearch = ({
  valor = "",
  onChange,
  placeholder = "Buscar ticket...",
}) => {
  return (
    <div className="relative w-full">
      {/* ======================================
          ICONO DE BÚSQUEDA
      ====================================== */}

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          pointer-events-none
        "
      />

      {/* ======================================
          CAMPO DE BÚSQUEDA
      ====================================== */}

      <input
        type="text"
        value={valor}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          bg-slate-900
          border
          border-slate-700
          rounded-xl
          py-3
          pl-11
          pr-4
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-blue-500
          transition
        "
      />
    </div>
  );
};

export default TicketSearch;