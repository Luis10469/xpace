import { useEffect, useState } from "react";
import api from "../../services/api.js";

const Dashboard = () => {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { data } = await api.get("/clientes/mi-servicio");
        setDatos(data);
      } catch (err) {
        console.error(err);
      }
    };

    cargarDatos();
  }, []);

  if (!datos) {
    return (
      <div className="text-white text-xl">
        Cargando información...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Encabezado */}

      <div>
        <h1 className="text-4xl font-bold text-white">
          👋 Bienvenido, {datos.nombre}
        </h1>

        <p className="text-slate-400 mt-2">
          Aquí puedes consultar el estado de tu servicio de Internet.
        </p>
      </div>

      {/* Tarjetas */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400">
            Estado
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {datos.estado}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400">
            Plan contratado
          </p>

          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            {datos.plan_nombre}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400">
            Velocidad
          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {datos.velocidad} Mbps
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400">
            Precio mensual
          </p>

          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            ${datos.precio}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400">
            Zona
          </p>

          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            {datos.zona_nombre}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400">
            Código de contrato
          </p>

          <h2 className="text-2xl font-bold text-white mt-2">
            {datos.codigo_contrato}
          </h2>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
