import Class from '../model/class.js';
import Student from '../model/student.js';
import Teacher from '../model/teacher.js';
import {Request,Response} from "express"
export const generateClassReport = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    const classData = await Class.findById(classId).populate('teacherId', 'name');
    const isPopulated = (teacher: unknown): teacher is { _id: string; name: string } =>
      (teacher as { name: string }).name !== undefined;

    // Check if teacherId is populated
    let teacherName = 'Unknown';
    if (isPopulated(classData?.teacherId)) {
      teacherName = classData?.teacherId.name;
    }

    const students = await Student.find({ classId }).select('name email');

    if (!classData) {
       res.status(404).json({ message: 'Class not found' });
       return;
    }
  
    const report = {
      className: classData.name,
      teacher: teacherName,
      studentCount: classData.studentCount,
      students,
    };

    res.status(200).json({ report });
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
       }
      // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};
