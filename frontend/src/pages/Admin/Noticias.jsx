import { useState } from 'react';
import toast from 'react-hot-toast';

const Noticias = () => {
  const [form, setForm] = useState({ titulo: '', contenido: '', tipo: 'noticia' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Noticia publicada');
    setForm({ titulo: '', contenido: '', tipo: 'noticia' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de Noticias</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
        <input type="text" placeholder="Título" required
          value={form.titulo}
          onChange={(e) => setForm({...form, titulo: e.target.value})}
          className="w-full p-2 border rounded mb-3" />
        <textarea placeholder="Contenido" required
          value={form.contenido}
          onChange={(e) => setForm({...form, contenido: e.target.value})}
          className="w-full p-2 border rounded mb-3" />
        <select value={form.tipo}
          onChange={(e) => setForm({...form, tipo: e.target.value})}
          className="w-full p-2 border rounded mb-3">
          <option value="noticia">Noticia</option>
          <option value="mantenimiento">Mantenimiento</option>
          <option value="aviso">Aviso</option>
          <option value="promocion">Promoción</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Publicar</button>
      </form>
    </div>
  );
};

export default Noticias;
