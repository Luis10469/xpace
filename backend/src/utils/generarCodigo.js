export const generarCodigoContrato = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000);
  return `WC-${timestamp}${random}`;
};

export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CO');
};
