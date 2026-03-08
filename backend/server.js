require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"));

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
  res.send("API Running");
});

app.listen(process.env.PORT || 5000,()=>{
  console.log("Server started");
});