const express = require("express");
const router = express.Router();
const Registration = require("../models/registration");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const { registrationValidation } = require("../validation/generalValidation");

// alle registraties ophalen
router.get("/", authMiddleware, async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate("user", "-password")
            .populate("race");

        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// registratie maken
router.post("/", authMiddleware, async (req, res) => {
    try {
        // validatie
        const { error } = registrationValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // ObjectId checks
        if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.body.race)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const registration = new Registration(req.body);
        await registration.save();

        res.status(201).json(registration);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// registratie verwijderen
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid registration ID" });
        }

        await Registration.findByIdAndDelete(req.params.id);

        res.json({ message: "Registration deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid registration ID" });
        }

        const registration = await Registration.findById(req.params.id)
            .populate("user", "-password")
            .populate("race");

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.json(registration);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid registration ID" });
        }

        const updated = await Registration.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;