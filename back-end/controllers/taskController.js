const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const { description, category } = req.body;
        const task = new Task({ description, category, userId: req.user.id });
        await task.save();
        res.status(201).send('Task created');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task || task.userId.toString() !== req.user.id.toString()) {
            return res.status(403).send('Access denied.');
        }
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task || task.userId.toString() !== req.user.id.toString()) {
            return res.status(403).send('Access denied.');
        }
        await Task.findByIdAndDelete(id);
        res.send('Task deleted');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const markTaskAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task || task.userId.toString() !== req.user.id.toString()) {
            return res.status(403).send('Access denied.');
        }
        task.completed = true;
        await task.save();
        res.send('Task marked as completed');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllTasks = async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access denied.');

    try {
        const tasks = await Task.find().populate('userId', 'username');
        res.json(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { createTask, updateTask, deleteTask, markTaskAsCompleted, getTasks, getAllTasks };
