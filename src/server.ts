import db from "./database";
import express from "express";


const app = express();
const port = 3000;
app.listen(port , ()=>{
    console.log("my server is alive!");
});

app.get("/",(req,res)=>{
    res.json(db.connect());
});