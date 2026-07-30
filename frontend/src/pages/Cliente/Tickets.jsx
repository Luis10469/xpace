import { useState } from 'react';
import toast from 'react-hot-toast';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ asunto: '', descripcion: '', prioridad: 'media' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTickets([...tickets, { ...form, id: Date.now(), estado: 'abierto' }]);
    toast.success('Ticket creado');
    setForm({ asunto: '', descripcion: '', prioridad: 'media' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mis Tickets</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
        <input type="text" placeholder="Asunto" required
          value={form.asunto}
          onChange={(e) => setForm({...form, asunto: e.target.value})}
          className="w-full p-2 border rounded mb-3" />
        <textarea placeholder="Descripción" required
          value={form.descripcion}
          onChange={(e) => setForm({...form, descripcion: e.target.value})}
          className="w-full p-2 border rounded mb-3" />
        <select value={form.prioridad}
          onChange={(e) => setForm({...form, prioridad: e.target.value})}
          className="w-full p-2 border rounded mb-3">
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Crear Ticket</button>
      </form>
      {tickets.map((t) => (
        <div key={t.id} className="bg-white p-4 rounded shadow mb-2">
          <h3 className="font-bold">{t.asunto}</h3>
          <p className="text-sm text-gray-600">{t.descripcion}</p>
          <span className="text-xs bg-blue-100 px-2 py-1 rounded">{t.estado}</span>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
