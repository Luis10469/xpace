import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const Planes = () => {

  const [planes, setPlanes] = useState([]);

  // ==========================
  // CARGAR PLANES
  // ==========================

  const cargarPlanes = async () => {

    try {

      const { data } = await api.get("/planes/public");

      setPlanes(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    cargarPlanes();

  }, []);

  // ==========================
  // ICONOS
  // ==========================

  const obtenerIcono = (nombre) => {

    const texto = nombre.toLowerCase();

    if (texto.includes("básico") || texto.includes("basico")) return "🏠";

    if (texto.includes("familiar")) return "👨‍👩‍👧‍👦";

    if (texto.includes("premium")) return "🚀";

    if (texto.includes("ultra")) return "⚡";

    if (texto.includes("empresarial")) return "🏢";

    return "🌐";

  };

  // ==========================
  // BENEFICIOS
  // ==========================

  const obtenerBeneficios = (velocidad) => {

    const mb = parseInt(velocidad);

    if (mb <= 50) {

      return [

        "Navegación ilimitada",
        "Redes sociales",
        "Videollamadas",
        "Streaming HD",

      ];

    }

    if (mb <= 100) {

      return [

        "Streaming Full HD",
        "Hasta 8 dispositivos",
        "Teletrabajo",
        "Gaming casual",

      ];

    }

    if (mb <= 200) {

      return [

        "Streaming 4K",
        "Gaming online",
        "Muchos dispositivos",
        "Baja latencia",

      ];

    }

    if (mb <= 500) {

      return [

        "Gaming competitivo",
        "Streaming 4K",
        "Hogar inteligente",
        "Alta velocidad",

      ];

    }

    return [

      "Empresas",
      "Servidores",
      "Máximo rendimiento",
      "Soporte prioritario",

    ];

  };

  // ==========================
  // FORMATO MONEDA
  // ==========================

  const formatoPrecio = (precio) => {

    return new Intl.NumberFormat("es-CO", {

      style: "currency",

      currency: "COP",

      maximumFractionDigits: 0,

    }).format(precio);

  };
   return (

    <div className="max-w-7xl mx-auto px-4 py-16 text-white">

      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="text-center mb-16">

        <span className="text-blue-400 uppercase tracking-[5px] font-semibold">

          NUESTROS PLANES

        </span>

        <h1 className="text-5xl md:text-6xl font-black mt-4">

          Internet para cada necesidad

        </h1>

        <p className="text-gray-300 text-lg max-w-3xl mx-auto mt-5">

          Todos nuestros planes incluyen instalación profesional,
          soporte técnico y conexión de alta velocidad.

        </p>

      </div>

      {/* ==========================
          GRID
      ========================== */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {planes.map((plan, index) => (

          <div

            key={plan.id}

            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-3
              hover:shadow-2xl

              ${
                index === 0
                  ? "border-blue-500 bg-blue-500/10 shadow-blue-900/40 shadow-xl"
                  : "border-white/10 bg-slate-800/10"
              }
            `}

          >

            {/* ======================
                MÁS POPULAR
            ====================== */}

            {index === 0 && (

              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-500
                  py-2
                  text-center
                  font-bold
                  tracking-widest
                  text-sm
                "
              >

                ⭐ MÁS POPULAR ⭐

              </div>

            )}

            <div className="p-8">

              {/* ICONO */}

              <div className="text-6xl mb-5">

                {obtenerIcono(plan.nombre)}

              </div>

              {/* NOMBRE */}

              <h2 className="text-3xl font-black">

                {plan.nombre}

              </h2>

              {/* DESCRIPCIÓN */}

              <p className="text-gray-300 mt-3 min-h-[60px]">

                {plan.descripcion}

              </p>

              {/* VELOCIDAD */}

              <div className="mt-8">

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    bg-blue-500/20
                    text-blue-300
                    px-5
                    py-2
                    rounded-full
                    font-bold
                    text-xl
                  "
                >

                  ⚡ {plan.velocidad}

                </span>

              </div>

              {/* PRECIO */}

              <div className="mt-8">

                <span className="text-5xl font-black">

                  {formatoPrecio(plan.precio)}

                </span>

                <span className="text-gray-400 ml-2">

                  / mes

                </span>

              </div>

              {/* CLIENTES */}

              <div className="mt-4">

                <span className="text-sm text-blue-300">

                  👥 Elegido por {plan.total_clientes} clientes

                </span>

              </div> 
                            {/* ======================
                  BENEFICIOS
              ====================== */}

              <div className="mt-8 space-y-4">

                {obtenerBeneficios(plan.velocidad).map((beneficio) => (

                  <div
                    key={beneficio}
                    className="flex items-center gap-3 text-gray-200"
                  >

                    <div
                      className="
                        w-6
                        h-6
                        rounded-full
                        bg-green-500/20
                        flex
                        items-center
                        justify-center
                        text-green-400
                        text-sm
                      "
                    >
                      ✓
                    </div>

                    <span>
                      {beneficio}
                    </span>

                  </div>

                ))}

              </div>

              {/* ======================
                  BOTÓN
              ====================== */}

              <Link
                to="/registro"
                className={`
                  mt-10
                  block
                  w-full
                  text-center
                  py-4
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300

                  ${
                    index === 0
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50"
                      : "bg-slate-700 hover:bg-blue-600 text-white"
                  }
                `}
              >

                🚀 Contratar ahora

              </Link>

            </div>

          </div>

        ))}

      </div>

      {/* ==========================
          COBERTURA
      ========================== */}

      <div className="mt-20 text-center">

        <h3 className="text-3xl font-bold mb-4">

          ¿No sabes si llegamos a tu zona?

        </h3>

        <p className="text-gray-300 mb-8">

          Consulta la cobertura disponible antes de contratar.

        </p>

        <Link
          to="/cobertura"
          className="
            inline-flex
            items-center
            gap-3
            px-8
            py-4
            rounded-2xl
            bg-slate-800
            hover:bg-blue-600
            transition-all
            duration-300
            font-semibold
            border
            border-white/10
          "
        >

          📍 Consultar cobertura

        </Link>

      </div>

    </div>

  );

};

export default Planes;