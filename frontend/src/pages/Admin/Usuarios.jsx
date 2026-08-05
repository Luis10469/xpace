import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/Modals/ConfirmModal";

export default function Usuarios() {

  // ===============================
  // ESTADOS
  // ===============================

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [usuarioAConvertir, setUsuarioAConvertir] = useState(null);

  // ===============================
  // CARGAR USUARIOS
  // ===============================

  const obtenerUsuarios = async () => {

    try {

      const { data } = await api.get("/usuarios");

      setUsuarios(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    obtenerUsuarios();

  }, []);

  // ===============================
  // CONVERTIR EN CLIENTE
  // ===============================

 // ===============================
// ABRIR MODAL
// ===============================

const abrirConvertirCliente = (usuario) => {

  setUsuarioAConvertir(usuario);

  setMostrarConfirmacion(true);

};

// ===============================
// CONFIRMAR CONVERSIÓN
// ===============================

const convertirCliente = async () => {

  if (!usuarioAConvertir) return;

  try {

    const { data } = await api.post(
      `/usuarios/${usuarioAConvertir.id}/convertir`
    );

    toast.success(data.message);

    setMostrarConfirmacion(false);

    setUsuarioAConvertir(null);

    obtenerUsuarios();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Error al convertir el usuario."
    );

  }

};

  // ===============================
  // FILTRO
  // ===============================

  const usuariosFiltrados = useMemo(() => {

    return usuarios.filter((u) => {

      const texto = busqueda.toLowerCase();

      return (

        u.nombre.toLowerCase().includes(texto) ||

        u.correo.toLowerCase().includes(texto)

      );

    });

  }, [usuarios, busqueda]);

  // ===============================
  // ESTADÍSTICAS
  // ===============================

  const totalUsuarios = usuarios.length;

  const totalClientes = usuarios.filter(
    (u) => u.es_cliente
  ).length;

  const totalNoClientes = usuarios.filter(
    (u) => !u.es_cliente
  ).length;

  const totalAdmins = usuarios.filter(
    (u) => u.rol === "admin"
  ).length;

  // ===============================

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen text-white">

        Cargando usuarios...

      </div>

    );

  }

  // ===============================

  return (

    <div className="h-full bg-slate-900 p-8 text-white">

      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <p className="text-blue-400 uppercase text-sm font-semibold tracking-widest">

            Administración

          </p>

          <h1 className="text-4xl font-bold">

            Gestión de Usuarios

          </h1>

          <p className="text-slate-400 mt-2">

            Administra todos los usuarios registrados en Spacex Fiber.

          </p>

        </div>

        <div className="flex gap-3">
          <div>

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                transition-all
                duration-200
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-lg
              "
            >
              + Nuevo Usuario
            </button>

          </div>

          

        </div>

      </div>

      {/* ==========================
          TARJETAS
      ========================== */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

          <p className="text-slate-400">

            Usuarios

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {totalUsuarios}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

          <p className="text-green-400">

            Clientes

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {totalClientes}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

          <p className="text-yellow-400">

            No Clientes

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {totalNoClientes}

          </h2>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

          <p className="text-blue-400">

            Administradores

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {totalAdmins}

          </h2>

        </div>

      </div>

      {/* ==========================
          BUSCADOR
      ========================== */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="🔍 Buscar por nombre o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>
            {/* ==========================
          TABLA
      ========================== */}

      <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr className="text-left text-white">

              <th className="p-4">Nombre</th>
              <th className="p-4">Correo</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Cliente</th>
              <th className="p-4 text-center">Acción</th>

            </tr>

          </thead>

          <tbody>

            {usuariosFiltrados.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center p-10 text-slate-400"
                >

                  No se encontraron usuarios.

                </td>

              </tr>

            ) : (

              usuariosFiltrados.map((usuario) => (

                <tr
                  key={usuario.id}
                  onClick={() => setUsuarioSeleccionado(usuario)}
                  className={`
                    border-t
                    border-slate-700
                    cursor-pointer
                    transition-all
                    duration-200

                    ${
                      usuarioSeleccionado?.id === usuario.id
                        ? "bg-blue-900/40"
                        : "hover:bg-slate-700"
                    }
                  `}
                >

                  <td className="p-4 font-semibold">

                    {usuario.nombre}

                  </td>

                  <td className="p-4 text-slate-300">

                    {usuario.correo}

                  </td>

                  <td className="p-4 text-slate-300">

                    {usuario.telefono || "-"}

                  </td>

                  <td className="p-4">

                    {usuario.rol === "admin" ? (

                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">

                        👑 Administrador

                      </span>

                    ) : (

                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">

                        👤 Cliente

                      </span>

                    )}

                  </td>

                  <td className="p-4">

                    {usuario.es_cliente ? (

                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">

                        🟢 Cliente

                      </span>

                    ) : (

                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">

                        ⚪ No Cliente

                      </span>

                    )}

                  </td>

                  <td className="p-4 text-center">

                    {usuario.es_cliente ? (

                      <button
                        disabled
                        className="
                          bg-green-600
                          text-white
                          px-5
                          py-2
                          rounded-xl
                          font-semibold
                          opacity-70
                          cursor-not-allowed
                        "
                      >

                        ✔ Cliente

                      </button>

                    ) : (

                      <button
                       onClick={(e) => {
                        e.stopPropagation();
                        abrirConvertirCliente(usuario);
                        }}
                        className="
                          bg-blue-600
                          hover:bg-blue-700
                          transition
                          px-5
                          py-2
                          rounded-xl
                          font-semibold
                        "
                      >

                        ➕ Convertir

                      </button>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
      <ConfirmModal
            open={mostrarConfirmacion}
            title="¿Convertir en cliente?"
            message="Se creará un nuevo registro en el módulo Clientes."
            subMessage={`Usuario: ${usuarioAConvertir?.nombre ?? ""}`}
            icon="question"
            color="blue"
            confirmText="Sí, convertir"
            cancelText="Cancelar"
            onConfirm={convertirCliente}
            onCancel={() => {
              setMostrarConfirmacion(false);
              setUsuarioAConvertir(null);
            }}
        />

    </div>

  );

}