require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const Person=require('./models/person')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
var morgan=require('morgan')
morgan.token('content',(req,res)=>{
    if(req.method!=='POST'){
        return ' '
    }
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' ))


app.get('/',(req,res)=>{
    res.send("Go to Route /api/persons to access the data")
})

app.get('/info',(req,res,next)=>{
    Person.countDocuments()
          .then(count=>{
              res.send( `<p>Phonebook has info for ${count} ${count==1 ? "Person" :"People"}</p>
              <p>${new Date()}`
            )

          })
})
app.get('/api/persons',(req,res,next)=>{
    Person.find({})
        .then(result=>{
            console.log("Results Obtained")
            res.json(result.map(person=>person.toJSON()))
        })
        .catch(error=>next(error))
})

app.get('/api/persons/:id',(req,res,next)=>{
    Person.findById(req.params.id)
          .then(person=>{
              if(person){
                  res.json(person.toJSON())
              }else{
                  res.status(404).end()
              }
          })
          .catch(error=>next(error))
})

app.delete('/api/persons/:id',(req,res,next)=>{
    Person.findByIdAndRemove(req.params.id)
          .then(note=>{
              res.status(204).end()
          })
          .catch(error=>next(error))
})

app.post('/api/persons',(req,res,next)=>{
    const body=req.body
    if(!body.name){
        return res.status(400).json({
            error:'Required Name Property Is Missing'
        })
    }
    if(!body.number){
        return res.status(400).json({
            error:'Required Number Property Is Missing'
        })
    }
    
    const person=new Person({
        name:body.name,
        number:body.number
    })
    person.save()
        .then(savedNote=>{
            res.json(savedNote.toJSON())
        })
        .catch(error=>next(error))

})
app.put('/api/persons/:id',(req,res,next)=>{
    const body=req.body
    const person={
        name:body.name,
        number:body.number
    }

    Person.findByIdAndUpdate(req.params.id,person,{new:true})
           .then(updatedPerson=>{
               res.json(updatedPerson.toJSON())
           })
           .catch(error=>next(error))
})
const unknownEndpoint=(req,res)=>{
    res.status(400).send({error:"Unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler=(error,req,res,next)=>{
    console.log(error.message)

    if(error.name==='CastError' && error.kind==='ObjectId'){
        return res.status(400).send({
            error:'Malformatted Id'
        })
    }else if(error.name === 'ValidationError'){
        return res.status(400).send(error.message)
    }
    next(error)
}
app.use(errorHandler)
const PORT=process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server running on  port ${3001}`)
})
