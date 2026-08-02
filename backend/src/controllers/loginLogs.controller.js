import { query } from "../config/db.js";

// ===============================
// REGISTRAR LOGIN
// ===============================

export const registrarLogin = async ({
  usuario_id = null,
  correo,
  ip,
  navegador,
  estado,
}) => {
  try {
    await query(
      `
      INSERT INTO login_logs
      (
        usuario_id,
        correo,
        ip,
        navegador,
        estado
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
        usuario_id,
        correo,
        ip,
        navegador,
        estado,
      ]
    );
  } catch (error) {
    console.error("Error registrando login:", error);
  }
};

// ===============================
// OBTENER HISTORIAL
// ===============================

export const getLoginLogs = async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        id,
        usuario_id,
        correo,
        ip,
        navegador,
        estado,
        fecha
      FROM login_logs
      ORDER BY fecha DESC
    `);

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      message: "Error al obtener historial",
      error: error.message,
    });

  }
};