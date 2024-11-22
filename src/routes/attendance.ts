import express from 'express';
import { markAttendance, getAttendanceByClass } from '../controller/attendance.js';
import { requireSignIn} from '../middleware/auth.js';
const router = express.Router();
// admin access
// email:admin@gmail.com
// password:admin
router.post('/',requireSignIn, markAttendance);
router.get('/:classId',requireSignIn, getAttendanceByClass);

export default router;
