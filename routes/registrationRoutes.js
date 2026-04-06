const express = require("express");
const router = express.Router();
const Registration = require("../models/registration");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const {
    registrationValidation,
    registrationUpdateValidation
} = require("../validation/generalValidation");

// alle registraties ophalen
router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const registrations = await Registration.find()
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

        if (!mongoose.Types.ObjectId.isValid(req.body.race)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const registration = new Registration(req.body);
        await registration.save();

        res.status(201).json(registration);

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

        if (req.body.user && !mongoose.Types.ObjectId.isValid(req.body.user)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (req.body.race && !mongoose.Types.ObjectId.isValid(req.body.race)) {
            return res.status(400).json({ message: "Invalid race ID" });
        }

        const updatedRegistration = await Registration.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: "Registration not found" });
        }

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

        const deletedRegistration = await Registration.findByIdAndDelete(req.params.id);

        if (!deletedRegistration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.json({ message: "Registration deleted" });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
