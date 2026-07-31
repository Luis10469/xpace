import { query } from "../config/db.js";

export const getZonas = async (req, res) => {
  try {
    const rows = await query(
      "SELECT * FROM zonas ORDER BY nombre ASC"
    );

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
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

  const { nombre } = req.body;

  try {

    await query(
      "INSERT INTO zonas(nombre) VALUES(@param0)",
      [nombre]
    );

    res.status(201).json({
      message: "Zona creada correctamente",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error",
      error: error.message,
    });

  }

};

export const updateZona = async (req, res) => {

  const { id } = req.params;
  const { nombre } = req.body;

  try {

    await query(
      "UPDATE zonas SET nombre=@param0 WHERE id=@param1",
      [nombre, id]
    );

    res.json({
      message: "Zona actualizada",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error",
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