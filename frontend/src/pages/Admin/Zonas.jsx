import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import ZonaModal from "../../components/Zonas/ZonaModal";

const Zonas = () => {

  const [zonas, setZonas] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    estado: 1,
  });

  const [busqueda, setBusqueda] = useState("");

  // ==========================
  // CARGAR ZONAS
  // ==========================

  const cargarZonas = async () => {

    try {

      const { data } = await api.get("/zonas");

      setZonas(data);

    } catch (error) {

      console.error(error);

      toast.error("No se pudieron cargar las zonas.");

    }

  };

  useEffect(() => {

    cargarZonas();

  }, []);

  // ==========================
  // NUEVA ZONA
  // ==========================

  const abrirNuevaZona = () => {

    setModoEdicion(false);

    setZonaSeleccionada(null);

    setFormulario({
      nombre: "",
      descripcion: "",
      estado: 1,
    });

    setMostrarModal(true);

  };

  // ==========================
  // EDITAR
  // ==========================

  const editarZona = (zona) => {

    setModoEdicion(true);

    setZonaSeleccionada(zona);

    setFormulario({
      nombre: zona.nombre,
      descripcion: zona.descripcion,
      estado: Number(zona.estado),
    });

    setMostrarModal(true);

  };

  // ==========================
  // GUARDAR
  // ==========================

  const guardarZona = async () => {

    try {

      if (modoEdicion) {

        await api.put(
          `/zonas/${zonaSeleccionada.id}`,
          formulario
        );

        toast.success("Zona actualizada correctamente");

      } else {

        await api.post(
          "/zonas",
          formulario
        );

        toast.success("Zona creada correctamente");

      }

      setMostrarModal(false);

      cargarZonas();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Ocurrió un error."
      );

    }

  };

  const zonasFiltradas = zonas.filter((z) =>

    z.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||

    (z.descripcion || "")
      .toLowerCase()
      .includes(busqueda.toLowerCase())

  );
return (
  <div className="min-h-screen bg-slate-900 p-8 text-white">

    {/* Encabezado */}
    <div className="flex justify-between items-center mb-8">

      <div>

        <p className="text-blue-400 uppercase text-sm font-semibold tracking-widest">
          Administración
        </p>

        <h1 className="text-5xl font-bold">
          Gestión de Zonas
        </h1>

        <p className="text-slate-400 mt-2">
          Administra todas las zonas de cobertura de Spacex Fiber.
        </p>

      </div>

      <button
        onClick={abrirNuevaZona}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
      >
        + Nueva Zona
      </button>

    </div>

    {/* Tarjetas */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

        <p className="text-slate-400">
          Total Zonas
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {zonas.length}
        </h2>

      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

        <p className="text-green-400">
          Activas
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {zonas.filter(z => Number(z.estado) === 1).length}
        </h2>

      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

        <p className="text-yellow-400">
          Cobertura
        </p>

        <h2 className="text-4xl font-bold mt-2">
          100%
        </h2>

      </div>

    </div>

    {/* Buscador */}

    <div className="mb-8">

      <input
        type="text"
        placeholder="🔍 Buscar zona..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500"
      />

    </div>

    {/* Tabla */}

    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">

      <table className="w-full">

        <thead className="bg-slate-700">

          <tr>

            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Descripción</th>
            <th className="p-4 text-center">Estado</th>
            <th className="p-4 text-center">Acciones</th>

          </tr>

        </thead>

        <tbody>

          {zonasFiltradas.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="text-center p-8 text-slate-400"
              >
                No existen zonas registradas.
              </td>

            </tr>

          ) : (

            zonasFiltradas.map((zona) => (

              <tr
                key={zona.id}
                className="border-t border-slate-700 hover:bg-slate-700 transition"
              >

                <td className="p-4 font-semibold">
                  {zona.nombre}
                </td>

                <td className="p-4 text-slate-300">
                  {zona.descripcion}
                </td>

                <td className="p-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      Number(zona.estado) === 1
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {Number(zona.estado) === 1
                      ? "Activa"
                      : "Inactiva"}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => editarZona(zona)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                    >
                      Editar
                    </button>

                    <button
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                      Eliminar
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

    <ZonaModal
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      formulario={formulario}
      setFormulario={setFormulario}
      guardarZona={guardarZona}
      modoEdicion={modoEdicion}
    />

  </div>
);
};
export default Zonas;