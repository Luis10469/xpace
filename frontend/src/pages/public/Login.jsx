import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [form, setForm] = useState({ correo: '', contraseña: '' });
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      console.log("Respuesta del login:", data);
      login(data.user, data.token);
      toast.success('¡Bienvenido!');
      navigate(data.user.rol === 'admin' ? '/admin' : '/cliente');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          🔐 Iniciar Sesión
        </h2>
        <p className="text-center text-gray-300 mb-6">Accede a tu cuenta Spacex-fiber</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">Correo</label>
            <input 
              type="email" 
              value={form.correo}
              onChange={(e) => setForm({...form, correo: e.target.value})}
              placeholder="tu@correo.com"
              required 
              className="w-full px-4 py-3 bg-slate-800/20 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-300 transition"
            />
          </div>
          
         <div>

  <label className="block text-white font-semibold mb-2">
    Contraseña
  </label>

  <div className="relative">

    <input
      type={mostrarPassword ? "text" : "password"}
      value={form.contraseña}
      onChange={(e) =>
        setForm({
          ...form,
          contraseña: e.target.value
        })
      }
      placeholder="Ingresa tu contraseña"
      required
      className="
        w-full
        px-4
        py-3
        pr-12
        bg-slate-800/20
        border-2
        border-white/30
        rounded-lg
        focus:outline-none
        focus:border-blue-400
        text-white
        placeholder-gray-400
        transition
      "
    />

    <button
      type="button"
      onClick={() =>
        setMostrarPassword(!mostrarPassword)
      }
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-gray-400
        hover:text-blue-400
        transition
      "
    >

      {mostrarPassword ? (
        <FaEyeSlash size={20} />
      ) : (
        <FaEye size={20} />
      )}

    </button>

  </div>

</div>

         <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition"
                >
                ¿Olvidaste tu contraseña?
              </Link>
          </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 shadow-lg mt-6"
              >
                {loading ? 'Cargando...' : 'Ingresar'}
             </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          ¿No tienes cuenta?{' '}
           <Link
            to="/registro"
            className="text-blue-400 hover:underline font-semibold"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
