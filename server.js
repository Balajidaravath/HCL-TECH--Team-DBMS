const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/hackathonDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// API Route
app.use("/api/user", userRoute);
const patientHealthRoutes = require("./routes/patientHealth");
app.use("/api/patientHealth", patientHealthRoutes);


// Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
