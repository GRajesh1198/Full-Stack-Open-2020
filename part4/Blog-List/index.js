const http=require('http')
const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:String,
    author:String,
    url:String,
    likes:Number
})

const Blog=mongoose.model('Blog',blogSchema)

const mongoUrl='mongodb+srv://fullstack:fullstack@cluster0-rbfh9.mongodb.net/Blog-List?retryWrites=true&w=majority'
mongoose
    .connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log(error.message)
    })
app.use(cors())
app.use(express.json())
app.get('/api/blogs',(req,res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})
app.post('/api/blogs',(req,res) => {
    const blog=new Blog(req.body)

    blog.save()
        .then(result => {
            res.status(201).json(result)
        })
})

const PORT=3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})