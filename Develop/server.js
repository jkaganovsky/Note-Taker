const express = require("express");
const path = require("path");
const fs = require("fs");
const notesList = [];

const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

const PORT = 3000;
// const PORT = process.env.PORT || 3001;

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

app.get("/api/notes/:note", function(req, res) {
    const selectNote = req.params.note;
    console.log(selectNote);

    for (let i = 0; i < notesList.length; i++) {
      if (selectNote === notesList[i].routeName) {
        return res.json(notesList[i]);
      }
    }

    return res.send("No notes found");
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

    fileData.push(newNote);
    console.log("After push:", fileData);

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(fileData));
});

// Start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});