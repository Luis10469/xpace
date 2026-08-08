import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import IdleTimer from '../components/security/IdleTimer.jsx';

const ClienteLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!user || user.rol !== 'cliente') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">

      {/* ======================================
          SIDEBAR FIJO
      ====================================== */}

      <Sidebar rol="cliente" />

      {/* ======================================
          CONTENIDO
          DEJAMOS ESPACIO PARA EL SIDEBAR
      ====================================== */}

      <main
        className="
          ml-[360px]
          min-h-screen
          p-6
          box-border
        "
      >
        <Outlet />
      </main>

      {/* ======================================
          SEGURIDAD
      ====================================== */}

      <IdleTimer />

    </div>
  );
};

export default ClienteLayout;