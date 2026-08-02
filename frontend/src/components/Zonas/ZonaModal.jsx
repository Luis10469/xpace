const ZonaModal = ({
  mostrarModal,
  setMostrarModal,
  formulario,
  setFormulario,
  guardarZona,
  modoEdicion,
}) => {

  if (!mostrarModal) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl">

        <div className="border-b border-slate-700 p-6">

          <h2 className="text-2xl font-bold text-white">

            {modoEdicion
              ? "Editar Zona"
              : "Nueva Zona"}

          </h2>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="block mb-2 text-slate-300">

              Nombre

            </label>

            <input
              value={formulario.nombre}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  nombre: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="block mb-2 text-slate-300">

              Descripción

            </label>

            <textarea
              rows="3"
              value={formulario.descripcion}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  descripcion: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="block mb-2 text-slate-300">

              Estado

            </label>

            <select
              value={formulario.estado}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  estado: Number(e.target.value),
                })
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            >

              <option value={1}>Activa</option>

              <option value={0}>Inactiva</option>

            </select>

          </div>

        </div>

        <div className="border-t border-slate-700 p-6 flex justify-end gap-3">

          <button
            onClick={() => setMostrarModal(false)}
            className="bg-slate-600 hover:bg-slate-500 px-5 py-2 rounded-lg"
          >

            Cancelar

          </button>

          <button
            onClick={guardarZona}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >

            {modoEdicion
              ? "Guardar Cambios"
              : "Crear Zona"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default ZonaModal;