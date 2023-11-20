const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const status = require('../enums/Status');


const historySchema = new Schema({
    request: {
        required: true,
        type: String,
    },
    status: {
        // tells the current status of the request processing
        default: status.INITIATED,
        type: String
    },
    llmResponse: {
        required: true,
        default: "Hang tight, your request is queued up and a response is on the way!",
        type: String
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    recipe: {
        required: false,
        type: String
    }
});

const History = model('History', historySchema);
module.exports = History;
