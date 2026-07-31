import ClienteForm from "./ClienteForm";

const ClienteModal = ({
  mostrarModal,
  modoEdicion,
  formulario,
  setFormulario,
  guardarCliente,
  setMostrarModal,
  planes,
  zonas,


}) => {

  if (!mostrarModal) return null;

  return (
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

        <div className="flex justify-end gap-4 mt-10">

          <button
            onClick={() => setMostrarModal(false)}
            className="bg-slate-600 hover:bg-slate-500 px-8 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={guardarCliente}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl"
          >
            {modoEdicion ? "Actualizar" : "Guardar"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ClienteModal;