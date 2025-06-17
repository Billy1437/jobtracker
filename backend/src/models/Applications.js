import mongoose from "mongoose";


const applicationSchema = mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    position:{
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    appliedDate : {
        type : Date,
        required : true
    },
    status:{
        type:String,
        required : true
    },
    note:{
        type:String,
    }
}, {timestamps : true})

const Application = mongoose.model('Application',applicationSchema)

export default Application