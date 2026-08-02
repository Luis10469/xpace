import { useEffect, useState } from "react";
import api from "../../services/api";

const Cobertura = () => {

  const [busqueda, setBusqueda] = useState("");

  const [zonas, setZonas] = useState([]);

  // ==========================
  // CARGAR ZONAS ACTIVAS
  // ==========================

  const cargarZonas = async () => {

    try {

      const { data } = await api.get("/zonas/public");

      setZonas(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    cargarZonas();

  }, []);

  // ==========================
  // BUSCADOR
  // ==========================

  const zonasFiltradas = zonas.filter((zona) =>

    zona.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||

    (zona.descripcion || "")
      .toLowerCase()
      .includes(busqueda.toLowerCase())

  );

  return (

    <div className="py-8 text-white">

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 drop-shadow-2xl">
        🗺️ Consulta tu Cobertura
      </h1>

      <p className="text-center text-gray-300 mb-10 text-lg">
        Verifica si llegamos a tu zona
      </p>

      {/* Buscador */}

      <div className="max-w-2xl mx-auto mb-12">

        <div className="bg-slate-800/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">

          <label className="block text-white font-semibold mb-3">
            Ingresa tu barrio o residencia
          </label>

          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej: Centro, Norte, Sur..."
            className="w-full px-4 py-3 bg-slate-800/20 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-300 transition"
          />

        </div>

      </div>

      {/* Tarjetas */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {zonasFiltradas.map((zona) => (

          <div
            key={zona.id}
            className="bg-slate-800/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-slate-800/20 hover:border-blue-400/50 transition transform hover:-translate-y-1 shadow-xl"
          >

            <div className="flex items-center justify-between mb-3">

              <h3 className="text-xl font-bold text-white">
                📍 {zona.nombre}
              </h3>

              <span className="bg-green-500/30 text-green-200 text-xs px-3 py-1 rounded-full border border-green-400/30">
                Disponible
              </span>

            </div>

            <p className="text-gray-200">
              {zona.descripcion}
            </p>

          </div>

        ))}

      </div>

      {/* Sin resultados */}

      {zonasFiltradas.length === 0 && (

        <div className="text-center text-gray-300 mt-12">

          <p className="text-2xl mb-2">
            😔
          </p>

          <p className="text-lg">
            No encontramos zonas con ese nombre.
          </p>

          <p className="text-sm mt-2">
            Intenta con otra búsqueda.
          </p>

        </div>

      )}

    </div>

  );

};

export default Cobertura;