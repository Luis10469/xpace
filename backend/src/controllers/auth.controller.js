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
    const rows = await query(
      'SELECT * FROM usuarios WHERE correo = @param0',
      [correo]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Correo no registrado' });
    }

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const link = `http://localhost:5173/reset-password/${token}`;

    try {
      await sendMail({
        to: correo,
        subject: 'Recuperar contraseña - WiFiConnect',
        html: `<p>Para restablecer tu contraseña haz clic <a href="${link}">aquí</a></p>`
      });
    } catch (e) {
      console.log('No se pudo enviar correo:', e.message);
    }

    res.json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};
