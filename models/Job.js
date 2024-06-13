const { required } = require('joi')
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name'],
        maxlenght:50
    },
    position:{
        type:String,
        required:[true,'please provide position'],
        maxlenght:200
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        //Enums are constants based data structures that store a set of named constants grouped around a central theme or intent
    default:'pending',

    },
    createdBY:{
        type:mongoose.Types.ObjectId,
        ref:'User',//model we are refrenceing too(here user model)
        required:[true,'please provide user']
    }
    },{timestamps:true}
)

module.exports= mongoose.model('Job',jobSchema)