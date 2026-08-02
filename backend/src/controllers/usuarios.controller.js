import { query } from "../config/db.js";
import bcrypt from "bcryptjs";

// ======================================
// OBTENER TODOS LOS USUARIOS
// ======================================

export const getUsuarios = async (req, res) => {

  try {

    const rows = await query(`
      SELECT
        u.id,
        u.nombre,
        u.correo,
        u.telefono,
        u.rol,
        u.estado,

        CASE
          WHEN c.id IS NULL THEN 0
          ELSE 1
        END AS es_cliente

      FROM usuarios u

      LEFT JOIN clientes c
        ON c.usuario_id = u.id

      ORDER BY u.id DESC
    `);

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.message
    });

  }

};

// ======================================
// CREAR USUARIO
// ======================================

export const createUsuario = async (req, res) => {

  const {
    nombre,
    correo,
    contraseña,
    telefono,
    rol
  } = req.body;

  try {

    // Verificar si ya existe
    const existe = await query(
      "SELECT id FROM usuarios WHERE correo = @param0",
      [correo]
    );

    if (existe.length > 0) {

      return res.status(400).json({
        message: "El correo ya está registrado."
      });

    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Crear usuario
    await query(
      `
      INSERT INTO usuarios
      (
        nombre,
        correo,
        contraseña,
        telefono,
        rol
      )
      VALUES
      (
        @param0,
        @param1,
        @param2,
        @param3,
        @param4
      )
      `,
      [
        nombre,
        correo,
        hash,
        telefono,
        rol
      ]
    );

    res.status(201).json({
      message: "Usuario creado correctamente."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message
    });

  }

};

// ======================================
// ACTUALIZAR USUARIO
// ======================================

export const updateUsuario = async (req, res) => {

  const { id } = req.params;

  const {
    nombre,
    telefono,
    rol,
    estado
  } = req.body;

  try {

    await query(
      `
      UPDATE usuarios
      SET
        nombre = @param0,
        telefono = @param1,
        rol = @param2,
        estado = @param3
      WHERE id = @param4
      `,
      [
        nombre,
        telefono,
        rol,
        estado,
        id
      ]
    );

    res.json({
      message: "Usuario actualizado correctamente."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message
    });

  }

};
// ======================================
// CONVERTIR USUARIO EN CLIENTE
// ======================================

export const convertirCliente = async (req, res) => {

  const { id } = req.params;

  try {

    // Verificar si ya es cliente
    const existe = await query(
      `
      SELECT id
      FROM clientes
      WHERE usuario_id = @param0
      `,
      [id]
    );

    if (existe.length > 0) {

      return res.status(400).json({
        message: "Este usuario ya es cliente."
      });

    }

    // Código de contrato
    const codigo = `WC-${Date.now()}`;

    await query(
  `
  INSERT INTO clientes
  (
    usuario_id,
    plan_id,
    zona_id,
    codigo_contrato,
    direccion,
    fecha_instalacion
  )
  VALUES
  (
    @param0,
    NULL,
    NULL,
    @param1,
    '',
    NULL
  )
  `,
  [
    id,
    codigo
  ]
);

    res.json({
      message: "Usuario convertido en cliente correctamente."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al convertir el usuario",
      error: error.message
    });

  }

};