import express from 'express';
import { createExam } from '../controller/exam.js';
import { requireSignIn,isAdmin } from '../middleware/auth.js';
// admin access
// email:admin@gmail.com
// password:admin
const router = express.Router();
//create a exam

router.post('/create',requireSignIn,isAdmin, createExam);


export default router;
