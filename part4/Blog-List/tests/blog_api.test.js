const mongoose=require('mongoose')
const Blog=require('../models/blog')
const supertest=require('supertest')
const app=require('../app')
const blogHelper=require('./blog_helper')
const api=supertest(app)

let loggedInToken
beforeAll(async () => {
    const loginResponse=await api
        .post('/api/login')
        .send({
            username:'foobar',
            password:'foo'
        })
    loggedInToken=loginResponse.body.token
        
})
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
            .set('Authorization',`Bearer ${loggedInToken}`)
            .send(blogToBeAdded)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        const blogsAtEnd=await blogHelper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length +1)
        const blogTitles=blogsAtEnd.map(blog=>blog.title)
        expect(blogTitles).toContain('Star wars')
    })
    test('Creation fails with proper status code if no token is provided',async () => {
        const newBlog={
            title: 'Star wars', 
            author: 'Robert C. Martin', 
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 
            likes: 2,
        }
        const blogToBeAdded=new Blog(newBlog)
        const result=await api
            .post('/api/blogs')
            .send(blogToBeAdded)
        expect(result.statusCode).toBe(500)
        const blogsAtEnd=await blogHelper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length)
    })
    test('verifies the unique identifier property',async() =>{
        const blogsResponse= await api.get('/api/blogs')
        blogsResponse.body.map(blog=>expect(blog.id).toBeDefined())
    })

    test('likes default to the value zero',async() =>{
        const newBlog={
            title:'Captain Marvel',
            author:'Stan lee',
            url:'http://blog.cleancoder.com/starwars'
        }
        const blogToBeAdded=new Blog(newBlog)
        await api
            .post('/api/blogs')
            .set('Authorization',`Bearer ${loggedInToken}`)
            .send(blogToBeAdded)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        const blogsAtEnd=await api.get('/api/blogs')
        const blogAddedToDb=blogsAtEnd.body.find(blog=>blog.title==='Captain Marvel')
        expect(blogAddedToDb.likes).toEqual(0)
    })

    test('verifies if the title and url properties are missing',async()=>{
        const newBlog={
            author:'Tony Stark'
        }
        const blogToBeAdded=new Blog(newBlog)
        await api
            .post('/api/blogs')
            .set('Authorization',`Bearer ${loggedInToken}`)
            .send(blogToBeAdded)
            .expect(400)
    })
})
afterAll(async (done)=>{
    mongoose.connection.close()
    done()
})
