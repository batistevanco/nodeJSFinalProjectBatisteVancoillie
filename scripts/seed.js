require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Team = require("../models/team");
const Race = require("../models/race");

const connectDB = require("../config/db");

const seedData = async () => {
    try {
        await connectDB();

        console.log("Clearing database...");

        await User.deleteMany();
        await Team.deleteMany();
        await Race.deleteMany();

        console.log("Seeding users...");

        const hashedPassword = await bcrypt.hash("123456", 10);

        const users = await User.insertMany([
            { name: "Admin", email: "admin@test.com", password: hashedPassword },
            { name: "Lewis Hamilton", email: "lewis@f1.com", password: hashedPassword },
            { name: "Max Verstappen", email: "max@f1.com", password: hashedPassword },
            { name: "Charles Leclerc", email: "charles@f1.com", password: hashedPassword },
            { name: "Lando Norris", email: "lando@f1.com", password: hashedPassword }
        ]);

        console.log("Seeding teams...");

        const teams = await Team.insertMany([
            { name: "Red Bull Racing", country: "Austria" },
            { name: "Mercedes AMG", country: "Germany" },
            { name: "Ferrari", country: "Italy" },
            { name: "McLaren", country: "UK" },
            { name: "Aston Martin", country: "UK" }
        ]);

        console.log("Seeding races...");

        const racesData = [
            { name: "Bahrain GP", track: "Sakhir", date: "2026-03-01" },
            { name: "Saudi Arabia GP", track: "Jeddah", date: "2026-03-10" },
            { name: "Australian GP", track: "Melbourne", date: "2026-03-20" },
            { name: "Japanese GP", track: "Suzuka", date: "2026-04-01" },
            { name: "Chinese GP", track: "Shanghai", date: "2026-04-10" },
            { name: "Miami GP", track: "Miami", date: "2026-05-01" },
            { name: "Monaco GP", track: "Monaco", date: "2026-05-10" },
            { name: "Spanish GP", track: "Barcelona", date: "2026-05-20" },
            { name: "Canadian GP", track: "Montreal", date: "2026-06-01" },
            { name: "British GP", track: "Silverstone", date: "2026-06-10" },
            { name: "Belgian GP", track: "Spa", date: "2026-07-01" },
            { name: "Dutch GP", track: "Zandvoort", date: "2026-07-10" },
            { name: "Italian GP", track: "Monza", date: "2026-07-20" }
        ];

        const races = [];

        for (let race of racesData) {
            const randomTeam = teams[Math.floor(Math.random() * teams.length)];

            races.push({
                ...race,
                date: new Date(race.date),
                team: randomTeam._id
            });
        }

        await Race.insertMany(races);

        console.log("Seed completed successfully!");
        console.log(`Users: ${users.length}`);
        console.log(`Teams: ${teams.length}`);
        console.log(`Races: ${races.length}`);

        process.exit();

    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seedData();