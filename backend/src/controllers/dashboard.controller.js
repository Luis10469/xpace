import { query } from '../config/db.js';

export const getDashboard = async (req, res) => {
  try {
    const clientes = await query(
      "SELECT COUNT(*) AS total FROM clientes"
    );

    const planes = await query(
      "SELECT COUNT(*) AS total FROM planes WHERE estado = 1"
    );

    const tickets = await query(
      "SELECT COUNT(*) AS total FROM tickets"
    );

    const zonas = await query(
      "SELECT COUNT(*) AS total FROM zonas"
    );

    res.json({
      clientes: clientes[0].total,
      planes: planes[0].total,
      tickets: tickets[0].total,
      zonas: zonas[0].total
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener estadísticas",
      error: error.message
    });
  }
};