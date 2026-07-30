import { sendMail } from '../config/mail.js';

export const enviarNotificacion = async (correo, asunto, mensaje) => {
  return await sendMail({
    to: correo,
    subject: asunto,
    html: `<div style="font-family:Arial;padding:20px">
             <h2 style="color:#2563eb">${asunto}</h2>
             <p>${mensaje}</p>
             <hr>
             <small>WiFiConnect © 2026</small>
           </div>`
  });
};
