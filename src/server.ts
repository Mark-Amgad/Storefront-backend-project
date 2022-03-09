import db from "./database";
import express from "express";
import productsHandler from "./handlers/products";


// the next is to start testing

const app = express();
const port = 3000;
app.listen(port , ()=>{
    console.log("my server is alive!");
});

productsHandler(app);