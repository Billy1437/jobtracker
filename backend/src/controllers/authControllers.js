import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const generateToken = (userId) => {
    return jwt.sign({userId},process.env.SECRET_KEY,{expiresIn : "7d"})
    // got token here
};


export const googleLogin = async (req,res) => {
    const {googleId,name, email} = req.body;
    try{
        let user = await User.findOne({
            $or: [
                { googleId: googleId },
                { email: email }
            ]
        })

        if(!user){
            user = new User({
                googleId,
                name,
                email
            })

            await user.save()

        }else{
            if(!user.googleId){
                user.googleId = googleId
            }
            await user.save()

        }

        const token = generateToken(user._id)

        res.json({
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email

            }
        })


    }catch(error){
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Server error during Google login' });

    }
}

export const createUser = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                message:"User already exists."
            })

        }

        const user = await User.create({name,email,password})
        const token = generateToken(user._id);

        res.status(201).json({
            success:true,
            token,
            user
        })
        // its better to hash in model
        
    }catch(error){
        res.status(500).json({message : error.message})
    }
}

export const loginUser = async (req,res) => {

    try{
         console.log('Login attempt with body:', req.body);
        const {email,password} = req.body;

        const user = await User.findOne({email})
        
        if(!user){
            return res.status(401).json({message : "this user does not exists"})
        }
        // check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message : "this password is incorrect"})
        }

        const token = generateToken(user._id)

        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

        res.json({
            success:true,
            token : token,
            user : userWithoutPassword
        })

    }catch(error){
        res.status(501).json({message : error.message})

    }

    

    

}