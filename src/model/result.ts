import mongoose, { Schema, Document } from 'mongoose';


interface Result {
    examId: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    marksObtained: number;
  }
  
  const ResultSchema = new Schema<Result>(
    {
      examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
      studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
      marksObtained: { type: Number, required: true },
    },
    { timestamps: true }
  );
  
  export const Result = mongoose.model<Result>('Result', ResultSchema);