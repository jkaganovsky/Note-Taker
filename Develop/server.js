const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

// Posting new Note
app.post("/notes", function(req,res) {
    var newNote = req.body;

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
});

// Start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});