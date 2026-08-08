import api from "../../../services/api";

// ======================================
// TICKETS
// ======================================

export const obtenerTickets = async (filtros = {}) => {
  const { data } = await api.get("/tickets", {
    params: filtros,
  });

  return data.tickets;
};

export const obtenerTicketPorId = async (id) => {
  const { data } = await api.get(`/tickets/${id}`);

  return data.ticket;
};

export const crearTicket = async (datos) => {
  const { data } = await api.post("/tickets", datos);

  return data;
};

export const actualizarTicket = async (id, datos) => {
  const { data } = await api.put(`/tickets/${id}`, datos);

  return data;
};

export const eliminarTicket = async (id) => {
  const { data } = await api.delete(`/tickets/${id}`);

  return data;
};

// ======================================
// DASHBOARD
// ======================================

export const obtenerDashboard = async () => {
  const { data } = await api.get("/tickets/dashboard");

  return data.dashboard;
};

// ======================================
// MENSAJES
// ======================================

export const obtenerMensajes = async (ticketId) => {
  const { data } = await api.get(
    `/tickets/${ticketId}/mensajes`
  );

  return data.mensajes;
};

export const enviarMensaje = async (ticketId, mensaje) => {
  const { data } = await api.post(
    `/tickets/${ticketId}/mensajes`,
    {
      mensaje,
    }
  );

  return data;
};

// ======================================
// HISTORIAL
// ======================================

export const obtenerHistorial = async (ticketId) => {
  const { data } = await api.get(
    `/tickets/${ticketId}/historial`
  );

  return data.historial;
};

// ======================================
// TÉCNICOS
// ======================================

export const obtenerTecnicos = async () => {
  const { data } = await api.get("/tickets/tecnicos");

  return data.tecnicos;
};