import mongoose, { Schema, Document } from 'mongoose';

interface Exam {
  name: string;
  classId: mongoose.Types.ObjectId;
  date: Date;
  subject: string;
}

const ExamSchema = new Schema<Exam>(
  {
    name: { type: String, required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true },
    subject: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Exam>('Exam', ExamSchema);