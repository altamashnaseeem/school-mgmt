import mongoose, { Schema} from 'mongoose';

interface Attendance {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  date: Date;
  status: 'Present' | 'Absent';
}

const AttendanceSchema = new Schema<Attendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Attendance>('Attendance', AttendanceSchema);
