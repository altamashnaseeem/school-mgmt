import mongoose, { Schema } from 'mongoose';

interface Teacher{
  name: string;
  email: string;
  subject: string;
  profileImageUrl?: string;
  createdAt: Date;
  deleted:boolean;
}

const TeacherSchema = new Schema<Teacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    profileImageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    deleted:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);

export default mongoose.model<Teacher>('Teacher', TeacherSchema);
