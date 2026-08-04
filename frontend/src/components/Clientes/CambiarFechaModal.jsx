import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const CambiarFechaModal = ({
  abierto,
  cerrar,
  clienteId,
  fechaActual,
  recargar,
}) => {

  const [fecha, setFecha] = useState(
    fechaActual
      ? fechaActual.substring(0, 10)
      : ""
  );

  const [password, setPassword] = useState("");

  const [motivo, setMotivo] = useState("");

  const guardar = async () => {

    console.log("======== CAMBIAR FECHA ========");
    console.log("clienteId:", clienteId);
    console.log("fecha:", fecha);
    console.log("password:", password);
    console.log("motivo:", motivo);

    try {

      await api.put(
        `/clientes/${clienteId}/fecha-instalacion`,
        {
          fecha_instalacion: fecha,
          password,
          motivo,
        }
      );

      toast.success("Fecha actualizada correctamente.");

      recargar();

      cerrar();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "No fue posible actualizar la fecha."
      );

    }

  };

  if (!abierto) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[60]">

      <div className="bg-slate-800 rounded-2xl w-full max-w-xl p-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          🔒 Cambiar fecha de instalación
        </h2>

        <div className="space-y-5">

          <div>

            <label className="block mb-2 text-white">
              Nueva fecha
            </label>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
            />

          </div>

          <div>

            <label className="block mb-2 text-white">
              Contraseña del administrador
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
            />

          </div>

          <div>

            <label className="block mb-2 text-white">
              Motivo del cambio
            </label>

            <textarea
              rows="4"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
            />

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={cerrar}
            className="bg-slate-600 hover:bg-slate-500 px-6 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={guardar}
            className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-xl"
          >
            Confirmar cambio
          </button>

        </div>

      </div>

    </div>

  );

};

export default CambiarFechaModal;