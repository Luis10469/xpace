-- Crear base de datos
CREATE DATABASE wifi_connect;
GO

USE wifi_connect;
GO

-- ============================================
-- TABLA: usuarios
-- ============================================
CREATE TABLE usuarios (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(20) DEFAULT 'cliente' CHECK (rol IN ('admin', 'cliente')),
  estado BIT DEFAULT 1,
  created_at DATETIME DEFAULT GETDATE(),
  updated_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================
-- TABLA: planes
-- ============================================
CREATE TABLE planes (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre VARCHAR(100) NOT NULL,
  velocidad VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  descripcion VARCHAR(MAX),
  estado BIT DEFAULT 1,
  created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================
-- TABLA: zonas
-- ============================================
CREATE TABLE zonas (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(MAX),
  estado BIT DEFAULT 1
);
GO

-- ============================================
-- TABLA: clientes
-- ============================================
CREATE TABLE clientes (
  id INT PRIMARY KEY IDENTITY(1,1),
  usuario_id INT NOT NULL,
  plan_id INT,
  zona_id INT,
  codigo_contrato VARCHAR(50) UNIQUE,
  direccion VARCHAR(200),
  estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'suspendido', 'cancelado')),
  fecha_instalacion DATE,
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES planes(id),
  FOREIGN KEY (zona_id) REFERENCES zonas(id)
);
GO

