import mongoose from "mongoose"

import 'dotenv/config'

export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database connected.')

    }catch(error){
        console.log('unable to connect database.')

    }
}




