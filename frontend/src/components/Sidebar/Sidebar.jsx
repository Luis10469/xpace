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
    { path: '/admin', label: '🏠 Dashboard', exact: true },
    { path: '/admin/clientes', label: '👥 Clientes' },
    { path: '/admin/planes', label: '📋 Planes' },
    { path: '/admin/zonas', label: '📍 Zonas' },
    { path: '/admin/tickets', label: '🎫 Tickets' },
    { path: '/admin/noticias', label: '📰 Noticias' },
    { path: '/admin/reportes', label: '📊 Reportes' }
  ];

  const menu = rol === 'admin' ? menuAdmin : menuCliente;

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-400">WiFiConnect</h2>
        <p className="text-sm text-gray-400 capitalize">{rol}</p>
      </div>
      <nav className="space-y-2">
        {menu.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
