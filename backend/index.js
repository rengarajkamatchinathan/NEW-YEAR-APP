require('dotenv').config()
const express=require('express')
const { createTodo, updateTodo } = require('./types')
const app=express()

const {todo} = require('./db')

app.use(express.json())

app.post('/todo',async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        return res.status(401).json({
            msg:'You sent the wrong the inputs'
        })
    }

    //put it in mongo db
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })

    res.json({
        msg:"Todo created"
    })
    
})

app.get('/todos',async (req,res)=>{
    const todos=await todo.find({});
    res.json({
        todos
    })
})

app.put('/completed',async (req,res)=>{
    const updatePayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.json({
            msg:'Invalid todo id'
        })
        return;
    }
    await todo.findByIdAndUpdate({
        _id:req.body.id
    },{
        completed:true
    })

    res.json({
        msg:'todo marked as completed'
    })
})


app.listen(process.env.port,()=>{
    console.log(`Server running on port:${process.env.port}`)
})