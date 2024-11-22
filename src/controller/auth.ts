import { Request, Response } from 'express';
import User from '../model/user.js';
import JWT from 'jsonwebtoken';
import bcrypt from "bcrypt"
import { comparePassword } from '../helper/helperAuth.js';
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;


    // Validate required fields
    if (!email || !password || !username) {
      res.status(400).json({ message: 'Email, password, and username are required' });
      return;
    }

    // if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,

    });

    await newUser.save();


    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.username,
        email: newUser.email,

      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      res.status(404).json({
        message: "invalid email or password",
        success: false
      })
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "email is not registered"
      })
      return;
    }
    const match = await comparePassword(password, user.password);
    console.log(match)
    if (!match) {
      res.status(404).json({
        success: false,
        message: "Invalid Password"
      })
    }
    //token 
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' })
    res.status(200).json(
      {
        success: true,
        message: "login successfully",
        token
      }
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    // For unexpected server-side issues
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
