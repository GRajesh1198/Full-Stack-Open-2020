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

blogsRouter.delete('/:id',async (req,res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})
blogsRouter.put('/:id',async (req,res) => {
    const body=req.body
    const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,{likes:body.likes},{new:true})
    res.json(updatedBlog.toJSON())
})
module.exports=blogsRouter