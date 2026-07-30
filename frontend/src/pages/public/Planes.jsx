import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const Planes = () => {
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
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Nuestros Planes</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-2xl font-bold text-blue-600">{plan.nombre}</h3>
            <p className="text-4xl font-bold my-4">${plan.precio}</p>
            <p className="text-gray-600 mb-2">Velocidad: {plan.velocidad}</p>
            <p className="text-sm mb-4">{plan.descripcion}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Contratar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planes;
