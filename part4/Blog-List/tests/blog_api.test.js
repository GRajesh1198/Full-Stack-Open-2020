const mongoose=require('mongoose')
const Blog=require('../models/blog')
const supertest=require('supertest')
const app=require('../app')
const blogHelper=require('./blog_helper')
const api=supertest(app)

beforeEach(async ()=>{
    await Blog.deleteMany({})

    for(let blog of blogHelper.initialBlogs){
        const blogObject=new Blog(blog)
        await blogObject.save()
    }
})
describe('blog list tests',()=>{
    test('application returns blogs as json',async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
    })

    test('application returns the correct number of blogs',async ()=>{
        const allBlogsResponse=await api.get('/api/blogs')
        expect(allBlogsResponse.body).toHaveLength(blogHelper.initialBlogs.length)
    })
})


afterAll(()=>{
    mongoose.connection.close()
})
