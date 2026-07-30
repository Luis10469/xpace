import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get('/clientes');
        setClientes(data);
      } catch (err) {
        console.error(err);
      }
    };
    cargar();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        + Nuevo Cliente
      </button>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Código</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3 font-mono text-sm">{c.codigo_contrato}</td>
                <td className="p-3">{c.nombre}</td>
                <td className="p-3">{c.correo}</td>
                <td className="p-3">{c.plan}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    c.estado === 'activo' ? 'bg-green-200' : 'bg-red-200'
                  }`}>
                    {c.estado}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 mr-2">Editar</button>
                  <button className="text-red-600">Suspender</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
