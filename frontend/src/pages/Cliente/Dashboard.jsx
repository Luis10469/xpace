import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const Dashboard = () => {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { data } = await api.get('/clientes');
        setDatos(data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mi Dashboard</h1>
      {datos ? (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-6 rounded shadow">
            <h3 className="text-slate-400">Estado</h3>
            <p className="text-2xl font-bold text-green-600">{datos.estado}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow">
            <h3 className="text-slate-400">Plan</h3>
            <p className="text-2xl font-bold">{datos.plan}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow">
            <h3 className="text-slate-400">Código Contrato</h3>
            <p className="text-xl font-bold">{datos.codigo_contrato}</p>
          </div>
        </div>
      ) : <p>Cargando...</p>}
    </div>
  );
};

export default Dashboard;
