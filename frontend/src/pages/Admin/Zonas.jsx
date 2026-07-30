import { useState } from 'react';

const Zonas = () => {
  const [zonas, setZonas] = useState([
    { id: 1, nombre: 'Centro', descripcion: 'Zona central', estado: 'activa' },
    { id: 2, nombre: 'Norte', descripcion: 'Sector norte', estado: 'activa' }
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de Zonas</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Nueva Zona</button>
      <div className="bg-slate-800 rounded shadow">
        {zonas.map((z) => (
          <div key={z.id} className="p-4 border-b flex justify-between">
            <div>
              <h3 className="font-bold">{z.nombre}</h3>
              <p className="text-sm text-slate-300">{z.descripcion}</p>
            </div>
            <div>
              <button className="text-blue-600 mr-2">Editar</button>
              <button className="text-red-600">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Zonas;
