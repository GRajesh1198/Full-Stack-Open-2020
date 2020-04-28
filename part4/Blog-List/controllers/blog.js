const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/',async (req,res,next) => {
    const blogs=await Blog.find({})
    res.json(blogs.map(b=>b.toJSON()))
})

blogsRouter.post('/',async (req,res,next) => {
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

blogsRouter.delete('/:id',async (req,res,next) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports=blogsRouter