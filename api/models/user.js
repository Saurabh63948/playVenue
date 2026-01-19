import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  clerkId:{type:String,required:true,unique:true},
  email:{type:String,required:true,unique:true},
  firstName:{type:String,required:true},
  lastName:{type:String},
  image:{type:String,required:true},
  skill:{type:String},
  noOfGame:{type:Number,default:0},
  playpals:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
  sports:[String],
  provider:String
},{
  timestamps:true
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;