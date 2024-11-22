import mongoose, { Schema} from 'mongoose';

interface Class {
  name: string;
  teacherId: mongoose.Types.ObjectId;
  studentCount: number;
  createdAt: Date;
}

const ClassSchema = new Schema<Class>(
  {
    name: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    studentCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<Class>('Class', ClassSchema);
