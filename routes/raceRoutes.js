const express = require("express");
const router = express.Router();
const Race = require("../models/race");
const authMiddleware = require("../middleware/authMiddleware");

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
        await Race.findByIdAndDelete(req.params.id);
        res.json({ message: "Race deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;