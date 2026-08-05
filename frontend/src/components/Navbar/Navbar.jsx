import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Menu, X } from "lucide-react";

const Navbar = () => {

  const { user, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (

    <nav className="
      fixed
      top-0
      left-0
      right-0
      z-50
      bg-blue-600
      shadow-xl
      border-b
      border-blue-500
    ">

        <div className="
          max-w-7xl
          mx-auto
          px-4
          py-4
          flex
          items-center
          justify-between
        ">

        {/* Logo */}

        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
            text-3xl
            font-bold
            text-white
          "
        >
          <span>📡</span>

          <span>SpaceX Fiber</span>

        </Link>

        {/* Menú */}

        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/cobertura"
            className="hover:text-blue-200 transition"
          >
            Cobertura
          </Link>

          <Link
            to="/planes"
            className="hover:text-blue-200 transition"
          >
            Planes
          </Link>

          <Link
            to="/contacto"
            className="hover:text-blue-200 transition"
          >
            Contacto
          </Link>

          {user ? (

            <>

              <Link
                to={user.rol === "admin" ? "/admin" : "/cliente"}
                className="
                  font-semibold
                  hover:text-blue-200
                "
              >
                👤 {user.nombre}
              </Link>

              <button
                onClick={logout}
                className="
                  bg-red-600
                  hover:bg-red-700
                  px-5
                  py-2
                  rounded-xl
                  transition
                "
              >
                Salir
              </button>

            </>

          ) : (

            <Link
              to="/login"
              className="
                bg-slate-900
                hover:bg-slate-800
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Ingresar
            </Link>

          )}

        </div>
        <button
          onClick={() => setMenuAbierto(true)}
            className="
              md:hidden
              text-3xl
              font-bold
              text-white
            "
          >
            <Menu size={32} />
          </button>

      </div>
{menuAbierto && (

<div className="fixed inset-0 z-50">

  <div
    className="absolute inset-0 bg-black/60"
    onClick={() => setMenuAbierto(false)}
  />

    <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-80 max-w-[85vw]
          bg-slate-900
          p-8
          shadow-2xl
          flex
          flex-col
          gap-6
          animate-slideIn
        "
      >

      <button
        onClick={() => setMenuAbierto(false)}
        className="self-end text-white"
      >
        <X size={30} />
      </button>

    <Link
      to="/cobertura"
      onClick={() => setMenuAbierto(false)}
    >
      📍 Cobertura
    </Link>

    <Link
      to="/planes"
      onClick={() => setMenuAbierto(false)}
    >
      📡 Planes
    </Link>

    <Link
      to="/contacto"
      onClick={() => setMenuAbierto(false)}
    >
      ✉️ Contacto
    </Link>

    {user ? (

      <>
        <Link
          to={user.rol === "admin" ? "/admin" : "/cliente"}
          onClick={() => setMenuAbierto(false)}
        >
          👤 Mi Panel
        </Link>

        <button
          onClick={() => {
            logout();
            setMenuAbierto(false);
          }}
          className="
            bg-red-600
            py-3
            rounded-xl
          "
        >
          Cerrar sesión
        </button>
      </>

    ) : (

      <Link
        to="/login"
        onClick={() => setMenuAbierto(false)}
        className="
          bg-blue-600
          py-3
          rounded-xl
          text-center
        "
      >
        Ingresar
      </Link>

    )}

  </div>

</div>

)}
    </nav>

  );

};

export default Navbar;