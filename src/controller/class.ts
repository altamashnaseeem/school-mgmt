import { Request, Response } from 'express';
import Class from '../model/class.js';
import Teacher from '../model/teacher.js';

export const createClass = async (req: Request, res: Response) => {
  try {
    const { name, teacherId, studentCount } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    const newClass = new Class({ name, teacherId, studentCount });
    await newClass.save();

    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};



export const assignTeacher = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const { teacherId } = req.body;

    // Validate if the class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }

    // Validate if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    // Assign the teacher to the class
    existingClass.teacherId = teacherId;
    await existingClass.save();

    res.status(200).json({
      message: 'Teacher assigned to class successfully',
      class: existingClass,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

export const getAllClasses = async (req: Request, res: Response) => {
  try {

    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    // Fetch classes with pagination
    const classes = await Class.find()
      .populate('teacherId', 'name email subject')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalClasses = await Class.countDocuments();

    res.status(200).json({
      message: 'Classes fetched successfully',
      totalClasses,
      totalPages: Math.ceil(totalClasses / pageSize),
      currentPage: pageNumber,
      classes,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};



export const updateClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const { name, teacherId, studentCount } = req.body;


    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }


    if (name) existingClass.name = name;
    if (teacherId) existingClass.teacherId = teacherId;
    if (typeof studentCount === 'number') existingClass.studentCount = studentCount;


    await existingClass.save();

    res.status(200).json({
      message: 'Class updated successfully',
      updatedClass: existingClass,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: 'An unknown error occurred' });
  }
};



export const deleteClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    // Validate if the class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }


    await existingClass.deleteOne();

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: 'An unknown error occurred' });
  }
};

