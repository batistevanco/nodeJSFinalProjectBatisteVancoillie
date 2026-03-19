// Routes toevoegen
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const raceRoutes = require("./routes/raceRoutes");

// dotenv laden zodat we environment variables kunnen gebruiken
require("dotenv").config();

// Express importeren
const express = require("express");

// Database connectie importeren
const connectDB = require("./config/db");

// Express applicatie maken
const app = express();

// Database connectie starten
connectDB();

// Middleware zodat de API JSON kan verwerken
app.use(express.json());

// Routes koppelen
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/races", raceRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Sim Racing League API is running...");
});

// Poort uit .env halen
const PORT = process.env.PORT || 3000;

// Server starten
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});