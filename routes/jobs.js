const express = require('express')
const {register}= require('../controllers/auth')
const router = express.Router()

const {getALLJobs,getjob,createjob,updatejob,deletejob} = require('../controllers/jobs')


router.route('/').post(createjob).get(getALLJobs)
router.route('/:id').get(getjob).delete(deletejob).patch(updatejob)

module.exports =  router