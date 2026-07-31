import { query } from "../config/db.js";

// ======================================
// OBTENER TODOS LOS CLIENTES
// ======================================
export const getClientes = async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        c.id,
        c.usuario_id,
        c.plan_id,
        c.zona_id,
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

    res.json(rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener clientes",
      error: error.message,
    });
  }
};

// ======================================
// OBTENER CLIENTE POR ID
// ======================================
export const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {

    const rows = await query(
      `
      SELECT
        c.id,
        c.usuario_id,
        c.plan_id,
        c.zona_id,
        c.codigo_contrato,
        c.direccion,
        c.estado,
        u.nombre,
        u.correo,
        u.telefono,
        p.nombre AS nombre_plan,
        z.nombre AS zona_nombre
      FROM clientes c
      INNER JOIN usuarios u ON c.usuario_id = u.id
      LEFT JOIN planes p ON c.plan_id = p.id
      LEFT JOIN zonas z ON c.zona_id = z.id
      WHERE c.id = @param0
      `,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    res.json(rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// SERVICIO DEL CLIENTE LOGUEADO
// ======================================
export const getMiServicio = async (req, res) => {

  const usuarioId = req.user.id;

  try {

    const rows = await query(
      `
      SELECT
        c.*,
        u.nombre,
        u.correo,
        u.telefono,
        p.nombre AS plan_nombre,
        p.velocidad,
        p.precio,
        z.nombre AS zona_nombre
      FROM clientes c
      INNER JOIN usuarios u ON c.usuario_id = u.id
      LEFT JOIN planes p ON c.plan_id = p.id
      LEFT JOIN zonas z ON c.zona_id = z.id
      WHERE c.usuario_id = @param0
      `,
      [usuarioId]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "No tienes servicio activo",
      });
    }

    res.json(rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// CREAR CLIENTE
// ======================================
export const createCliente = async (req, res) => {

  const {
    usuario_id,
    plan_id,
    zona_id,
    direccion,
  } = req.body;

  const codigo = `WC-${Date.now()}`;

  try {

    await query(
      `
      INSERT INTO clientes
      (
        usuario_id,
        plan_id,
        zona_id,
        codigo_contrato,
        direccion,
        estado,
        fecha_instalacion
      )
      VALUES
      (
        @param0,
        @param1,
        @param2,
        @param3,
        @param4,
        'activo',
        GETDATE()
      )
      `,
      [
        usuario_id,
        plan_id,
        zona_id,
        codigo,
        direccion,
      ]
    );

    res.status(201).json({
      message: "Cliente creado correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al crear cliente",
      error: error.message,
    });
  }
};

// ======================================
// ACTUALIZAR CLIENTE
// ======================================
export const updateCliente = async (req, res) => {

  const { id } = req.params;

  const {
    usuario_id,
    nombre,
    correo,
    telefono,
    plan_id,
    zona_id,
    direccion,
    estado,
  } = req.body;

  try {

    // Actualizar usuario
    await query(
      `
      UPDATE usuarios
      SET
        nombre = @param0,
        correo = @param1,
        telefono = @param2
      WHERE id = @param3
      `,
      [
        nombre,
        correo,
        telefono,
        usuario_id,
      ]
    );

    // Actualizar cliente
    await query(
      `
      UPDATE clientes
      SET
        plan_id = @param0,
        zona_id = @param1,
        direccion = @param2,
        estado = @param3
      WHERE id = @param4
      `,
      [
        plan_id,
        zona_id,
        direccion,
        estado,
        id,
      ]
    );

    res.json({
      message: "Cliente actualizado correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al actualizar cliente",
      error: error.message,
    });
  }
};

// ======================================
// SUSPENDER CLIENTE
// ======================================
export const deleteCliente = async (req, res) => {

  const { id } = req.params;

  try {

    await query(
      `
      UPDATE clientes
      SET estado = 'suspendido'
      WHERE id = @param0
      `,
      [id]
    );

    res.json({
      message: "Cliente suspendido correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al suspender cliente",
      error: error.message,
    });
  }
};