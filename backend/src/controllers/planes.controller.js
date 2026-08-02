import { query } from '../config/db.js';

export const getPlanes = async (req, res) => {
  try {
    const rows = await query(
      'SELECT * FROM planes WHERE estado = 1 ORDER BY precio ASC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};
 // ======================================
// PLANES PÚBLICOS
// ======================================

export const getPlanesPublicos = async (req, res) => {

  try {

    const rows = await query(
      `
      SELECT

        p.id,
        p.nombre,
        p.velocidad,
        p.precio,
        p.descripcion,
        p.estado,

        COUNT(c.id) AS total_clientes

      FROM planes p

      LEFT JOIN clientes c
      ON c.plan_id = p.id

      WHERE p.estado = 1

      GROUP BY

        p.id,
        p.nombre,
        p.velocidad,
        p.precio,
        p.descripcion,
        p.estado

      ORDER BY total_clientes DESC, precio ASC
      `
    );

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al obtener los planes públicos.",
      error: error.message,
    });

  }

};

export const createPlan = async (req, res) => {
  const { nombre, velocidad, precio, descripcion } = req.body;
  try {
    await query(
      `INSERT INTO planes (nombre, velocidad, precio, descripcion) 
       VALUES (@param0, @param1, @param2, @param3)`,
      [nombre, velocidad, precio, descripcion]
    );
    res.status(201).json({ message: 'Plan creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { nombre, velocidad, precio, descripcion, estado } = req.body;
  try {
    await query(
      `UPDATE planes SET nombre = @param0, velocidad = @param1, precio = @param2, 
       descripcion = @param3, estado = @param4 WHERE id = @param5`,
      [nombre, velocidad, precio, descripcion, estado, id]
    );
    res.json({ message: 'Plan actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const deletePlan = async (req, res) => {
  const { id } = req.params;
  try {
    await query(
      `UPDATE planes SET estado = 0 WHERE id = @param0`,
      [id]
    );
    res.json({ message: 'Plan desactivado' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};
