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
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-800 rounded-3xl w-full max-w-5xl p-10 shadow-2xl">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-bold text-white">

            {modoEdicion ? "Editar Cliente" : "Nuevo Cliente"}

          </h2>

          <button
            onClick={() => setMostrarModal(false)}
            className="text-3xl text-slate-400 hover:text-white"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Nombre */}

          <div>

            <label className="block mb-2 text-slate-300 font-semibold">
              Nombre
            </label>

            <input
              type="text"
              value={formulario.nombre || ""}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  nombre: e.target.value,
                })
              }
              className="w-full bg-slate-900 rounded-xl px-5 py-4 border border-slate-600"
            />

          </div>

          {/* Correo */}

          <div>

            <label className="block mb-2 text-slate-300 font-semibold">
              Correo
            </label>

            <input
              type="email"
              value={formulario.correo || ""}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  correo: e.target.value,
                })
              }
              className="w-full bg-slate-900 rounded-xl px-5 py-4 border border-slate-600"
            />

          </div>

          {/* Teléfono */}

          <div>

            <label className="block mb-2 text-slate-300 font-semibold">
              Teléfono
            </label>

            <input
              type="text"
              value={formulario.telefono || ""}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  telefono: e.target.value,
                })
              }
              className="w-full bg-slate-900 rounded-xl px-5 py-4 border border-slate-600"
            />

          </div>

          {/* Dirección */}

          <div>

            <label className="block mb-2 text-slate-300 font-semibold">
              Dirección
            </label>

            <input
              type="text"
              value={formulario.direccion || ""}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  direccion: e.target.value,
                })
              }
              className="w-full bg-slate-900 rounded-xl px-5 py-4 border border-slate-600"
            />

          </div>

          {/* Plan */}

          <div>

            <label className="block mb-2 text-slate-300 font-semibold">
              Plan
            </label>

            <select
              value={formulario.plan_id}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  plan_id: e.target.value,
                })
              }
              className="w-full bg-slate-900 rounded-xl px-5 py-4 border border-slate-600"
            >

              <option value="">Seleccione</option>

              {planes.map((plan) => (

                <option key={plan.id} value={plan.id}>

                  {plan.nombre}

                </option>

              ))}

            </select>

          </div>

          {/* Zona */}

          <div>

            <label className="block mb-2 text-slate-300 font-semibold">
              Zona
            </label>

            <select
              value={formulario.zona_id}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  zona_id: e.target.value,
                })
              }
              className="w-full bg-slate-900 rounded-xl px-5 py-4 border border-slate-600"
            >

              <option value="">Seleccione</option>

              {zonas.map((zona) => (

                <option key={zona.id} value={zona.id}>

                  {zona.nombre}

                </option>

              ))}

            </select>

          </div>

          {/* Estado */}

          <div>

            <label className="block mb-2 text-slate-300 font-semibold">
              Estado
            </label>

            <select
              value={formulario.estado}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  estado: e.target.value,
                })
              }
              className="w-full bg-slate-900 rounded-xl px-5 py-4 border border-slate-600"
            >

              <option value="activo">Activo</option>

              <option value="suspendido">Suspendido</option>

            </select>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-10">

          <button
            onClick={() => setMostrarModal(false)}
            className="bg-slate-600 hover:bg-slate-500 px-8 py-4 rounded-xl font-semibold"
          >
            Cancelar
          </button>

          <button
            onClick={guardarCliente}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
          >
            {modoEdicion ? "Actualizar Cliente" : "Guardar Cliente"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ClienteModal;