const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const helper=require('./blog_helper')
const app=require('../app')
const supertest=require('supertest')
const api=supertest(app)
const User=require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash=await bcrypt.hash('secret',10)
    const user=new User({username:'root',passwordHash})
    await user.save()
})
describe('when there is initially one user in db',() => {
    test('creation of new user succeeds',async () => {
        const usersAtStart=await helper.usersInDb()
        const newUser={
            username:'professor',
            password:'bankofspain'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        const usersAtEnd=await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames=usersAtEnd.map(u=>u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper statuscode and message if username already present',async()=>{
        const usersAtStart=await helper.usersInDb()
        const newUser={
            username:'root',
            name:'superuser',
            password:'royalmintofspain'
        }
        const result=await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)
        expect(result.body.error).toContain('`username` to be unique')
        const usersAtEnd=await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if length of username is less than 3',async() => {
        const usersAtStart=await helper.usersInDb()
        const newUser={
            username:'fo',
            name:'Test User1',
            password:'foobar'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)
        const usersAtEnd=await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if length of password is less than 3',async() => {
        const usersAtStart=await helper.usersInDb()
        const newUser={
            username:'foobar',
            name:'Test User2',
            password:'fo'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)
        const usersAtEnd=await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if password is missing',async() => {
        const usersAtStart=await helper.usersInDb()
        const newUser={
            username:'foofoo',
            name:'Test User3',
            
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)
        const usersAtEnd=await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
afterAll(async (done) => {
    mongoose.connection.close()
    done()
})