const Reportes = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reportes y Estadísticas</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <p className="text-slate-400">Clientes Activos</p>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <p className="text-slate-400">Ingresos Mes</p>
          <p className="text-3xl font-bold text-green-600">$0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <p className="text-slate-400">Tickets Abiertos</p>
          <p className="text-3xl font-bold text-red-600">0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <p className="text-slate-400">Zonas Cubiertas</p>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>
      <div className="bg-slate-800 p-6 rounded shadow">
        <h3 className="font-bold mb-4">Aquí irían las gráficas</h3>
        <p className="text-slate-400">Próximamente con Chart.js</p>
      </div>
    </div>
  );
};

export default Reportes;
