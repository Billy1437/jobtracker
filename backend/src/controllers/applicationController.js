import Application from "../models/Applications.js"



export const getAllUserApplications = async (req,res) => {
    
    try{
        const userId = req.user._id
        const applications = await Application.find({userId : userId}).sort({createdAt: -1});

        res.status(200).json({
            success : true,
            data : applications
        })

    }catch(error){
        res.status(500).json({message : error.message})
    }


}

export const createApplication = async (req,res) => {
    try{
        const {position,company,status,appliedDate,note} = req.body

        const application = await Application.create({
            userId : req.user._id,
            position : position,
            company : company,
            status : status,
            appliedDate : appliedDate,
            note: note
        })

        res.status(200).json({
            success:true,
            data : application
        })



    }catch(error){
        res.status(500).json({message : error.message})

    }
}


export const updateApplication = async (req,res) => {
    try{
        const userId = req.user._id;
        const application = await Application.findOneAndUpdate(
            {_id : req.params.id, userId : userId},
            req.body,
            {
                new : true
            }
        )

        if(!application){
            return res.status(404).json({message : "the application is not found"})
        }

        res.status(201).json({
            success : true,
            data : application
        })

    }catch(error){
        res.status(501).json({message : error.message})

    }
}


export const deleteApplication = async (req,res) => {

    try{
        const userId = req.user._id
        const application = await Application.findOneAndDelete({
            _id : req.params.id, userId : userId
        }
    )

    if(!application){
        return res.status(404).json({message : "Application not found"})
    }

    res.json({
        success: true,
        message : "application deleted"
    })

    }catch(error){
        res.status(500).json({message : error.message})
    }

}