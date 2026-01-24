

import User from "../models/user.js";


export const CreateUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, image } = req.body;

 
    if (!clerkId || !email || !firstName || !image) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

 
    const user = await User.findOneAndUpdate(
      { clerkId }, 
      { ...req.body }, 
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "User synced successfully",
      user
    });

  } catch (error) {
    console.error("Sync Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const fetchAllUser =async(req,res)=>{
   try {
    const user= await User.find();
   
    res.status(200).json({message:"users found succefully",status:"success",data:user})
   } catch (error) {
    return  res.status(200).json({message: "Failed to fetch users",status:"fail",error:error.message})
   }
}

// fetch user by clerkId

// export const fetchUserByClerkId =async(req,res)=>{
//   try {
//     const {clerkId}=req.body;
//     if(!clerkId){
//       return res.status(401).json({message:"invaild request plz signin again"})
//     }
//     const user= await User.findOne({clerkId});
//     if(!user){
//       return res.status(401).json({message:"invaild request plz signin again"})
//     }
//      return res.status(200).json({message:"users found succefully",status:"success",data:user})
//   } catch (error) {
//     return  res.status(200).json({message: "Failed to fetch users",status:"fail",error:error.message})
//   }
// }


export const fetchUserByClerkId = async (req, res) => {
  try {
    const { clerkId } = req.query;

    if (!clerkId) {
      return res.status(400).json({ success: false, message: "Clerk ID is required" });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      
      return res.status(404).json({ success: false, message: "User profile incomplete or not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};