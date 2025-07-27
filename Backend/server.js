const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconfig");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const issueRoutes = require("./Routes/issueRoutes")

const app = express();
app.use(cors({
    origin: "*"
  }));
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req,res) =>{
    res.send("Hello from backend");
})

app.use("/api/user", userRoutes);
app.use("/api/issue", issueRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running on port: ",PORT);
    })
})