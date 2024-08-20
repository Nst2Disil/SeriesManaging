const express = require('express');
const addS = require('./addSeries.js');
const deleteS = require('./deleteSeries.js');
const getS = require('./getSeries.js');

const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;
const app = express();

const dbUrl = "mongodb://rootuser:rootpassword@localhost:27017/";
const mongoClient = new MongoClient(dbUrl);

mongoClient
    .connect()
    .then((client) => {
        app.locals.collection = client.db("shows").collection("series");
        app.listen(PORT, () => {
            console.log("The server is running!");
        });
    })
    .catch((e) => console.log(e));

app.use(express.json());
app.post("/series", addS);
app.delete("/series/:id", deleteS);
app.get("/series", getS);
