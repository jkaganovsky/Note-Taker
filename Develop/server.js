const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

const notesList = [];

const PORT = 3000;
// const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/api/notes", function(req, res) {
    fs.readFile(__dirname + "/db/db.json", function(err, jsonString) {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        else {
            const notes = JSON.parse(jsonString)
            console.log("db.json file:", notes);
        }
    });
    res.json(notesList);
    console.log("What am I:", notesList);
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

// Posting new Note
app.post("/api/notes", function(req,res) {
    const newNote = req.body;

    console.log("New note log:", newNote);

    notesList.push(newNote);

    res.json(newNote);
});

// Start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});