import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const PlanesAdmin = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get('/planes');
        setPlanes(data);
      } catch (err) {
        console.error(err);
      }
    };
    cargar();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de Planes</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        + Nuevo Plan
      </button>
      <div className="grid md:grid-cols-3 gap-4">
        {planes.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold">{p.nombre}</h3>
            <p className="text-3xl font-bold text-blue-600 my-2">${p.precio}</p>
            <p className="text-sm text-gray-600">Velocidad: {p.velocidad}</p>
            <p className="text-sm mb-4">{p.descripcion}</p>
            <div className="flex space-x-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanesAdmin;
