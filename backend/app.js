const express = require("express");
const cors = require('cors');
const User = require('./models/user');
const { HighScore, HighScoreList } = require('./models/highscore');
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("-------------------")
    console.log(req.method, req.url);
    console.log("BODY:", req.body);
    console.log("Token:", req.headers?.authorization?.split(" ")[1] || null);
    next();
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.password === password) {
        // Login erfolgreich
        const token = (Math.random() + 1).toString(36).substring(2);

        user.token = token;
        await user.save();

        res.status(200).json({
            Token: token
        });
    } else {
        res.status(401).send("Invalid Credentials");
    }
});

// Register
app.post("/users", async (req, res) => {
    const { email, password } = req.body;

    // Überprüfen, ob der Benutzer bereits existiert
    let user = await User.findOne({ email });

    if (user) {
        res.status(409).send("User already exists");
    } else {

        const token = (Math.random() + 1).toString(36).substring(2);


        user = new User({ email, password, token });

        await user.save();


        res.status(200).json({
            message: "User successfully created",
            Token: token
        });
    }
});


// Handle Highscores
app.post("/highscores", async (req, res) => {
    const { username, score, gameName } = req.body;

    const highScore = new HighScore({ playerName: username, score });

    let highScoreList = await HighScoreList.findOne({ gameName });

    if (!highScoreList) {
        highScoreList = new HighScoreList({ gameName, highScores: [highScore] });
    } else {
        highScoreList.highScores.push(highScore);
    }

    await highScoreList.save();

    res.status(200).json({
        message: "Highscore successfully saved"
    });
});

app.get("/highscores", async (req, res) => {
    // Alle Highscores aus der Datenbank abrufen
    const highscoreData = await HighScoreList.find();

    res.status(200).json({
        highscores: highscoreData
    });
});

// Logout
app.delete("/sessions", async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        user.token = null;
        await user.save();
    }

    res.status(200).json({
        message: "Successfully logged out"
    });
});

module.exports = app;