const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

// alle users ophalen
router.get("/", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// user ophalen via id
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// nieuwe user maken
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// user updaten
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");

        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// user verwijderen
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;