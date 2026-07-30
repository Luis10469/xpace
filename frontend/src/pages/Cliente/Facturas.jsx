import { useState } from 'react';

const Facturas = () => {
  const [facturas] = useState([
    { id: 1, monto: 59900, fecha: '2026-01-15', estado: 'pagada' },
    { id: 2, monto: 59900, fecha: '2026-02-15', estado: 'pendiente' }
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mis Facturas</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Monto</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-3">#{f.id}</td>
                <td className="p-3">${f.monto}</td>
                <td className="p-3">{f.fecha}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    f.estado === 'pagada' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {f.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facturas;
