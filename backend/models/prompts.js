const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const taskSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    isCompleted: {
        default: false,
        type: Boolean
    },
    dueDate: Date,
    priority: String
});

const Prompts = model('TaskTodo', taskSchema);
module.exports = Prompts;
