import { success } from "zod";
import User from "../models/user.js"
export const CreateUser = async(req,res)=>{

  const{clerkId,email,firstName,lastName,image,sports,provider}=req.body;

  if(!clerkId || !email || !firstName || !image){
    return res.status(400).json({message:"Missing required field"})
  }
  try {
    let user =await User.findOne({clerkId});
    
    if(user){
      user.firstName=firstName;
      user.lastName =lastName;
      user.image =image;
      user.sports=sports;
      await user.save();
    }else{
      user =await User.create({
        clerkId,
        email,
        firstName,
        lastName,
        image,
        sports,
        provider
      })
    }
   return  res.status(200).json({success:true,user})

  } catch (error) {
    console.error("Error creating/updating user:",error)
     return res.status(500).json({message:"Server error"})
  }

}