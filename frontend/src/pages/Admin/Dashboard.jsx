import { useEffect, useState } from 'react';
import api from '../../services/api.js';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    clientes: 0,
    planes: 0,
    tickets: 0,
    zonas: 0,
  });

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Error al cargar dashboard:', error);
      }
    };

    cargarDashboard();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">
        Panel de Administración
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        {/* CLIENTES */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
          <h3 className="text-slate-400 text-lg">👥 Clientes</h3>
          <p className="text-4xl font-bold text-blue-500 mt-3">
            {stats.clientes}
          </p>
        </div>

        {/* PLANES */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
          <h3 className="text-slate-400 text-lg">📡 Planes</h3>
          <p className="text-4xl font-bold text-green-500 mt-3">
            {stats.planes}
          </p>
        </div>

        {/* TICKETS */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
          <h3 className="text-slate-400 text-lg">🎫 Tickets</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-3">
            {stats.tickets}
          </p>
        </div>

        {/* ZONAS */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition">
          <h3 className="text-slate-400 text-lg">📍 Zonas</h3>
          <p className="text-4xl font-bold text-red-500 mt-3">
            {stats.zonas}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
