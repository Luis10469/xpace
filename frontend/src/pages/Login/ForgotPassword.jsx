import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const { data } = await api.post("/auth/recover-password", {
        correo,
      });

      toast.success(data.message);

      setCorreo("");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "No fue posible enviar el correo."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="max-w-md w-full bg-slate-800/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          🔑 Recuperar contraseña
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Ingresa el correo con el que te registraste.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-white font-semibold mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@correo.com"
              required
              className="w-full px-4 py-3 bg-slate-800/20 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-300 transition"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading
              ? "Enviando..."
              : "Enviar enlace de recuperación"}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            ← Volver al inicio de sesión
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;