import express from "express";
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import { loginUser, registerUser } from "../controller/auth.js";
import { validationResult } from 'express-validator';
const router=express.Router();
// Error handler middleware
const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
router.post("/register",validateRegistration, handleValidationErrors,registerUser);
router.post("/login",validateLogin, handleValidationErrors,loginUser);


export default router;


