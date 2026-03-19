// Mongoose importeren om schema's te kunnen maken
const mongoose = require("mongoose");

// Schema definiëren voor een gebruiker
const userSchema = new mongoose.Schema({
    // Naam van de gebruiker
    name: {
        type: String,
        required: true
    },

    // Email adres van de gebruiker
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Gehasht wachtwoord
    password: {
        type: String,
        required: true
    },

    // Rol van de gebruiker (bv user of admin)
    role: {
        type: String,
        default: "user"
    },

    // Datum waarop de gebruiker werd aangemaakt
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model exporteren zodat we het in andere bestanden kunnen gebruiken
module.exports = mongoose.model("User", userSchema);