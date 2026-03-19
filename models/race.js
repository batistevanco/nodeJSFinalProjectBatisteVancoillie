const mongoose = require("mongoose");

const raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
});

module.exports = mongoose.model("Race", raceSchema);