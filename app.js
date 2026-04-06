// Routes toevoegen
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const raceRoutes = require("./routes/raceRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

// Express importeren
const express = require("express");

// error middleware importeren
const errorHandler = require("./middleware/errorHandler");

// Express applicatie maken
const app = express();

// Middleware zodat de API JSON kan verwerken
app.use(express.json());

// Routes koppelen
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/races", raceRoutes);
app.use("/api/registrations", registrationRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Sim Racing League API is running...");
});

// 404 voor niet-bestaande routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handler altijd als laatste
app.use(errorHandler);

module.exports = app;
