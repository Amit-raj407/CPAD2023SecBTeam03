const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();


app.use(cors());

const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_DB_URI;


const routes = require('./routes/prompts.js');


app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
    res.json({ message: "Home" });
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


