import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const Perfil = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ nombre: user?.nombre || '', telefono: user?.telefono || '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Perfil actualizado');
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-3">
          <span className="text-gray-700">Nombre</span>
          <input type="text" value={form.nombre}
            onChange={(e) => setForm({...form, nombre: e.target.value})}
            className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="block mb-3">
          <span className="text-gray-700">Teléfono</span>
          <input type="tel" value={form.telefono}
            onChange={(e) => setForm({...form, telefono: e.target.value})}
            className="w-full p-2 border rounded mt-1" />
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </div>
  );
};

export default Perfil;
