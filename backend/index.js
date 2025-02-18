require('dotenv').config()
const express=require('express')
const { createTodo } = require('./types')
const app=express()

app.use(express.json())

app.post('/todo',(req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        return res.status(401).json({
            msg:'You sent the wrong the inputs'
        })
    }

    //put it in mongo db
})

app.get('/todos',(req,res)=>{

})

app.put('/completed',(req,res)=>{

})


app.listen(process.env.port,()=>{
    console.log(`Server running on port:${process.env.port}`)
})