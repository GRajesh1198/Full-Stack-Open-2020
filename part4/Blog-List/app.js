const express=require('express')
const cors=require('cors')
require('express-async-errors')
const app=express()
const mongoose=require('mongoose')
const blogsRouter=require('./controllers/blog')
const usersRouter=require('./controllers/user')
const loginRouter=require('./controllers/login')
const logger=require('./utils/logger')
const config=require('./utils/config')
const middleware=require('./utils/middleware')

logger.info('connecting to ',config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(()=>{
        logger.info('connected to mongodb')
    })
    .catch(error => {
        logger.error('error connecting to :',error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app