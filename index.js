// Title: Simple Task Manager API in Node.js (100 Lines)

// Required modules
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory task list
let tasks = [];



// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const task = { id: Date.now(), title, description: description || '', completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== Number(req.params.id));
    if (tasks.length === initialLength) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Task Manager API running at http://localhost:${PORT}`);
});
