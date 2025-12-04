const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor"], required: true }
});

module.exports = mongoose.model("User", userSchema);

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER API
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, phone, username, password, confirmPassword, role } = req.body;

        // 1️⃣ Check required fields
        if (!fullName || !email || !phone || !username || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2️⃣ Check password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // 3️⃣ Check unique email
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // 4️⃣ Check unique username
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // 5️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6️⃣ Create user
        const newUser = new User({
            fullName,
            email,
            phone,
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ message: "Registration successful!" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
async function submitHealthDetails(event) {
    event.preventDefault();

    const data = {
        userId: localStorage.getItem("userId"), // after login
        sleep_time: document.querySelector("input[name='sleep_time']").value,
        walk_time: document.querySelector("input[name='walk_time']").value,
        steps: document.querySelector("input[name='steps']").value,
        heart_rate: document.querySelector("input[name='heart_rate']").value,
        blood_pressure: document.querySelector("input[name='blood_pressure']").value,
        health_update: document.querySelector("textarea[name='health_update']").value,
        hospital_info: document.querySelector("input[name='hospital_info']").value,
        doctor_name: document.querySelector("input[name='doctor_name']").value,
        notes: document.querySelector("textarea[name='notes']").value
    };

    const response = await fetch("http://localhost:5000/api/patientHealth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
}
