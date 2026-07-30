const Footer = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-md text-white mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-8 text-center">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl">📡</span> WiFiConnect © 2026
        </h3>
        <p className="text-gray-300 mb-4">Internet de alta velocidad para tu hogar y empresa</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-blue-400 transition">Facebook</a>
          <a href="#" className="hover:text-blue-400 transition">Instagram</a>
          <a href="#" className="hover:text-blue-400 transition">WhatsApp</a>
        </div>
        <p className="text-gray-500 text-sm">
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
