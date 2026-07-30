import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    pregunta: '¿Cómo contrato el servicio?',
    respuesta:
      'Debes consultar la cobertura de tu zona y luego elegir el plan que más se adapte a tus necesidades. Un asesor te ayudará con el proceso de contratación.',
  },
  {
    pregunta: '¿Cuánto tarda la instalación?',
    respuesta:
      'La instalación normalmente se programa entre 24 y 48 horas hábiles después de confirmar el servicio.',
  },
  {
    pregunta: '¿Cuáles son los métodos de pago?',
    respuesta:
      'Puedes consultar los métodos de pago disponibles durante la contratación o comunicarte con nuestro equipo de soporte.',
  },
  {
    pregunta: '¿Puedo cambiar de plan?',
    respuesta:
      'Sí. Puedes solicitar un cambio de plan según la disponibilidad y las condiciones de tu servicio.',
  },
  {
    pregunta: '¿Qué pasa si tengo problemas con el servicio?',
    respuesta:
      'Puedes comunicarte con soporte o crear un ticket desde tu cuenta para que nuestro equipo pueda ayudarte.',
  },
];

const FAQ = () => {
  const [abierta, setAbierta] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-white">

      {/* ENCABEZADO */}
      <div className="text-center mb-12">
        <span className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
          Centro de ayuda
        </span>

        <h1 className="text-4xl md:text-5xl font-black mt-3">
          Preguntas frecuentes
        </h1>

        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Encuentra respuestas a las preguntas más comunes sobre
          WiFiConnect.
        </p>
      </div>

      {/* PREGUNTAS */}
      <div className="space-y-4">

        {faqs.map((faq, index) => {
          const estaAbierta = abierta === index;

          return (
            <div
              key={index}
              className="rounded-2xl overflow-hidden
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              shadow-lg"
            >

              <button
                type="button"
                onClick={() =>
                  setAbierta(estaAbierta ? null : index)
                }
                className="w-full flex items-center justify-between
                gap-4 px-6 py-5 text-left
                hover:bg-white/10 transition"
              >
                <span className="text-lg font-bold text-white">
                  {faq.pregunta}
                </span>

                <span
                  className={`text-3xl text-blue-400 transition-transform duration-300 ${
                    estaAbierta ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              {estaAbierta && (
                <div className="px-6 pb-6">
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* VOLVER */}
      <div className="text-center mt-10">
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-xl
          bg-blue-600 hover:bg-blue-500
          text-white font-bold transition"
        >
          ← Volver al inicio
        </Link>
      </div>

    </div>
  );
};

export default FAQ;