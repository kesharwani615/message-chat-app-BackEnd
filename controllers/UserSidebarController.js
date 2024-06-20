import User from "../models/userModels.js";

export const getAllSidebarUser = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized: No user found in request" });
      }
  
      const loggedInUser = req.user._id;

      const getAllUser = await User.find({ _id: { $ne: loggedInUser } });

      console.log("getAllUserqqq:",getAllUser);
  
      if (getAllUser.length > 0) {
        return res.status(200).json({ getAllUser });
      }
  
      return res.status(200).json({ message: "No user found!" });
    } catch (error) {
      console.log("Error in getAllSidebarUser controller:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  