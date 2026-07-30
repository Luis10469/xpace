const Footer = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-md text-white mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-8 text-center">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl">📡</span> SpaceX Fiber © 2026
        </h3>
        <p className="text-gray-300 mb-4">Internet de alta velocidad para tu hogar y empresa</p>
       <div className="flex justify-center items-center gap-6 mb-6">

  {/* Facebook */}
  <a
    href="https://www.facebook.com/TU_PAGINA"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition text-lg"
  >
    Facebook
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/TU_USUARIO"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-400 transition text-lg"
  >
    Instagram
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/573001234567"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-green-400 transition text-lg"
  >
    WhatsApp
  </a>

</div>
        
        <p className="text-gray-500 text-sm">
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
