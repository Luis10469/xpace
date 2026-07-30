import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ClienteLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar rol="cliente" />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ClienteLayout;
