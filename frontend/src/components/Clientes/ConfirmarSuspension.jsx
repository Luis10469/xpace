const ConfirmarSuspension = ({
  abierto,
  onClose,
  onConfirmar,
}) => {

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-800 rounded-2xl p-8 w-[450px]">

        <h2 className="text-2xl font-bold mb-4">
          Suspender Cliente
        </h2>

        <p className="text-slate-300 mb-8">
          ¿Seguro que deseas suspender este cliente?
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="bg-slate-600 px-6 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirmar}
            className="bg-red-600 px-6 py-3 rounded-xl"
          >
            Suspender
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmarSuspension;