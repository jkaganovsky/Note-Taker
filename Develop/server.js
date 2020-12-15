const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

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

// Start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});