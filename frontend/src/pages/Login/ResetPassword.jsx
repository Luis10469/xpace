import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    contraseña: "",
    confirmar: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.contraseña !== form.confirmar) {
      return toast.error("Las contraseñas no coinciden.");
    }

    if (form.contraseña.length < 6) {
      return toast.error(
        "La contraseña debe tener mínimo 6 caracteres."
      );
    }

    setLoading(true);

    try {

      const { data } = await api.post(
        "/auth/reset-password",
        {
          token,
          contraseña: form.contraseña,
        }
      );

      toast.success(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "No fue posible actualizar la contraseña."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="max-w-md w-full bg-slate-800/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          🔒 Nueva contraseña
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Escribe una nueva contraseña para tu cuenta.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-white font-semibold mb-2">
              Nueva contraseña
            </label>

            <input
              type="password"
              value={form.contraseña}
              onChange={(e) =>
                setForm({
                  ...form,
                  contraseña: e.target.value,
                })
              }
              required
              className="w-full px-4 py-3 bg-slate-800/20 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-400 text-white transition"
            />

          </div>

          <div>

            <label className="block text-white font-semibold mb-2">
              Confirmar contraseña
            </label>

            <input
              type="password"
              value={form.confirmar}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmar: e.target.value,
                })
              }
              required
              className="w-full px-4 py-3 bg-slate-800/20 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-400 text-white transition"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading
              ? "Actualizando..."
              : "Actualizar contraseña"}
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

export default ResetPassword;