const mongoose = require("mongoose");

const PatientHealthSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sleep_time: String,
    walk_time: String,
    steps: Number,
    heart_rate: Number,
    blood_pressure: String,
    health_update: String,
    hospital_info: String,
    doctor_name: String,
    notes: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PatientHealth", PatientHealthSchema);
const express = require("express");
const router = express.Router();
const PatientHealth = require("../models/PatientHealth");

// POST: Save patient health details
router.post("/update", async (req, res) => {
    try {
        const data = new PatientHealth({
            userId: req.body.userId, // send this from frontend (after login)
            sleep_time: req.body.sleep_time,
            walk_time: req.body.walk_time,
            steps: req.body.steps,
            heart_rate: req.body.heart_rate,
            blood_pressure: req.body.blood_pressure,
            health_update: req.body.health_update,
            hospital_info: req.body.hospital_info,
            doctor_name: req.body.doctor_name,
            notes: req.body.notes
        });

        await data.save();
        res.json({ success: true, message: "Health details updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET: Get patient health details by userId
router.get("/:userId", async (req, res) => {
    try {
        const records = await PatientHealth.find({ userId: req.params.userId }).sort({ date: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
