USE wifi_connect;

-- Usuario administrador por defecto
-- Contraseña: Admin123 (encriptada con bcrypt)
INSERT INTO usuarios (nombre, correo, contraseña, telefono, rol) VALUES
('Administrador', 'admin@wificonnect.com', '$2a$10$YourHashHere', '3001234567', 'admin');

-- Planes de internet
INSERT INTO planes (nombre, velocidad, precio, descripcion) VALUES
('Plan Básico', '50 MB', 39900, 'Ideal para hogares pequeños'),
('Plan Familiar', '100 MB', 59900, 'Perfecto para familias'),
('Plan Premium', '200 MB', 79900, 'Alta velocidad para streaming'),
('Plan Ultra', '500 MB', 99900, 'Velocidad máxima'),
('Plan Empresarial', '1 GB', 149900, 'Para empresas');

-- Zonas de cobertura
INSERT INTO zonas (nombre, descripcion) VALUES
('Centro', 'Zona central de la ciudad'),
('Norte', 'Sector norte residencial'),
('Sur', 'Zona sur comercial'),
('Oriente', 'Barrios del oriente'),
('Occidente', 'Conjunto residenciales occidente');

-- FAQ iniciales
INSERT INTO faq (pregunta, respuesta, orden) VALUES
('¿Cómo contrato el servicio?', 'Debes registrarte y un asesor te contactará.', 1),
('¿Cuánto tarda la instalación?', 'Entre 24 y 48 horas hábiles.', 2),
('¿Cuáles son los métodos de pago?', 'Efectivo, transferencia o PSE.', 3);
