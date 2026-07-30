import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, correo, telefono, rol, estado, created_at FROM usuarios'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const createUsuario = async (req, res) => {
  const { nombre, correo, contraseña, telefono, rol } = req.body;
  try {
    const hash = await bcrypt.hash(contraseña, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña, telefono, rol) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, hash, telefono, rol]
    );
    res.status(201).json({ message: 'Usuario creado', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, rol, estado } = req.body;
  try {
    await pool.query(
      'UPDATE usuarios SET nombre=?, telefono=?, rol=?, estado=? WHERE id=?',
      [nombre, telefono, rol, estado, id]
    );
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};
