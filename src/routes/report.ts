import express from 'express';
import { generateClassReport } from '../controller/report.js';
import { requireSignIn} from '../middleware/auth.js';
// admin access
// email:admin@gmail.com
// password:admin
const router = express.Router();
// class report generate
router.get('/:classId',requireSignIn, generateClassReport);

export default router;
