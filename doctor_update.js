const mongoose = require("mongoose");

const DoctorUpdateSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    health_update: { type: String, required: true },
    prescription: String,
    recommendations: String,
    notes: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DoctorUpdate", DoctorUpdateSchema);
const express = require("express");
const router = express.Router();
const DoctorUpdate = require("../models/DoctorUpdate");

// POST: Doctor submits patient update
router.post("/submit", async (req, res) => {
    try {
        const { patientId, doctorId, health_update, prescription, recommendations, notes } = req.body;

        // Check required fields
        if (!patientId || !doctorId || !health_update) {
            return res.status(400).json({ success: false, message: "Patient, Doctor, and Health Update are required" });
        }

        const update = new DoctorUpdate({
            patientId,
            doctorId,
            health_update,
            prescription,
            recommendations,
            notes
        });

        await update.save();
        res.json({ success: true, message: "Patient update submitted successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET: Get all updates for a patient
router.get("/:patientId", async (req, res) => {
    try {
        const updates = await DoctorUpdate.find({ patientId: req.params.patientId })
            .populate("doctorId", "fullName email")
            .sort({ date: -1 });

        res.json(updates);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
async function submitDoctorUpdate(event) {
    event.preventDefault();

    const data = {
        patientId: document.getElementById("patientId").value,
        doctorId: localStorage.getItem("userId"), // logged-in doctor
        health_update: document.querySelector("textarea[name='health_update']").value,
        prescription: document.querySelector("textarea[name='prescription']").value,
        recommendations: document.querySelector("textarea[name='recommendations']").value,
        notes: document.querySelector("textarea[name='notes']").value
    };

    const response = await fetch("http://localhost:5000/api/doctorUpdate/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
}
