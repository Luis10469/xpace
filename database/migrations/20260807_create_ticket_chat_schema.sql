-- Complementa la tabla tickets existente sin eliminar datos.
IF COL_LENGTH('tickets', 'tecnico_id') IS NULL
  ALTER TABLE tickets ADD tecnico_id INT NULL;
GO

IF COL_LENGTH('tickets', 'categoria') IS NULL
  ALTER TABLE tickets ADD categoria NVARCHAR(100) NULL;
GO

IF COL_LENGTH('tickets', 'fecha_actualizacion') IS NULL
  ALTER TABLE tickets ADD fecha_actualizacion DATETIME NULL;
GO

IF COL_LENGTH('tickets', 'fecha_cierre') IS NULL
  ALTER TABLE tickets ADD fecha_cierre DATETIME NULL;
GO

UPDATE tickets
SET fecha_actualizacion = COALESCE(fecha_actualizacion, fecha_creacion, GETDATE()),
    categoria = COALESCE(categoria, 'Soporte general')
WHERE fecha_actualizacion IS NULL OR categoria IS NULL;
GO

IF OBJECT_ID('ticket_mensajes', 'U') IS NULL
BEGIN
  CREATE TABLE ticket_mensajes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ticket_id INT NOT NULL,
    usuario_id INT NOT NULL,
    mensaje NVARCHAR(MAX) NOT NULL,
    tipo NVARCHAR(20) NOT NULL DEFAULT 'texto',
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_ticket_mensajes_ticket FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    CONSTRAINT FK_ticket_mensajes_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
END;
GO

IF OBJECT_ID('ticket_historial', 'U') IS NULL
BEGIN
  CREATE TABLE ticket_historial (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ticket_id INT NOT NULL,
    usuario_id INT NOT NULL,
    accion NVARCHAR(200) NOT NULL,
    detalle NVARCHAR(MAX) NULL,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_ticket_historial_ticket FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    CONSTRAINT FK_ticket_historial_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
END;
GO

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_tickets_tecnico')
  ALTER TABLE tickets ADD CONSTRAINT FK_tickets_tecnico FOREIGN KEY (tecnico_id) REFERENCES usuarios(id);
GO
