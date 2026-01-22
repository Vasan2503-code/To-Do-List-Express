const Task = require('../models/task');

const createTask = async (req, res) => {
    try {
        const { title, description} = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const curTask = await Task.findOne({
            title,
            user: req.user.id

        });

        if (curTask) {
            return res.status(400).json({ message: "Task already exists" });
        }

        const newTask = new Task({
            title,
            description,
            status : req.body.status || "pending",
            user: req.user.id
        });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
const getTask = async (req , res)=>{
    try{
        const tasks = await Task.find({user:req.user.id});
        res.status(200).send(tasks);
    }catch(e){
        res.status(500).send("Server error");
    }
}
const updateTask = async(req, res)=>{
    try{
        const{title,description , status} = req.body;

        const currTask = await Task.findOne({title , user:req.user.id});

        if(!currTask){
            return res.status(400).send("Task not found");
        }

        currTask.title = title;
        currTask.description = description;
        currTask.status = status;

        await currTask.save();
        res.status(200).send("updated");
    }   
    catch(e){
        res.status(500).send("Server side error");
    }
}
const deleteTask = async (req , res)=>{
    try{
        const {title} = req.body;

        const curTask = await Task.findOne({title , user:req.user.id})

        if(!curTask){
            return res.status(400).send("Task not found");
        }

        await curTask.deleteOne();
        res.status(200).send("Deleted successfully");
    }
    catch(e){
        res.status(500).json({message : "server side error"});
    }
}
const getOne = async (req , res)=>{
    try{
        const {title} = req.body;

        const currTitle = await Task.findOne({title , user:req.user.id});

        if(!currTitle){
            return res.status(400).send("task does'nt exist");
        }

        res.send(currTitle).status(200);
    }catch(e){
        res.status(500).send("Server side error");
    }
}


module.exports = { createTask , getTask, updateTask,deleteTask , getOne};