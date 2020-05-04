const usersRouter=require('express').Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')

usersRouter.get('/',async (request,response) => {
    const users=await User.find({}).populate('blogs',{url:1,title:1,author:1,id:1})
    response.send(users.map(u=>u.toJSON()))
})

usersRouter.post('/',async (request,response) => {
    const body=request.body
    if(body.password){
        if(body.password.length < 3 ){
            response.status(400).send({
                error:'length of password should be minimum of 3 characters'
            })
        }
        const saltRounds=10
        const passwordHash=await bcrypt.hash(body.password,saltRounds)
        const newUser=new User({
            username:body.username,
            name:body.name,
            passwordHash:passwordHash
        })
        const savedUser=await newUser.save()
        response.json(savedUser)
    }else{
        response.status(400).send({
            error:'password is required'
        })
    }
})

module.exports=usersRouter