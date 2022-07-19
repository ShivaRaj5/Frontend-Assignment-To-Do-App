const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 5000;
mongoose.connect("mongodb+srv://shivaraj:Shiva123@cluster0.8eosj.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the database")
}).catch((err)=>{
    console.log("No Connection")
})
const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})
const todoModel=new mongoose.model("todoModel",todoSchema);
app.post('/todos',async (req,res)=>{
    const {title,completed}=req.body;
    try{
        const userData=new todoModel({title});
        const saveData=await userData.save();
        if(saveData)
            res.send("Data has been saved");
        else    
            res.send("Data has not been saved")
    }catch(err){
        res.send(err);
    }
})
app.get("/todos",async (req,res)=>{
    try{
        const _id=todoModel._id;
        const findData=await todoModel.find(_id)
        if(findData)
            res.send(findData);
        else
            res.send("Can not find any data")
    }catch(err){
        res.send(err);
    }
})
app.delete('/todos/:id',async (req,res)=>{
    try{
        const _id=req.params.id;
        const deleteData=await todoModel.findByIdAndDelete(_id);
        if(deleteData)
            res.send("Data has been deleted succsssfully!");
        else    
            res.send("Data has not been deleted for some reason!")
    }catch(err){
        res.send(err);
    }
})
app.patch('/todos/:id',async (req,res)=>{
    try{
        const _id=req.params.id;
        const updateData=await todoModel.findByIdAndUpdate(_id,req.body,{new:true});
        if(updateData)
            res.send(updateData);
        else    
            res.send("Data can not be uploaded for some reason!");
    }catch(err){
        res.send(err);
    }
})
app.get('/todos/:id',async (req,res)=>{
    try{
        const _id=req.params.id;
        const findData=await todoModel.findById(_id);
        if(findData)
            res.send(findData);
        else    
            res.send("Data can not be uploaded for some reason!");
    }catch(err){
        res.send(err);
    }
})
app.listen(PORT,()=>{
    console.log("Listening to the port "+PORT);
})