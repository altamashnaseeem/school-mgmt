import Exam from '../model/exam.js';
import { Request, Response } from 'express';
export const createExam = async (req: Request, res: Response) => {
    try {
      const { name, classId, date, subject } = req.body;
       // Validate and convert date
     const parsedDate = new Date(date);
     if (isNaN(parsedDate.getTime())) {
       res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
       return;
     }
      const exam = await Exam.create({ name, classId, date:parsedDate, subject });
  
      res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
           }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
    }
  };