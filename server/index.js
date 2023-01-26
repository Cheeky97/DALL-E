const express = require("express");
const app = express();
const postRoute = require("./routes/postRoute");
const dalleRoute = require("./routes/dalleRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(()=> console.log("DB_Connection Successfull"))
    .catch((err)=>{
        console.log(err);
    });

    app.use(cors());
    app.use(express.json({ limit: '50mb'}));
    

app.use("/api/v1/post", postRoute);
app.use("/api/v1/dalle", dalleRoute);
app.get('/', async (req, res)=>{
    res.send("Hi, I'm Srikanth!");
});



app.listen(PORT, ()=>{
    console.log("The Backend server is running!");
});