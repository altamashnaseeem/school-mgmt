import mongoose, { Schema} from 'mongoose';

interface Student {
  name: string;
  email: string;
  classId: mongoose.Types.ObjectId;
  profileImageUrl?: string;
  createdAt: Date;
  deleted:boolean;
}

const StudentSchema = new Schema<Student>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    profileImageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<Student>('Student', StudentSchema);
