const express = require("express");
const router = express.Router();
const Team = require("../models/team");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// validation importeren
const { teamValidation } = require("../validation/generalValidation");

// alle teams ophalen
router.get("/", authMiddleware, async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// team via id
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }

        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// team maken
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { error } = teamValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, country } = req.body;

        const team = new Team({
            name,
            country
        });

        await team.save();

        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// team updaten
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// team verwijderen
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }

        await Team.findByIdAndDelete(req.params.id);

        res.json({ message: "Team deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;