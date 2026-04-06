const express = require("express");
const router = express.Router();
const Race = require("../models/race");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const mongoose = require("mongoose");

// validation importeren
const { raceValidation, raceUpdateValidation } = require("../validation/generalValidation");

// alle races
router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const races = await Race.find().populate("team");
        res.json(races);
    } catch (error) {
        next(error);
    }
});

// race via id
router.get("/:id", authMiddleware, async (req, res, next) => {
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
        next(error);
    }
});

// race maken
router.post("/", authMiddleware, adminMiddleware, async (req, res, next) => {
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
        next(error);
    }
});

// race updaten
router.put("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const { error } = raceUpdateValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (req.body.team && !mongoose.Types.ObjectId.isValid(req.body.team)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }

        const updatedRace = await Race.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRace) {
            return res.status(404).json({ message: "Race not found" });
        }

        res.json(updatedRace);
    } catch (error) {
        next(error);
    }
});

// race verwijderen
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const deletedRace = await Race.findByIdAndDelete(req.params.id);

        if (!deletedRace) {
            return res.status(404).json({ message: "Race not found" });
        }

        res.json({ message: "Race deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
