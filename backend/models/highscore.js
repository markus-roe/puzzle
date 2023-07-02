const mongoose = require('mongoose');

const highScoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const highScoreListSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },
    highScores: [highScoreSchema]
});

module.exports = {
    HighScore: mongoose.model('HighScore', highScoreSchema),
    HighScoreList: mongoose.model('HighScoreList', highScoreListSchema)
};
