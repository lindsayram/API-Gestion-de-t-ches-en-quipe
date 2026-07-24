const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema (
    {
        project:{
            type: mongoose.Schema.ObjectId
        },       
        title:{
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
        },
        statut: {
            type: String,
            enum: ['todo', 'loading', 'done'],
            default: 'todo'
        }
    }
)

module.exports = mongoose.model('Task', taskSchema)