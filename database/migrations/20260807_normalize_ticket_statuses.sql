-- Normaliza los estados creados antes de la reorganización del módulo.
UPDATE tickets
SET estado = CASE estado
  WHEN 'Abierto' THEN 'Pendiente'
  WHEN 'Esperando' THEN 'Respondido'
  ELSE estado
END
WHERE estado IN ('Abierto', 'Esperando');
