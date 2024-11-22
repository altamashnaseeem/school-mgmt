
import { Result } from '../model/result.js';
import { Request, Response } from 'express';



export const addResult = async (req: Request, res: Response) => {
  try {
    const { examId, studentId, marksObtained } = req.body;

    const result = await Result.create({ examId, studentId, marksObtained });

    res.status(201).json({ message: 'Result added successfully', result });
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
       }
       // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

export const getResultsByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    const results = await Result.find()
      .populate({ path: 'examId', match: { classId } })
      .populate('studentId', 'name');

    res.status(200).json({ results });
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
       }
       // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};
