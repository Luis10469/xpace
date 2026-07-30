import { useState } from 'react';
import toast from 'react-hot-toast';

const Contacto = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success('Mensaje enviado correctamente');

    setForm({
      nombre: '',
      correo: '',
      mensaje: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">

      {/* TÍTULO */}
      <div className="text-center mb-10">
        <span className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
          Estamos para ayudarte
        </span>

        <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4">
          Contáctanos
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto">
          ¿Tienes alguna pregunta, necesitas información o quieres
          contratar nuestro servicio? Escríbenos.
        </p>
      </div>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-3xl
        shadow-2xl
        p-6 md:p-10"
      >

        {/* NOMBRE */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Nombre
          </label>

          <input
            type="text"
            placeholder="Escribe tu nombre"
            required
            value={form.nombre}
            onChange={(e) =>
              setForm({
                ...form,
                nombre: e.target.value,
              })
            }
            className="w-full px-4 py-4 rounded-xl
            bg-white/10
            border border-white/20
            text-white
            placeholder-gray-400
            outline-none
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-500/30
            transition"
          />
        </div>

        {/* CORREO */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="correo@ejemplo.com"
            required
            value={form.correo}
            onChange={(e) =>
              setForm({
                ...form,
                correo: e.target.value,
              })
            }
            className="w-full px-4 py-4 rounded-xl
            bg-white/10
            border border-white/20
            text-white
            placeholder-gray-400
            outline-none
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-500/30
            transition"
          />
        </div>

        {/* MENSAJE */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Mensaje
          </label>

          <textarea
            placeholder="Escribe tu mensaje..."
            required
            rows="6"
            value={form.mensaje}
            onChange={(e) =>
              setForm({
                ...form,
                mensaje: e.target.value,
              })
            }
            className="w-full px-4 py-4 rounded-xl
            bg-white/10
            border border-white/20
            text-white
            placeholder-gray-400
            outline-none
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-500/30
            transition
            resize-none"
          />
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          className="w-full md:w-auto
          px-8 py-3
          rounded-xl
          bg-blue-600
          hover:bg-blue-500
          text-white
          font-bold
          shadow-lg
          shadow-blue-600/30
          transition-all
          duration-300
          hover:-translate-y-1"
        >
          Enviar mensaje
        </button>

      </form>
    </div>
  );
};

export default Contacto;