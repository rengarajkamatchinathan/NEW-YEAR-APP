require('dotenv').config()
const mongoose=require('mongoose');
console.log(process.env.mongo_url)
mongoose.connect(process.env.mongo_url)
.then(()=>{console.log('Connnected to mongo db')})
.catch((err)=>{console.log('Err connecting to mongo db',err.message)})

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo = mongoose.model('todo',todoSchema);

module.exports = {
    todo
};