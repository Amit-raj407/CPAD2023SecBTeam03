const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


app.use(cors());

const PORT = parseInt(process.env.PORT, 10);

// Need to use Environment Variable to store the uri, as it should not be exposed
// edit: stored in environment variable
const uri = process.env.MONGO_DB_URI;


const routes = require('./routes/prompts.js');


app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Home" });
})

app.get('/test', (req, res) => {
    res.json({ message: "test" });
})

app.use('/prompts', routes);

app.get('/**', (req, res) => {
    res.json({ message: "404" });
})


mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log('listening on port ' + PORT);
    });
}).catch((err) => {
    console.log(err);
})


