const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')
const jwt=require('jsonwebtoken')

blogsRouter.get('/',async (req,res) => {
    const blogs=await Blog.find({}).populate('user',{username:1,name:1,id:1})
    res.json(blogs.map(b=>b.toJSON()))
})

blogsRouter.post('/',async (req,res) => {
    if(!(req.body.title && req.body.url)){
        res.status(400).end()
    }
    const body=req.body
    const decodedToken=jwt.verify(req.token,process.env.SECRET)
    if(!req.token || !decodedToken.id){
        return res.status(401).json({
            error:'Inavalid or missing token'
        })
    }
    body.likes=!(body.likes) ? 0:body.likes
    const user=await User.findById(decodedToken.id)
    //here user is the creator of the blog and is identified by the token
    const blog=new Blog({...body,user:user._id})
    const savedBlog=await blog.save()
    user.blogs=user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())    
})

blogsRouter.delete('/:id',async (req,res) => {
    const decodedToken=jwt.verify(req.token,process.env.SECRET)
    if(!req.token || !decodedToken.id){
        return res.status(401).json({
            error:'Invalid or missing token'
        })
    }
    const blog=await Blog.findById(req.params.id)
    if(blog === null){
        return res.status(400).end()
    }
    const userId=blog.user.toString()
    if(userId !== decodedToken.id){
        return res.status(401).json({
            error:'Invalid Token for the User'
        })
    }
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204)
})
blogsRouter.put('/:id',async (req,res) => {
    const body=req.body
    const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,{likes:body.likes},{new:true})
    res.json(updatedBlog.toJSON())
})
module.exports=blogsRouter