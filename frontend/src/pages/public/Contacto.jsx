import { useState } from 'react';
import toast from 'react-hot-toast';

const Contacto = () => {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Mensaje enviado correctamente');
    setForm({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input
          type="text" placeholder="Nombre" required
          value={form.nombre}
          onChange={(e) => setForm({...form, nombre: e.target.value})}
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="email" placeholder="Correo" required
          value={form.correo}
          onChange={(e) => setForm({...form, correo: e.target.value})}
          className="w-full p-3 border rounded mb-4"
        />
        <textarea
          placeholder="Mensaje" required rows="5"
          value={form.mensaje}
          onChange={(e) => setForm({...form, mensaje: e.target.value})}
          className="w-full p-3 border rounded mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
