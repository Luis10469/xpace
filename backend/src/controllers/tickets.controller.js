import { query } from '../config/db.js';
import { sendMail } from '../config/mail.js';

export const getTickets = async (req, res) => {
  try {
    let rows;
    if (req.user.rol === 'admin') {
      rows = await query(`
        SELECT t.*, u.nombre AS cliente_nombre, u.correo AS cliente_correo
        FROM tickets t 
        INNER JOIN clientes c ON t.cliente_id = c.id
        INNER JOIN usuarios u ON c.usuario_id = u.id
        ORDER BY t.fecha_creacion DESC
      `);
    } else {
      const clientes = await query(
        'SELECT id FROM clientes WHERE usuario_id = @param0',
        [req.user.id]
      );
      
      if (clientes.length === 0) return res.json([]);
      
      rows = await query(
        `SELECT * FROM tickets WHERE cliente_id = @param0 ORDER BY fecha_creacion DESC`,
        [clientes[0].id]
      );
    }
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const createTicket = async (req, res) => {
  const { asunto, descripcion, prioridad } = req.body;
  try {
    // Obtener el cliente_id del usuario logueado
    const clientes = await query(
      'SELECT id FROM clientes WHERE usuario_id = @param0',
      [req.user.id]
    );

    if (clientes.length === 0) {
      return res.status(404).json({ message: 'No tienes un servicio activo' });
    }

    await query(
      `INSERT INTO tickets (cliente_id, asunto, descripcion, prioridad, estado) 
       VALUES (@param0, @param1, @param2, @param3, 'abierto')`,
      [clientes[0].id, asunto, descripcion, prioridad]
    );

    res.status(201).json({ message: 'Ticket creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const responderTicket = async (req, res) => {
  const { id } = req.params;
  const { respuesta } = req.body;
  try {
    await query(
      `UPDATE tickets SET respuesta = @param0, estado = 'cerrado', fecha_respuesta = GETDATE() 
       WHERE id = @param1`,
      [respuesta, id]
    );
    res.json({ message: 'Ticket respondido' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};
