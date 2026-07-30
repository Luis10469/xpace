import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

const Registro = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    contraseña: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', form);

      toast.success('Registro exitoso');

      navigate('/login');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Error al registrarse'
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-16">

      <div className="w-full max-w-xl">

        {/* ENCABEZADO */}
        <div className="text-center mb-8">

          <span className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
            Únete a SpaceX Fiber
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-white mt-3">
            Crear cuenta
          </h1>

          <p className="text-gray-300 mt-4">
            Regístrate para acceder a nuestros servicios.
          </p>

        </div>

        {/* TARJETA */}
        <div
          className="bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          shadow-2xl
          p-6 md:p-10"
        >

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NOMBRE */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Nombre completo
              </label>

              <input
                type="text"
                placeholder="Escribe tu nombre completo"
                required
                value={form.nombre}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nombre: e.target.value,
                  })
                }
                className="w-full px-4 py-4 rounded-xl
                bg-white/10
                border border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-500/30
                transition"
              />
            </div>

            {/* CORREO */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Correo electrónico
              </label>

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                required
                value={form.correo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    correo: e.target.value,
                  })
                }
                className="w-full px-4 py-4 rounded-xl
                bg-white/10
                border border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-500/30
                transition"
              />
            </div>

            {/* TELEFONO */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Teléfono
              </label>

              <input
                type="tel"
                placeholder="300 123 4567"
                required
                value={form.telefono}
                onChange={(e) =>
                  setForm({
                    ...form,
                    telefono: e.target.value,
                  })
                }
                className="w-full px-4 py-4 rounded-xl
                bg-white/10
                border border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-500/30
                transition"
              />
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Contraseña
              </label>

              <input
                type="password"
                placeholder="Escribe tu contraseña"
                required
                value={form.contraseña}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contraseña: e.target.value,
                  })
                }
                className="w-full px-4 py-4 rounded-xl
                bg-white/10
                border border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-500/30
                transition"
              />
            </div>

            {/* BOTON */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl
              bg-blue-600
              hover:bg-blue-500
              text-white
              font-bold
              text-lg
              shadow-lg
              shadow-blue-600/30
              transition-all
              duration-300
              hover:-translate-y-1"
            >
              Crear cuenta
            </button>

          </form>

          {/* LOGIN */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              ¿Ya tienes una cuenta?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2
              text-blue-400
              hover:text-blue-300
              font-semibold
              transition"
            >
              Iniciar sesión →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Registro;
