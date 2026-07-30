const Inicio = () => {
  return (
    <div className="text-center py-10 text-white">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
        Bienvenido a <span className="text-blue-400">WiFiConnect</span>
      </h1>
      <p className="text-xl text-gray-300 mb-12">
        Internet de alta velocidad para tu hogar y empresa
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition transform hover:scale-105">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="font-bold text-2xl mb-2 text-white">Alta Velocidad</h3>
          <p className="text-gray-200">Planes desde 50MB hasta 1GB</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition transform hover:scale-105">
          <div className="text-5xl mb-4">📡</div>
          <h3 className="font-bold text-2xl mb-2 text-white">Cobertura Total</h3>
          <p className="text-gray-200">Llegamos a tu barrio o residencia</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition transform hover:scale-105">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="font-bold text-2xl mb-2 text-white">Soporte 24/7</h3>
          <p className="text-gray-200">Atención personalizada todos los días</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

