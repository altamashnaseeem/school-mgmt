import express from 'express';
import {addResult, getResultsByClass } from '../controller/result.js';
import { requireSignIn,isAdmin } from '../middleware/auth.js';
// admin access
// email:admin@gmail.com
// password:admin
const router = express.Router();

//add result
router.post('/add',requireSignIn,isAdmin, addResult); 
//getting result
router.get('/:classId',requireSignIn, getResultsByClass);

export default router;
