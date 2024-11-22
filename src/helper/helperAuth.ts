
import bcrypt from "bcrypt"

export const comparePassword=async(password:string,hashedPassword:string)=>{
  
  try {
    console.log(password,hashedPassword);
    
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Password comparison failed:", error);
    return false;
  }
}