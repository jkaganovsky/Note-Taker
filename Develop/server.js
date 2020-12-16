const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 3000;
// const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(notes);
});

const notes = [
    {
        title: "Test Title",
        text: "Test text"
    }
]

// Posting new Note
app.post("/api/notes", function(req,res) {
    const newNote = req.body;

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
});

// Start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});