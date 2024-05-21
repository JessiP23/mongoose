import express from 'express';
import mongoose from 'mongoose';

import learnerSchema from './learner.js';
import learner from './learner.js';

const PORT = 5050;
const app = express();

app.use(express.json());

//connect to mongoose
//specify the database you want to connect to 
await mongoose.connect(process.env.ATLAS_URI);

//creating documents follows a syntax similar to classes
const newDoc = new Learner({
    name: "Jessi",
    enrolled: true,
    year: 2024,
    //if we dont define campus, it will resort to the default
});

async () => {
    await newDoc.save();
};

app.get("/", async(req, res) => {
    //retrieve documents using find methods
    let jessi = await Learner.findOne({ name: "Jessi" });

    //we can add new fields to a document and save it
    jessi.avg = 85;
    await jessi.save();

    res.send(jessi);
});

app.get("/passing", async (req, res) => {
    //we use static function defined on the schema to easily
    //retrieve all learners with passing averages. This also
    //allows us to put business logic in the data model rather than
    //scattering it about the application
    let result = await Learner.findPassing();
    res.send(result);
});

app.get("/:id", async (req, res) => {
    try {
        let result = await Learner.findById(req.params.id);
        res.send(result);
    } catch {
        res.send("Invalid ID").status(400);
    }
});

app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});