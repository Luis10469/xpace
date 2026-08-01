USE wifi_connect;
GO

CREATE TABLE password_resets (
    id INT IDENTITY(1,1) PRIMARY KEY,

    usuario_id INT NOT NULL,

    token NVARCHAR(255) NOT NULL,

    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),

    fecha_expiracion DATETIME NOT NULL,

    usado BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_password_resets_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);
GO