import { useState } from 'react';

const faqs = [
  { q: '¿Cómo contrato el servicio?', a: 'Debes registrarte y un asesor te contactará.' },
  { q: '¿Cuánto tarda la instalación?', a: 'Entre 24 y 48 horas hábiles.' },
  { q: '¿Cuáles son los métodos de pago?', a: 'Efectivo, transferencia o PSE.' },
  { q: '¿Tienen soporte técnico 24/7?', a: 'Sí, vía WhatsApp y tickets.' }
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white mb-2 rounded shadow">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full p-4 text-left font-semibold"
          >
            {faq.q}
          </button>
          {open === i && <p className="p-4 text-gray-700">{faq.a}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
