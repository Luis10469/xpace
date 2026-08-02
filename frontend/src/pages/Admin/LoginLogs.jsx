import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const LoginLogs = () => {

  const [logs, setLogs] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  // ==========================
  // CARGAR HISTORIAL
  // ==========================

  const cargarLogs = async () => {

    try {

      const { data } = await api.get("/login-logs");

      setLogs(data);

    } catch (error) {

      console.error(error);

      toast.error("No se pudo cargar el historial.");

    }

  };

  useEffect(() => {

    cargarLogs();

  }, []);

  // ==========================
  // FILTRO
  // ==========================

  const logsFiltrados = logs.filter((log) =>

    log.correo
      .toLowerCase()
      .includes(busqueda.toLowerCase())

  );

  // ==========================
  // FORMATO FECHA
  // ==========================

  const formatearFecha = (fecha) => {

    return new Date(fecha).toLocaleString("es-CO");

  };

  return (

    <div className="min-h-screen bg-slate-900 p-8 text-white">

      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <p className="text-blue-400 uppercase tracking-widest font-semibold text-sm">

            Seguridad

          </p>

          <h1 className="text-5xl font-black mt-2">

            Historial de Accesos

          </h1>

          <p className="text-slate-400 mt-2">

            Consulta todos los inicios de sesión registrados en el sistema.

          </p>

        </div>

      </div>

      {/* ==========================
          TARJETAS
      ========================== */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <p className="text-slate-400">

            Total registros

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {logs.length}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <p className="text-green-400">

            Exitosos

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {
              logs.filter(
                log => log.estado === "Exitoso"
              ).length
            }

          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <p className="text-red-400">

            Fallidos

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {
              logs.filter(
                log => log.estado !== "Exitoso"
              ).length
            }

          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <p className="text-yellow-400">

            Bloqueos

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {
              logs.filter(
                log => log.estado === "Cuenta bloqueada"
              ).length
            }

          </h2>

        </div>

      </div>

      {/* ==========================
          BUSCADOR
      ========================== */}

      <div className="mb-8">

        <input

          type="text"

          placeholder="🔍 Buscar por correo..."

          value={busqueda}

          onChange={(e) =>
            setBusqueda(e.target.value)
          }

          className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-4
            outline-none
            focus:border-blue-500
          "

        />
</div>
      {/* ==========================
          TABLA
      ========================== */}

      <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>

              <th className="p-4 text-left">
                Correo
              </th>

              <th className="p-4 text-left">
                IP
              </th>

              <th className="p-4 text-left">
                Navegador
              </th>

              <th className="p-4 text-center">
                Estado
              </th>

              <th className="p-4 text-center">
                Fecha
              </th>

            </tr>

          </thead>

          <tbody>

            {logsFiltrados.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-8 text-slate-400"
                >

                  No existen registros.

                </td>

              </tr>

            ) : (

              logsFiltrados.map((log) => (

                <tr
                  key={log.id}
                  className="border-t border-slate-700 hover:bg-slate-700 transition"
                >

                  <td className="p-4 font-semibold">

                    {log.correo}

                  </td>

                  <td className="p-4 text-slate-300">

                    {log.ip}

                  </td>

                  <td className="p-4 text-slate-300 max-w-xs truncate">

                    {log.navegador}

                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        log.estado === "Exitoso"
                          ? "bg-green-500/20 text-green-400"
                          : log.estado === "Cuenta bloqueada"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >

                      {log.estado}

                    </span>

                  </td>

                  <td className="p-4 text-center text-slate-300">

                    {formatearFecha(log.fecha)}

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

export default LoginLogs;