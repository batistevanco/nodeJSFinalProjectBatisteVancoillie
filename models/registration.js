const mongoose = require("mongoose");

// schema voor inschrijvingen
const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    race: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Race",
        required: true
    },
    position: {
        type: Number,
        default: null 
    }
});

// model exporteren
module.exports = mongoose.model("Registration", registrationSchema);