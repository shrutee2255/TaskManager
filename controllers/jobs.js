const Job = require('../models/Job')
const {StatusCodes}= require('http-status-codes')
const {  BadRequestError,NotFoundError}= require('../errors')

const getALLJobs = async (req,res)=>{
   const jobs = await Job.find({createdBY:req.user.userID}).sort('createdAt')
   res.status(StatusCodes.OK).json({ jobs,count:jobs.length})
    }
    const getjob= async (req,res)=>{

    const{ user:{ userID },params:{ id:  jobid } }= req
    // console.log(jobid,userID)

    const job = await Job.findOne({ _id:jobid, createdBY: userID})

     if(!job){
        throw new NotFoundError(`no jobs with ${jobid}`)
     }
res.status(StatusCodes.OK).json({ job })

    }
    
    const createjob= async (req,res)=>{ 
        req.body.createdBY=req.user.userID
        const job = await Job.create(req.body)
        res.status(StatusCodes.CREATED).json({ job })
    }
    const updatejob= async (req,res)=>{
        const{body:{company,position},user:{ userID },params:{ id:  jobid } }= req
        if(company==="" || position ===""){
            throw new BadRequestError('feild is empty')
        }
        const job = await Job.findByIdAndUpdate({_id:jobid,createdBY:userID},req.body,{new:true,runValidators:true})
        if(!job){
            throw new NotFoundError(`no jobs with ${jobid}`)
         }
    res.status(StatusCodes.OK).json({ job })

    }
    const deletejob= async (req,res)=>{
        const { user:{userID}, params:{id:jobid}}=req

        const job = await Job.findByIdAndRemove({_id:jobid,createdBY:userID})
        if(!job){
            throw new NotFoundError(`no jobs with ${jobid}`)
         }
    res.status(StatusCodes.OK).send()


    }
    module.exports = {
       getALLJobs,getjob,createjob,updatejob,deletejob
    }