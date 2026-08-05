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
  <div className="w-full">

    {/* Encabezado */}

    <div className="mb-8">

      <p className="text-blue-400 uppercase text-sm font-semibold tracking-widest">
        Administración
      </p>

      <h1 className="text-4xl font-bold text-white mt-1">
        Panel de Administración
      </h1>

      <p className="text-slate-400 mt-2">
        Consulta el estado general del sistema y sus principales indicadores.
      </p>

    </div>

    {/* Tarjetas */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div
         className="
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            p-8
            shadow-xl
            hover:border-blue-500
            hover:shadow-blue-500/10
            transition-all
            flex
            flex-col
            items-center
            justify-center
          "
      >
        <p className="text-slate-400 text-lg">
          👥 Clientes
        </p>

        <h2 className="text-5xl font-bold text-blue-500 mt-6">
          {stats.clientes}
        </h2>
      </div>

      <div
        className="
          bg-slate-800
          border
          border-slate-700
          rounded-2xl
          p-8
          shadow-xl
          hover:border-green-500
          hover:shadow-green-500/10
          transition-all
        "
      >
        <p className="text-slate-400 text-lg">
          📡 Planes
        </p>

        <h2 className="text-5xl font-bold text-green-500 mt-4">
          {stats.planes}
        </h2>
      </div>

      <div
        className="
          bg-slate-800
          border
          border-slate-700
          rounded-2xl
          p-8
          shadow-xl
          hover:border-yellow-500
          hover:shadow-yellow-500/10
          transition-all
        "
      >
        <p className="text-slate-400 text-lg">
          🎫 Tickets
        </p>

        <h2 className="text-5xl font-bold text-yellow-500 mt-4">
          {stats.tickets}
        </h2>
      </div>

      <div
        className="
          bg-slate-800
          border
          border-slate-700
          rounded-2xl
          p-8
          shadow-xl
          hover:border-red-500
          hover:shadow-red-500/10
          transition-all
        "
      >
        <p className="text-slate-400 text-lg">
          📍 Zonas
        </p>

        <h2 className="text-5xl font-bold text-red-500 mt-4">
          {stats.zonas}
        </h2>
      </div>

    </div>

  </div>
);
};

export default AdminDashboard;
