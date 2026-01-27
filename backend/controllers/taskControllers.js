const Task = require("../models/task");

const createTask = async (req, res) => {
    try {
        console.log("createTask called");
        console.log("req.body:", req.body);
        console.log("req.user:", req.user);
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({ message: "Title or Description is required" });
        }

        const currTask = await Task.findOne({ title, user: req.user.id });

        if (currTask) {
            return res.status(409).json({ message: "Task already exists" });
        }
        const newTask = new Task({
            title,
            description,
            status: req.body.status || "pending",
            priority: req.body.priority || "medium",
            dueDate: req.body.dueDate,
            user: req.user.id
        });
        await newTask.save();

        res.status(201).json({ message: "task Created successfully", newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error, unable to create task" });
    }
};
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error, unable to fetch tasks" });
    }
};
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error, unable to fetch task" });
    }
};
const getTaskByTitle = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const task = await Task.findOne({ title, user: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error, unable to fetch task" });
    }
};
const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const currTask = await Task.findOne({ title, user: req.user.id });
        if (!currTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        currTask.title = title;
        currTask.description = description;
        currTask.status = status;
        if (priority) currTask.priority = priority;
        if (dueDate) currTask.dueDate = dueDate;
        currTask.updatedAt = Date.now();
        await currTask.save();
        res.status(200).json({ message: "task updated successfully", currTask });
    } catch (error) {
        res.status(500).json({ message: "Server error, unable to update task" });
    }
};
const deleteTask = async (req, res) => {
    try {
        const { title } = req.body;
        const currTask = await Task.findOne({ title, user: req.user.id });
        if (!currTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        await currTask.deleteOne();
        res.status(200).json({ message: "task deleted successfully", currTask });
    } catch (error) {
        res.status(500).json({ message: "Server error, unable to delete task" });
    }
};
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskById,
    getTaskByTitle
};