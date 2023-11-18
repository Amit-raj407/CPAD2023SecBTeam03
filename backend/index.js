const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors());

const PORT = 3000;

// Need to use Environment Variable to store the uri, as it should not be exposed
// const uri = 'mongodb+srv://AmitRaj:AmitRaj123@cluster0.yog8h5r.mongodb.net/test';
const uri = 'mongodb+srv://amitrajraj241:<password>@cluster0.pz0mxff.mongodb.net/cookitup';


const taskRoutes = require('./routes/prompts.js');


app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Home" });
})

app.get('/test', (req, res) => {
    res.json({ message: "test" });
})

app.use('/tasks', taskRoutes);

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


