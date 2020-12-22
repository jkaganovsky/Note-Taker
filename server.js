const express = require("express");
const path = require("path");
const fs = require("fs");
const notesList = [];

const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

// const PORT = 3000;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/api/notes", function(req, res) {
    const fileData = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));

    console.log("Notes Read File:", fileData);

    res.json(fileData);
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

app.get("/api/notes/:id", function(req, res) {
    const selectNote = req.params.id;
    console.log(selectNote);

    return res.send(req.params.id);

    // const fileData = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));

    // console.log("Notes:", fileData);

    // for (let i = 0; i < fileData.length; i++) {
    //   if (selectNote === fileData[i].routeName) {
    //     return res.send(fileData[i]);
    //   }
    // }

    // return res.send("No notes found");
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

// Posting new Note
app.post("/api/notes", function(req,res) {
    const newNote = req.body;

    res.json(newNote);

    console.log("New note log:", newNote);

    const fileData = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
    console.log("Before push:", fileData);

    const lastIndex = (fileData.length - 1);

    newNote.id = fileData[lastIndex].id + 1;

    fileData.push(newNote);
    console.log("After push:", fileData);

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(fileData));
});

// Deleting Notes
app.delete("/api/notes/:id", function(req, res) {
    const deleteNote = req.params.id;

    console.log(deleteNote);

    for (let i = 0; i < notesList.length; i++) {
        if (deleteNote === notesList[i].routeName) {
            return res.send(notesList[i]);
        }
    }

    return res.send(false);
});

// Start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});