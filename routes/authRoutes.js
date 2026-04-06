const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const { registerValidation, loginValidation } = require("../validation/authValidation");

// tijdelijk test endpoint
router.get("/test", (req, res) => {
    res.send("Auth route werkt");
});

// gebruiker registreren
router.post("/register", async (req, res, next) => {
    // input validatie
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { name, email, password } = req.body;

        // controleren of gebruiker al bestaat
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // wachtwoord hashen
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // nieuwe user maken
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {
        next(error);
    }
});

// gebruiker inloggen
router.post("/login", async (req, res, next) => {
    // input validatie
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { email, password } = req.body;

        // user zoeken
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // wachtwoord controleren
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // JWT token maken
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        next(error);
    }
});


// Protected route - alleen toegankelijk met geldige JWT
router.get("/me", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Protected user data",
            user: user
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
