import pool from '../config/db.js';

export const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

export const create = async (data) => {
  const [result] = await pool.query('INSERT INTO clientes SET ?', [data]);
  return result.insertId;
};
