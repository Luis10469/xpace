import { useEffect, useState } from "react";
import api from "../../services/api.js";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const { data } = await api.get("/clientes");
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      }
    };

    cargarClientes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-blue-400 uppercase text-sm font-semibold tracking-widest">
            Administración
          </p>

          <h1 className="text-4xl font-bold">
            Gestión de Clientes
          </h1>

          <p className="text-slate-400 mt-2">
            Administra todos los clientes registrados en WiFiConnect.
          </p>
        </div>

        <button
          className="
          bg-blue-600
          hover:bg-blue-700
          px-6
          py-3
          rounded-xl
          font-semibold
          shadow-lg
          transition"
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Tabla */}

      <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr className="text-left text-white">

              <th className="p-4">Código</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Correo</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Zona</th>
              <th className="p-4">Dirección</th>
              <th className="p-4">Instalación</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-center">Acciones</th>

            </tr>

          </thead>

          <tbody>

            {clientes.length === 0 ? (

              <tr>

                <td
                  colSpan="10"
                  className="text-center p-10 text-slate-400"
                >
                  No hay clientes registrados.
                </td>

              </tr>

            ) : (

              clientes.map((c) => (

                <tr
                  key={c.id}
                  className="
                  border-t
                  border-slate-700
                  hover:bg-slate-700
                  transition"
                >

                  <td className="p-4 font-mono text-slate-200">
                    {c.codigo_contrato}
                  </td>

                  <td className="p-4 font-semibold text-white">
                    {c.nombre}
                  </td>

                  <td className="p-4 text-slate-300">
                    {c.correo}
                  </td>

                  <td className="p-4 text-slate-300">
                    {c.telefono}
                  </td>

                  <td className="p-4 text-slate-300">
                    {c.nombre_plan}
                  </td>

                  <td className="p-4 text-slate-300">
                    {c.nombre_zona}
                  </td>

                  <td className="p-4 text-slate-300">
                    {c.direccion}
                  </td>

                  <td className="p-4 text-slate-300">
                    {new Date(c.fecha_instalacion).toLocaleDateString("es-CO")}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        c.estado === "activo"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {c.estado}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2 justify-center">

                      <button
                        className="
                        bg-amber-500
                        hover:bg-amber-600
                        px-4
                        py-2
                        rounded-lg
                        text-white
                        transition"
                      >
                        Editar
                      </button>

                      <button
                        className="
                        bg-red-600
                        hover:bg-red-700
                        px-4
                        py-2
                        rounded-lg
                        text-white
                        transition"
                      >
                        Suspender
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Clientes;
