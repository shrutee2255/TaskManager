require('dotenv').config();
require('express-async-errors');
const express = require('express');
const https = require('https')
const app = express();
const fs = require('fs')

const tlsSessionCache = new Map();

// connectDB
const connectDB =require('./db/connect')
//router
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

const authenticateUser= require('./middleware/authentication')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
// app.get('/', (req, res) => {
//   res.send('jobs api');
// });

 app.get('/',(req,res)=>{
  res.send('jobs api')
 })
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const option={
  key:fs.readFileSync('./certs/key.pem'),
  certs:fs.readFileSync('./certs/certs.pem'),

  resumesession(sessionid,callback){
    const session = tlsSessionCache.get(sessionid.toString('hex'));
    callback(null,session)
  }

}
const server = https.createServer(option,app);

server.on('newSession',(sessionid,sessindata,callback)=>{
  try{
    tlsSessionCache.set(sessionid.toString('hex'),sessiondata);
  }
  catch(err){
    callback(err)

  }
})



const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log(process.env.MONGO_URI)
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
