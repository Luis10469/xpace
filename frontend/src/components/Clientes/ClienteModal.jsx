import { useState } from "react";
import ClienteForm from "./ClienteForm";
import CambiarFechaModal from "./CambiarFechaModal";

const ClienteModal = ({
  mostrarModal,
  modoEdicion,
  formulario,
  setFormulario,
  guardarCliente,
  setMostrarModal,
  planes,
  zonas,
  recargarClientes,
}) => {

  const [mostrarModalFecha, setMostrarModalFecha] = useState(false);

  if (!mostrarModal) return null;

  return (

    <>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

        <div className="bg-slate-800 rounded-2xl w-full max-w-4xl p-8">

          <h2 className="text-3xl font-bold mb-8 text-white">

            {modoEdicion ? "Editar Cliente" : "Nuevo Cliente"}

          </h2>

          <ClienteForm
            formulario={formulario}
            setFormulario={setFormulario}
            planes={planes}
            zonas={zonas}
          />

          {/* ==========================
              CAMBIO DE FECHA
          ========================== */}

          {modoEdicion && (

            <div className="mt-8 border-t border-slate-700 pt-6">

              <h3 className="text-lg font-semibold text-white mb-2">

                Fecha de instalación

              </h3>

              <p className="text-slate-300 mb-4">

                {
                  formulario.fecha_instalacion
                    ? new Date(
                        formulario.fecha_instalacion
                      ).toLocaleDateString("es-CO")
                    : "Sin fecha registrada"
                }

              </p>

              <button
                onClick={() =>
                  setMostrarModalFecha(true)
                }
                className="
                  bg-amber-600
                  hover:bg-amber-700
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                🔒 Cambiar fecha de instalación
              </button>

            </div>

          )}

          {/* ==========================
              BOTONES
          ========================== */}

          <div className="flex justify-end gap-4 mt-10">

            <button
              onClick={() => setMostrarModal(false)}
              className="
                bg-slate-600
                hover:bg-slate-500
                px-8
                py-3
                rounded-xl
              "
            >
              Cancelar
            </button>

            <button
              onClick={guardarCliente}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-8
                py-3
                rounded-xl
              "
            >
              {modoEdicion ? "Actualizar" : "Guardar"}
            </button>

          </div>

        </div>

      </div>

      {/* ==========================
          MODAL CAMBIO DE FECHA
      ========================== */}

      <CambiarFechaModal
        abierto={mostrarModalFecha}
        cerrar={() => setMostrarModalFecha(false)}
        clienteId={formulario.id}
        fechaActual={formulario.fecha_instalacion}
        recargar={recargarClientes}
      />

    </>

  );

};

export default ClienteModal;