-- ============================================
-- TABLA: facturas
-- ============================================
CREATE TABLE facturas (
  id INT PRIMARY KEY IDENTITY(1,1),
  cliente_id INT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha_emision DATE,
  fecha_vencimiento DATE,
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagada', 'vencida')),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
GO

-- ============================================
-- TABLA: tickets
-- ============================================
CREATE TABLE tickets (
  id INT PRIMARY KEY IDENTITY(1,1),
  cliente_id INT NOT NULL,
  asunto VARCHAR(200) NOT NULL,
  descripcion VARCHAR(MAX),
  prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta')),
  estado VARCHAR(20) DEFAULT 'abierto' CHECK (estado IN ('abierto', 'en_proceso', 'cerrado')),
  respuesta VARCHAR(MAX),
  fecha_creacion DATETIME DEFAULT GETDATE(),
  fecha_respuesta DATETIME,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
GO

-- ============================================
-- TABLA: noticias
-- ============================================
CREATE TABLE noticias (
  id INT PRIMARY KEY IDENTITY(1,1),
  titulo VARCHAR(200) NOT NULL,
  contenido VARCHAR(MAX),
  tipo VARCHAR(20) DEFAULT 'noticia' CHECK (tipo IN ('noticia', 'mantenimiento', 'aviso', 'promocion')),
  fecha_publicacion DATETIME DEFAULT GETDATE(),
  estado BIT DEFAULT 1
);
GO

-- ============================================
-- TABLA: notificaciones
-- ============================================
CREATE TABLE notificaciones (
  id INT PRIMARY KEY IDENTITY(1,1),
  usuario_id INT,
  titulo VARCHAR(200),
  mensaje VARCHAR(MAX),
  leido BIT DEFAULT 0,
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
GO

-- ============================================
-- TABLA: faq
-- ============================================
CREATE TABLE faq (
  id INT PRIMARY KEY IDENTITY(1,1),
  pregunta VARCHAR(255) NOT NULL,
  respuesta VARCHAR(MAX),
  orden INT DEFAULT 0
);
GO

-- ============================================
-- TABLA: cobertura
-- ============================================
CREATE TABLE cobertura (
  id INT PRIMARY KEY IDENTITY(1,1),
  zona_id INT,
  plan_id INT,
  disponible BIT DEFAULT 1,
  FOREIGN KEY (zona_id) REFERENCES zonas(id),
  FOREIGN KEY (plan_id) REFERENCES planes(id)
);
GO

PRINT '✅ Todas las tablas creadas correctamente';
GO

USE wifi_connect;
GO

-- ============================================
-- 👤 USUARIO ADMINISTRADOR
-- ============================================
INSERT INTO usuarios (nombre, correo, contraseña, telefono, rol, estado)
VALUES (
  'Administrador Principal',
  'admin@wificonnect.com',
  '$2a$10$3n2yEPbn6CCqUYE8yGVLaOkb/deevY8LhB6jGktLTtMsRrgYT33oW',
  '+57 300 123 4567',
  'admin123',
  1
);

-- ============================================
-- 👤 USUARIO CLIENTE
-- ============================================
INSERT INTO usuarios (nombre, correo, contraseña, telefono, rol, estado)
VALUES (
  'Juan Pérez Cliente',
  'cliente@wificonnect.com',
  '$2a$10$JRmeokj.75Kg0kMI8/2DmuJ2kwu2x53Dg2QxsJ2nzkCxqfoR98BYG',
  '+57 311 987 6543',
  'cliente',
  1
);
GO

-- ============================================
-- 📦 PLANES DE INTERNET
-- ============================================
INSERT INTO planes (nombre, velocidad, precio, descripcion) VALUES
('Plan Básico', '50 MB', 39900, 'Ideal para hogares pequeños - navegación y redes sociales'),
('Plan Familiar', '100 MB', 59900, 'Perfecto para familias - streaming en HD'),
('Plan Premium', '200 MB', 79900, 'Alta velocidad para streaming 4K y gaming'),
('Plan Ultra', '500 MB', 99900, 'Velocidad máxima para hogares con muchos dispositivos'),
('Plan Empresarial', '1 GB', 149900, 'Para empresas - conexión dedicada');
GO

-- ============================================
-- 📍 ZONAS DE COBERTURA
-- ============================================
INSERT INTO zonas (nombre, descripcion) VALUES
('Centro', 'Zona central de la ciudad'),
('Norte', 'Sector norte residencial'),
('Sur', 'Zona sur comercial'),
('Oriente', 'Barrios del oriente'),
('Occidente', 'Conjuntos residenciales occidente');
GO

-- ============================================
-- 🏠 CLIENTE ASIGNADO (al usuario cliente)
-- ============================================
INSERT INTO clientes (usuario_id, plan_id, zona_id, codigo_contrato, direccion, estado, fecha_instalacion) 
VALUES (
  2,        -- ID del usuario cliente (se asigna automático)
  2,        -- Plan Familiar
  1,        -- Zona Centro
  'WC-001',
  'Calle 10 #45-30',
  'activo',
  '2026-01-15'
);
GO

-- ============================================
-- ❓ PREGUNTAS FRECUENTES
-- ============================================
INSERT INTO faq (pregunta, respuesta, orden) VALUES
('¿Cómo contrato el servicio?', 'Debes registrarte en nuestra plataforma y un asesor te contactará en menos de 24 horas.', 1),
('¿Cuánto tarda la instalación?', 'Entre 24 y 48 horas hábiles después de confirmar el contrato.', 2),
('¿Cuáles son los métodos de pago?', 'Efectivo, transferencia bancaria, PSE, Nequi y Daviplata.', 3),
('¿Puedo cambiar de plan?', 'Sí, puedes cambiar de plan en cualquier momento desde tu dashboard.', 4),
('¿Qué pasa si tengo problemas con el servicio?', 'Puedes crear un ticket de soporte desde tu cuenta y te responderemos en menos de 2 horas.', 5);
GO

-- ============================================
-- 📰 NOTICIAS Y AVISOS
-- ============================================
INSERT INTO noticias (titulo, contenido, tipo, estado) VALUES
('Bienvenido a WiFiConnect', 'Ya puedes disfrutar de nuestros servicios. Consulta tu cobertura y elige tu plan ideal.', 'noticia', 1),
('Mantenimiento programado', 'Se realizará mantenimiento el día domingo de 2:00 AM a 6:00 AM. El servicio se reanudará automáticamente.', 'mantenimiento', 1),
('Promoción Plan Familiar', 'Contrata el Plan Familiar este mes y obtén un 20% de descuento el primer mes.', 'promocion', 1);
GO

-- ============================================
-- 🔔 NOTIFICACIÓN PARA EL CLIENTE
-- ============================================
INSERT INTO notificaciones (usuario_id, titulo, mensaje, leido) VALUES
(2, '¡Bienvenido!', 'Tu cuenta ha sido activada correctamente. Ya puedes disfrutar de nuestros servicios.', 0);
GO

-- ============================================
-- ✅ VERIFICAR DATOS INSERTADOS
-- ============================================
SELECT 'Usuarios:' AS tabla;
SELECT id, nombre, correo, telefono, rol, estado FROM usuarios;

SELECT 'Planes:' AS tabla;
SELECT id, nombre, velocidad, precio FROM planes;

SELECT 'Zonas:' AS tabla;
SELECT id, nombre FROM zonas;

SELECT 'Clientes:' AS tabla;
SELECT id, usuario_id, codigo_contrato, direccion, estado FROM clientes;
GO
