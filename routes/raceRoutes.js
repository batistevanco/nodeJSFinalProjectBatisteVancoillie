const express = require("express");
const router = express.Router();
const Race = require("../models/race");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// validation importeren
const { raceValidation } = require("../validation/generalValidation");

// alle races
router.get("/", authMiddleware, async (req, res) => {
    try {
        const races = await Race.find().populate("team");
        res.json(races);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// race via id
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const race = await Race.findById(req.params.id).populate("team");

        if (!race) {
            return res.status(404).json({ message: "Race not found" });
        }

        res.json(race);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// race maken
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { error } = raceValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // check of team ID geldig is
        if (!mongoose.Types.ObjectId.isValid(req.body.team)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }

        const race = new Race(req.body);

        await race.save();

        res.status(201).json(race);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// race updaten
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const updatedRace = await Race.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedRace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// race verwijderen
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        await Race.findByIdAndDelete(req.params.id);

        res.json({ message: "Race deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;