import { body } from 'express-validator';

export const validateRegistration = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];
