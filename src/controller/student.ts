import { Request, Response } from 'express';
import Student from '../model/student.js';
import cloudinary from '../config/cloudinaryconfig.js';

export const addStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, classId } = req.body;
    const studentExist = await Student.findOne({ email });
    if (studentExist) {
      res.status(400).json({
        message: "email is already exist"
      })
      return;
    }
    let profileImageUrl;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);

      profileImageUrl = uploadResult.secure_url;
    }

    const student = new Student({ name, email, classId, profileImageUrl });
    await student.save();
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, classId } = req.query;

    const pageNumber = parseInt(page as string, 10);

    const pageLimit = parseInt(limit as string, 10);


    let query: any = {};
    if (classId) {
      query.classId = classId;
    }

    const students = await Student.find(query)
      .skip((pageNumber - 1) * pageLimit)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    res.status(200).json(students);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};

// Get a single student by ID
export const getSingle = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.status(200).json(student);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};


export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { name, email, classId } = req.body;
    let profileImageUrl;


    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = uploadResult.secure_url;
    }

    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    // Update the student's details
    student.name = name || student.name;
    student.email = email || student.email;
    student.classId = classId || student.classId;
    if (profileImageUrl) {
      student.profileImageUrl = profileImageUrl;
    }

    await student.save();

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};

//  (soft delete) a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }


    student.deleted = true;
    await student.save();

    res.status(200).json({ message: 'Student deleted successfully', student });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};