const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/api/notes", function(req, res) {
    const fileData = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));

    console.log("Read file:", fileData);

    res.json(fileData);
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

// Posting new note
app.post("/api/notes", function(req,res) {
    const newNote = req.body;

    res.json(newNote);

    console.log("New note log:", newNote);

    const fileData = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
    console.log("Before push:", fileData);

    // Adds an id string to an array
    console.log("lastIndex:", fileData.length - 1);
    console.log("newIndex:", fileData.length + 2);
    if (fileData.length === 0) {
        console.log("empty fileData");
        newNote.id = 1;
    } else {
        const lastIndex = (fileData.length - 1);

        console.log("Not empty fileData");
        newNote.id = fileData[lastIndex].id + 1;
    }

    fileData.push(newNote);
    console.log("After push:", fileData);

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(fileData));
});

// Deleting notes by id
app.delete("/api/notes/:id", function(req, res) {
    const deleteNote = parseInt(req.params.id);
    console.log("Delete note:", typeof deleteNote);

    const fileData = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
    console.log("Read data:", fileData);

    //
    for (let i = 0; i < fileData.length; i++) {
        console.log("For loop:", fileData[i]);
        if (deleteNote === fileData[i].id) {
            fileData.splice(i, 1);
            console.log("Splice data:", fileData);
        }
    }

    return res.send(fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(fileData)));
});

// Start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});