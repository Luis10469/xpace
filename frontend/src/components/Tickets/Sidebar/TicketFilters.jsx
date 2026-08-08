import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TicketFilters = ({ aplicarFiltros }) => {
  const [estado, setEstado] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [busqueda, setBusqueda] = useState("");

  // ======================================
  // GUARDAR FUNCIÓN ACTUAL
  // ======================================

  const aplicarFiltrosRef = useRef(aplicarFiltros);

  useEffect(() => {
    aplicarFiltrosRef.current = aplicarFiltros;
  }, [aplicarFiltros]);

  // ======================================
  // APLICAR FILTROS
  // ======================================

  useEffect(() => {
    const temporizador = setTimeout(() => {
      const filtros = {};

      if (estado) {
        filtros.estado = estado;
      }

      if (orden) {
        filtros.orden = orden;
      }

      if (busqueda.trim()) {
        filtros.buscar = busqueda.trim();
      }

      if (aplicarFiltrosRef.current) {
        aplicarFiltrosRef.current(filtros);
      }
    }, busqueda.trim() ? 500 : 0);

    return () => clearTimeout(temporizador);
  }, [estado, orden, busqueda]);

  // ======================================
  // LIMPIAR
  // ======================================

  const limpiarFiltros = () => {
    setEstado("");
    setOrden("recientes");
    setBusqueda("");
  };

  return (
    <div className="space-y-2">

      {/* ======================================
          BUSCADOR
      ====================================== */}

      <div className="relative">

        <Search
          size={16}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar ticket..."
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            py-2
            pl-9
            pr-9
            text-xs
            text-white
            outline-none
            transition
            placeholder:text-slate-500
            focus:border-blue-500
          "
        />

        {(busqueda || estado || orden !== "recientes") && (
          <button
            type="button"
            onClick={limpiarFiltros}
            title="Limpiar filtros"
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              rounded
              p-1
              text-slate-500
              transition
              hover:text-white
            "
          >
            <X size={14} />
          </button>
        )}

      </div>

      {/* ======================================
          ESTADO + ORDEN
      ====================================== */}

      <div className="grid grid-cols-2 gap-2">

        {/* ESTADO */}

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="
            min-w-0
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-2
            py-2
            text-xs
            text-white
            outline-none
            transition
            focus:border-blue-500
          "
        >
          <option value="">Todos</option>
          <option value="Pendiente">Pendientes</option>
          <option value="En proceso">En proceso</option>
          <option value="Respondido">Respondidos</option>
          <option value="Resuelto">Resueltos</option>
          <option value="Cerrado">Cerrados</option>
        </select>

        {/* ORDEN */}

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="
            min-w-0
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-2
            py-2
            text-xs
            text-white
            outline-none
            transition
            focus:border-blue-500
          "
        >
          <option value="recientes">
            Recientes
          </option>

          <option value="antiguos">
            Antiguos
          </option>

          <option value="prioridad">
            Prioridad alta
          </option>
        </select>

      </div>

    </div>
  );
};

export default TicketFilters;