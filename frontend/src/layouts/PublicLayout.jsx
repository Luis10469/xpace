import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import StarField from '../components/StarField/StarField.jsx';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 🌌 Fondo de estrellas */}
      <StarField density={250} showShootingStars={true} />
      
      {/* 🔝 Navbar */}
      <Navbar />
      
      {/* 📄 Contenido */}
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      
      {/* 📍 Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
