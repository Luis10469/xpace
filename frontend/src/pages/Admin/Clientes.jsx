import { useEffect, useState } from "react";
import api from "../../services/api.js";
import ClienteToolbar from "../../components/Clientes/ClienteToolbar.jsx";
import ClienteModal from "../../components/Clientes/ClienteModal";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [zonas, setZonas] = useState([]);

  // ==========================
  // SELECCIÓN
  // ==========================
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // ==========================
  // MODAL
  // ==========================
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  // ==========================
  // FORMULARIO
  // ==========================
const [formulario, setFormulario] = useState({
  usuario_id: "",
  nombre: "",
  correo: "",
  telefono: "",
  plan_id: "",
  zona_id: "",
  direccion: "",
  estado: "activo",
});
  // ==========================
  // CARGA DE DATOS
  // ==========================
  const cargarClientes = async () => {
    try {
      const { data } = await api.get("/clientes");
      setClientes(data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    }
  };

  const cargarPlanes = async () => {
    try {
      const { data } = await api.get("/planes");
      setPlanes(data);
    } catch (error) {
      console.error("Error cargando planes:", error);
    }
  };

  const cargarZonas = async () => {
    try {
      const { data } = await api.get("/zonas");
      setZonas(data);
    } catch (error) {
      console.error("Error cargando zonas:", error);
    }
  };

  useEffect(() => {
    cargarClientes();
    cargarPlanes();
    cargarZonas();
  }, []);

  // ==========================
  // FUNCIONES
  // ==========================
const abrirNuevoCliente = () => {
  setModoEdicion(false);
  setClienteSeleccionado(null);

  setFormulario({
    usuario_id: "",
    nombre: "",
    correo: "",
    telefono: "",
    plan_id: "",
    zona_id: "",
    direccion: "",
    estado: "activo",
  });

  setMostrarModal(true);
};
  const editarCliente = (cliente) => {

  setModoEdicion(true);

  setClienteSeleccionado(cliente);

setFormulario({

  id: cliente.id,

  usuario_id: cliente.usuario_id,

  nombre: cliente.nombre ?? "",
  correo: cliente.correo ?? "",
  telefono: cliente.telefono ?? "",

  plan_id: cliente.plan_id ?? "",
  zona_id: cliente.zona_id ?? "",

  direccion: cliente.direccion ?? "",

  estado: cliente.estado ?? "activo",

  fecha_instalacion: cliente.fecha_instalacion ?? ""

});

  setMostrarModal(true);

};
  const suspenderCliente = (id) => {
    console.log("Función de suspensión pendiente", id);
  };

  const guardarCliente = async () => {
  try {

    if (modoEdicion) {

      await api.put(
        `/clientes/${clienteSeleccionado.id}`,
        formulario
      );

    } else {

      await api.post(
        "/clientes",
        formulario
      );

    }

    setMostrarModal(false);

    setFormulario({
      usuario_id: "",
      nombre: "",
      correo: "",
      telefono: "",
      plan_id: "",
      zona_id: "",
      direccion: "",
      estado: "activo",
    });

    setClienteSeleccionado(null);

    await cargarClientes();

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Ocurrió un error"
    );

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
          <ClienteToolbar
            abrirNuevoCliente={abrirNuevoCliente}
            editarCliente={editarCliente}
            suspenderCliente={suspenderCliente}
            clienteSeleccionado={clienteSeleccionado}
          />
        </div>

        <ClienteModal
          mostrarModal={mostrarModal}
          modoEdicion={modoEdicion}
          formulario={formulario}
          setFormulario={setFormulario}
          guardarCliente={guardarCliente}
          setMostrarModal={setMostrarModal}
          planes={planes}
          zonas={zonas}
          recargarClientes={cargarClientes}
        />

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
                  onClick={() => setClienteSeleccionado(c)}
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