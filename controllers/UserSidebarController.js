import User from "../models/userModels.js";

export const getAllSidebarUser=async (req,res)=>{
try {
 const loggedInUser=req.user._id;
//  console.log(loggedInUser)
 const getAllUser=await User.find({_id:{$ne:loggedInUser}});
 res.status(200).json(getAllUser);
} catch (error) {
    console.log("Error is sendMessage controller:",error.message)
    console.log("internal server error")
}
}