import express from 'express';
import { addStudent, deleteStudent, getAll, getSingle, updateStudent} from '../controller/student.js';
import uploader from '../middleware/multer.js';
import { requireSignIn,isAdmin } from '../middleware/auth.js';
// admin access
// email:admin@gmail.com
// password:admin

const router = express.Router();
router.post('/add',requireSignIn,isAdmin,uploader.single('file'),addStudent);
router.get("/all",requireSignIn,getAll);
router.get("/:studentId",requireSignIn,getSingle)
router.put("/:studentId",requireSignIn,isAdmin,uploader.single('file'),updateStudent)
router.delete("/:studentId",requireSignIn,isAdmin,deleteStudent)
export default router;
