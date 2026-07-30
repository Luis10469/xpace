import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  // Esperar a que termine de cargar el usuario
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold">Cargando...</h2>
      </div>
    );
  }

  if (!user || user.rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar rol="admin" />

      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

