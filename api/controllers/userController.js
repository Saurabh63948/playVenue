// import { success } from "zod";
// import User from "../models/user.js"
// export const CreateUser = async(req,res)=>{

//   const{clerkId,email,firstName,lastName,image,sports,provider}=req.body;

//   if(!clerkId || !email || !firstName || !image){
//     return res.status(400).json({message:"Missing required field"})
//   }
//   try {
//     let user =await User.findOne({clerkId});
    
//     if(user){
//       user.firstName=firstName;
//       user.lastName =lastName;
//       user.image =image;
//       user.sports=sports;
//       await user.save();
//     }else{
//       user =await User.create({
//         clerkId,
//         email,
//         firstName,
//         lastName,
//         image,
//         sports,
//         provider
//       })
//     }
//    return  res.status(200).json({success:true,user})

//   } catch (error) {
//     console.error("Error creating/updating user:",error)
//      return res.status(500).json({message:"Server error"})
//   }

// }

import User from "../models/user.js";

export const CreateUser = async (req, res) => {
  const { clerkId, email, firstName, lastName, image, sports, provider } = req.body;

  // Validation
  if (!clerkId || !email || !firstName || !image) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields: clerkId, email, firstName, or image" 
    });
  }

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ clerkId });

    if (user) {
      // 2. Update existing user
      user.firstName = firstName;
      user.lastName = lastName || user.lastName;
      user.image = image;
      user.sports = sports || user.sports;
      
      await user.save();
      return res.status(200).json({ 
        success: true, 
        message: "User updated successfully", 
        user 
      });
    } else {
      // 3. Create new user
      user = await User.create({
        clerkId,
        email,
        firstName,
        lastName,
        image,
        sports,
        provider
      });

      return res.status(201).json({ 
        success: true, 
        message: "User created successfully", 
        user 
      });
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    
    // Check for duplicate email error (MongoDB code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this email or clerkId already exists" 
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};