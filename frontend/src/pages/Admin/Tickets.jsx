import { useState } from 'react';

const TicketsAdmin = () => {
  const [tickets] = useState([
    { id: 1, cliente: 'Juan Pérez', asunto: 'Sin internet', estado: 'abierto', prioridad: 'alta' }
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tickets de Soporte</h1>
      <div className="bg-slate-800 rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Asunto</th>
              <th className="p-3">Prioridad</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">#{t.id}</td>
                <td className="p-3">{t.cliente}</td>
                <td className="p-3">{t.asunto}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    t.prioridad === 'alta' ? 'bg-red-200' : 'bg-yellow-200'
                  }`}>
                    {t.prioridad}
                  </span>
                </td>
                <td className="p-3">{t.estado}</td>
                <td className="p-3">
                  <button className="text-blue-600">Responder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsAdmin;
