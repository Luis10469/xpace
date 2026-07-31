const ClienteToolbar = ({
  abrirNuevoCliente,
  editarCliente,
  suspenderCliente,
  clienteSeleccionado,
}) => {
  return (
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
  );
};

export default ClienteToolbar;