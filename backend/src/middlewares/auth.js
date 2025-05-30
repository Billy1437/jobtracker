import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const protect = async(req,res,next) => {
    try{

        let token;

        //auth , bear , token = [1] 
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }

        if(!token){
            return res.status(401).json({message : "no token provided."})
        }

        // decode token (jwt.verify)
        const decoded = jwt.verify(token,process.env.SECRET_KEY)

        // get user from this because payload is userId
        const user = await User.findById(decoded.userId)
        if(!user){
            return res.status(401).json({message : "user not found"})
        }

        // assign user into req.user because we will use in application
        req.user = user
        next();

    }catch(error){
        res.status(401).json({ message: 'Invalid token' });
    }
}