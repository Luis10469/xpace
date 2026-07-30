import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

const Registro = () => {
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '', contraseña: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      toast.success('Registro exitoso');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nombre completo" required
          value={form.nombre}
          onChange={(e) => setForm({...form, nombre: e.target.value})}
          className="w-full p-2 border rounded" />
        <input type="email" placeholder="Correo" required
          value={form.correo}
          onChange={(e) => setForm({...form, correo: e.target.value})}
          className="w-full p-2 border rounded" />
        <input type="tel" placeholder="Teléfono" required
          value={form.telefono}
          onChange={(e) => setForm({...form, telefono: e.target.value})}
          className="w-full p-2 border rounded" />
        <input type="password" placeholder="Contraseña" required
          value={form.contraseña}
          onChange={(e) => setForm({...form, contraseña: e.target.value})}
          className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
