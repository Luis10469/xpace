import { query } from "../config/db.js";

export const getZonas = async (req, res) => {
  try {

    const rows = await query(
      "SELECT * FROM zonas ORDER BY nombre ASC"
    );

    console.log("ZONAS DESDE SQL:", rows);

    return res.json(rows);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Error al obtener zonas",
      error: error.message,
    });

  }
};

export const getZonaById = async (req, res) => {

  const { id } = req.params;

  try {

    const rows = await query(
      "SELECT * FROM zonas WHERE id=@param0",
      [id]
    );

    if (rows.length === 0) {

      return res.status(404).json({
        message: "Zona no encontrada",
      });

    }

    res.json(rows[0]);

  } catch (error) {

    res.status(500).json({
      message: "Error",
      error: error.message,
    });

  }

};

export const createZona = async (req, res) => {

  const {
    nombre,
    descripcion,
    estado,
  } = req.body;

  try {

    await query(
      `
      INSERT INTO zonas
      (
        nombre,
        descripcion,
        estado
      )
      VALUES
      (
        @param0,
        @param1,
        @param2
      )
      `,
      [
        nombre,
        descripcion,
        estado,
      ]
    );

    res.status(201).json({
      message: "Zona creada correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al crear la zona",
      error: error.message,
    });

  }

};

export const updateZona = async (req, res) => {

  const { id } = req.params;

  const {
    nombre,
    descripcion,
    estado,
  } = req.body;

  try {

    await query(
      `
      UPDATE zonas
      SET
        nombre = @param0,
        descripcion = @param1,
        estado = @param2
      WHERE id = @param3
      `,
      [
        nombre,
        descripcion,
        estado,
        id,
      ]
    );

    res.json({
      message: "Zona actualizada correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al actualizar la zona",
      error: error.message,
    });

  }

};
export const getZonasPublicas = async (req, res) => {

  try {

    const rows = await query(
      `
      SELECT
        id,
        nombre,
        descripcion
      FROM zonas
      WHERE estado = 1
      ORDER BY nombre
      `
    );

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al obtener las zonas.",
      error: error.message,
    });

  }

};

export const deleteZona = async (req, res) => {

  const { id } = req.params;

  try {

    await query(
      "DELETE FROM zonas WHERE id=@param0",
      [id]
    );

    res.json({
      message: "Zona eliminada",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error",
      error: error.message,
    });

  }

};