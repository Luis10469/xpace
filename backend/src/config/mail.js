import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta hacia la carpeta de imágenes
const assetsPath = path.join(__dirname, '../templates/assets');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendMail = async ({ to, subject, html }) => {

  try {

    const info = await transporter.sendMail({

      from: process.env.MAIL_FROM,

      to,

      subject,

      html,

      attachments: [

        {
          filename: 'logo.png',
          path: path.join(assetsPath, 'logo.png'),
          cid: 'logo'
        },

        {
          filename: 'candado.png',
          path: path.join(assetsPath, 'candado.png'),
          cid: 'candado'
        },

        {
          filename: 'sobre.png',
          path: path.join(assetsPath, 'sobre.png'),
          cid: 'sobre'
        },

        {
          filename: 'reloj.png',
          path: path.join(assetsPath, 'reloj.png'),
          cid: 'reloj'
        },

        {
          filename: 'escudo.png',
          path: path.join(assetsPath, 'escudo.png'),
          cid: 'escudo'
        },

        {
          filename: 'facebook.png',
          path: path.join(assetsPath, 'facebook.png'),
          cid: 'facebook'
        },

        {
          filename: 'instagram.png',
          path: path.join(assetsPath, 'instagram.png'),
          cid: 'instagram'
        },

        {
          filename: 'whatsapp.png',
          path: path.join(assetsPath, 'whatsapp.png'),
          cid: 'whatsapp'
        }

      ]

    });

    console.log('📧 Correo enviado:', info.messageId);

    return true;

  } catch (error) {

    console.error('❌ Error al enviar correo:', error);

    return false;

  }

};

export default transporter;
