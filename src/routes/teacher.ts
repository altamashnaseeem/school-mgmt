import express from 'express';
import uploader from '../middleware/multer.js';
import { addTeacher, deleteteacher, getAll, getSingle, updateTeacher } from '../controller/teacher.js';
import { requireSignIn,isAdmin } from '../middleware/auth.js';
// admin access
// email:admin@gmail.com
// password:admin

const router = express.Router();
router.post('/add',requireSignIn,isAdmin,uploader.single('file'),addTeacher);
router.get("/all",requireSignIn,getAll);
router.get("/:teacherId",requireSignIn,getSingle)
router.put("/:teacherId",requireSignIn,isAdmin,uploader.single('file'),updateTeacher)
router.delete("/:teacherId",requireSignIn,isAdmin,deleteteacher)
export default router;
