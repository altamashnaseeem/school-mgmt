import { Request, Response, NextFunction } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';
import User from "../model/user.js";

interface JwtPayloadWithId extends JwtPayload {
  _id: string;
}

interface AuthRequest extends Request {
  user?: JwtPayloadWithId;
}

export const requireSignIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
       res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
      return;
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as JwtPayloadWithId;

    if (!decoded._id) {
       res.status(401).json({
        success: false,
        message: "Invalid token structure",
      });
      return;
    }
    req.user = decoded;
    console.log("Decoded user:", req.user);

    next();
  } catch (error) {
    console.error("Authentication error:", error);
     res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    if (!req.user || !req.user._id) {
       res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }

    // Fetch user from the database
    const user = await User.findById(req.user._id);

    if (!user) {
       res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
       res.status(403).json({
        success: false,
        message: "Admin access only",
      });
      return;
    }

    // Proceed if admin
    next();
  } catch (error) {
    console.error("Admin access error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin validation",
    });
  }
};
