const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let userData = {
    "ich@du.at": "test",
    "ich2@du.at": "test3"
};

let tokenData = {};

let highscoreData = [];

app.use((req, res, next) => {
    console.log("-------------------")
    console.log(req.method, req.url);
    console.log("BODY:", req.body);
    console.log("Token:", req.headers?.authorization?.split(" ")[1] || null);
    next();
});

app.get("/", (req, res) => {
    // Alle Token Daten ausgeben
    res.status(200).json([{ "tokenData": tokenData, "highscoreData": highscoreData }]);
});

app.post("/login", (req, res) => {
    // Übergebene Daten loggen
    console.log(req.body);

    // Passwort überprüfen
    if (req.body.password === userData[req.body.email]) {
        // Login erfolgreich
        const token = (Math.random() + 1).toString(36).substring(2)

        tokenData[req.body.email] = token;

        res.status(200).json({
            Token: token
        });
    } else {
        res.status(401).send("Invalid Credentials");
    }
});

// Register
app.post("/users", (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    if (email in userData) {
        res.status(409).send("User already exists");
    } else {
        // Save new user in the userData
        userData[email] = password;

        // Generate authentication token
        const token = (Math.random() + 1).toString(36).substring(2);
        tokenData[email] = token;

        res.status(200).json({
            message: "User successfully created",
            Token: token
        });
    }
});

// Handle Highscores
app.post("/highscores", (req, res) => {
    const { username, score } = req.body;

    // Save the high score
    highscoreData.push({ username, score });

    // Return status 200 and message
    res.status(200).json({
        message: "Highscore successfully saved"
    });
});

app.get("/highscores", (req, res) => {
    // Return all highscores
    res.status(200).json({
        highscores: highscoreData
    });
});

// Logout
app.delete("/sessions", (req, res) => {
    const { email } = req.body;

    // Remove the token
    delete tokenData[email];

    // Return status 200 and message
    res.status(200).json({
        message: "Successfully logged out"
    });
});

module.exports = app;

