import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import IdleTimer from '../components/security/IdleTimer.jsx';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!user || user.rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* SIDEBAR FIJO */}
      <Sidebar rol="admin" />

      {/* CONTENIDO */}
      <main
        className="
          ml-[360px]
          min-h-screen
          w-[calc(100%-360px)]
          p-6
          box-border
          overflow-x-hidden
        "
      >
        <Outlet />
      </main>

      {/* SEGURIDAD */}
      <IdleTimer />

    </div>
  );
};

export default AdminLayout;