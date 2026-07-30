import { query } from '../config/db.js';

export const getClientes = async (req, res) => {
  try {
    const rows = await query(`
      SELECT 
        c.id,
        c.codigo_contrato,
        u.nombre,
        u.correo,
        u.telefono,
        c.direccion,
        c.estado,
        p.nombre AS nombre_plan,
        z.nombre AS nombre_zona,
        c.fecha_instalacion
      FROM clientes c
      INNER JOIN usuarios u ON c.usuario_id = u.id
      LEFT JOIN planes p ON c.plan_id = p.id
      LEFT JOIN zonas z ON c.zona_id = z.id
      ORDER BY c.id DESC
    `);

    console.log("CLIENTES DESDE SQL:", rows);

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener clientes',
      error: error.message
    });
  }
};

export const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await query(
      `SELECT c.*, u.nombre, u.correo, u.telefono, p.nombre AS plan_nombre, p.velocidad
       FROM clientes c
       INNER JOIN usuarios u ON c.usuario_id = u.id
       LEFT JOIN planes p ON c.plan_id = p.id
       WHERE c.id = @param0`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const getMiServicio = async (req, res) => {
  const usuarioId = req.user.id;
  try {
    const rows = await query(
      `SELECT c.*, u.nombre, u.correo, u.telefono, 
              p.nombre AS plan_nombre, p.velocidad, p.precio,
              z.nombre AS zona_nombre
       FROM clientes c
       INNER JOIN usuarios u ON c.usuario_id = u.id
       LEFT JOIN planes p ON c.plan_id = p.id
       LEFT JOIN zonas z ON c.zona_id = z.id
       WHERE c.usuario_id = @param0`,
      [usuarioId]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'No tienes servicio activo' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const createCliente = async (req, res) => {
  const { usuario_id, plan_id, direccion, zona_id } = req.body;
  const codigo_contrato = 'WC-' + Date.now();

  try {
    await query(
      `INSERT INTO clientes (usuario_id, plan_id, zona_id, codigo_contrato, direccion, estado, fecha_instalacion) 
       VALUES (@param0, @param1, @param2, @param3, @param4, 'activo', GETDATE())`,
      [usuario_id, plan_id, zona_id, codigo_contrato, direccion]
    );

    res.status(201).json({ 
      message: 'Cliente creado', 
      codigo_contrato 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al crear cliente', error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { plan_id, direccion, estado } = req.body;
  try {
    await query(
      `UPDATE clientes SET plan_id = @param0, direccion = @param1, estado = @param2 WHERE id = @param3`,
      [plan_id, direccion, estado, id]
    );
    res.json({ message: 'Cliente actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await query(
      `UPDATE clientes SET estado = 'suspendido' WHERE id = @param0`,
      [id]
    );
    res.json({ message: 'Cliente suspendido' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

