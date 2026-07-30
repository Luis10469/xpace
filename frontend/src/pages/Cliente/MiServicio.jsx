import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const MiServicio = () => {
  const [servicio, setServicio] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get('/clientes');
        setServicio(data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    cargar();
  }, []);

  if (!servicio) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mi Servicio</h1>
      <div className="bg-slate-800 p-6 rounded shadow">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400">Estado</p>
            <p className="text-2xl font-bold text-green-600 capitalize">{servicio.estado}</p>
          </div>
          <div>
            <p className="text-slate-400">Plan</p>
            <p className="text-2xl font-bold">{servicio.plan}</p>
          </div>
          <div>
            <p className="text-slate-400">Dirección</p>
            <p className="text-lg">{servicio.direccion}</p>
          </div>
          <div>
            <p className="text-slate-400">Código Contrato</p>
            <p className="text-lg font-mono">{servicio.codigo_contrato}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiServicio;
