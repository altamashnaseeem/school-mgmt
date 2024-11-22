import Attendance from '../model/attendance.js';
import { Request, Response } from 'express';

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId, classId, date, status } = req.body;

     // Validate and convert date
     const parsedDate = new Date(date);
     if (isNaN(parsedDate.getTime())) {
       res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
       return;
     }

    const attendance = await Attendance.create({ studentId, classId, date:parsedDate, status });

    res.status(201).json({ message: 'Attendance marked successfully', attendance });
  } catch (error:unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
       }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
    }
};

export const getAttendanceByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const attendanceRecords = await Attendance.find({ classId }).populate('studentId', 'name');

    res.status(200).json({ attendanceRecords });
  } catch (error:unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
       }
      // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};
