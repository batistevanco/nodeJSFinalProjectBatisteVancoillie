// dotenv laden zodat we environment variables kunnen gebruiken
require("dotenv").config();

// app importeren
const app = require("./app");

// Database connectie importeren
const connectDB = require("./config/db");

// Poort uit .env halen
const PORT = process.env.PORT || 3000;

// Server starten
const startServer = async () => {
    try {
        // Database connectie starten
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
