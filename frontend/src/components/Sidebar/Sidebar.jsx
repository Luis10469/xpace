import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Sidebar = ({ rol }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const cerrarSesion = () => {
    logout();
    navigate('/login');
  };

  const menuCliente = [
    { path: '/cliente', label: '🏠 Dashboard', exact: true },
    { path: '/cliente/servicio', label: '📡 Mi Servicio' },
    { path: '/cliente/facturas', label: '💰 Facturas' },
    { path: '/cliente/tickets', label: '🎫 Tickets' },
    { path: '/cliente/perfil', label: '👤 Perfil' },
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
    { path: '/admin/reportes', label: '📈 Reportes' },
  ];

  const menu = rol === 'admin' ? menuAdmin : menuCliente;

  return (
    <aside
      className="
        fixed
        top-0
        left-0
        z-50

        w-[360px]
        h-screen

        bg-slate-950
        border-r
        border-slate-700

        flex
        flex-col

        overflow-hidden
      "
    >
      {/* LOGO */}
      <div
        className="
          shrink-0
          p-6
          border-b
          border-slate-700
        "
      >
        <h1 className="text-3xl font-extrabold text-blue-500">
          Spacex Fiber
        </h1>

        <p className="text-slate-400 mt-1 capitalize">
          Panel {rol}
        </p>
      </div>

      {/* MENÚ CON SCROLL */}
      <nav
        className="
          flex-1
          min-h-0
          overflow-y-auto

          p-4
          space-y-2

          scrollbar-thin
          scrollbar-thumb-slate-600
          scrollbar-track-transparent
        "
      >
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

      {/* FOOTER FIJO ABAJO */}
      <div
        className="
          shrink-0
          p-6
          border-t
          border-slate-700
          bg-slate-950
        "
      >
        <button
          type="button"
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

        <p className="text-center text-slate-500 mt-5">
          Spacex Fiber v2.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;