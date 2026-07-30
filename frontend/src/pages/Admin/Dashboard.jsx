const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-gray-500">Clientes</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-gray-500">Planes</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-gray-500">Tickets</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-gray-500">Zonas</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
