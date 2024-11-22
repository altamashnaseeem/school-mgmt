import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.js";
import connectDb from "./config/dbConfig.js";
import teacherRoutes from "./routes/teacher.js";
import classRoutes from "./routes/class.js"
import authRoutes from "./routes/auth.js"
import attendanceRoutes from "./routes/attendance.js"
import examRoutes from "./routes/exam.js"
import resultRoutes from "./routes/result.js"
import reportRoutes from "./routes/report.js"
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/student", studentRoutes);
app.use("/api/teacher",teacherRoutes);
app.use("/api/class",classRoutes);
app.use("/api/user",authRoutes)
app.use("/api/attendance",attendanceRoutes);
app.use("/api/exam",examRoutes);

app.use("/api/result",resultRoutes);

app.use("/api/report",reportRoutes);






const startServer = async () => {
  try {
    // Wait for the database connection to complete
    await connectDb();

    // Start the server after the DB connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
};
startServer();
