import { body } from 'express-validator';

export const loginValidator = [
  body('correo').isEmail().withMessage('Correo inválido'),
  body('contraseña').isLength({ min: 6 }).withMessage('Contraseña mínimo 6 caracteres')
];

export const registerValidator = [
  body('nombre').notEmpty().withMessage('Nombre requerido'),
  body('correo').isEmail().withMessage('Correo inválido'),
  body('contraseña')
    .isLength({ min: 8 })
    .matches(/[A-Z]/).withMessage('Debe tener una mayúscula')
    .matches(/[0-9]/).withMessage('Debe tener un número'),
  body('telefono').isLength({ min: 7 }).withMessage('Teléfono inválido')
];
