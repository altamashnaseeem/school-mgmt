import mongoose from "mongoose";
const connectDb=async()=>{
  try {
     await mongoose.connect(process.env.MONGODB_URI as string);
     console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
export default connectDb;
