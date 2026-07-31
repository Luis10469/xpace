import { useEffect, useState } from "react";
import api from "../../services/api.js";

const Clientes = () => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
const [clientes, setClientes] = useState([]);

const [mostrarModal, setMostrarModal] = useState(false);
const [modoEdicion, setModoEdicion] = useState(false);

const [formulario, setFormulario] = useState({
  usuario_id: "",
  plan_id: "",
  zona_id: "",
  direccion: "",
  estado: "activo",
});

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

  // ==========================
  // FUNCIONES
  // ==========================

 const abrirNuevoCliente = () => {
  setModoEdicion(false);

  setFormulario({
    usuario_id: "",
    plan_id: "",
    zona_id: "",
    direccion: "",
    estado: "activo",
  });

  setMostrarModal(true);
};

  const editarCliente = (cliente) => {
  setModoEdicion(true);

  setFormulario({
    usuario_id: cliente.usuario_id ?? "",
    plan_id: cliente.plan_id ?? "",
    zona_id: cliente.zona_id ?? "",
    direccion: cliente.direccion ?? "",
    estado: cliente.estado ?? "activo",
  });

  setMostrarModal(true);
};
  const suspenderCliente = (id) => {
    console.log("Suspender:", id);
  };
const guardarCliente = async () => {
  try {

    if (modoEdicion) {

      await api.put(`/clientes/${clienteSeleccionado.id}`, formulario);

    } else {

      await api.post("/clientes", formulario);

    }

    setMostrarModal(false);

    const { data } = await api.get("/clientes");
    setClientes(data);

  } catch (error) {
    console.error(error);
    alert("Ocurrió un error");
  }
};
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

               <div className="flex gap-3">

 <button
  onClick={abrirNuevoCliente}
  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
>
  + Nuevo Cliente
</button>

  <button
  disabled={!clienteSeleccionado}
  onClick={() => editarCliente(clienteSeleccionado)}
  className={`px-6 py-3 rounded-xl font-semibold transition ${
    clienteSeleccionado
      ? "bg-amber-500 hover:bg-amber-600 text-white"
      : "bg-slate-700 text-slate-500 cursor-not-allowed"
  }`}
>
  ✏ Editar
</button>

  <button
  disabled={!clienteSeleccionado}
  onClick={() => suspenderCliente(clienteSeleccionado.id)}
  className={`px-6 py-3 rounded-xl font-semibold transition ${
    clienteSeleccionado
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-slate-700 text-slate-500 cursor-not-allowed"
  }`}
>
  ⛔ Suspender
</button>

</div>

    {mostrarModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-800 rounded-2xl w-full max-w-xl p-8">

      <h2 className="text-2xl font-bold mb-6">
        {modoEdicion ? "Editar Cliente" : "Nuevo Cliente"}
      </h2>

      <input
        type="text"
        placeholder="Dirección"
        value={formulario.direccion}
        onChange={(e) =>
          setFormulario({
            ...formulario,
            direccion: e.target.value,
          })
        }
        className="w-full mb-6 bg-slate-700 rounded-xl px-4 py-3"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setMostrarModal(false)}
          className="bg-slate-600 hover:bg-slate-500 px-6 py-3 rounded-xl"
        >
          Cancelar
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          {modoEdicion ? "Actualizar" : "Guardar"}
        </button>

      </div>

    </div>
  </div>
)}
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
            </tr>

          </thead>

          <tbody>

            {clientes.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center p-10 text-slate-400"
                >
                  No hay clientes registrados.
                </td>

              </tr>
              

            ) : (

             clientes.map((c) => (

                    <tr
                      key={c.id}
                      onClick={() => {
                        console.log("Cliente seleccionado:", c);
                        setClienteSeleccionado(c);
                      }}
                      className={`
                        border-t
                        border-slate-700
                        cursor-pointer
                        transition
                        ${
                          clienteSeleccionado?.id === c.id
                            ? "bg-blue-900/40"
                            : "hover:bg-slate-700"
                        }
                      `}
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
