import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { sendMail } from '../config/mail.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const rows = await query(
      'SELECT * FROM usuarios WHERE correo = @param0 AND estado = 1',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(contraseña, user.contraseña);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol, correo: user.correo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { 
        id: user.id, 
        nombre: user.nombre, 
        rol: user.rol,
        correo: user.correo,
        telefono: user.telefono
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const register = async (req, res) => {
  const { nombre, correo, contraseña, telefono } = req.body;

  try {
    // Verificar si ya existe
    const existe = await query(
      'SELECT id FROM usuarios WHERE correo = @param0',
      [correo]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    await query(
      `INSERT INTO usuarios (nombre, correo, contraseña, telefono, rol) 
       VALUES (@param0, @param1, @param2, @param3, 'cliente')`,
      [nombre, correo, hash, telefono]
    );

    // Obtener el usuario recién creado
    const nuevoUsuario = await query(
      'SELECT id, nombre, correo, rol FROM usuarios WHERE correo = @param0',
      [correo]
    );

    // Enviar correo (opcional)
    try {
      await sendMail({
        to: correo,
        subject: 'Bienvenido a WiFiConnect',
        html: `<h1>Hola ${nombre}</h1><p>Tu registro fue exitoso.</p>`
      });
    } catch (e) {
      console.log('No se pudo enviar correo:', e.message);
    }

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente', 
      user: nuevoUsuario[0]
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error al registrar', error: error.message });
  }
};

export const recoverPassword = async (req, res) => {

  const { correo } = req.body;

  try {

    // Buscar usuario
    const rows = await query(
      'SELECT * FROM usuarios WHERE correo = @param0',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Correo no registrado'
      });
    }

    const usuario = rows[0];

    // Crear token (30 minutos)
    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m'
      }
    );

    // Fecha de expiración
    const fechaExpiracion = new Date(
      Date.now() + 30 * 60 * 1000
    );

    // Invalidar enlaces anteriores
    await query(
      `
      UPDATE password_resets
      SET usado = 1
      WHERE usuario_id = @param0
        AND usado = 0
      `,
      [usuario.id]
    );

    // Guardar nuevo token
    await query(
      `
      INSERT INTO password_resets
      (
        usuario_id,
        token,
        fecha_expiracion
      )
      VALUES
      (
        @param0,
        @param1,
        @param2
      )
      `,
      [
        usuario.id,
        token,
        fechaExpiracion
      ]
    );

    // Enlace
    const link = `http://localhost:5173/reset-password/${token}`;

    // Enviar correo
    await sendMail({
      to: correo,
      subject: 'Recuperación de contraseña - WiFiConnect',
      html: `
        <h2>Hola ${usuario.nombre}</h2>

        <p>Recibimos una solicitud para cambiar tu contraseña.</p>

        <p>
          Haz clic en el siguiente botón:
        </p>

        <a href="${link}"
           style="
             background:#2563eb;
             color:white;
             padding:12px 20px;
             text-decoration:none;
             border-radius:8px;
             display:inline-block;
           ">
          Restablecer contraseña
        </a>

        <p>
          Este enlace es válido durante <b>30 minutos</b> y solo podrá utilizarse una vez.
        </p>

        <p>
          Si no solicitaste este cambio, ignora este correo.
        </p>
      `
    });

    res.json({
      message: 'Correo de recuperación enviado correctamente.'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};
// ======================================
// RESTABLECER CONTRASEÑA
// ======================================

export const resetPassword = async (req, res) => {

  const { token, contraseña } = req.body;

  try {

    // Validar que el JWT sea válido
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({
        message: "El enlace ha expirado o no es válido."
      });
    }

    // Buscar el token en la base de datos
    const rows = await query(
      `
      SELECT *
      FROM password_resets
      WHERE token = @param0
        AND usado = 0
      `,
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: "El enlace no es válido o ya fue utilizado."
      });
    }

    const reset = rows[0];

    // Verificar fecha de expiración
    if (new Date(reset.fecha_expiracion) < new Date()) {
      return res.status(400).json({
        message: "El enlace ha expirado."
      });
    }

    // Encriptar la nueva contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Actualizar contraseña del usuario
    await query(
      `
      UPDATE usuarios
      SET contraseña = @param0
      WHERE id = @param1
      `,
      [
        hash,
        reset.usuario_id
      ]
    );

    // Marcar el token como usado
    await query(
      `
      UPDATE password_resets
      SET usado = 1
      WHERE id = @param0
      `,
      [reset.id]
    );

    res.json({
      message: "Contraseña actualizada correctamente."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al actualizar la contraseña",
      error: error.message
    });

  }

};