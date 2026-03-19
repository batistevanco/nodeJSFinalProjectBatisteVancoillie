// Mongoose importeren om met MongoDB te kunnen werken
const mongoose = require("mongoose");

// Functie om verbinding te maken met de database
const connectDB = async () => {
    try {
        // Verbinding maken met MongoDB via de URI uit .env
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);

        // Server stoppen als database niet werkt
        process.exit(1);
    }
};

// Functie exporteren zodat we ze in server.js kunnen gebruiken
module.exports = connectDB;