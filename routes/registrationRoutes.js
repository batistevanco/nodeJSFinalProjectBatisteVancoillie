const express = require("express");
const router = express.Router();
const Registration = require("../models/registration");
const User = require("../models/user");
const Race = require("../models/race");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const {
    registrationValidation,
    registrationUpdateValidation
} = require("../validation/generalValidation");

const canAccessRegistration = (req, registration) => {
    const registrationUserId = registration.user._id
        ? registration.user._id.toString()
        : registration.user.toString();

    return req.user.role === "admin" || registrationUserId === req.user.id;
};

// alle registraties ophalen
router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const filter = req.user.role === "admin" ? {} : { user: req.user.id };

        const registrations = await Registration.find(filter)
            .populate("user", "-password")
            .populate("race");

        res.json(registrations);
    } catch (error) {
        next(error);
    }
});

// registratie maken
router.post("/", authMiddleware, async (req, res, next) => {
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

        if (req.user.role !== "admin" && req.body.user !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.body.race)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const userExists = await User.findById(req.body.user);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const raceExists = await Race.findById(req.body.race);
        if (!raceExists) {
            return res.status(404).json({ message: "Race not found" });
        }

        const registration = new Registration(req.body);
        await registration.save();

        const populatedRegistration = await Registration.findById(registration._id)
            .populate("user", "-password")
            .populate("race");

        res.status(201).json(populatedRegistration);

    } catch (error) {
        next(error);
    }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
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

        if (!canAccessRegistration(req, registration)) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.json(registration);

    } catch (error) {
        next(error);
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid registration ID" });
        }

        const { error } = registrationUpdateValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        if (!canAccessRegistration(req, registration)) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (req.body.user && !mongoose.Types.ObjectId.isValid(req.body.user)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (req.user.role !== "admin" && req.body.user && req.body.user !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (req.body.race && !mongoose.Types.ObjectId.isValid(req.body.race)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        if (req.body.user) {
            const userExists = await User.findById(req.body.user);
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        if (req.body.race) {
            const raceExists = await Race.findById(req.body.race);
            if (!raceExists) {
                return res.status(404).json({ message: "Race not found" });
            }
        }

        const updatedRegistration = await Registration.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after", runValidators: true }
        )
            .populate("user", "-password")
            .populate("race");

        res.json(updatedRegistration);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid registration ID" });
        }

        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        if (!canAccessRegistration(req, registration)) {
            return res.status(403).json({ message: "Access denied" });
        }

        await Registration.findByIdAndDelete(req.params.id);

        res.json({ message: "Registration deleted" });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
