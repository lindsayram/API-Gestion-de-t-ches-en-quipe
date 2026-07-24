const Task = require('../models/taskModel')

//create a task US6
const addTask = async (req, res) => {
    try {
        const {title, deadline} = req.body

    // Champs n'est pas vide
    if(!title) {
        res.statut(400).json({ message: 'Please provide title and deadline'})
    }

    const newTask = await Task.create({
        project: req.params.id,
        title
    })

    res.status(201).json({ 
        message: "New task added"})
    } catch (err) {
        res.statut(500).json({ message: 'Servor error during add task'})
    }
    
}