import { Request, Response } from 'express';
import Teacher from '../model/teacher.js';
import cloudinary from '../config/cloudinaryconfig.js';

export const addTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, subject } = req.body;
    const teacherExist = await Teacher.findOne({ email });
    if (teacherExist) {
      res.status(400).json({
        message: "email is already exist !"
      })
      return;
    }
    let profileImageUrl;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);

      profileImageUrl = uploadResult.secure_url;
    }

    const teacher = new Teacher({ name, email, subject, profileImageUrl });
    await teacher.save();
    res.status(201).json({ message: 'Teacher added successfully', teacher });
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

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const teachers = await Teacher.find({ deleted: false })
      .skip(skip)
      .limit(limit);
    const totalTeachers = await Teacher.countDocuments({ deleted: false });


    res.status(200).json({
      teachers,
      pagination: {
        totalTeachers,
        currentPage: page,
        totalPages: Math.ceil(totalTeachers / limit),
        perPage: limit
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

// Get a single teacher by ID
export const getSingle = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      res.status(404).json({ message: 'teacher not found' });
      return;
    }

    res.status(200).json(teacher);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {

    const { teacherId } = req.params;
    const { name, email, subject } = req.body;

    let profileImageUrl;

    // Check if a profile image is provided
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = uploadResult.secure_url;
    }

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: 'teacher not found' });
      return;
    }

    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.subject = subject || teacher.subject;
    if (profileImageUrl) {
      teacher.profileImageUrl = profileImageUrl;
    }

    await teacher.save();

    res.status(200).json({ message: 'teacher updated successfully', teacher });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};

// (soft delete) a teacher
export const deleteteacher = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: 'teacher not found' });
      return;
    }
    teacher.deleted = true;
    await teacher.save();

    res.status(200).json({ message: 'teacher deleted successfully', teacher });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unexpected server-side issues
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
};