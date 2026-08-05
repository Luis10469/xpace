import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Sidebar = ({ rol }) => {
  const location = useLocation();
  const navigate = useNavigate();

const { logout } = useAuth();
const cerrarSesion = () => {

  logout();

  navigate("/login");

};

  const menuCliente = [
    { path: '/cliente', label: '🏠 Dashboard', exact: true },
    { path: '/cliente/servicio', label: '📡 Mi Servicio' },
    { path: '/cliente/facturas', label: '💰 Facturas' },
    { path: '/cliente/tickets', label: '🎫 Tickets' },
    { path: '/cliente/perfil', label: '👤 Perfil' }
  ];

  const menuAdmin = [
    { path: '/admin', label: '📊 Dashboard', exact: true },
    { path: '/admin/usuarios', label: '👤 Usuarios' },
    { path: '/admin/clientes', label: '👥 Clientes' },
    { path: '/admin/planes', label: '📡 Planes' },
    { path: '/admin/zonas', label: '📍 Zonas' },
    { path: '/admin/tickets', label: '🎫 Tickets' },
    { path: '/admin/login-logs', label: '🛡️ Historial de accesos' },
    { path: '/admin/noticias', label: '📰 Noticias' },
    { path: '/admin/reportes', label: '📈 Reportes' }
  ];

  const menu = rol === 'admin' ? menuAdmin : menuCliente;

  return (
    <aside className="w-72 h-screen bg-slate-900 border-r border-slate-700 shadow-2xl flex flex-col flex-shrink-0">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-extrabold text-blue-500">
          Spacex Fiber
        </h1>

        <p className="text-slate-400 mt-1 capitalize">
          Panel {rol}
        </p>

      </div>

      {/* Menú */}

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">

        {menu.map((item) => {

          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (

            <Link
              key={item.path}
              to={item.path}
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200
                font-medium

                ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {item.label}
            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      {/* Footer */}

<div className="p-6 border-t border-slate-700 space-y-4 mt-auto">

  <button
    onClick={cerrarSesion}
    className="
      w-full
      bg-red-600
      hover:bg-red-700
      text-white
      font-semibold
      py-3
      rounded-xl
      transition-all
      duration-300
      shadow-lg
      hover:shadow-red-500/30
    "
  >
    🚪 Cerrar sesión
  </button>

  <p className="text-slate-500 text-sm text-center">
    Spacex Fiber v2.0
  </p>

</div>

    </aside>
  );
};

export default Sidebar;