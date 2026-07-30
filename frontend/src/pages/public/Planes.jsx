import { Link } from 'react-router-dom';

const planes = [
  {
    nombre: 'Plan Básico',
    velocidad: '50 MB',
    precio: '$39.900',
    descripcion: 'Ideal para hogares pequeños y navegación diaria.',
    icono: '🏠',
    caracteristicas: [
      'Navegación web',
      'Redes sociales',
      'Videollamadas',
      'Soporte técnico',
    ],
  },
  {
    nombre: 'Plan Familiar',
    velocidad: '100 MB',
    precio: '$59.900',
    descripcion: 'Perfecto para familias y entretenimiento en HD.',
    icono: '👨‍👩‍👧‍👦',
    destacado: true,
    caracteristicas: [
      'Streaming HD',
      'Videollamadas',
      'Múltiples dispositivos',
      'Soporte técnico',
    ],
  },
  {
    nombre: 'Plan Premium',
    velocidad: '200 MB',
    precio: '$79.900',
    descripcion: 'Mayor velocidad para streaming y gaming.',
    icono: '🚀',
    caracteristicas: [
      'Streaming 4K',
      'Gaming online',
      'Muchos dispositivos',
      'Soporte prioritario',
    ],
  },
  {
    nombre: 'Plan Ultra',
    velocidad: '500 MB',
    precio: '$99.900',
    descripcion: 'Máximo rendimiento para hogares conectados.',
    icono: '⚡',
    caracteristicas: [
      'Streaming 4K',
      'Gaming competitivo',
      'Gran cantidad de dispositivos',
      'Soporte prioritario',
    ],
  },
  {
    nombre: 'Plan Empresarial',
    velocidad: '1 GB',
    precio: '$149.900',
    descripcion: 'Conexión de alta capacidad para empresas.',
    icono: '🏢',
    caracteristicas: [
      'Alta velocidad',
      'Conexión empresarial',
      'Múltiples usuarios',
      'Atención preferencial',
    ],
  },
];

const Planes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-white">

      {/* ENCABEZADO */}
      <div className="text-center mb-14">
        <span className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
          Nuestros planes
        </span>

        <h1 className="text-4xl md:text-6xl font-black mt-3 mb-5">
          Elige la velocidad que necesitas
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Encuentra el plan ideal para tu hogar, entretenimiento,
          gaming o empresa.
        </p>
      </div>

      {/* PLANES */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {planes.map((plan) => (
          <div
            key={plan.nombre}
            className={`relative rounded-3xl p-8
              border backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              ${
                plan.destacado
                  ? 'bg-blue-600/20 border-blue-400 shadow-xl shadow-blue-900/30'
                  : 'bg-slate-800/5 border-white/10'
              }`}
          >

            {/* MÁS POPULAR */}
            {plan.destacado && (
              <div
                className="absolute -top-4 left-1/2
                -translate-x-1/2 px-5 py-1.5
                rounded-full bg-blue-500
                text-xs font-black tracking-wide"
              >
                MÁS POPULAR
              </div>
            )}

            {/* ICONO */}
            <div className="text-5xl mb-5">
              {plan.icono}
            </div>

            {/* NOMBRE */}
            <h2 className="text-2xl font-bold mb-2">
              {plan.nombre}
            </h2>

            <p className="text-gray-400 min-h-[48px]">
              {plan.descripcion}
            </p>

            {/* VELOCIDAD */}
            <div className="mt-8">
              <span className="text-5xl font-black text-blue-400">
                {plan.velocidad}
              </span>
            </div>

            {/* PRECIO */}
            <div className="mt-4 mb-7">
              <span className="text-3xl font-black">
                {plan.precio}
              </span>

              <span className="text-gray-400 ml-2">
                / mes
              </span>
            </div>

            {/* CARACTERÍSTICAS */}
            <div className="space-y-3 mb-8">
              {plan.caracteristicas.map((caracteristica) => (
                <div
                  key={caracteristica}
                  className="flex items-center gap-3 text-gray-200"
                >
                  <span className="text-blue-400 font-bold">
                    ✓
                  </span>

                  <span>{caracteristica}</span>
                </div>
              ))}
            </div>

            {/* CONTRATAR */}
            <Link
              to="/registro"
              className={`block w-full text-center
                py-3.5 rounded-xl
                font-bold transition-all duration-300
                ${
                  plan.destacado
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-slate-800/10 hover:bg-blue-600 text-white border border-white/10'
                }`}
            >
              Contratar
            </Link>

          </div>
        ))}

      </div>

      {/* COBERTURA */}
      <div className="mt-16 text-center">

        <p className="text-gray-400 mb-4">
          Antes de contratar, confirma que tenemos cobertura en tu zona.
        </p>

        <Link
          to="/cobertura"
          className="inline-block px-7 py-3 rounded-xl
          bg-slate-800/10 hover:bg-slate-800/20
          border border-white/10
          text-white font-semibold transition"
        >
          Consultar cobertura
        </Link>

      </div>

    </div>
  );
};

export default Planes;