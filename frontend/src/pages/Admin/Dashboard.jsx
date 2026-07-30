const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <h3 className="text-slate-400">Clientes</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <h3 className="text-slate-400">Planes</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <h3 className="text-slate-400">Tickets</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-slate-800 p-6 rounded shadow text-center">
          <h3 className="text-slate-400">Zonas</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
