import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const ProtectMiddleware = async (req, res, next) => {
	try {
	  // Retrieve token from headers
	  const token = req.headers.authorization;
	  // For using post cookie, uncomment the next line
	  // const token = req.cookies.sessionToken;

	//   console.log("token:",token)
  
	  if (!token) {
		return res.status(401).json({ error: "Unauthorized - No Token Provided" });
	  }
  
	  let decoded;
	  try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("===",decoded) 

	  } catch (err) {
		return res.status(401).json({ error: "Unauthorized - Invalid Token" });
	  }
      console.log("----",decoded,JSON.stringify(decoded)) 

	  if (!decoded || !decoded.userId) {
		return res.status(401).json({ error: "Unauthorized - Invalid Token Data" });
	  }
  
	  const user = await User.findById(decoded.userId).select("-password");

	  
	  if (!user) {
		console.log(user)
		return res.status(403).json({ error: "User not found" });
	  }
  
	  req.user = user;
	  next();
	} catch (error) {
	  console.log("Error in ProtectMiddleware: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
  };
  
  export default ProtectMiddleware;
  