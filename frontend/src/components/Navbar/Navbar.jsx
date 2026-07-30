import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600/90 backdrop-blur-md text-white shadow-lg border-b border-blue-400/30">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-blue-200 flex items-center gap-2">
          <span className="text-3xl">📡</span>
          <span>WiFiConnect</span>
        </Link>
        <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
          <Link to="/cobertura" className="hover:text-blue-200 transition font-medium">
            Cobertura
          </Link>
          <Link to="/planes" className="hover:text-blue-200 transition font-medium">
            Planes
          </Link>
          <Link to="/contacto" className="hover:text-blue-200 transition font-medium">
            Contacto
          </Link>
          {user ? (
            <>
              <Link 
                to={user.rol === 'admin' ? '/admin' : '/cliente'} 
                className="hover:text-blue-200 transition font-semibold flex items-center gap-1"
              >
                <span>👤</span> {user.nombre}
              </Link>
              <button 
                onClick={logout} 
                className="bg-red-500/90 hover:bg-red-600 px-4 py-1.5 rounded-lg transition backdrop-blur"
              >
                Salir
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-lg font-semibold transition shadow-md"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
