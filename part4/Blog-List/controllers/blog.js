const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/',async (req,res) => {
    const blogs=await Blog.find({})
    res.json(blogs.map(b=>b.toJSON()))
})

blogsRouter.post('/',async (req,res) => {
    if(!req.body.title){
        res.status(400).end()
    }else if(!req.body.url){
        res.status(400).end()
    }
    else{
        if(req.body.likes === undefined){
            req.body.likes=0
        }
        const blog=new Blog(req.body)
        const blogResponse=await blog.save()
        res.json(blogResponse.toJSON())   
    }
     
})

module.exports=blogsRouter