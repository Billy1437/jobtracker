import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps : true})

// save and export

// hash password in here because in models its better

userSchema.pre('save',async function(next){
    
    // if password has not been updated or modified,(like updating, skip the rest of this function)
    if(!this.isModified('password')) return next()

        // hashing
    this.password = await bcrypt.hash(this.password,12)
    next()


})

// now can save now

const User = mongoose.model("User",userSchema)

export default User

