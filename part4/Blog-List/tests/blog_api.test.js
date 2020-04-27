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
    test('Successfully created a blog ',async ()=>{
        const newBlog={
            title: 'Star wars', 
            author: 'Robert C. Martin', 
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 
            likes: 2,
        }
        const blogToBeAdded=new Blog(newBlog)
        await api
            .post('/api/blogs')
            .send(blogToBeAdded)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        const blogsAtEnd=await blogHelper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length +1)
        const blogTitles=blogsAtEnd.map(blog=>blog.title)
        expect(blogTitles).toContain('Star wars')
    })

    test('verifies the unique identifier property',async() =>{
        const blogsResponse= await api.get('/api/blogs')
        blogsResponse.body.map(blog=>expect(blog.id).toBeDefined())
    })
    test('likes default to the value zero',async() =>{
        const newBlog={
            title:'Star wars Chapter 2',
            author:'Stan lee',
            url:'http://blog.cleancoder.com/starwars'
        }
        const blogToBeAdded=new Blog(newBlog)
        await api
            .post('/api/blogs')
            .send(blogToBeAdded)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        const blogsAtEnd=await api.get('/api/blogs')
        const blogAddedToDb=blogsAtEnd.body.find(blog=>blog.title==='Star wars Chapter 2')
        expect(blogAddedToDb.likes).toEqual(0)
    })
   
})
afterAll(()=>{
    mongoose.connection.close()
})
