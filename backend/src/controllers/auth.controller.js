import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { sendMail } from '../config/mail.js';
import dotenv from 'dotenv';
import resetPasswordTemplate from "../templates/auth/resetPasswordTemplate.js";
import { registrarLogin } from "./loginLogs.controller.js";
dotenv.config();

export const login = async (req, res) => {

  const { correo, contraseña } = req.body;

  try {

    const rows = await query(
      "SELECT * FROM usuarios WHERE correo = @param0 AND estado = 1",
      [correo]
    );

    if (rows.length === 0) {

  await registrarLogin({

    correo,

    estado: "Usuario no encontrado",

    ip: req.ip,

    navegador: req.headers["user-agent"]

  });

  return res.status(404).json({

    message: "Usuario no encontrado"

  });

}

    const user = rows[0];
 // ==========================
// VALIDAR BLOQUEO
// ==========================

if (
  user.bloqueado_hasta &&
  new Date(user.bloqueado_hasta) > new Date()
) {

  await registrarLogin({

    usuario_id: user.id,

    correo: user.correo,

    ip: req.ip,

    navegador: req.headers["user-agent"],

    estado: "Cuenta bloqueada"

  });

  return res.status(403).json({

    message:
      "Tu cuenta está bloqueada temporalmente. Intenta nuevamente más tarde."

  });
}

    // ==========================
    // VALIDAR CONTRASEÑA
    // ==========================

    const validPassword = await bcrypt.compare(
      contraseña,
      user.contraseña
    );

    if (!validPassword) {

      const intentos = (user.intentos_fallidos || 0) + 1;

      if (intentos >= 5) {

        const bloqueo = new Date(
          Date.now() + 15 * 60 * 1000
        );

        await query(
  `
  UPDATE usuarios
  SET
    intentos_fallidos = 0,
    bloqueado_hasta = @param0
  WHERE id = @param1
  `,
  [
    bloqueo,
    user.id
  ]
);

await registrarLogin({

  usuario_id: user.id,

  correo: user.correo,

  ip: req.ip,

  navegador: req.headers["user-agent"],

  estado: "Cuenta bloqueada"

});

return res.status(403).json({

  message:
    "Cuenta bloqueada durante 15 minutos por demasiados intentos."

});

      }
      await query(
        `
        UPDATE usuarios
        SET intentos_fallidos = @param0
        WHERE id = @param1
        `,
        [
          intentos,
          user.id
        ]
      );
          await registrarLogin({
          usuario_id: user.id,

            correo: user.correo,

            ip: req.ip,

            navegador: req.headers["user-agent"],

            estado: "Contraseña incorrecta"

          });
      return res.status(401).json({
        message:
          `Contraseña incorrecta. Intento ${intentos} de 5.`
      });

    }

    // ==========================
    // REINICIAR INTENTOS
    // ==========================

    await query(
      `
      UPDATE usuarios
      SET
        intentos_fallidos = 0,
        bloqueado_hasta = NULL
      WHERE id = @param0
      `,
      [user.id]
    );

    // ==========================
    // GENERAR TOKEN
    // ==========================
    await registrarLogin({

          usuario_id: user.id,

          correo: user.correo,

          ip: req.ip,

          navegador: req.headers["user-agent"],

          estado: "Exitoso"

});
    const token = jwt.sign(
      {
        id: user.id,
        rol: user.rol,
        correo: user.correo
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.json({

      message: "Inicio de sesión exitoso",

      token,

      user: {

        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
        correo: user.correo,
        telefono: user.telefono

      }

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Error en el servidor",

      error: error.message

    });

  }

};

export const register = async (req, res) => {
  const { nombre, correo, contraseña, telefono } = req.body;

  try {
    // Verificar si ya existe
    const existe = await query(
      'SELECT id FROM usuarios WHERE correo = @param0',
      [correo]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    await query(
      `INSERT INTO usuarios (nombre, correo, contraseña, telefono, rol) 
       VALUES (@param0, @param1, @param2, @param3, 'cliente')`,
      [nombre, correo, hash, telefono]
    );

    // Obtener el usuario recién creado
    const nuevoUsuario = await query(
      'SELECT id, nombre, correo, rol FROM usuarios WHERE correo = @param0',
      [correo]
    );

    // Enviar correo (opcional)
    try {
      await sendMail({
        to: correo,
        subject: 'Bienvenido a Spacex Fiber',
        html: `<h1>Hola ${nombre}</h1><p>Tu registro fue exitoso.</p>`
      });
    } catch (e) {
      console.log('No se pudo enviar correo:', e.message);
    }

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente', 
      user: nuevoUsuario[0]
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error al registrar', error: error.message });
  }
};

export const recoverPassword = async (req, res) => {

  console.time("RECUPERACION");

  const { correo } = req.body;

  try {

    console.time("Buscar usuario");

    const rows = await query(
      'SELECT * FROM usuarios WHERE correo = @param0',
      [correo]
    );

    console.timeEnd("Buscar usuario");

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Correo no registrado'
      });
    }

    const usuario = rows[0];

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m'
      }
    );

    const fechaExpiracion = new Date(
      Date.now() + 30 * 60 * 1000
    );

    console.time("Guardar token");

    await query(
      `
      UPDATE password_resets
      SET usado = 1
      WHERE usuario_id = @param0
        AND usado = 0
      `,
      [usuario.id]
    );

    await query(
      `
      INSERT INTO password_resets
      (
        usuario_id,
        token,
        fecha_expiracion
      )
      VALUES
      (
        @param0,
        @param1,
        @param2
      )
      `,
      [
        usuario.id,
        token,
        fechaExpiracion
      ]
    );

    console.timeEnd("Guardar token");

    const link = `http://localhost:5173/reset-password/${token}`;

    console.time("Enviar correo");

    await sendMail({
      to: correo,
      subject: 'Recuperación de contraseña - Spacex Fiber',
      html: resetPasswordTemplate({
        nombre: usuario.nombre,
        link
      })
    });

    console.timeEnd("Enviar correo");

    console.timeEnd("RECUPERACION");

    res.json({
      message: 'Correo de recuperación enviado correctamente.'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};
export const resetPassword = async (req, res) => {

  const { token, contraseña } = req.body;

  try {

    // Validar que el JWT sea válido
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({
        message: "El enlace ha expirado o no es válido."
      });
    }

    // Buscar el token en la base de datos
    const rows = await query(
      `
      SELECT *
      FROM password_resets
      WHERE token = @param0
        AND usado = 0
      `,
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: "El enlace no es válido o ya fue utilizado."
      });
    }

    const reset = rows[0];

    // Verificar fecha de expiración
    if (new Date(reset.fecha_expiracion) < new Date()) {
      return res.status(400).json({
        message: "El enlace ha expirado."
      });
    }

    // Encriptar la nueva contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Actualizar contraseña del usuario
    await query(
      `
      UPDATE usuarios
      SET contraseña = @param0
      WHERE id = @param1
      `,
      [
        hash,
        reset.usuario_id
      ]
    );

    // Marcar el token como usado
    await query(
      `
      UPDATE password_resets
      SET usado = 1
      WHERE id = @param0
      `,
      [reset.id]
    );

    res.json({
      message: "Contraseña actualizada correctamente."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al actualizar la contraseña",
      error: error.message
    });

  }

};