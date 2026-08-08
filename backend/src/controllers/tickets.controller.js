import {
  obtenerTickets,
  obtenerDashboard,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
  obtenerMensajes,
  crearMensaje,
  obtenerHistorial,
  obtenerTecnicos
} from "../services/tickets.service.js";

// ======================================
// OBTENER TODOS LOS TICKETS
// ======================================

export const getTickets = async (req, res) => {

  try {

    const tickets = await obtenerTickets(req.query, req.user);
    res.json({
        ok: true,
        tickets
      });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: "Error al obtener los tickets",
      error: error.message,
    });

  }

};

// ======================================
// OBTENER TICKET POR ID
// ======================================

export const getTicketById = async (req, res) => {

  const { id } = req.params;

  try {

    const ticket = await obtenerTicketPorId(id, req.user);

    if (!ticket) {

      return res.status(404).json({
        ok: false,
        message: "Ticket no encontrado",
      });

    }

    res.json({
    ok: true,
    ticket
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};

// ======================================
// CREAR TICKET
// ======================================

export const createTicket = async (req, res) => {

  try {

    const ticketId = await crearTicket(req.user.id, req.body);

res.status(201).json({
  ok: true,
  message: "Ticket creado correctamente",
  ticketId
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: "Error al crear el ticket",
      error: error.message,
    });

  }

};

// ======================================
// ACTUALIZAR TICKET
// ======================================

export const updateTicket = async (req, res) => {

  const { id } = req.params;

  try {

    await actualizarTicket(id, req.user.id, req.body);

    res.json({
      ok: true,
      message: "Ticket actualizado correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};

// ======================================
// ELIMINAR TICKET
// ======================================

export const deleteTicket = async (req, res) => {

  const { id } = req.params;

  try {

    await eliminarTicket(
  id,
  req.user.id
);

    res.json({
      ok: true,
      message: "Ticket eliminado correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};

// ======================================
// DASHBOARD
// ======================================

export const getDashboard = async (req, res) => {

  try {

    const dashboard = await obtenerDashboard(req.user);

    res.json({
        ok: true,
        dashboard
      });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};
// ======================================
// OBTENER HISTORIAL
// ======================================

export const getHistorial = async (req, res) => {

  try {

    const historial = await obtenerHistorial(req.params.id, req.user);

    res.json({
      ok: true,
      historial
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};
// ======================================
// OBTENER TÉCNICOS
// ======================================

export const getTecnicos = async (req, res) => {

  try {

    const tecnicos = await obtenerTecnicos();

    res.json({
        ok: true,
        tecnicos
      });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};

// ======================================
// OBTENER MENSAJES DEL TICKET
// ======================================

export const getMensajes = async (req, res) => {

  const { id } = req.params;

  try {

    const mensajes = await obtenerMensajes(id, req.user);

    res.json({
      ok: true,
      mensajes
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};

// ======================================
// ENVIAR MENSAJE
// ======================================

export const enviarMensaje = async (req, res) => {

  const { id } = req.params;

  try {

    await crearMensaje(id, req.user, req.body);

    res.status(201).json({
      ok: true,
      message: "Mensaje enviado correctamente",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};
