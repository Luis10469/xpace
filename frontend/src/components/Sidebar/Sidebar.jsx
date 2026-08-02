import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ rol }) => {
  const location = useLocation();

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
  { path: '/admin/noticias', label: '📰 Noticias' },
  { path: '/admin/reportes', label: '📈 Reportes' }
];

  const menu = rol === 'admin' ? menuAdmin : menuCliente;

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-700 shadow-2xl">

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

      <nav className="p-4 space-y-2">

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

      <div className="absolute bottom-0 w-72 p-6 border-t border-slate-700">

        <p className="text-slate-500 text-sm">
          Spacex Fiber v2.0
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;