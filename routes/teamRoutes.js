const express = require("express");
const router = express.Router();
const Team = require("../models/team");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const mongoose = require("mongoose");

// validation importeren
const { teamValidation, teamUpdateValidation } = require("../validation/generalValidation");

// alle teams ophalen
router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        next(error);
    }
});

// team via id
router.get("/:id", authMiddleware, async (req, res, next) => {
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
        next(error);
    }
});

// team maken
router.post("/", authMiddleware, adminMiddleware, async (req, res, next) => {
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
        next(error);
    }
});

// team updaten
router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }

        const { error } = teamUpdateValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.json(updatedTeam);
    } catch (error) {
        next(error);
    }
});

// team verwijderen
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }

        const deletedTeam = await Team.findByIdAndDelete(req.params.id);

        if (!deletedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.json({ message: "Team deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
