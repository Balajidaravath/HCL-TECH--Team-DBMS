const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/health_portal");
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Error:", error);
    }
};

module.exports = connectDB;

