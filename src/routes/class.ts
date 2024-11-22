import express from 'express';
import { assignTeacher, createClass, deleteClass, getAllClasses, updateClass } from '../controller/class.js';
import { requireSignIn,isAdmin } from '../middleware/auth.js';
// admin access
// email:admin@gmail.com
// password:admin
const router = express.Router();
router.post('/create',requireSignIn,isAdmin,createClass);
router.put("/assign/:classId",requireSignIn,isAdmin,assignTeacher);
router.get("/all/:page/:limit",requireSignIn, getAllClasses);
router.put("/update/:classId",requireSignIn,isAdmin,updateClass)
router.delete("/delete/:classId",requireSignIn,isAdmin,deleteClass)
export default router;
