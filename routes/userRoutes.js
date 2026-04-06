const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// validation importeren
const { userValidation, userUpdateValidation } = require("../validation/generalValidation");

// alle users ophalen
router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// user ophalen via id
router.get("/:id", authMiddleware, async (req, res, next) => {
    try {
        // controleren of ID geldig is
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // admin mag alles zien, gewone user enkel zichzelf
        if (req.user.role !== "admin" && req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        next(error);
    }
});

// nieuwe user maken
router.post("/", authMiddleware, adminMiddleware, async (req, res, next) => {
    try {
        // input validatie
        const { error } = userValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // wachtwoord hashen
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        });

    } catch (error) {
        next(error);
    }
});

// user updaten
router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // admin mag alles aanpassen, gewone user enkel zichzelf
        if (req.user.role !== "admin" && req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        // input validatie
        const { error } = userUpdateValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // gewone users mogen hun rol niet aanpassen
        const updates = { ...req.body };
        if (req.user.role !== "admin") {
            delete updates.role;
        }

        // wachtwoord opnieuw hashen als het aangepast wordt
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);

    } catch (error) {
        next(error);
    }
});

// user verwijderen
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
