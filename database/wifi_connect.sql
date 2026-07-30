-- ============================================
-- BASE DE DATOS WiFiConnect
-- ============================================
CREATE DATABASE IF NOT EXISTS wifi_connect;
USE wifi_connect;

-- USUARIOS
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rol ENUM('admin', 'cliente') DEFAULT 'cliente',
  estado TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PLANES
CREATE TABLE planes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  velocidad VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  descripcion TEXT,
  estado TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ZONAS
CREATE TABLE zonas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  estado TINYINT(1) DEFAULT 1
);

-- COBERTURA
CREATE TABLE cobertura (
  id INT PRIMARY KEY AUTO_INCREMENT,
  zona_id INT,
  plan_id INT,
  disponible TINYINT(1) DEFAULT 1,
  FOREIGN KEY (zona_id) REFERENCES zonas(id),
  FOREIGN KEY (plan_id) REFERENCES planes(id)
);

-- CLIENTES
CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  plan_id INT,
  zona_id INT,
  codigo_contrato VARCHAR(50) UNIQUE,
  direccion VARCHAR(200),
  estado ENUM('activo', 'suspendido', 'cancelado') DEFAULT 'activo',
  fecha_instalacion DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (plan_id) REFERENCES planes(id),
  FOREIGN KEY (zona_id) REFERENCES zonas(id)
);

-- FACTURAS
CREATE TABLE facturas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha_emision DATE,
  fecha_vencimiento DATE,
  estado ENUM('pendiente', 'pagada', 'vencida') DEFAULT 'pendiente',
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- TICKETS
CREATE TABLE tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  asunto VARCHAR(200) NOT NULL,
  descripcion TEXT,
  prioridad ENUM('baja', 'media', 'alta') DEFAULT 'media',
  estado ENUM('abierto', 'en_proceso', 'cerrado') DEFAULT 'abierto',
  respuesta TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_respuesta DATETIME,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- NOTICIAS / AVISOS
CREATE TABLE noticias (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT,
  tipo ENUM('noticia', 'mantenimiento', 'aviso', 'promocion') DEFAULT 'noticia',
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado TINYINT(1) DEFAULT 1
);

-- NOTIFICACIONES
CREATE TABLE notificaciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  titulo VARCHAR(200),
  mensaje TEXT,
  leido TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- FAQ
CREATE TABLE faq (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pregunta VARCHAR(255) NOT NULL,
  respuesta TEXT,
  orden INT DEFAULT 0
);
