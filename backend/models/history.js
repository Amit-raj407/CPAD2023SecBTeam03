const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const historySchema = new Schema({
    request: {
        required: true,
        type: String,
    },
    status: {
        // tells the status of the request after sending to LLM
        default: true,
        type: Boolean
    },
    llmResponse: {
        required: true,
        default: "Currently unable to provide an answer. Please try again later.",
        type: String
    },
    timestamp: Date,
    recipe: {
        required: false,
        type: String
    }
});

const History = model('History', historySchema);
module.exports = History;
